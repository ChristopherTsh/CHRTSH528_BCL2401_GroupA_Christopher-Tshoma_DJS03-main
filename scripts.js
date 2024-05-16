import { books, authors, genres, BOOKS_PER_PAGE } from "./data.js";
import { themeColor, remaining } from "./bookUtils.js";

let page = 1;
let matches = books;

function createBook(bookPreviews) {
  console.log(bookPreviews);
  const { id, image, title, author } = bookPreviews;

  const element = document.createElement("button");
  element.classList = "preview";
  element.setAttribute("data-preview", id);

  element.innerHTML = `
        <img
            class="preview__image"
            src="${image}"
        />
        
        <div class="preview__info">
            <h3 class="preview__title">${title}</h3>
            <div class="preview__author">${author}</div>
        </div>
    `;

  return element;
}

function genreOption() {
  const genreHtml = document.createDocumentFragment();
  const firstGenreElement = document.createElement("option");
  firstGenreElement.value = "any";
  firstGenreElement.innerText = "All Genres";
  genreHtml.appendChild(firstGenreElement);

  for (const [id, name] of Object.entries(genres)) {
    const element = document.createElement("option");
    element.value = id;
    element.innerText = name;
    genreHtml.appendChild(element);
  }

  document.querySelector("[data-search-genres]").appendChild(genreHtml);
}

function authorOption() {
  console.log(authorOption);
  const authorsHtml = document.createDocumentFragment();
  const firstAuthorElement = document.createElement("option");
  firstAuthorElement.value = "any";
  firstAuthorElement.innerText = "All Authors";
  authorsHtml.appendChild(firstAuthorElement);

  for (const [id, name] of Object.entries(authors)) {
    const element = document.createElement("option");
    element.value = id;
    element.innerText = name;
    authorsHtml.appendChild(element);
  }
  document.querySelector("[data-search-authors]").appendChild(authorsHtml);
}

function initializeTheme() {
  if (
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  ) {
    document.querySelector("[data-settings-theme]").value = "night";
    themeColor("night");
  } else {
    document.querySelector("[data-settings-theme]").value = "day";
    themeColor("day");
  }
}

remaining(books, page, BOOKS_PER_PAGE);

const dataSearchOverLay = function () {
  return document.querySelector("[data-search-overlay]");
};
const overlayElement = dataSearchOverLay();

function addEventListener(selector, eventType, eventHandler) {
  document.querySelector(selector).addEventListener(eventType, eventHandler);
}

function initializeEventListener() {
  document
    .querySelector("[data-search-cancel]")
    .addEventListener("click", () => {
      overlayElement.open = false;
    });

  addEventListener("[data-settings-cancel]", "click", () => {
    document.querySelector("[data-settings-overlay]").open = false;
  });

  addEventListener("[data-header-search]", "click", () => {
    overlayElement.open = true;
    document.querySelector("[data-search-title]").focus();
  });

  addEventListener("[data-header-settings]", "click", () => {
    document.querySelector("[data-settings-overlay]").open = true;
  });

  addEventListener("[data-list-close]", "click", () => {
    document.querySelector("[data-list-active]").open = false;
  });

  addEventListener("[data-settings-form]", "submit", (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const { theme } = Object.fromEntries(formData);

    themeColor(theme);

    document.querySelector("[data-settings-overlay]").open = false;
  });
}
function addSearchFormSubmitListener() {
  addEventListener("[data-search-form]", "submit", (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const filters = Object.fromEntries(formData);
    const result = [];

    for (const book of books) {
      let genreMatch = filters.genre === "any";

      for (const singleGenre of book.genres) {
        if (genreMatch) break;
        if (singleGenre === filters.genre) {
          genreMatch = true;
        }
      }

      if (
        (filters.title.trim() === "" ||
          book.title.toLowerCase().includes(filters.title.toLowerCase())) &&
        (filters.author === "any" || book.author === filters.author) &&
        genreMatch
      ) {
        result.push(book);
      }
    }

    page = 1;
    matches = result;

    if (result.length < 1) {
      document
        .querySelector("[data-list-message]")
        .classList.add("list__message_show");
    } else {
      document
        .querySelector("[data-list-message]")
        .classList.remove("list__message_show");
    }

    document.querySelector("[data-list-items]").innerHTML = "";
    const newItems = document.createDocumentFragment();

    for (const { author, id, image, title } of result.slice(
      0,
      BOOKS_PER_PAGE
    )) {
      const element = document.createElement("button");
      element.classList = "preview";
      element.setAttribute("data-preview", id);

      element.innerHTML = `
            <img
                class="preview__image"
                src="${image}"
            />
            
            <div class="preview__info">
                <h3 class="preview__title">${title}</h3>
                <div class="preview__author">${authors[author]}</div>
            </div>
        `;

      newItems.appendChild(element);
    }

    document.querySelector("[data-list-items]").appendChild(newItems);
    document.querySelector("[data-list-button]").disabled =
      matches.length - page * BOOKS_PER_PAGE < 1;

    remaining(books, page, BOOKS_PER_PAGE);

    window.scrollTo({ top: 0, behavior: "smooth" });
    overlayElement.open = false;
  });
}

