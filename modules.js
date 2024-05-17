// const bookPreviewStyles = `
//   .book-preview {
//     display: flex;
//     align-items: center;
//     padding: 10px;
//     border: 1px solid #ddd;
//     margin-bottom: 10px;
//   }
//   .book-preview__image {
//     width: 50px;
//     height: 50px;
//     margin-right: 10px;
//   }
//   .book-preview__info {
//     display: flex;
//     flex-direction: column;
//   }
//   .book-preview__title {
//     font-size: 16px;
//     font-weight: bold;
//   }
//   .book-preview__author {
//     font-size: 14px;
//     color: #555;
//   }
// `;

// const styles = `
//   .book-preview {
//     display: flex;
//     align-items: center;
//     padding: 10px;
//     border: 1px solid #ddd;
//     margin-bottom: 10px;
//   }
//   .book-preview__image {
//     width: 50px;
//     height: 50px;
//     margin-right: 10px;
//   }
//   .book-preview__info {
//     display: flex;
//     flex-direction: column;
//   }
//   .book-preview__title {
//     font-size: 16px;
//     font-weight: bold;
//   }
//   .book-preview__author {
//     font-size: 14px;
//     color: #555;
//   }
//   .preview {
//     cursor: pointer;
//   }
//   .list__message_show {
//     display: block;
//   }
// `;

// const bookPreviewTemplate = `
//   <div class="book-preview">
//     <img class="book-preview__image" src="{image}" alt="{title}">
//     <div class="book-preview__info">
//       <h3 class="book-preview__title">{title}</h3>
//       <div class="book-preview__author">{author}</div>
//     </div>
//   </div>
// `;

// const bookPreviewTemplate = `
//   <div class="book-preview">
//     <img class="book-preview__image" src="{image}" alt="{title}">
//     <div class="book-preview__info">
//       <h3 class="book-preview__title">{title}</h3>
//       <div class="book-preview__author">{author}</div>
//     </div>
//   </div>
// `;

// const genreOptionTemplate = `
//   <option value="{id}">{name}</option>
// `;

// const authorOptionTemplate = `
//   <option value="{id}">{name}</option>
// `;

// function StylesFo(styles) {
//   const styleSheet = document.createElement("style");
//   styleSheet.type = "text/css";
//   styleSheet.innerText = styles;
//   document.head.appendChild(styleSheet);
// }

// function createBook(bookPreviews) {
//   // Extracting  information from book data
//   const { id, image, title, author } = bookPreviews;
//  // Creating a button element 
//   const element = document.createElement("button");
//   element.classList = "preview";
//   element.setAttribute("data-preview", id);
//  // Inner HTML with book information
//   element.innerHTML = `
//         <img
//             class="preview__image"
//             src="${image}"
//         />
        
//         <div class="preview__info">
//             <h3 class="preview__title">${title}</h3>
//             <div class="preview__author">${author}</div>
//         </div>
//     `;

//   return element;
// }

// function listButtonClickListener() {
//   addEventListener("[data-list-button]", "click", () => {
//     const fragment = document.createDocumentFragment();

//     for (const { author, id, image, title } of matches.slice(
//       page * BOOKS_PER_PAGE,
//       (page + 1) * BOOKS_PER_PAGE
//     )) {
//       const element = document.createElement("button");
//       element.classList = "preview";
//       element.setAttribute("data-preview", id);

//       element.innerHTML = `
//             <img
//                 class="preview__image"
//                 src="${image}"
//             />
            
//             <div class="preview__info">
//                 <h3 class="preview__title">${title}</h3>
//                 <div class="preview__author">${authors[author]}</div>
//             </div>
//         `;

//       fragment.appendChild(element);
//     }

//     document.querySelector("[data-list-items]").appendChild(fragment);
//     page += 1;
//     remaining(books, page, BOOKS_PER_PAGE);
//   });
// }

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
`;

const styles = `
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
  .preview {
    cursor: pointer;
  }
  .list__message_show {
    display: block;
  }
;

</style>
            <img
                class="preview__image"
                src="${image}"
            />
            
            <div class="preview__info">
                <h3 class="preview__title">${title}</h3>
                <div class="preview__author">${authors[author]}</div>
            </div>
        `
customElements.define(
  "preview-task",

  class extends HTMLElement{
    inner = this.attachShadow({mode: "closed"});

    constructor(){
      super();
      const { content} = htmlComponent
      this.inner.appendChild(content.cloneNode(true));
      
      this.imageElement = shadow.querySelector('.book-preview__image');
      this.titleElement = shadow.querySelector('.book-preview__title');
      this.authorElement = shadow.querySelector('.book-preview__author');
    }
  })   

  customElements.define('preview-task', PreviewTask)