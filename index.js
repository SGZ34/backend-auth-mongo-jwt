import app from "./src/app.js";
import { PORT } from "./src/config.js";
import { connectDB } from "./src/db.js";
connectDB();
app.listen(PORT, () => {
  console.log("server on port", PORT);
});
