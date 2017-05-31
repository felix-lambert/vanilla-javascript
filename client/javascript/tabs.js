

(function() {
  'use strict';

  exports.initialize = function initialize(options) {
    
    handleClicks(options)
    showTab(options.defaultTab, options)
	}

  function handleClicks(options) {
    options.tabs.map((element) => {
      element.addEventListener('click', function(event) {
        showTab(event.target, options)
      })
    })
  }

  function showTab(tabToShow, options) {
    const activeIndex = findElementIndex(options.tabs, tabToShow)
    const contentToShow = options.content[activeIndex]


    options.tabs.map((element) => {
      element.classList.remove(options.activeTabClass)
    })

    tabToShow.classList.add(options.activeTabClass)

    options.content.map((element) => {
      element.classList.add(options.hiddenContentClass)
    })

    contentToShow.classList.remove(options.hiddenContentClass)
    
  }

	function findElementIndex(contentTabs, defaultContentTab) {
		for (let i = 0; i < contentTabs.length; i++) {
			if (contentTabs[i] === defaultContentTab) return i
		}
  }

}())