// ==UserScript==
// @name        Facilitator PR
// @namespace   Violentmonkey Scripts
// @match       https://github.com/odoo/odoo/pull/*
// @match       https://github.com/odoo/enterprise/pull/* 
// @exclude-match https://github.com/odoo/odoo/pull/*/files
// @exclude-match https://github.com/odoo/enterprise/pull/*/files
// @grant       none
// @version     1.3
// @author      Yolann Sabaux
// @description 3/28/2022, 3:58:38 PM
// ==/UserScript==

function insertAfter(newNode, existingNode) {
    existingNode.parentNode.insertBefore(newNode, existingNode.nextSibling);
}

window.addEventListener('load', () => {
  let styleObject = {
    width: '120px',
    left: '15px',
  }  
  
  // Copy Branch button
  const files_button = document.createElement('button')
  Object.assign(files_button.style, styleObject)
  files_button.style.background= '#0077ff'
  files_button.innerText = 'Files Changed'
  files_button.classList.add('btn', 'btn-primary')
  
  files_button.addEventListener('click', (e) => {
    const url = document.URL.concat('/files')
    window.open(url, '_blank').focus();
  })
  
  const title = document.querySelector('.gh-header-number')
  insertAfter(files_button, title)
  
  // Changed Files button
  const copy_button = document.createElement('button')
  Object.assign(copy_button.style, styleObject)
  copy_button.style.left = '30px'
  copy_button.innerText = 'Copy Branch'
  copy_button.classList.add('btn', 'btn-primary')
  
  copy_button.addEventListener('click', (e) => {
    copyText = document.querySelector('.text-emphasized').text;
    navigator.clipboard.writeText(copyText);
  })
  
  insertAfter(copy_button, files_button)
  
  // Top Bottom Button
  const topButton = document.createElement('button')
  const bottomButton = document.createElement('button')
  topButton.innerText = 'Top'
  bottomButton.innerText = 'Bottom'
  
  topButton.style.left = '60px'
  bottomButton.style.left = '50px'
  topButton.style.width = '70px'
  bottomButton.style.width = '70px'
  topButton.classList.add("btn", "btn-block", "btn-sm")
  bottomButton.classList.add("btn", "btn-block", "btn-sm")
  
  bottomButton.addEventListener('click', (e) => {
    window.scrollTo(0, document.body.scrollHeight);
  })
  
  topButton.addEventListener('click', (e) => {
    window.scrollTo(0, 0);
  })
  
  
  insertAfter(bottomButton, copy_button)
  insertAfter(topButton, bottomButton)
  
})
