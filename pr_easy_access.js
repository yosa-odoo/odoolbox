// ==UserScript==
// @name        Facilitator PR
// @namespace   Violentmonkey Scripts
// @match       https://github.com/odoo/odoo/pull/*
// @match       https://github.com/odoo/enterprise/pull/* 
// @exclude-match https://github.com/odoo/odoo/pull/*/files
// @exclude-match https://github.com/odoo/enterprise/pull/*/files
// @grant       none
// @version     1.4
// @author      Yolann Sabaux
// @description 3/28/2022, 3:58:38 PM
// ==/UserScript==

function insertAfter(newNode, existingNode) {
    existingNode.parentNode.insertBefore(newNode, existingNode.nextSibling);
}

function createButton({text, styleB, classesB}) {
    const classes = classesB || []
    const style = styleB || {}
    const button = document.createElement('button')
    button.append(new Text(text || ''))
    Object.entries(style).forEach(([attribute, value]) => button.style[attribute] = value)
    button.classList.add(...classes)
    return button
}

function addEasyAccess(){
  
    // 'Changed Files' button
  const filesButton = createButton({
    text: 'Files Changed',
    styleB: {
      background: '#0077ff',
      width: '120px',
      left: '15px',
    },
    classesB: ['btn', 'btn-primary']
  })
  
  filesButton.addEventListener('click', (e) => {
    const url = document.URL.concat('/files')
    window.open(url, '_blank').focus();
  })
  
  // 'Copy Branch' button
  const copyButton = createButton({
    text: 'Copy Branch',
    styleB: {
      width: '120px',
      left: '30px',
    },
    classesB: ['btn', 'btn-primary']
  })
  
  copyButton.addEventListener('click', (e) => {
    copyText = document.querySelector('.text-emphasized').text;
    navigator.clipboard.writeText(copyText);
  })
  
  // 'Top' Button
  const topButton = createButton({
    text: 'Top',
    styleB: {
      width: '70px',
      left: '60px',
    },
    classesB: ['btn', 'btn-block', 'btn-sm']
  })
  
  topButton.addEventListener('click', (e) => {
    window.scrollTo(0, 0);
  })
  
  // 'Bottom' Button
  const bottomButton = createButton({
    text: 'Bottom',
    styleB: {
      width: '70px',
      left: '50px',
    },
    classesB: ['btn', 'btn-block', 'btn-sm']
  })
  
  bottomButton.addEventListener('click', (e) => {
    window.scrollTo(0, document.body.scrollHeight);
  })
 
  
  // insert buttons
  const title = document.querySelector('.gh-header-number')
  insertAfter(filesButton, title)
  insertAfter(copyButton, filesButton)
  insertAfter(bottomButton, copyButton)
  insertAfter(topButton, bottomButton)    
  
}

window.addEventListener('load', addEasyAccess)
window.addEventListener("message", addEasyAccess)
window.addEventListener('pjax:end', addEasyAccess)