function listButtonClickListener() {
  addEventListener("[data-list-button]", "click", () => {
    const fragment = document.createDocumentFragment();

    for (const { author, id, image, title } of matches.slice(
      page * BOOKS_PER_PAGE,
      (page + 1) * BOOKS_PER_PAGE
    )) {
      const element = document.createElement("button");
      element.classList = "preview";
      element.setAttribute("data-preview", id);

      element.innerHTML = `
            <img
                class="preview__image"
                src="${image}"
            />
            
            <div class="preview__info">
                <h3 class="preview__title">${title}</h3>
                <div class="preview__author">${authors[author]}</div>
            </div>
        `;

      fragment.appendChild(element);
    }

    document.querySelector("[data-list-items]").appendChild(fragment);
    page += 1;
    remaining(books, page, BOOKS_PER_PAGE);
  });
}
function addListItemsClickListener() {
  addEventListener("[data-list-items]", "click", (event) => {
    const pathArray = Array.from(event.path || event.composedPath());
    let active = null;

    for (const node of pathArray) {
      if (active) break;

      if (node?.dataset?.preview) {
        let result = null;

        for (const singleBook of books) {
          if (result) break;
          if (singleBook.id === node?.dataset?.preview) result = singleBook;
        }

        active = result;
      }
    }

    if (active) {
      document.querySelector("[data-list-active]").open = true;
      document.querySelector("[data-list-blur]").src = active.image;
      document.querySelector("[data-list-image]").src = active.image;
      document.querySelector("[data-list-title]").innerText = active.title;
      document.querySelector("[data-list-subtitle]").innerText = `${
        authors[active.author]
      } (${new Date(active.published).getFullYear()})`;
      document.querySelector("[data-list-description]").innerText =
        active.description;
    }
  });
}
function themeSwitch() {
  const toggle = localStorage.getItem("toggle") === "enabled";
  document.body.classList.toggle("toggle", toggle);
}

// Function to save theme preference to local storage
function saveThemePreference(theme) {
  localStorage.setItem("theme", theme);
}

// Function to save toggle state to local storage
function saveToggleState(toggleState) {
  localStorage.setItem("toggle", toggleState);
}

function settingsFormSubmit() {
  addEventListener("[data-settings-form]", "submit", (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const { theme } = Object.fromEntries(formData);

    themeColor(theme);
    saveThemePreference(theme); // Save theme preference to local storage

    document.querySelector("[data-settings-overlay]").open = false;
  });
}
function initializeApp() {
  const starting = document.createDocumentFragment();
  for (const book of matches.slice(0, BOOKS_PER_PAGE)) {
    starting.appendChild(createBook(book));
  }

  document.querySelector("[data-list-items]").appendChild(starting);

  genreOption();
  authorOption();
  initializeTheme();
  initializeEventListener();
  themeSwitch();
  addListItemsClickListener();
  settingsFormSubmit();
  addSearchFormSubmitListener();
  listButtonClickListener();
  addThemeChange();
  ThemeFromStorage();
  addThemeToggle();
}

function ThemeFromStorage() {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    themeColor(savedTheme);
  }
}

function addThemeChange() {
  document
    .querySelector("[data-settings-theme]")
    .addEventListener("change", (event) => {
      console.log(theme);
      const theme = event.target.value;
      themeColor(theme);
      saveThemePreference(theme);
    });
}
function addThemeToggle() {
  // Add event listener for theme toggle button and save its state to local storage
  document
    .querySelector("[data-settings-toggle]")
    .addEventListener("click", () => {
      const toggleState = document.body.classList.toggle("toggle");
      saveToggleState(toggleState ? "enabled" : "disabled");
    });
}

initializeApp();
