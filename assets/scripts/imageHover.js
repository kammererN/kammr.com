
window.addEventListener('DOMContentLoaded', (event) => {
    const profilePic = document.getElementById('profile-pic');

    // Initial scale
    gsap.set(profilePic, { scale: 1 });

    profilePic.addEventListener('mouseover', function() {
        gsap.to(profilePic, { scale: 1.2, duration: 1, ease: "power2.out" });
    });

    profilePic.addEventListener('mouseout', function() {
        gsap.to(profilePic, { scale: 1, duration: 1, ease: "power2.out" });
    });
});

