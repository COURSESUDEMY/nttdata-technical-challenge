const jsonServe = require("json-server");
const { getUser } = require("./data");
const middleware = jsonServe.defaults();
const app = jsonServe.create();

app.use(middleware);
app.use(jsonServe.bodyParser);

//TODO:  roter user
app.get("/api/user", (req, res) => {
  res.status(200).send(getUser);
});


app.listen(3000, () => {
  console.info("Mock server running on port: 3000");
});
