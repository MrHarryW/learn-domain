let editor

function createEditor() {
  editor = monaco.editor.create(document.getElementById('editor'), {
    theme: 'vs-dark',
    automaticLayout: true
  })

  window.editor = editor
  initFiles()

  
}
