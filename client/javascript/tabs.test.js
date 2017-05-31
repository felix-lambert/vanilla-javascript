(function() {
	"use strict"
  
  const assert = require('./assert')
  const tabs = require('./tabs')

  describe("Tabs", () => {

    const HIDDEN_CONTENT = "hideClass"
    const ACTIVE_TAB = "activeTab"

    let container

    beforeEach(() => {
      container = document.createElement("div")
      document.body.appendChild(container)
    })

    afterEach(() => {
      removeElement(container)
    })

    it("use a class to hide all content elements except the default upon initialization", () => {
			const defaultTab = createTab()

			const content1 = createTabContent()
			const defaultContentToNotHide = createTabContent()
			const content3 = createTabContent()

			tabs.initialize({
				tabs: [ createTab(), defaultTab, createTab() ],
				content: [ content1, defaultContentToNotHide, content3 ],
				defaultTab: defaultTab,
				hiddenContentClass: HIDDEN_CONTENT
			})

      assertContentHidden(content1, "content 1 should be hidden")
      assertContentVisible(defaultContentToNotHide, "default element should not be hidden")
      assertContentHidden(content3, "content 3 should be hidden")
		})

		it("styles the default tab with a class upon initialization", () => {
			const tab1 = createTab()
			const defaultTab = createTab()
			const tab3 = createTab()

			const defaultContent = createTabContent()

			tabs.initialize({
				tabs: [ tab1, defaultTab, tab3 ],
				content: [ createTabContent(), defaultContent, createTabContent() ],
				defaultTab: defaultTab,
				activeTabClass: ACTIVE_TAB
			})

      assertTabInactive(tab1, "tab 1 should be hidden")
			assertTabActive(defaultTab, "default tab should not be hidden")
      assertTabInactive(tab3, "tab 3 should be hidden")
		})

    it("switches content when tab is clicked", () => {
      const tab1 = createTab()
			const tab2 = createTab()
			const tab3 = createTab()
      
			const content1 = createTabContent()
			const content2 = createTabContent()
      const content3 = createTabContent()

      tabs.initialize({
        tabs: [tab1, tab2, tab3],
        content: [content1, content2, content3],
        defaultTab: tab1,
        activeTabClass: ACTIVE_TAB,
        hiddenContentClass: HIDDEN_CONTENT      
      })

      tab1.click()
      assertContentVisible(content1, "content 1 should be visible after click")
      assertContentHidden(content2, "content 2 should no longer be visible after click")
      assertContentHidden(content3, "content 3 should no longer be visible after click")
      assertTabActive(tab1, "tab 1 should be visible after click")
      assertTabInactive(tab2, "tab 2 should be visible after click")

      tab2.click()
      assertContentVisible(content2, "content 2 should be visible after click")
      assertContentHidden(content1, "content 1 should no longer be visible after click")
      assertContentHidden(content3, "content 3 should no longer be visible after click")
      assertTabActive(tab2, "tab 2")

      tab3.click()
      assertContentVisible(content3, "content 3 should be visible after click")
      assertContentHidden(content2, "content 2 should no longer be visible after click")
      assertContentHidden(content1, "content 1 should no longer be visible after click")
      assertTabActive(tab3, "tab 3")
    })

    it("preserves existing classes when adding new classes", () => {
			const defaultTab = createTab()
      defaultTab.setAttribute("class", "existingTabClass")

			const defaultContent = createTabContent()
			const hiddenContent = createTabContent()
			hiddenContent.setAttribute("class", "existingContentClass")

			tabs.initialize({
				tabs: [ defaultTab, createTab() ],
				content: [ defaultContent, hiddenContent ],
				defaultTab: defaultTab,
				activeTabClass: ACTIVE_TAB,
				hiddenContentClass: "hiddenContent"
			})

      assert.equal(getClasses(defaultTab), `existingTabClass ${ACTIVE_TAB}`, 'default tab should preserve existing classes')
			assert.equal(getClasses(hiddenContent), 'existingContentClass hiddenContent', 'content element should preserve existing classes')
		})

    function assertTabActive(element, message) {
      assert.equal(getClasses(element), ACTIVE_TAB, message)
    }

    function assertTabInactive(element, message) {
      assert.equal(getClasses(element), '', message)
    }
    
    function assertContentHidden(element, message) {
      assert.equal(getClasses(element), HIDDEN_CONTENT, message)
    }

    function assertContentVisible(element, message) {
      assert.equal(getClasses(element), '', message)
    }

    function getClasses(element) {
      const result = element.getAttribute("class")
      if (result === null) return ''
      return result
    }

    function createTab() {
      const tab = addNodeElement("div")
      tab.innerHTML = "tab"
      return tab
    }

    function createTabContent() {
      const tab = addNodeElement("div")
      tab.innerHTML = "content"
      return tab
    }

    function addNodeElement(tagName) {
      const element = document.createElement(tagName)
      container.appendChild(element)
      return element
    }

    function removeElement(element) {
      element.parentNode.removeChild(element)
    }

  })
}())
