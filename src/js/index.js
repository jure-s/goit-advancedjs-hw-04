import axios from 'axios';
import iziToast from 'izitoast';
import "izitoast/dist/css/iziToast.min.css";
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

iziToast.settings({
  position: 'topRight',
  timeout: 3000,
  close: false,
});

const apiKey = '40910932-9fe08a71e8ac0f3a1299db850';
const searchForm = document.getElementById('search-form');
const gallery = document.querySelector('.gallery');
let page = 1;
let currentSearchQuery = '';
const lightbox = new SimpleLightbox('.gallery a');
let hoorayDisplayed = false;
let allImagesLoaded = false;
let noMoreImagesToastDisplayed = false;

searchForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  page = 1;
  gallery.innerHTML = '';
  const formData = new FormData(searchForm);
  const searchQuery = formData.get('searchQuery');
  currentSearchQuery = searchQuery.trim();
  
  hoorayDisplayed = false;
  allImagesLoaded = false;
  noMoreImagesToastDisplayed = false;

  if (currentSearchQuery !== '') {
    const data = await searchImages(currentSearchQuery);
    handleImageData(data);
  } else {
    iziToast.info({
      title: 'Info',
      message: 'Please enter a search query.',
    });
  }
});

async function searchImages(query) {
  const response = await axios.get('https://pixabay.com/api/', {
    params: {
      key: apiKey,
      q: query,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      page: page,
      per_page: 40,
    },
  });

  return response.data;
}

function handleImageData(data) {
  if (data.hits.length === 0) {
    iziToast.error({
      title: 'Error',
      message: 'Sorry, there are no images matching your search query. Please try again.',
    });
  } else {
    displayImages(data.hits);
    if (!hoorayDisplayed) {
      iziToast.success({
        title: 'Success',
        message: `Hooray! We found ${data.totalHits} images.`,
      });
      hoorayDisplayed = true;
    }
    lightbox.refresh();
    page++;
    if (data.hits.length < 40) {
      allImagesLoaded = true;
    }
  }
}

function displayImages(images) {
  let imagesHTML = '';

  images.forEach((image) => {
    const infoHTML = `
      <div class="info">
        <p class="info-item"><b>Likes:</b> ${image.likes}</p>
        <p class="info-item"><b>Views:</b> ${image.views}</p>
        <p class="info-item"><b>Comments:</b> ${image.comments}</p>
        <p class="info-item"><b>Downloads:</b> ${image.downloads}</p>
      </div>
    `;

    const cardLink = `
      <a href="${image.largeImageURL}" data-lightbox="gallery-images">
        <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy">
      </a>
    `;

    const card = `
      <div class="photo-card">
        ${cardLink}
        ${infoHTML}
      </div>
    `;

    imagesHTML += card;
  });

  gallery.insertAdjacentHTML('beforeend', imagesHTML);
}

function checkScroll() {
  const {
    scrollTop,
    clientHeight,
    scrollHeight
  } = document.documentElement;

  if (scrollTop + clientHeight >= scrollHeight - 5) {
    if (!allImagesLoaded && !noMoreImagesToastDisplayed) {
      searchImages(currentSearchQuery).then((data) => {
        handleImageData(data);
      });
    } else if (allImagesLoaded && !noMoreImagesToastDisplayed) {
      iziToast.info({
        title: 'Info',
        message: 'No more images to load.',
      });
      noMoreImagesToastDisplayed = true;
    }
  }
}

window.addEventListener('scroll', checkScroll);