

(function() {
  'use strict';

  exports.initialize = function initialize(options) {
    const defaultTab = options.defaultTab
    
    showTab(defaultTab, options)
	}

  function showTab(tabToShow, options) {
    const tabs = options.tabs
		const content = options.content
		const activeTabClass = options.activeTabClass
		const hiddenContentClass = options.hiddenContentClass
    const activeIndex = findIndexOfDefaultElement(tabs, tabToShow)
    
    console.log(activeIndex)
    
    const defaultContent = content[activeIndex]

    content.map((element) => {
      element.classList.add(hiddenContentClass)
    })

    defaultContent.classList.remove(hiddenContentClass)
    tabToShow.classList.add(activeTabClass)
  }

	function findIndexOfDefaultElement(contentTabs, defaultContentTab) {
		for (let i = 0; i < contentTabs.length; i++) {
			if (contentTabs[i] === defaultContentTab) return i
		}
  }

}())