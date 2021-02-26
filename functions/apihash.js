exports.handler = async (event, context) => {

  const { name } = JSON.parse(event.body);

  callback(null, {
    statusCode: 200,
    body: JSON.stringify({ msg: "Thanks for visiting " + name })
});
};
