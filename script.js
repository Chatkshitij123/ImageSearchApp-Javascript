const accessKey = '54yez9W14ZhpSwXdDWLkFbd_sA0JBioECsaXuqC2y14';
const searchForm = document.querySelector('form');
const searchInput = document.querySelector('.search-input');
const imagesContainer = document.querySelector('.images-container');
const loadMoreBtn = document.querySelector('.loadMoreBtn');

let page = 1;
//function to fetch images using unsplash API
const fetchImages = async (query, pageNo) => {
    try {
        if(pageNo === 1){
            imagesContainer.innerHTML = '';
        }
        
      
        const url = `https://api.unsplash.com/search/photos/?query=${query}&per_page=28&page=${pageNo}&client_id=${accessKey}`;
        const response = await fetch(url);//it will return the promise and in next step we convert it into json format
        const data = await response.json();
    
          // Clear existing content in imagesContainer
          imagesContainer.innerHTML = '';
        // console.log(data);
        if (data.results.length > 0) {
    
            data.results.forEach(photo => {
                //creating image div
                const imageElement = document.createElement('div');
                imageElement.classList.add('imageDiv');
                imageElement.innerHTML = `<img src="${photo.urls.regular}"/>`;
                //creating overlay
                const overlayElement = document.createElement('div');
                overlayElement.classList.add('overlay');
                
                //creating overlay text
                const overlayText = document.createElement('h3');
                overlayText.innerText = `${photo.alt_description}`;
        
                overlayElement.appendChild(overlayText);
                imageElement.appendChild(overlayElement);
                
                imagesContainer.appendChild(imageElement);
            });
            //if we reach on end page
            if (data.total_pages === pageNo){
                loadMoreBtn.computedStyleMap.display = "none";
            }
            else{
                loadMoreBtn.computedStyleMap.display = "block"; 
            }
        }
        else {
            imagesContainer.innerHTML = `<h2>No Image Found.</h2>`;
        }
    } 
     catch (error) {
        imagesContainer.innerHTML = `<h2>Failed to fetch images. Please try gain later.</h2>`;
     }    
        
}

//Adding eventListener to search form

searchForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const inputText = searchInput.value.trim();
    if (inputText !== '') {
        page = 1;
        await fetchImages(inputText, page);
        searchInput.value = ''; // Clear the input field after submitting
    } else {
        imagesContainer.innerHTML = `<h2>Please enter a search query.</h2>`;
        if (loadMoreBtn.style === "block")
        loadMoreBtn.style.display = "none";
    }
    // console.log(searchInput.value);
});
// Adding click event listener to the search icon
const searchIcon = document.querySelector('.material-icons');
searchIcon.addEventListener('click', () => {
    searchForm.dispatchEvent(new Event('submit'));
});
//Adding eventListener to load more btn
loadMoreBtn.addEventListener('click', () => {
    fetchImages(searchInput.value.trim(), ++page);
})