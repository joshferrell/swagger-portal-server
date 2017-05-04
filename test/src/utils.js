var ChromeDriver = require("chromedriver");
var WebDriverIO = require("webdriverio");

exports.startChromeDriver = () => {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000
  ChromeDriver.start( [ "--url-base=/wd/hub", "--port=4444" ] )
}

exports.stopChromeDriver = () => {
  ChromeDriver.stop()
}

exports.setupClient = function() {
  this.client = WebDriverIO.remote( {
    desiredCapabilities: { browserName: "chromedriver" }
  } )
  return this.client.init()
}

exports.teardownClient = function() {
  return this.client.end()
}
