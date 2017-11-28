
function GetQueryString(name){
     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
     var r = window.location.search.substr(1).match(reg);
     if(r!=null)return  unescape(r[2]); return null;
}
var jsonName = GetQueryString('name');

$.getJSON('json/one/'+jsonName+'.json',function(rst){
  var data = rst.data;
  var photoBase = 'http://photo.bujichong.com/';
  // window.console && console.log(data.length,page);
  var wW = Math.floor($(window).width()*0.99),wH = Math.floor($(window).height()*0.99),wWH = wW/wH;
  $(window).resize(function () {
    wW = Math.floor($(window).width()*0.99);
    wH = Math.floor($(window).height()*0.99);
    wWH = wW/wH;
  });

  $('header').html(template('headerInfo',rst));
  $('title').html(rst.title);
  var str = "";
  var dl = data.length;
  for(var i = 0; i < dl; i++) {
      var t = data[i];
      var photo = photoBase+t.name;
      var thumb = photo+'?imageView2/2/w/255/interlace/1/q/90';//缩微图

str += '<a class="box" href="'+photo+'" data-author="bujichong">'+
          '<img src="'+thumb+'" alt="" />'+
          //'<figure>This is dummy caption.</figure>'+
        '</a>';
  }
  $(str).appendTo($("#galleryBox"));
  var $iw_thumbs = $('#galleryBox');
  // $iw_thumbs.imagesLoaded(function(){
  //   $iw_thumbs.masonry({
  //     isAnimated  : true
  //   });
  // });

      $iw_thumbs.lightGallery({
        mode: 'lg-slide',
        // counter: false,
        share : false
        // download: false,
        // enableSwipe: false,
        // enableDrag: false
      });
});