const issue = require('./issue.js')
const fs = require('fs')
var path = require('path');

const stylesPath = path.resolve(__dirname, './styles.css')
const styles = fs.readFileSync(stylesPath)

module.exports = function (data) {
  const {
    logo,
    title,
    issues,
    incomplete,
    screenshot,
    url
  } = data

  return `  
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>aXe - html report</title>    
    <style>
      ${styles}
    </style>
  </head>
  <body>
    <header>
      <div ${logo && `class="logo"`}>
        ${logo}
      </div>
      <h1>${title}</h1>
      <a class="page_url" href="${url}" target="_blank">${url}</a>
    </header>
    <main>
      <div class="issues_list">
        <div class="issues_list-violations">
          <h2>Violations:</h2>
          ${issues.map(i => issue({...i, isIncomplete:false})).join('')}
        </div>

        <div class="issues_list-indeteminate">
          <h2>Indeterminate: <small>Need manual review</small></h2>          
          ${incomplete.map(i => issue({...i, isIncomplete:true})).join('')}
        </div>
        
      </div>
      <div class="screenshot">
        <a href="${screenshot}" target="_blank"><img src="${screenshot}"></a>
      </div>
    </main>
    <footer></footer>
  </body>
</html>
  `
}