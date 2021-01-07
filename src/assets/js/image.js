
const image = document.getElementById("getFile")
const imagePreview = document.getElementById("preview");

if(image){
    image.onchange = function() {
        const imageList = image.files;
        const reader = new FileReader();
    
        console.log(reader)
        reader.readAsDataURL(imageList[0]);
        reader.onload = function() {
            imagePreview.src = reader.result;
        }
    }
}

