const sendQuery = require("./utils/sendQuery")

const UPDATE_TODO = `
  mutation($id: ID!, $title: String!, $completed: Boolean) {
    updateTodo(id: $id, data: {title: $title, completed: $completed}) {
      _id
      title
      completed
    }
  }
`

exports.handler = async event => {
  const { id, title, completed } = JSON.parse(event.body)
  const variables = { id, title, completed }

  try {
    const { updateTodo } = await sendQuery(
      UPDATE_TODO,
      variables
    )
    return {
      statusCode: 200,
      body: JSON.stringify(updateTodo)
    }

  } catch (error) {
    console.error(error)
    return {
      statusCode: 500,
      body: JSON.stringify(error)
    }
  }
}