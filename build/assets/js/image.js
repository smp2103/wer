"use strict";

var image = document.getElementById("getFile");
var imagePreview = document.getElementById("preview");

if (image) {
  image.onchange = function () {
    var imageList = image.files;
    var reader = new FileReader();
    console.log(reader);
    reader.readAsDataURL(imageList[0]);

    reader.onload = function () {
      imagePreview.src = reader.result;
    };
  };
}