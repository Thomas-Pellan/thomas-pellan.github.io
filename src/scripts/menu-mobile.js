
const icons = document.querySelectorAll('.m-header-icon')

icons.forEach((icon) => {
    if(!icon){
        return
    }
    icon.addEventListener('click', () => {
        toggleMobileMenu()
    });
})

document.querySelector('.m-header-mobile-overlay').addEventListener('click', () => {
    toggleMobileMenu()
});

function toggleMobileMenu (){
    document.querySelectorAll('.m-header-icon').forEach((item) => {
        item.classList.toggle('hidden')
    })
    document.querySelector('.m-header-menu').classList.toggle('show')
    document.querySelector('.m-header-mobile-overlay').classList.toggle('hidden')
}

