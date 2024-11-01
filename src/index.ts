import express from "express";

const app = express();

app.get("/", function (req: express.Request, res: express.Response) {
  res.status(400).send("Hello World!");
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server started on port 3000");
});
