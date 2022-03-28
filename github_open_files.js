// ==UserScript==
// @name        Open Files PR
// @namespace   Violentmonkey Scripts
// @match       https://github.com/odoo/odoo/pull/*
// @exclude-match https://github.com/odoo/odoo/pull/*/files
// @grant       none
// @version     1.0
// @author      Yolann Sabaux
// @description 3/28/2022, 3:58:38 PM
// ==/UserScript==

function insertAfter(newNode, existingNode) {
    existingNode.parentNode.insertBefore(newNode, existingNode.nextSibling);
}

window.addEventListener('load', () => {
  const title = document.querySelector('.gh-header-number')
  const el = document.createElement('button')
  const url = document.URL.concat('/files')
  let styleObject = {
    width: '100px',
    left: '15px',
    background: '#0077ff',
  }
  Object.assign(el.style, styleObject) ;
  el.innerText = 'Open Files'
  el.classList.add('btn', 'btn-primary')
  el.addEventListener('click', (e) => {
    window.open(url, '_blank').focus();
  })
  insertAfter(el, title)
})
