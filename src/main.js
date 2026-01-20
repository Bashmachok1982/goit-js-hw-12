import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { getImagesByQuery } from './js/pixabay-api.js';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './js/render-functions.js';

let currentQuery = '';
let currentPage = 1;
let totalHits = 0;

const formEl = document.querySelector('.form');
const loadMoreBtn = document.querySelector('.load-more');

formEl.addEventListener('submit', event => {
  event.preventDefault();

  const query = event.target.elements.searchQuery.value.trim();

  if (!query) {
    iziToast.warning({
      message: 'Please enter a search query!',
      position: 'topRight',
      timeout: 3000,
    });
    return;
  }

  currentQuery = query;
  currentPage = 1;

  clearGallery();
  hideLoadMoreButton();
  showLoader();

  loadImages();
});

loadMoreBtn.addEventListener('click', () => {
  currentPage += 1;
  showLoader();
  loadImages(true);
});

async function loadImages(isAppend = false) {
  try {
    const data = await getImagesByQuery(currentQuery, currentPage);

    if (data.hits.length === 0) {
      if (currentPage === 1) {
        iziToast.error({
          message:
            'Sorry, there are no images matching your search query. Please try again!',
          position: 'topRight',
        });
      }
      hideLoadMoreButton();
      return;
    }

    if (!isAppend) {
      clearGallery();
    }

    createGallery(data.hits);
    totalHits = data.totalHits;

    if (currentPage * 15 < totalHits) {
      showLoadMoreButton();
    } else {
      hideLoadMoreButton();
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
        timeout: 5000,
      });
    }

    // Скролл вниз на добавленные карточки (поведение как у коллеги)
    if (isAppend) {
      const galleryItems = document.querySelectorAll('.gallery-item');
      if (galleryItems.length > 0) {
        const lastCard = galleryItems[galleryItems.length - 15];
        const { height: cardHeight } = lastCard.getBoundingClientRect();

        window.scrollBy({
          top: cardHeight * 2,
          behavior: 'smooth',
        });
      }
    }
  } catch (error) {
    iziToast.error({
      message: 'Something went wrong. Please try again later.',
      position: 'topRight',
      timeout: 5000,
    });
  } finally {
    hideLoader();
    formEl.reset();
  }
}
