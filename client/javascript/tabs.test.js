(function() {
	"use strict";
  
    const assert = require('./assert')
    const tabs = require('./tabs')

    describe("Tabs", function() {

      it("sets a class on an element", function() {
        ///// Prepare test /////
        const element = addElement('div')

        ///// Act (test the function) /////
        tabs.initialize(element, 'someClass')

        ///// Assert (test if test works) /////
        assert.equal(getClass(element), 'someClass')

        ///// Reset tests /////
        removeElement(element)
      });

      it("does not eraze existing class on an element", function() {
        ///// Prepare test /////
        const element = addElement('div')
        element.setAttribute('class', 'existingClass')

        ///// Act (test the function) /////
        tabs.initialize(element, 'newClass')

        ///// Assert (test if test works) /////
        assert.equal(getClass(element), 'existingClass newClass')

        ///// Reset tests /////
        removeElement(element)
      });

      
    });

    function getClass(element) {
      return element.getAttribute('class')
    }

    function removeElement(element) {
      element.parentNode.removeChild(element)
    }

    function addElement(tagName) {
      const element = document.createElement(tagName)
      return document.body.appendChild(element)
    }
  
  }());
