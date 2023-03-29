const submenus = document.querySelectorAll('li.m-submenu')

function toggleContent (content, arrow) {
  content.classList.toggle('m-submenu-content-hidden')
  arrow.classList.toggle('m-submenu-arrow-active')
  setTimeout(() => {
    if (!content.classList.contains('m-submenu-content-hidden')) {
      content.classList.toggle('m-submenu-content-hidden')
      arrow.classList.toggle('m-submenu-arrow-active')
    }
  }, 10000)
}

submenus.forEach((submenu) => {
  if (!submenu) {
    return
  }
  const action = submenu.querySelector('.m-submenu-action')
  const link = submenu.querySelector('.m-submenu-link')
  const content = submenu.querySelector('.m-submenu-content')
  const arrow = submenu.querySelector('.m-submenu-arrow')
  if (!content || !arrow || !action) {
    return
  }
  content.addEventListener('mouseleave', () => {
    toggleContent(content, arrow)
  })
  const actions = ['mouseover']
  if (!link) {
    actions.push('click')
  }
  actions.forEach(function (e) {
    action.addEventListener(e, () => {
      toggleContent(content, arrow)
    })
  })
})
