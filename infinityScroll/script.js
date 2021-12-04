console.log("testing.");
const loader = document.getElementById("loader");
const imageContainer = document.getElementById("image-container");


let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photoArray = [];

const apikey = "ibkN_yhIQnQ-jSu7GifUjlp0mz-eG6VXcnFZVhgNL3Q";
const count = 5;

const apiURL = `https://api.unsplash.com/photos/random/?client_id=${apikey}&count=${count}`;


//check if all images were loaded
function imageLoaded(){
    
    imagesLoaded++;
    if(imagesLoaded === totalImages){
        ready = true
        loader.hidden = true;
        count = 30
    }
}


//create elements for links & photos, add to DOM
function displayPhotos(){
    imagesLoaded = 0;
    totalImages = photoArray.length;
    photoArray.forEach((photo) => {
        //create <a> to link to unslpash
        const item = document.createElement('a');
        item.setAttribute('href', photo.links.html);
        item.setAttribute('target', '_blank');
        
        // create <img> for photo
        const img = document.createElement('img');
        img.setAttribute('src', photo.urls.regular);
        img.setAttribute('alt', photo.alt_description || photo.description);
        img.setAttribute('title', photo.alt_description || photo.description);


        //check img is finished loading.
        img.addEventListener('load', imageLoaded);

        // put the image inside the <a> then put both inside imageConatiner.
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

//get photos from UnSplash API

async function getPhotos(){
    try{
        const response = await fetch(apiURL);
        photoArray = await response.json();
        // console.log(photoArray);
        displayPhotos();
    }catch(error){
        //catch error here
    }
}




//check to see if scrolling near bottom of page, load more photos
window.addEventListener('scroll', () =>{
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready){
        getPhotos();
    }
});

//on load
getPhotos(); 
