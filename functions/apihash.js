exports.handler = async function (event, context, callback) {
  if (event.httpMethod !== 'GET') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const data = await getData();
    const stringified = JSON.stringify(data);
    const returnObj = { statusCode: 200, body: stringified };
    console.log('returnObj:', JSON.stringify(returnObj, null, 2));
    return returnObj;
  } catch (error) {
    console.error(error);
    return { statusCode: 500, body: `An error occurred: ${String(error)}` };
  }
};
