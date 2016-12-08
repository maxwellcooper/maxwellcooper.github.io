module.exports = function () {
$(document).ready(function(){

  var whiteArrowRight = '<img src="/assets/images/arrow_right_white.svg" />';
  var whiteArrowLeft = '<img src="/assets/images/arrow_left_white.svg" />';
  var blackArrowRight = '<img src="/assets/images/arrow_right_black.svg" />';
  var blackArrowLeft = '<img src="/assets/images/arrow_left_black.svg" />';

  var nextImg = blackArrowRight;
  var prevImg = blackArrowLeft;

  if ($('body').hasClass('theme-cr')) {
    nextImg = whiteArrowRight;
    prevImg = whiteArrowLeft;
  }

  $('.bxslider').bxSlider({
    nextText: nextImg,
    prevText: prevImg,
    infiniteLoop: false,
    hideControlOnEnd: true,
    captions: true,
    pager: false,
    onSliderLoad: function(currentIndex){
      var desc = $('.bxslider li').eq(currentIndex).data('desc');
      $('#desc').html(desc);

      $('.bxslide').each(function(index) {
        var i = index + 1;
        if (i === 1) {
          var html = '<div data-index="'+index+'" class="indexNo indexNo-active dib mr3 o-50">'+i+'</div>';
        } else {
          var html = '<div data-index="'+index+'" class="indexNo dib mr3 o-50">'+i+'</div>';
        }
        $('#index').append(html);
      });


    },
    onSlideNext: function(newIndex){
      var desc = $(newIndex).data('desc');
      $('#desc').html(desc);

      var $nextIndex = $('.indexNo-active').next();
      $('.indexNo-active').removeClass('indexNo-active');
      $nextIndex.addClass('indexNo-active');

    },
    onSlidePrev: function(newIndex){
      var desc = $(newIndex).data('desc');
      $('#desc').html(desc);
      var $prevIndex = $('.indexNo-active').prev();
      $('.indexNo-active').removeClass('indexNo-active');
      $prevIndex.addClass('indexNo-active');
    },
  });

  // $(document).keydown(function(e){
  //   if (e.keyCode == 37) {
  //     slider = $('.bxslider').bxSlider();
  //     slider.goToPrevSlide();
  //      return false;
  //   }
  //   if (e.keyCode == 39) {
  //     slider = $('.bxslider').bxSlider();
  //     slider.goToNextSlide();
  //     return false;
  //   }
  // });


  // $( 'body' ).on( 'click', '.indexNo', function(e){
  //   if ( !$(this).hasClass('indexNo-active') ) {
  //     var index = $(this).data('index');
  //     var slider = $('.bxslider').bxSlider();
  //     console.log(index)
  //     slider.goToSlide(index);
  //     // $('.indexNo-active').removeClass('indexNo-active');
  //     // $('.indexNo').eq(index).addClass('indexNo-active');
  //   }
  // });
});
}
