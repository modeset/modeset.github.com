
// ### Enable the expanding and collapsing of nagari sections.
// Roll without a js library to keep it totally decoupled from the application.

// (c) 2011 Matthew Kitt :: MIT License

// Yes, we are global
var nagari

;(function() {

  // Rock the anon function in strict mode
  'use strict';

  // Instantiate a `Nagari` object and open/close relevant areas based on the url hash.
  var Nagari = function Nagari() {
    var hash = window.location.hash
    if (hash === '#_open') this.open(null)
    else if (hash === '#_close') this.close(null)
    else this.display(window.location)
  }

  // Basic way to find elements by class name.
  // Loosely based on [Dustin Diaz's getElementsByClass](http://www.dustindiaz.com/getelementsbyclass).
  Nagari.prototype.find = function(search, prop, node, tag) {
    node = node || document
    tag = tag || '*'
    var elements = node.getElementsByTagName(tag)
    var pattern = new RegExp("(^|\\s)"+search+"(\\s|$)")
    var items = []

    for (var i = 0, len = elements.length; i < len; i += 1) {
      if (pattern.test(elements[i][prop])) {
        items.push(elements[i])
      }
    }
    return items
  }

  // Toggle classes for link and content based on current selection state of a nagari link.
  // If a section is being closed, remove the section from the hash.
  Nagari.prototype.toggle = function(link, content) {
    if (link && content) {
      if (link.className !== 'nagari-link active') {
        link.className = 'nagari-link active'
        content.className = 'nagari-content expanded'
      } else {
        link.className = 'nagari-link'
        content.className = 'nagari-content collapsed'
        document.location.hash = '#'
        return false
      }
    }
    return true
  }

  // Find the relevant items based on the hash and toggle their display.
  Nagari.prototype.display = function(target) {
    var hash = target.hash
    var id = hash.substring(1, hash.length)
    var el = document.getElementById(id)
    var link = this.find(target + '', 'href', el, 'a')[0]
    var content = this.find('nagari-content', 'className', el, 'div')[0]
    return this.toggle(link, content)
  }

  // Rip through the nagari sections applying relevant classes for opening/closing all sections.
  Nagari.prototype.tree = function(linkclass, contentclass) {
    var links = this.find('nagari-link', 'className', document, 'a')
    var contents = this.find('nagari-content', 'className', document, 'div')

    for (var i = 0, len = links.length; i < len; i += 1) {
      var link = links[i]
      link.className = linkclass
    }

    for (var k = 0, leng = contents.length; k < leng; k += 1) {
      var content = contents[k]
      content.className = contentclass
    }
    return true
  }

  // Open all of the nagari sections.
  Nagari.prototype.open = function(event) {
    return this.tree('nagari-link active', 'nagari-content expanded')
  }

  // Close all of the nagari sections.
  Nagari.prototype.close = function(event) {
    return this.tree('nagari-link', 'nagari-content collapsed')
  }

  // Respond to a click from a nagari header and toggle it's current state.
  Nagari.prototype.click = function(event) {
    return this.display(event.target)
  }

  // Instantiate a new `Nagari` object to the global `nagari` variable
  nagari = new Nagari()

}());

