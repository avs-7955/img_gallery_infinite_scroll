const image_container = document.getElementById('image-container')
const loader = document.getElementById('loader')

// For getting random pics using Picsum API
let count = 5; // Low count for initial load
let page = 0
let ready = false;
let loaded = 0;
let total_img = 0;

let pic_array = []

// Check if all the images are loaded
function imgLoaded(){
    loaded++;
    if(loaded === total_img){
        ready = true
        loader.hidden=true
        count = 30 //Increasing count after initial load
    }
}

// Helper function to set attributes
function setAttributes(element, attributes){
    for(const key in attributes){
        element.setAttribute(key,attributes[key])
    }
}

// Create elements for links and pics and add to DOM
function displayPhotos(){
    loaded = 0
    total_img = pic_array.length

    pic_array.forEach((photo) =>{
        // Creating <a> to link to the Unsplash website
        const item = document.createElement('a')
        setAttributes(item,{
            href:photo.url,
            target:'_blank',
        })
        
        // Create <img> for photo
        const img = document.createElement('img')
        setAttributes(img,{
            src:photo.download_url,
            title:`Credits: ${photo.author}`
        })

        // Event listener to check if all the images have loaded.
        img.addEventListener('load',imgLoaded)
        
        // Put <img> inside <a>, then put <a> inside Image Container.
        item.appendChild(img)
        image_container.appendChild(item)
    })
}


// Get photos from Picsum API
async function getPhotos(){
    try{
        page = Math.floor(Math.random(0,1)*34)
        const api_url = `https://picsum.photos/v2/list?page=${page}&limit=${count}`
        const response = await fetch(api_url)
        pic_array = await response.json()
        displayPhotos()
    } catch(error){
        // Catch errors here
    }
}

// If scrolling near the bottom of page, load new images
window.addEventListener('scroll',() =>{
    if(window.scrollY + window.innerHeight >= document.body.offsetHeight - 1000 && ready){
        ready = false
        getPhotos()
    } 
})

//On load
getPhotos()