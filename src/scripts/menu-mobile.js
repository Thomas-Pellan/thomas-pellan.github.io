
document.querySelector('.m-header-menu-mobile-cross').classList.toggle('hidden');
document.querySelector('.m-header-menu-mobile-burger').addEventListener('click', () => {
    document.querySelector('.nav-links').classList.toggle('expanded');
    toggleIcons()
});

document.querySelector('.m-header-menu-mobile-cross').addEventListener('click', () => {
    document.querySelector('.nav-links').classList.toggle('expanded');
    toggleIcons()
});

function toggleIcons() {
    document.querySelector('.m-header-menu-mobile-burger').classList.toggle('hidden');
    document.querySelector('.m-header-menu-mobile-cross').classList.toggle('hidden');
}