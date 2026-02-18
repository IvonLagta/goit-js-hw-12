import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { getImagesByQuery } from './js/pixabay-api.js';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMore,
  hideLoadMore,
  smoothScrollGallery,
} from './js/render-functions.js';

const form = document.querySelector('.form');
const loadMoreBtn = document.querySelector('.load-more');

let currentQuery = '';
let currentPage = 1;
let totalHits = 0;

form.addEventListener('submit', async event => {
  event.preventDefault();

  const query = event.currentTarget.elements['search-text'].value.trim();

  if (!query) {
    iziToast.warning({
      message: 'Please enter a search query!',
      position: 'bottomCenter',
    });
    return;
  }

  currentQuery = query;
  currentPage = 1;

  clearGallery();
  hideLoadMore();
  showLoader();

  try {
    const data = await getImagesByQuery(currentQuery, currentPage);
    totalHits = data.totalHits;

    if (data.hits.length === 0) {
      iziToast.info({
        message: "We're sorry, we couldn't find any images.",
        position: 'bottomCenter',
      });
      return;
    }

    createGallery(data.hits);

    if (totalHits > 15) {
      showLoadMore();
    } else {
      iziToast.info({
        message: "You've reached the end of search results.",
        position: 'bottomCenter',
      });
    }
  } catch (error) {
    iziToast.error({
      message: 'Error fetching images.',
      position: 'bottomCenter',
    });
  } finally {
    hideLoader();
  }
});

loadMoreBtn.addEventListener('click', async () => {
  currentPage += 1;

  showLoader();
  hideLoadMore();

  try {
    const data = await getImagesByQuery(currentQuery, currentPage);
    createGallery(data.hits);

    smoothScrollGallery();

    const totalLoaded = currentPage * 15;

    if (totalLoaded >= totalHits) {
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'bottomCenter',
      });
      hideLoadMore();
    } else {
      showLoadMore();
    }
  } catch (error) {
    iziToast.error({
      message: 'Error loading more images.',
      position: 'bottomCenter',
    });
  } finally {
    hideLoader();
  }
});
