const target = require('./target')
const {books, questionMark} = require('./svg_icons')
const htmlencode = require('htmlencode');

module.exports = function (data) {

  const {
    impact,
    description,
    help,
    helpUrl,
    tags,
    nodes
  } = data

  return `  
  <section class="issue">
    <div class="issue_details">
      <div class="issue_description">${htmlencode.htmlEncode(description)}</div>
      <div class="issue_help"><a href="${helpUrl}" target="_blank"><span>${questionMark}${htmlencode.htmlEncode(help)}</span></a></div>
    </div>
    <div class="issue_nodes">
      ${nodes.map(t => target(t)).join('')}
    </div>
  </section>
  `
}