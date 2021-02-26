exports.handler = async (event, context) => {

  const name = event.queryStringParameters.name || "ERROR";


  callback(null, {
    statusCode: 200,
    body: JSON.stringify({ msg: "Thanks for visiting " + name })
});
};
