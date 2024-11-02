import cors from "cors";
import express from "express";
import router from "./api/routes/index.routes";

export const app = express();

/* Middlewares */
app.use(express.json());
app.use(cors({ origin: "*" }));

/* Routes */
app.use(router);

/* Start Server */
app.listen(process.env.PORT || 3000, () => {
  console.log("Server started on port 3000");
});
