(function () {
    const u = 'motopareto';
    const d = 'gmail.com';
    const addr = u + '@' + d;
    const href = 'mailto:' + addr;
    document.querySelectorAll('.js-email').forEach(function (el) {
        if (el.tagName === 'A') {
            el.href = href;
            el.textContent = addr;
        } else {
            el.textContent = addr;
        }
    });
})();
