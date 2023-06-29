$(document).ready(function() {
    let windowHeight = $(window).height();
    let documentHeight = $(document).height();

    $(window).scroll(function () {
      if ($(window).scrollTop() > 300) {
        $('#backToTopBtn').addClass("show");
      } else {
        $('#backToTopBtn').removeClass("show");
      }
    });

    $('#backToTopBtn').click(function(e) {
        e.preventDefault();
        $('html, body').animate({scrollTop: 0}, "300");
    });
});
