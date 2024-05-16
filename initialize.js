export  function initializeApp() {
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
  }