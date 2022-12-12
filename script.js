const image_container = document.getElementById('image-container')


//Picsum API
const count = 5
const api_url = `https://picsum.photos/v2/list?limit=${count}`

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
        const response = await fetch(api_url)
        pic_array = await response.json()
        console.log(pic_array)
        displayPhotos()
    } catch(error){
        // Catch errors here
    }
}

//On load
getPhotos()



















//Unsplash API

// const count = 5;
// const api_key = '';
// const api_url = 'https://api.unsplash.com/photos/random?client_id=${api_key}&count=${count}';