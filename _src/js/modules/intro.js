module.exports = function () {

  $(document).ready( function() {
    setTimeout(function(){
      $('#intro').fadeOut();
    }, 1500);
    setTimeout(function(){
      $('#details').fadeIn();
    }, 2500);


    $('body').on('click', '.readmore', function(e){
        e.preventDefault();
        $(this).parent().children('.content').fadeIn();
        $(this).fadeOut();
    });

    $('body').on('click', '.aboutmore', function(e){
        e.preventDefault();
        $('#about').fadeIn();
        $(this).fadeOut();
    });

  });


}
