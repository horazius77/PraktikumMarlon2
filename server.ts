import express from "express";

const app = express();
const port = 80;

app.use(express.static("public"));

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

app.get("/", (req: express.Request, res: express.Response) => {
  // res.send('<a href="/todo.html">Zur Todo-App</a>');
  res.redirect("/todo.html");
});
