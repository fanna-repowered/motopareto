let hamburger = document.getElementById('hamburger');
let mobileNav = document.getElementById('mobileNav');

if (hamburger && mobileNav) {
    hamburger.addEventListener('click', function () {
        hamburger.classList.toggle('open');
        mobileNav.classList.toggle('open');
    });

    // Close drawer when a nav link is tapped
    mobileNav.querySelectorAll('a').forEach(function (a) {
        a.addEventListener('click', function () {
            hamburger.classList.remove('open');
            mobileNav.classList.remove('open');
        });
    });
}

// ── Scroll-based highlight for desktop nav links ──
let desktopLinks = document.querySelectorAll('#desktop-nav a');
let pageSections = document.querySelectorAll('section[id]');

if (desktopLinks.length && pageSections.length) {
    let io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
            if (e.isIntersecting) {
                desktopLinks.forEach(function (a) {
                    a.style.color = (a.getAttribute('href') === '#' + e.target.id)
                        ? 'var(--secondary)'
                        : '';
                });
            }
        });
    }, {rootMargin: '-40% 0px -55% 0px'});

    pageSections.forEach(function (s) {
        io.observe(s);
    });
}
