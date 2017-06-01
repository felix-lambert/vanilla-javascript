
(function() {
  'use strict';

  exports.initialize = function initialize(options) { 
    console.log('inside tabs')
    console.log(options)
    handleClicksOnTab(options)
    showTab(options.defaultTab, options)
	}

  function handleClicksOnTab(options) {
    options.tabs.map((tabElement) => {
      console.log(tabElement)
      tabElement.addEventListener('click', function() {
        console.log('/////////////////////')
        console.log(tabElement)
        console.log('//////////////////')
        showTab(tabElement, options)
      })
    })
  }

  function showTab(tabToShow, options) {
    console.log('showtab')
    console.log(tabToShow)
    const activeTabIndex = findElementIndex(options.tabs, tabToShow)
    console.log(activeTabIndex)
    const contentToShow = options.content[activeTabIndex]
    console.log(contentToShow)
    console.log(options.activeTabClass)
    options.tabs.map((tabElement) => {

      tabElement.classList.remove(options.activeTabClass)
    })
    console.log(tabToShow)
    tabToShow.classList.add(options.activeTabClass)

    console.log(options.hiddenContentClass)
    options.content.map((contentElement) => {
      contentElement.classList.add(options.hiddenContentClass)
    })

    contentToShow.classList.remove(options.hiddenContentClass)    
  }

	function findElementIndex(contentTabs, defaultContentTab) {
		for (let i = 0; i < contentTabs.length; i++) {
			if (contentTabs[i] === defaultContentTab) return i
		}
  }
}())