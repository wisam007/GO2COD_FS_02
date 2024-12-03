const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const port = process.env.PORT || 5000;
const connectDB = require("./config/db");
const { errorHandler } = require("./middleware/errorMiddleware");
const cors = require("cors");
connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/products", require("./routes/productRoutes"));
app.use(errorHandler);

app.listen(port, () => {
  console.log(`server is listening on port ${port}`);
});
