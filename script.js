
let currentPage = 1;


const animeImage = document.getElementById('animeImage');
const animeName = document.getElementById('animeName');
const animeSource = document.getElementById('animeSource');
const errorDiv = document.getElementById('error');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const loading = document.getElementById('loading');

function showLoading() {
    loading.style.display = 'block';
}

function hideLoading() {
    loading.style.display = 'none';
}

// Function to show error message
function showError(message) {
    errorDiv.style.display = 'block';
    errorDiv.textContent = message;
}


function hideError() {
    errorDiv.style.display = 'none';
}

// Function to get image from API
function fetchImage() {
    // Show loading and hide error
    showLoading();
    hideError();
    
    // Make API call
    fetch('https://nekos.best/api/v2/wave')
        .then(function(response) {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(function(data) {
            // Get the image data
            const result = data.results[0];
            
            // Update the image and text
            animeImage.src = result.url;
            animeName.textContent = result.anime_name;
            animeSource.textContent = 'Source: ' + result.source_url;
            
            // Hide loading when image loads
            animeImage.onload = function() {
                hideLoading();
            };
        })
        .catch(function(error) {
            // Show error message if something goes wrong
            showError('Error loading image. Please try again.');
            hideLoading();
        });

    prevBtn.disabled = currentPage === 1;
}

// Function for next button
function nextImage() {
    currentPage++;
    fetchImage();
}

// Function for previous button
function previousImage() {
    if (currentPage > 1) {
        currentPage--;
        fetchImage();
    }
}


prevBtn.addEventListener('click', previousImage);
nextBtn.addEventListener('click', nextImage);

fetchImage();