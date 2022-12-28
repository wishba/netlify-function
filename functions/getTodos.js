const sendQuery = require("./utils/sendQuery")

const GET_TODOS = `
  query {
    allTodos {
      data {
        _id
        title
        completed
      }
    }
  }  
`

exports.handler = async () => {
  try {
    const response = await sendQuery(GET_TODOS)
    const data = response.allTodos.data
    return {
      statusCode: 200,
      body: JSON.stringify(data)
    }

  } catch (error) {
    console.error(error)
    return {
      statusCode: 500,
      body: JSON.stringify(error)
    }
  }
}