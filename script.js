const image_container = document.getElementById('image-container')


//Picsum API
const count = 5
const api_url = `https://picsum.photos/v2/list?limit=${count}`

let pic_array = []









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