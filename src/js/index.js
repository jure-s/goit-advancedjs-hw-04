import axios from 'axios';
import iziToast from 'izitoast';
import "izitoast/dist/css/iziToast.min.css";
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

iziToast.settings({
  position: 'topRight',
});

const apiKey = '40910932-9fe08a71e8ac0f3a1299db850';
const searchForm = document.getElementById('search-form');
const gallery = document.querySelector('.gallery');
let page = 1;
let currentSearchQuery = '';
const lightbox = new SimpleLightbox('.gallery a');
let hoorayDisplayed = false; // Флаг для відстеження виведення повідомлення "Hooray"

searchForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  page = 1;
  gallery.innerHTML = '';
  const formData = new FormData(searchForm);
  const searchQuery = formData.get('searchQuery');
  currentSearchQuery = searchQuery.trim();
  await searchImages(currentSearchQuery);
});

async function searchImages(query) {
  try {
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

    if (response.status === 200) {
      const responseData = response.data;
      if (
        responseData &&
        responseData.hits &&
        Array.isArray(responseData.hits) &&
        responseData.totalHits !== undefined
      ) {
        const images = responseData.hits;
        const totalHits = responseData.totalHits;

        if (images.length === 0) {
          iziToast.error({
            title: 'Error',
            message: 'Sorry, there are no images matching your search query. Please try again.',
          });
        } else {
          displayImages(images);
          if (!hoorayDisplayed) {
            iziToast.success({
              title: 'Success',
              message: `Hooray! We found ${totalHits} images.`,
            });
            hoorayDisplayed = true;
          }
          lightbox.refresh();
          page++;
        }
      } else {
        iziToast.error({
          title: 'Error',
          message: 'Response format is incorrect. Please try again.',
        });
      }
    } else {
      iziToast.error({
        title: 'Error',
        message: 'Failed to fetch images. Please try again.',
      });
    }
  } catch (error) {
    console.error('Error fetching images:', error);
    iziToast.error({
      title: 'Error',
      message: 'Failed to fetch images. Please try again.',
    });
  }
}

function displayImages(images) {
  images.forEach((image) => {
    const cardLink = document.createElement('a');
    cardLink.href = image.largeImageURL;
    cardLink.setAttribute('data-lightbox', 'gallery-images');

    const card = document.createElement('div');
    card.classList.add('photo-card');

    const img = document.createElement('img');
    img.src = image.webformatURL;
    img.alt = image.tags;
    img.loading = 'lazy';
    cardLink.appendChild(img);
    card.appendChild(cardLink);

    const info = document.createElement('div');
    info.classList.add('info');

    const likes = document.createElement('p');
    likes.classList.add('info-item');
    likes.innerHTML = `<b>Likes:</b> ${image.likes}`;
    info.appendChild(likes);

    const views = document.createElement('p');
    views.classList.add('info-item');
    views.innerHTML = `<b>Views:</b> ${image.views}`;
    info.appendChild(views);

    const comments = document.createElement('p');
    comments.classList.add('info-item');
    comments.innerHTML = `<b>Comments:</b> ${image.comments}`;
    info.appendChild(comments);

    const downloads = document.createElement('p');
    downloads.classList.add('info-item');
    downloads.innerHTML = `<b>Downloads:</b> ${image.downloads}`;
    info.appendChild(downloads);

    card.appendChild(info);
    gallery.appendChild(card);
  });
}

function checkScroll() {
  const {
    scrollTop,
    clientHeight,
    scrollHeight
  } = document.documentElement;

  if (scrollTop + clientHeight >= scrollHeight - 5) {
    searchImages(currentSearchQuery);
  }
}

window.addEventListener('scroll', checkScroll);