
const panels = document.querySelectorAll('div[id^=\'panel-header\']')
panels.forEach((panel) => {
  if (!panel) {
    return
  }
  const splitedId = panel.id.split('-')
  panel.addEventListener('click', () => {
    togglePanelContent(splitedId.length === 3 ? splitedId[2] : null)
  })
})

function togglePanelContent (panelId) {
  const content = document.querySelector('#panel-content' + (panelId ? '-' + panelId : ''))
  if(content){
    content.classList.toggle('show')
  }
  const title = document.querySelector('#panel-header' + (panelId ? '-' + panelId : ''))
  if(title){
    title.classList.toggle('active')
  }
}
