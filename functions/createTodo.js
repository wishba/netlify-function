const query = require("./utils/query")

const CREATE_TODO = `
  mutation($title: String!, $completed: Boolean) {
    createTodo(data: {title: $title, completed: $completed}) {
      _id
      title
      completed
    }
  }
`

exports.handler = async event => {
  const { title, completed } = JSON.parse(event.body)
  const { data, errors } = await query(
    CREATE_TODO, { title, completed })

  if (errors) {
    return {
      statusCode: 500,
      body: JSON.stringify(errors)
    }
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ graphql: data.createTodo })
  }
}