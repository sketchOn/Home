exports.handler = async (event, context) => {
  const { api } = event.queryStringParameters
  return {
    statusCode: 200,
    body: JSON.stringify({ API_KEY: ` ${api || 'NO VALID INPUT FOUND'}`, { "TYPE" : "user", "HOST" : "sketchon.ml", "STATUS" : "200"})
  }
}
