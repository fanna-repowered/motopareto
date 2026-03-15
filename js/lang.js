// Language switcher — supports EN, IT, NL, DE, FY
// All page text uses [data-lang="xx"] spans; only the active lang's span is shown.

let navStrings = {
    'nav-rooms': {en: 'Rooms', it: 'Camere', nl: 'Kamers', de: 'Zimmer', fy: 'Keamers'},
    'nav-hosts': {en: 'Hosts', it: 'Ospiti', nl: 'Hosts', de: 'Gastgeber', fy: 'Gasthearen'},
    'nav-area': {en: 'Area', it: 'Area', nl: 'Omgeving', de: 'Umgebung', fy: 'Omjouwing'},
    'nav-social': {en: 'Social', it: 'Social', nl: 'Social', de: 'Social', fy: 'Social'},
    'nav-contact': {en: 'Contact', it: 'Contatto', nl: 'Contact', de: 'Kontakt', fy: 'Kontakt'}
};
let langLabels = {en: 'EN', it: 'IT', nl: 'NL', de: 'DE', fy: 'FY'};

/**
 * Persists the choice in localStorage.
 */
function setLang(lang) {
    // Show/hide all [data-lang] spans
    document.querySelectorAll('[data-lang]').forEach(function (el) {
        el.classList.toggle('active', el.dataset.lang === lang);
    });

    // Update plain-text nav links
    document.querySelectorAll('[data-key]').forEach(function (el) {
        let key = el.dataset.key;
        if (navStrings[key] && navStrings[key][lang]) {
            el.textContent = navStrings[key][lang];
        }
    });

    // Update dropdown button label
    let lc = document.getElementById('langCurrent');
    if (lc) lc.textContent = langLabels[lang] || lang.toUpperCase();

    // Mark active option in dropdown menu
    document.querySelectorAll('#langMenu button').forEach(function (btn) {
        btn.classList.toggle('active', btn.dataset.target === lang);
    });

    document.documentElement.lang = lang;
    try {
        localStorage.setItem('mp_lang', lang);
    } catch (e) {
    }
}

// ── Dropdown open/close ──
let langDropdown = document.getElementById('langDropdown');
let langButton = document.getElementById('langButton');

if (langButton) {
    langButton.addEventListener('click', function (e) {
        e.stopPropagation();
        langDropdown.classList.toggle('open');
    });
}

document.querySelectorAll('#langMenu button').forEach(function (btn) {
    btn.addEventListener('click', function () {
        setLang(btn.dataset.target);
        langDropdown.classList.remove('open');
    });
});

// Close dropdown when clicking anywhere else
document.addEventListener('click', function () {
    if (langDropdown) langDropdown.classList.remove('open');
});

// ── Init with saved or default language ──
(function () {
    let saved = 'en';
    try {
        saved = localStorage.getItem('mp_lang') || 'en';
    } catch (e) {
    }
    setLang(saved);
})();
