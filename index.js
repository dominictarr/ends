var h = require('hyperscript')
var o = require('observable')

var maxElements = 100

// check if an element is currently on the screen
// (vertically)

function onScreen (el) {
  var rect = el.getBoundingClientRect()
  //off the top of the screen
  if(rect.bottom <= 0) return false
  if(rect.top > window.innerHeight) return false
  return true
}

// `mutate` the dom (add or remove elements)
// but keep the viewport in the same position
// relative to the given `element`.

function rescroll(el, mutate) {
  var y = window.scrollY
  var top = el.getBoundingClientRect().top
  mutate()
  var top2 = el.getBoundingClientRect().top
  var to = y + (top2 - top)
  if(to !== y)
    window.scrollTo({top: to})
}

var header = h('h1', 'header')
var footer = h('h2', {style: {border: '1px solid'}}, 'footer')

var max = 0, min = -1

var list = h('ul')

function append(n) {

  for(var i = 0; i < n; i++)
    list.appendChild(h('li', h('h3', max + i), h('p', Date.now()) ))
  max += n
}

function prepend(n) {

  for(var i = 0; i < n; i++)
    list.insertBefore(h('li', h('h3', min - i), h('p', Date.now()) ), list.firstChild)
  min -= n
}

append(100)

var head = o.value()
var foot = o.value()
var data = o.value()
var headCheck, footCheck

head('visible')
foot('invisible')

var notice = h('div', {
  style: {
    position: 'fixed', right: '20px', top: '20px',
    width: '100px',
    'z-index': 999
    }
  },
  h('h4', 'stickyness'),
  h('div', 'head:', headCheck = h('input', {type: 'checkbox'})),
  h('div', 'foot:', footCheck = h('input', {type: 'checkbox'}))
)

var stickyHead = o.input(headCheck, 'checked')
var stickyFoot = o.input(footCheck, 'checked')

function shift (list) {
  var el = list.firstChild
  list.removeChild(el)
  return el
}

function pop (list) {
  var el = list.lastChild
  list.removeChild(el)
  return el
}

function shorten (max, op) {
  var n = 0
  while(list.children.length > maxElements) {
    n ++; op(list)
  }
  return n
}

setInterval(function () {
  console.log(stickyHead(), stickyFoot())
  if(onScreen(footer)) {
    rescroll(footer, function () {
      min += shorten(maxElements, shift)
      if(stickyFoot()) append(~~(Math.random()*3))
    })
    if(!stickyFoot())(append(~~(Math.random()*3)))
  }

  else if(onScreen(header)) {
    rescroll(stickyHead() ? header : list.firstChild, function () {
      prepend(~~(Math.random()*3))
      max -= shorten(maxElements, pop)
    })
  }
}, 100)

document.body.appendChild(h('div',
  header,
  list,
  footer,
  notice
))

setInterval(function () {
  //don't make an onscroll handler too heavy because you'll get jank.
  head(onScreen(header) ? 'visible' : 'hidden')
  foot(onScreen(footer) ? 'visible' : 'hidden')
}, 333)

