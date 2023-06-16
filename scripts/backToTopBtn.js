function backToTop() {
    $(document).ready(function () {
        $(window).scroll(function () {
            // Get the position of the About section
            var homePos = $('#home').offset().top;
            // Check if we have scrolled past the About section
            if ($(window).scrollTop() >= homePos) {
                // If yes, show the button
                $('#backToTopBtn').removeClass('d-none');
            } else {
                // If not, hide the button
                $('#backToTopBtn').addClass('d-none');
            }
        });

        // Smooth scroll to top when button is clicked
        $('#backToTopBtn').click(function (e) {
            e.preventDefault();
            $('html, body').animate({scrollTop: 0}, '300');
        });
    });
}
backToTop()