

(function() {
  'use strict';

  exports.initialize = function initialize(options) {
    
    showTab(options.defaultTab, options)
	}

  function showTab(tabToShow, options) {
    const activeIndex = findElementIndex(options.tabs, tabToShow)
    const defaultContent = options.content[activeIndex]

    options.content.map((element) => {
      element.classList.add(options.hiddenContentClass)
    })

    defaultContent.classList.remove(options.hiddenContentClass)
    tabToShow.classList.add(options.activeTabClass)
  }

	function findElementIndex(contentTabs, defaultContentTab) {
		for (let i = 0; i < contentTabs.length; i++) {
			if (contentTabs[i] === defaultContentTab) return i
		}
  }

}())