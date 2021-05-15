const { request, response } = require("express");
const express = require("express");
const pkg = require("./package.json");

const server = express();

const jokes = [
  {
    id: 1,
    joke: "What did the chick say when the hen laid an orange? Look what marmalade!",
  },
  {
    id: 2,
    joke: "Who tells the funniest jokes on the farm? The comedi-hen!",
  },
  {
    id: 3,
    joke: "Why did Beethoven get rid of his chickens? All they said was Bach, Bach, Bach...!",
  },
  {
    id: 4,
    joke: "Why did the droid cross the road? Because it was programmed by a chicken!",
  },
  {
    id: 5,
    joke: "Which bird has wings but cannot fly? A roast chicken!",
  },
];
//console.log(jokes);
server.use(express.static("public"));
server.get("/jokes", (req, res) => {
  res.send(jokes);
});

server.get("/:id", (req, res) => {
  const id = +req.params.id;
  const [joke] = jokes.filter((joke) => joke.id === id);
  res.status(200).send(joke);
});

server.get("/jokes/health", (req, res) => {
  res.status(200).send({
    bd: "down",
    server: "up",
    version: pkg.version,
  });
});

server.get("/jokes/random", (req, res) => {
  const id = +req.params.id;
  const random = Math.floor(Math.random() * jokes.length + 1);
  const [joke] = jokes.filter((joke) => joke.id === random);
  res.status(200).send(joke);
});

server.listen(4000);
