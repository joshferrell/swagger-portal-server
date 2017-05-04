const DotEnv = require( "dotenv-safe" )
var U = require( "./utils" )

DotEnv.load()

beforeAll( U.startChromeDriver )
afterAll( U.stopChromeDriver )
beforeEach( U.setupClient )
afterEach( U.teardownClient )

test('verify single document page shows', function() {
    return this.client
        .url(process.env['SERVER_URL'])
        .click('.List li a')
        .waitForText('h1')
        .getText('h1')
        .then(title => expect(title).toBe('Document foo2'))
});
