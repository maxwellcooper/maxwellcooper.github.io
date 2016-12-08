module.exports = function () {

  $(document).ready( function() {
    $('.fHorz').each(function() {
      var width = $(this).height() + 6;
      $(this).css('top', width + 'px');
    });
  });

}
