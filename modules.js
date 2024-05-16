const bookPreviewStyles = `
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
`;

const bookPreviewTemplate = `
  <div class="book-preview">
    <img class="book-preview__image" src="{image}" alt="{title}">
    <div class="book-preview__info">
      <h3 class="book-preview__title">{title}</h3>
      <div class="book-preview__author">{author}</div>
    </div>
  </div>
`;

const bookPreviewTemplate = `
  <div class="book-preview">
    <img class="book-preview__image" src="{image}" alt="{title}">
    <div class="book-preview__info">
      <h3 class="book-preview__title">{title}</h3>
      <div class="book-preview__author">{author}</div>
    </div>
  </div>
`;

const genreOptionTemplate = `
  <option value="{id}">{name}</option>
`;

const authorOptionTemplate = `
  <option value="{id}">{name}</option>
`;

