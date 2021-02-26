exports.handler = async (event, context) => {

  const user = event.queryStringParameters.user || "ERROR";
  const api = event.queryStringParameters.api || "ERROR";


  return {

    statusCode: 200,

    body: JSON.stringify({ API: ${api}, USER: ${user} }),
  

  };

};
