const DotEnv = require( "dotenv-safe" )
const Axios = require( "axios" )
const Sequelize = require( "sequelize" )

DotEnv.load()

const deleteDocuments = () => {
  const sequelize = new Sequelize(
    process.env.POSTGRES_DB,
    process.env.POSTGRES_USER,
    process.env.POSTGRES_PASSWORD,
    { host: process.env.SERVER_POSTGRES_HOST,
      dialect: 'postgres' } )

  return sequelize.query( "delete from documents" )
    .then( () => sequelize.close() )
    .catch( x => console.log( x ) )
}

beforeEach( deleteDocuments )

const prop = name => obj => obj[name]
const promiseLogger = (x) => { console.log(x); return x; }
const url = `${process.env.SERVER_URL}/docs`
const docs = [
  { title: "foo1", description: "bar1", swaggerFile: "foobar1" },
  { title: "foo2", description: "bar2", swaggerFile: "foobar2" }
]

test( "create and retrieve a document", () => {
  return Axios.post( url, docs[0] )
    .then( prop("data") )
    .then( (doc) => Axios.get( `${url}/${doc.id}` ) )
    .then( prop("data") )
    .then( (data) => {
      expect( data.title ).toBe( "foo1" )
    } )
} )

test( "create and retrieve multiple document", () => {
  return Promise.all( docs.map( doc => Axios.post( url, doc ) ) )
    .then( () => Axios.get( url ) )
    .then( prop("data") )
    .then( (data) => {
      expect( data.length ).toBe( 2 )
    } )
} )
