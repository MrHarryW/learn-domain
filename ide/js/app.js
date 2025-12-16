require.config({
  paths: {
    vs: 'https://unpkg.com/monaco-editor@0.45.0/min/vs'
  }
})

require(['vs/editor/editor.main'], function () {
  createEditor()
})



initFiles()
createEditor()