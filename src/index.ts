import cors from "cors";
import express from "express";
import routes from "./api/routes";

export const app = express();

/* Middlewares */
app.use(express.json());
app.use(cors({ origin: "*" }));

/* Routes */
app.use(routes);

/* Start Server */
const port = parseInt(process.env.PORT || "3000");

app.listen(port, "0.0.0.0", () => {
  console.log(`Server started on port ${port}`);
});
