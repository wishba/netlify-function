const query = require("./utils/query")

const UPDATE_TODO = `
  mutation($id: ID!, $title: String, $completed: Boolean) {
    updateTodo(id: $id, data: {title: $title, completed: $completed}) {
      _id
      title
      completed
    }
  }
`

exports.handler = async event => {
  const { id, title, completed } = JSON.parse(event.body)
  const { data, errors } = await query(UPDATE_TODO, { id, title, completed })

  if (errors) {
    return {
      statusCode: 500,
      body: JSON.stringify(errors)
    }
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ graphql: data.updateTodo })
  }
}