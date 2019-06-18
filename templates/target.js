const htmlencode = require('htmlencode')

module.exports = function (data) {
  const {
    impact,
    html,
    target,
    failureSummary,
    isIncomplete
  } = data

  return `  
  <div class="target">
    <p class="target_impact target_impact-${impact}">${impact}</p>
    <div class="target_html html_code">${htmlencode.htmlEncode(html)}</div>
    ${failureSummary ? `<div class="target_summary">${toUl(failureSummary)}</div>` : ''}
    ${isIncomplete ? getExtraData(data) : ''}
  </div>
  `
}

function toUl (summary) {
  return summary.split('Fix ').map((el, i) => {
    if (i === 0) return ''
    const li = `Fix ${el}`.split('\n').filter(el => el !== '').map(el => htmlencode.htmlEncode(el))

    return `
      <p>${li.shift()}</p>
      <ul>
        ${li.map(e => `<li>${e}</li>`).join('')}
      </ul>
    `
  }).join('')
}

function getExtraData (data) {
  return [
    ...data.any,
    ...data.all,
    ...data.none
  ].map(d => (`
    <p class="target_indeterminate">(${d.impact}) - ${d.message}</p>

    ${d.relatedNodes.length
      ? `<div>
        <h4>Related:</h4>
        <ul>
          ${d.relatedNodes.map(r => (`
            <li>
              <span>${r.target}</span>
              <div class="html_code">
                ${htmlencode.htmlEncode(r.html)}
              </div>
            </li>
          `)).join('')}
        </ul>
      </div>`
      : ''
    }
  `)).join('')
}
