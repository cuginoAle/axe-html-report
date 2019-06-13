const target = require('./target')
const {questionMark} = require('./svg_icons')
const htmlencode = require('htmlencode');


module.exports = function (data) {

  const {
    impact,
    description,
    help,
    helpUrl,
    tags,
    isIncomplete,
    nodes
  } = data

  return `  
  <section class="issue">
    <div class="issue_details">
      
    <div class="issue_description">
        ${htmlencode.htmlEncode(description)}
      </div>
      
      <ul class="issue_tags">
        ${tags.map(tag => (`<li>${tag}</li>`)).join('')}
      </ul>
      
      <div class="issue_help"><a href="${helpUrl}" target="_blank"><span>${questionMark}${htmlencode.htmlEncode(help)}</span></a></div>
    </div>
    <div class="issue_nodes">
      ${nodes.map(t => target({...t, isIncomplete})).join('')}
    </div>
  </section>
  `
}