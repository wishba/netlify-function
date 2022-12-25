const query = require("./utils/query")

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
  const { data, errors } = await query(GET_TODOS)

  if (errors) {
    return {
      statusCode: 500,
      body: JSON.stringify(errors)
    }
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ graphql: data.allTodos.data })
  }
}