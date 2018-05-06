module.exports = function () {
  // $(window).on('load',function(){

  $(document).ready(function() {

    var sliders = $('.bxslider').map(function() {
      return $(this).bxSlider();
    });

    sliders.each(function() {
      this.reloadSlider();
    });


    $('body').on('click', '.readmore', function(e){
        e.preventDefault();

        var index = $(this).parents('.project').data('index');
        var i = index - 1;
        console.log('index',i);
        sliders[i].reloadSlider();

        $(this).parents('.project').addClass('project-active');
        $(this).parent().children('.content').fadeIn();
        $(this).fadeOut();

        var index = $(this).parents('.project').data('index');
        var i = index - 1;
        console.log('index',i);
        sliders[i].reloadSlider();
    });

  });


}
