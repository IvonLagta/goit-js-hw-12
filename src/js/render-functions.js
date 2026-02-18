import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const gallery = document.querySelector('.gallery');
const loader = document.querySelector(".loader");
const loadMoreBtn = document.querySelector('.load-more');
const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

export function createGallery(images) {
  const markup = images
    .map(
      image => `
      <li class="gallery-item">
        <a href="${image.largeImageURL}">
          <img src="${image.webformatURL}" alt="${image.tags}" />
        </a>
        <div class="info">
          <p><b>Likes</b>${image.likes}</p>
          <p><b>Views</b>${image.views}</p>
          <p><b>Comments</b>${image.comments}</p>
          <p><b>Downloads</b>${image.downloads}</p>
        </div>
      </li>
    `
    )
    .join('');

  gallery.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();
}

export function clearGallery() {
  gallery.innerHTML = '';
}

export function showLoader() {
  loader.classList.add("is-visible");
}

export function hideLoader() {
  loader.classList.remove("is-visible");
}
if (gallery.firstElementChild) {
  smoothScrollGallery();
}
export function smoothScrollGallery() {
  const { height: cardHeight } = gallery.firstElementChild.getBoundingClientRect();
  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}

export function showLoadMore() {
  loadMoreBtn.classList.remove('hidden');
}

export function hideLoadMore() {
  loadMoreBtn.classList.add('hidden');
}

