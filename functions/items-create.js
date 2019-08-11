import faunadb from 'faunadb'

const query = faunadb.query
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SERVER_SECRET
})

exports.handler = (event) => {
  const data = JSON.parse(event.body)
  const payload = {
    data
  }
  return client
    .query(query.Create(query.Ref('classes/items'), payload))
    .then((response) => {
      return {
        statusCode: 200,
        body: JSON.stringify(response)
      }
    })
    .catch((error) => {
      return {
        statusCode: 400,
        body: JSON.stringify(error)
      }
    })
}
