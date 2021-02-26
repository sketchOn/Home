exports.handler = async (event, context) => {
  const { api } = event.queryStringParameters
  return {
    statusCode: 200,
    body: JSON.stringify({ message: `Hello ${api || 'World'}` })
  }
}
