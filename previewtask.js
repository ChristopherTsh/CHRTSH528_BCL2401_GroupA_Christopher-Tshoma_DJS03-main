class BookPreviewList extends HTMLElement {
    
  constructor() {
      super();
      // Create shadow DOM and attach the CSS
      this.attachShadow({ mode: 'open' });
      const style = document.createElement('style');
      style.textContent = `
          .preview {
              border-width: 0;
              width: 100%;
              font-family: Roboto, sans-serif;
              padding: 0.5rem 1rem;
              display: flex;
              align-items: center;
              cursor: pointer;
              text-align: left;
              border-radius: 8px;
              border: 1px solid rgba(var(--color-dark), 0.15);
              background: rgba(var(--color-light), 1);
          }

          .preview__image {
              width: 48px;
              height: 70px;
              object-fit: cover;
              background: grey;
              border-radius: 2px;
              box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2),
                  0px 1px 1px 0px rgba(0, 0, 0, 0.1), 0px 1px 3px 0px rgba(0, 0, 0, 0.1);
          }

          .preview__info {
              padding: 1rem;
          }

          .preview__title {
              margin: 0 0 0.5rem;
              font-weight: bold;
              display: -webkit-box;
              -webkit-line-clamp: 2;
              -webkit-box-orient: vertical;  
              overflow: hidden;
              color: rgba(var(--color-dark), 0.8);
          }

          .preview__author {
              color: rgba(var(--color-dark), 0.4);
          }
      `;
      this.shadowRoot.appendChild(style);
  }

  connectedCallback() {
      //Extract data from matches array
      const matches = JSON.parse(this.getAttribute('data-matches'));
      const authors = JSON.parse(this.getAttribute('data-authors'));
      const BOOKS_PER_PAGE = parseInt(this.getAttribute('data-books-per-page')) || 10;

      // Select the target element and clear its content
      const targetElement = document.querySelector('[data-list-items]');
      targetElement.innerHTML = '';

      // Create a document fragment for efficient DOM manipulation
      const newItems = document.createDocumentFragment();

      // Slice the matches array to get books for the current page
      const booksForPage = matches.slice(0, BOOKS_PER_PAGE);

      // Iterate over each book and create a book preview element
      booksForPage.forEach(({ author, id, image, title }) => {
          const previewElement = document.createElement('button');
          previewElement.classList.add('preview');
          previewElement.setAttribute('data-preview', id);

          // Generate book preview HTML content
          previewElement.innerHTML = `
              <img class="preview__image" src="${image}" />
              <div class="preview__info">
                  <h3 class="preview__title">${title}</h3>
                  <div class="preview__author">${authors[author]}</div>
              </div>
          `;

          newItems.appendChild(previewElement);
      });

      // Append the new items to the target element
      targetElement.appendChild(newItems);
  }
}

// Define the custom element
customElements.define('book-preview-list', BookPreviewList);