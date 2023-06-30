
var coin = document.getElementById('profile-pic');

    coin.addEventListener('click', function() {
      gsap.to(coin, {
        rotationY: "+=720",
        duration: 3,
        ease: "power1.out"
      });
    });

let icons = document.querySelectorAll('.skill-icon');

icons.forEach(icon => {
  icon.addEventListener('mouseenter', function(){
    gsap.to(icon, {scale: 1.25, duration: 0.5});
  });

  icon.addEventListener('mouseleave', function(){
    gsap.to(icon, {scale: 1, duration: 0.5});
  });
});