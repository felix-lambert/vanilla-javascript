(function() {
	"use strict"
  
const assert = require('./assert')
const tabs = require('./tabs')

  describe("Tabs", () => {

    const IRRELEVANT = "irrelevant"

    let container

    beforeEach(() => {
      container = document.createElement("div")
      document.body.appendChild(container)
    })

    afterEach(() => {
      removeElement(container)
    })

    it("hides all content elements except the default upon initialization", () => {
			const defaultTab = createTab()

			const content1 = createTabContent()
			const defaultContent = createTabContent()
			const content3 = createTabContent()

			tabs.initialize({
				tabs: [ createTab(), defaultTab, createTab() ],
				content: [ content1, defaultContent, content3 ],
				defaultTab: defaultTab,
				activeTabClass: IRRELEVANT,
				hiddenContentClass: "hideClass"
			})

			assert.equal(getClasses(content1), "hideClass", "element 1 should be hidden")
			assert.equal(getClasses(defaultContent), "", "default element should not be hidden")
			assert.equal(getClasses(content3), "hideClass", "element 3 should be hidden")
		})

		it("styles the default tab with a class", () => {
			const tab1 = createTab()
			const defaultTab = createTab()
			const tab3 = createTab()

			const defaultContent = createTabContent()

			tabs.initialize({
				tabs: [ tab1, defaultTab, tab3 ],
				content: [ createTabContent(), defaultContent, createTabContent() ],
				defaultTab: defaultTab,
				activeTabClass: "activeTab",
				hiddenContentClass: IRRELEVANT
			})

			assert.equal(getClasses(tab1), null, "tab 1 should not be styled")
			assert.equal(getClasses(defaultTab), "activeTab", "default element should be styled")
			assert.equal(getClasses(tab3), null, "tab 3 should not be styled")
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
				activeTabClass: "activeTab",
				hiddenContentClass: "hiddenContent"
			})

      assert.equal(getClasses(defaultTab), "existingTabClass activeTab", "tab should preserve existing classes")
			assert.equal(getClasses(hiddenContent), "existingContentClass hiddenContent", "content element should preserve existing classes")
		})

		it("preserves existing classes on the active tab", () => {
			// TODO
    })

    function getClasses(element) {
      return element.getAttribute("class")
    }

    function createTab() {
      const tab = addElement("div")
      tab.innerHTML = "tab"
      return tab
    }

    function createTabContent() {
      const tab = addElement("div")
      tab.innerHTML = "content"
      return tab
    }

    function addElement(tagName) {
      const element = document.createElement(tagName)
      container.appendChild(element)
      return element
    }

    function removeElement(element) {
      element.parentNode.removeChild(element)
    }

  })
  
}())
