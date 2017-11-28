$.getJSON('json/abs.json',function(rst){
  var data = rst;
  window.console && console.log(data);
  $(".galleryAbs").append(template('absList',data));

$('.video-gallery').lightGallery({
    videojs: true,
    share : false,
    download: false,
    zoom : false,
    actualSize : false
});

});