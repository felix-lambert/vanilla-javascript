// Copyright (c) 2013 Titanium I.T. LLC. All rights reserved. See LICENSE.TXT for details.
(function() {
	"use strict";

	var page = require("webpage").create();

	console.log("Hello world");

  page.onConsoleMessage = function(message) {
    console.log('CONSOLE' + message)
  }

	page.open("http://localhost:8001", function(success) {
		console.log("Success: " + success);

		page.evaluate(inBrowser);

		page.render("tabs.png");
    phantom.exit();
	});

  function inBrowser() {
    console.log("Hi");
		console.log("defined? " + isDefined(tabs.HtmlElement));

		function isDefined(obj) {
			return typeof(obj) !== "undefined";
    }
  }
}());
