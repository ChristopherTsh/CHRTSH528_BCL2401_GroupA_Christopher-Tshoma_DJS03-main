import { books, authors, genres, BOOKS_PER_PAGE } from "./data.js";


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

      

      
    }

    

const htmlComponent = document.createElement('template')
htmlComponent.innerHTML =`
<style>
  .book-preview {
    display: flex;
    align-items: center;
    padding: 10px;
    border: 1px solid #ddd;
    margin-bottom: 10px;
  }
  .book-preview__image {
    width: 50px;
    height: 50px;
    margin-right: 10px;
  }
  .book-preview__info {
    display: flex;
    flex-direction: column;
  }
  .book-preview__title {
    font-size: 16px;
    font-weight: bold;
  }
  .book-preview__author {
    font-size: 14px;
    color: #555;
  }
</style>
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

        document.querySelector("[data-list-items]").appendChild(fragment);
    page += 1;
    remaining(books, page, BOOKS_PER_PAGE);
)
}
 class PreviewTask extends HTMLElement{
    

    constructor(){
      super();
      this.attachShadow({mode: "open"});
      this.shadowRoot.appendChild(content.cloneNode(true));

      this.imageElement = shadow.querySelector('.book-preview__image');
      this.titleElement = shadow.querySelector('.book-preview__title');
      this.authorElement = shadow.querySelector('.book-preview__author');
    }
   

    // Method to set book data
    setBookData({ image, title, author }) {
      this.imageElement.src = image;
      this.titleElement.textContent = title;
      this.authorElement.textContent = author;
    }
  }


customElements.define('preview-task', PreviewTask);

export {PreviewTask};

