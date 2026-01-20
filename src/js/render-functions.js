import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const galleryEl = document.querySelector('.gallery');
const loaderEl = document.querySelector('.loader');

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

export function createGallery(images) {
  if (!images || images.length === 0 || !galleryEl) return;

  const markup = images
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags = 'Image',
        likes,
        views,
        comments,
        downloads,
      }) => `
      <li class="gallery-item">
        <a class="gallery-link" href="${largeImageURL}">
          <img
            class="gallery-image"
            src="${webformatURL}"
            alt="${tags.replace(/"/g, '&quot;')}" 
            loading="lazy"
          />
        </a>
        <div class="info">
          <p><b>Likes</b> ${likes}</p>
          <p><b>Views</b> ${views}</p>
          <p><b>Comments</b> ${comments}</p>
          <p><b>Downloads</b> ${downloads}</p>
        </div>
      </li>
    `
    )
    .join('');

  galleryEl.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();
}

export function clearGallery() {
  if (galleryEl) galleryEl.innerHTML = '';
}

export function showLoader() {
  if (loaderEl) loaderEl.classList.add('is-visible');
}

export function hideLoader() {
  if (loaderEl) loaderEl.classList.remove('is-visible');
}
