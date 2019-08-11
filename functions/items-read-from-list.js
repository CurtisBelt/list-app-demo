import faunadb from 'faunadb'

const query = faunadb.query
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SERVER_SECRET
})

exports.handler = (event) => {
  const list =
    typeof event.queryStringParameters.list === 'undefined'
      ? ''
      : event.queryStringParameters.list

  return client
    .query(query.Paginate(query.Match(query.Index('items_by_list'), list)))
    .then((response) => {
      const itemRefs = response.data
      const getAllItemsDataQuery = itemRefs.map((ref) => {
        return query.Get(ref)
      })
      return client.query(getAllItemsDataQuery).then((response) => {
        return {
          statusCode: 200,
          body: JSON.stringify(response)
        }
      })
    })
    .catch((error) => {
      return {
        statusCode: 400,
        body: JSON.stringify(error)
      }
    })
}
