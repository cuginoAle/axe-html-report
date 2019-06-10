const htmlencode = require('htmlencode');

module.exports = function (data) {

  const {
    impact,
    html,
    target,
    failureSummary
  } = data

  return `  
  <div class="target">
    <p class="target_impact target_impact-${impact}">${impact}</p>
    <div class="target_html">${htmlencode.htmlEncode(html)}</div>
    <div class="target_summary">${htmlencode.htmlEncode(failureSummary)}</div>
  </div>
  `
}
