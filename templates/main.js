const issue = require('./issue.js')
const fs = require('fs')
var path = require('path');

const stylesPath = path.resolve(__dirname, './styles.css')
const styles = fs.readFileSync(stylesPath)

module.exports = function (data) {
  const {
    title,
    issues,
    screenshot,
    url
  } = data

  const logo=[
    ' __            ___ ',
    '|__)  /\\  \\_/ |__  ',
    `|    /~~\\ / \\ |___            `,
    '------------------------------------',
    'Puppeteer & Axe ♿ testing framework',
    ''    
  ].map(l => l.replace(/ /g, '\u00a0'))

  return `  
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Paxe: accessibility Report for ${title}</title>    
    <style>
      ${styles}
    </style>
  </head>
  <body>
    <header>
      <div class="logo">
        ${logo.map(l => (`<p>${l}</p>`)).join('')}
      </div>
      <h1>${title}</h1>
      <a class="page_url" href="${url}" target="_blank">${url}</a>
    </header>
    <main>
      <div class="issues_list">
        ${issues.map(i => issue(i)).join('')}
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