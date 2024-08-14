import dotenv from "dotenv";
import app from "./app";

dotenv.config();
const port = process.env.SERVER_PORT;

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
