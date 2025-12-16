const files = []
let activeFileId = null

// Starter templates for each language
const starters = {
  py: `print("Hello World")`,
  js: `console.log("Hello World");`,
  html: `<!DOCTYPE html>
<html>
  <head>
    <title>Hello World</title>
    <link rel="stylesheet" href="style.css">
  </head>
  <body>
    <h1>Hello World</h1>
  </body>
</html>`,
  css: `body {
  background-color: #f0f0f0;
  font-family: Arial, sans-serif;
}`,
  json: `{
  "message": "Hello World"
}`
}

// Function to create a new file
function createFile(name, language, content = '') {
  const id = crypto.randomUUID()

  const file = {
    id,
    name,
    language,
    model: monaco.editor.createModel(content, language)
  }

  files.push(file)
  activeFileId = id
  renderTabs(selectFile)
}

// Function to select a file
function selectFile(file) {
  activeFileId = file.id
  editor.setModel(file.model)
  renderTabs(selectFile)
}

// Render tabs
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

  // "+" tab for new files
  const add = document.createElement('div')
  add.className = 'tab'
  add.textContent = '+'
  add.onclick = () => {
    const name = prompt('File name', 'file.py')
    if (!name) return

    const ext = name.split('.').pop().toLowerCase()
    const map = {
      py: 'python',
      js: 'javascript',
      html: 'html',
      css: 'css',
      json: 'json'
    }
    createFile(name, map[ext] || 'plaintext', starters[ext] || '')
  }

  tabs.appendChild(add)
}

// Initialize files on first load
function initFiles() {
  // Help text file
  createFile('HELP.txt', 'plaintext', 
`Welcome to the Learn IDE!

- Click the '+' tab to create a new file.
- Each file type has a starter template:
  - Python: print("Hello World")
  - JavaScript: console.log("Hello World")
  - HTML: basic HTML page
  - CSS: basic styling
  - JSON: basic object

- Click "Run" to execute code in Python or JavaScript.
- HTML and CSS can be previewed together in the output.
Enjoy learning!`)

  // Starter Python file
  createFile('main.py', 'python', starters.py)

  // Starter JavaScript file
  createFile('script.js', 'javascript', starters.js)

  // Starter HTML file
  createFile('index.html', 'html', starters.html)

  // Starter CSS file
  createFile('style.css', 'css', starters.css)

  // Starter JSON file
  createFile('data.json', 'json', starters.json)
}
