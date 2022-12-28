const sendQuery = require("./utils/sendQuery")

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
  const { title } = JSON.parse(event.body)
  const variables = { title, completed: false }

  try {
    const { createTodo } = await sendQuery(
      CREATE_TODO,
      variables
    )
    return {
      statusCode: 200,
      body: JSON.stringify(createTodo)
    }

  } catch (error) {
    console.error(error)
    return {
      statusCode: 500,
      body: JSON.stringify(error)
    }
  }
}