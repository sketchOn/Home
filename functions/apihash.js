exports.handler = async (event, context) => {

  const user = event.queryStringParameters.user || "ERROR";


  return {

    statusCode: 200,

    body: `https://www.sketchon.ml/.netlify/functions/apihash?user=skd`,
  

  };

};
