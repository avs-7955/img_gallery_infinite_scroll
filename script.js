const image_container = document.getElementById('image-container')

// For getting random pics using Picsum API
const count = 10
let page = 0

let pic_array = []

// Helper function to set attributes
function setAttributes(element, attributes){
    for(const key in attributes){
        element.setAttribute(key,attributes[key])
    }
}

// Create elements for links and pics and add to DOM
function displayPhotos(){
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
        console.log(pic_array)
        displayPhotos()
    } catch(error){
        // Catch errors here
    }
}

// If scrolling near the bottom of page, load new images
window.addEventListener('scroll',() =>{
    if(window.scrollY + window.innerHeight >= document.body.offsetHeight - 1000){
        getPhotos()
    } 
})

//On load
getPhotos()