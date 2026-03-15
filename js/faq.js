// Only one item open at a time
document.querySelectorAll('.faq-q').forEach(function (q) {
    q.addEventListener('click', function () {
        let item = q.closest('.faq-item');
        let wasOpen = item.classList.contains('open');

        // Close all
        document.querySelectorAll('.faq-item').forEach(function (i) {
            i.classList.remove('open');
        });

        // Open this one agan if it was closed
        if (!wasOpen) item.classList.add('open');
    });
});
