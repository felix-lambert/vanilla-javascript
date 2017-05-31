

(function() {
  'use strict';

  exports.initialize = function initialize(options) {
		const tabs = options.tabs
		const content = options.content
		const defaultTab = options.defaultTab
		const activeTabClass = options.activeTabClass
		const hiddenContentClass = options.hiddenContentClass

    showTab(defaultTab, tabs, content, hiddenContentClass, activeTabClass)
	}

  function showTab(tabToShow, tabs, content, hiddenContentClass, activeTabClass) {
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