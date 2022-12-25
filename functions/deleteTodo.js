const query = require("./utils/query")

const DELETE_TODO = `
  mutation($id: ID!) {
    deleteTodo(id: $id) {
      _id
    }
  }
`

exports.handler = async event => {
  const { id } = JSON.parse(event.body)
  const { data, errors } = await query(DELETE_TODO, { id })

  if (errors) {
    return {
      statusCode: 500,
      body: JSON.stringify(errors)
    }
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ graphql: data.deleteTodo })
  }
}