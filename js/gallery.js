document.querySelectorAll('.room-gallery').forEach(function (gallery) {
    let images = Array.from(gallery.querySelectorAll('.gallery-main > img'));
    let thumbs = Array.from(gallery.querySelectorAll('.gallery-thumb'));
    let counter = gallery.querySelector('.gallery-counter');
    let strip = gallery.querySelector('.gallery-filmstrip-inner');
    let buttonLeft = gallery.querySelector('.filmstrip-btn.left');
    let buttonRight = gallery.querySelector('.filmstrip-btn.right');
    let arrowP = gallery.querySelector('.gallery-arrow.prev');
    let arrowN = gallery.querySelector('.gallery-arrow.next');
    let totalImages = images.length;
    let current = 0;
    let offset = 0;
    const visible = 4; // thumbnails visible at once

    function thumbWidth() {
        return thumbs[0] ? thumbs[0].offsetWidth + 4 : 0;
    }

    function updateStripButtons() {
        if (!strip) return;
        let max = Math.max(0, totalImages - visible);
        if (buttonLeft) buttonLeft.classList.toggle('visible', offset > 0);
        if (buttonRight) buttonRight.classList.toggle('visible', offset < max);
    }

    function scrollStripTo(idx) {
        if (!strip) return;
        let max = Math.max(0, totalImages - visible);
        if (idx >= offset + visible) offset = Math.min(idx - visible + 1, max);
        if (idx < offset) offset = idx;
        strip.style.transform = 'translateX(-' + (offset * thumbWidth()) + 'px)';
        updateStripButtons();
    }

    function goTo(idx) {
        images[current].classList.remove('active');
        thumbs[current].classList.remove('active');
        current = (idx + totalImages) % totalImages;
        images[current].classList.add('active');
        thumbs[current].classList.add('active');
        if (counter) counter.textContent = (current + 1) + ' / ' + totalImages;
        scrollStripTo(current);
    }

    // Thumb clicks
    thumbs.forEach(function (th, idx) {
        th.addEventListener('click', function () {
            goTo(idx);
        });
    });

    // Arrow buttons
    if (arrowP) arrowP.addEventListener('click', function () {
        goTo(current - 1);
    });
    if (arrowN) arrowN.addEventListener('click', function () {
        goTo(current + 1);
    });

    // Filmstrip scroll buttons
    if (buttonLeft) buttonLeft.addEventListener('click', function () {
        offset = Math.max(0, offset - 1);
        strip.style.transform = 'translateX(-' + (offset * thumbWidth()) + 'px)';
        updateStripButtons();
    });
    if (buttonRight) buttonRight.addEventListener('click', function () {
        let max = Math.max(0, totalImages - visible);
        offset = Math.min(offset + 1, max);
        strip.style.transform = 'translateX(-' + (offset * thumbWidth()) + 'px)';
        updateStripButtons();
    });

    // Filmstrip pointer drag
    if (strip) {
        let startX = 0, dragging = false;
        strip.parentElement.addEventListener('pointerdown', function (e) {
            startX = e.clientX;
            dragging = true;
        });
        strip.parentElement.addEventListener('pointermove', function (e) {
            if (!dragging) return;
            let diff = startX - e.clientX;
            if (Math.abs(diff) > 30) {
                let max = Math.max(0, totalImages - visible);
                offset = Math.max(0, Math.min(offset + (diff > 0 ? 1 : -1), max));
                strip.style.transform = 'translateX(-' + (offset * thumbWidth()) + 'px)';
                updateStripButtons();
                startX = e.clientX;
                dragging = false;
            }
        });
        strip.parentElement.addEventListener('pointerup', function () {
            dragging = false;
        });
    }

    // Touch swipe on main image
    let mainEl = gallery.querySelector('.gallery-main');
    let touchX = 0;
    mainEl.addEventListener('touchstart', function (e) {
        touchX = e.touches[0].clientX;
    }, {passive: true});
    mainEl.addEventListener('touchend', function (e) {
        let diff = touchX - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 40) goTo(diff > 0 ? current + 1 : current - 1);
    }, {passive: true});

    // Init
    updateStripButtons();
    if (counter) counter.textContent = '1 / ' + totalImages;
});
