(() => {
  'use strict'

  exports.initialize = function initialize (options) {
    handleClicksOnTab(options)
    showTab(options.defaultTab, options)
  }

  function handleClicksOnTab (options) {
    options.tabs.map((tabElement) => {
      tabElement.addEventListener('click', () => {
        showTab(tabElement, options)
      })
    })
  }

  function showTab (tabToShow, options) {
    const activeTabIndex = findElementIndex(options.tabs, tabToShow)
    const contentToShow = options.content[activeTabIndex]

    options.tabs.map((tabElement) => {
      tabElement.classList.remove(options.activeTabClass)
    })

    tabToShow.classList.add(options.activeTabClass)

    options.content.map((contentElement) => {
      contentElement.classList.add(options.hiddenContentClass)
    })
    contentToShow.classList.remove(options.hiddenContentClass)
  }

  function findElementIndex (contentTabs, defaultContentTab) {
    for (let i = 0; i < contentTabs.length; i++) {
      if (contentTabs[i] === defaultContentTab) return i
    }
  }
})()
