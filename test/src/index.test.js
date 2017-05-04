var U = require( "./utils" )

beforeAll( U.startChromeDriver )
afterAll( U.stopChromeDriver )
beforeEach( U.setupClient )
afterEach( U.teardownClient )

test( "verify searching for WebDriverIO on duckduckgo", function() {
  return this.client
    .url( "https://duckduckgo.com/" )
    .setValue( "#search_form_input_homepage", "WebdriverIO" )
    .click( "#search_button_homepage" )
    .getTitle().then( function( title ) {
      expect( title ).toBe( "WebdriverIO at DuckDuckGo" )
    } )
} )
