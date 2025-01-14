async function getNewPhoto() {

  const url = "https://api.thecatapi.com/v1/images/search";

  var image = document.createElement("img");

  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((data) => {

      console.log(data);
      var pictureData = data.at(0);

      image.src = pictureData.url;
      image.alt = pictureData.id;
      image.width = pictureData.width;
      image.height = pictureData.height;
      image.id = "current-image";

      //scales down images until they are within the acceptable range
      while (image.width > 1920 * 0.5 || image.height > 1080 * 0.5) {
        console.log("scaled image down");
        image.width = image.width * 0.8;
        image.height = image.height * 0.8;
      }
    })
    .catch((error) => console.log(error));

  console.log(image.id);

  document.getElementById("current-image")?.replaceWith(image);
}

function addToFavorites() {
  const node = document.getElementById("current-image");
  const image = node?.cloneNode(true);
  var favoriteImages = [];

  for (let i = 0; i < localStorage.length; i++) {
    favoriteImages.push(JSON.parse(localStorage.getItem("Picture" + i)));
  }
  
  var lastSrc = "";
  
  const imageObj = {
    src: image.src,
    alt: image.alt,
    width: image.width,
    height: image.height,
  };

  sourcesList = [];
  favoriteImages.forEach(imageObj => sourcesList.push(imageObj.src));

  favoriteImages.push(imageObj);
  console.log(favoriteImages);

  favoriteImages.forEach(function(imageObj, index){
    if(!sourcesList.includes(imageObj.src)){
      localStorage.setItem("Picture" + index, JSON.stringify(imageObj));
    } else {
      return;
    }
  });

}

function loadFavorites() {

  for (let i = 0; i < localStorage.length; i++) {

    var data = JSON.parse(localStorage.getItem("Picture" + i));
    console.log(data);
    var favoriteImage = document.createElement("img");

    favoriteImage.src = data.src;
    favoriteImage.alt = data.alt;
    favoriteImage.width = data.width;
    favoriteImage.height = data.height;
    favoriteImage.id = "favorite-image";

    document.getElementById("image-list-holder").appendChild(favoriteImage);
  }
}

function clearFavorites(){
  let length = localStorage.length;

  for(let i = 0; i < length; i++){
    localStorage.removeItem("Picture" + i);
  }

  location.reload()

}
