const files = []
let activeFileId = null

function createFile(name = 'main.py', language = 'python', content = "print('Hello, world!')") {
  const id = crypto.randomUUID()

  const file = {
    id,
    name,
    language,
    model: monaco.editor.createModel(content, language) // important: content here
  }

  files.push(file)
  activeFileId = id
  renderTabs(selectFile)
}

function selectFile(file) {
  activeFileId = file.id
  editor.setModel(file.model)
  renderTabs(selectFile)
}

function renderTabs(onSelect) {
  const tabs = document.getElementById('tabs')
  tabs.innerHTML = ''

  files.forEach(file => {
    const tab = document.createElement('div')
    tab.className = 'tab' + (file.id === activeFileId ? ' active' : '')
    tab.textContent = file.name

    tab.onclick = () => onSelect(file)
    tabs.appendChild(tab)
  })

  // "+" tab
  const add = document.createElement('div')
  add.className = 'tab'
  add.textContent = '+'
  add.onclick = () => {
    const name = prompt('File name', 'file.py')
    if (!name) return

    const ext = name.split('.').pop()
    const map = {
      py: 'python',
      js: 'javascript',
      html: 'html',
      json: 'json'
    }

    createFile(name, map[ext] || 'plaintext')
  }
  tabs.appendChild(add)
}

function initFiles() {
  // Ensure default file exists
  if (files.length === 0) createFile('main.py', 'python', "print('Hello, world!')")
}
