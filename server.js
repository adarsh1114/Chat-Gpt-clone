// const express = require("express");
// const morgan = require("morgan");
// const cors = require("cors");
// const bodyParser = require("body-parser");
// const colors = require("colors");
// const dotenv = require("dotenv");
// const connectDB = require("./config/db");
// const errorHandler = require("./middelwares/errorMiddleware");


// //routes path
// const authRoutes = require("./routes/authRoutes");

// //dotenv
// dotenv.config();

// //mongo connection
// connectDB();

// //rest object
// const app = express();

// //middlewares
// app.use(cors());
// app.use(express.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(morgan("dev"));
// app.use(errorHandler)


// const PORT = process.env.PORT || 8080;

// //API routes
// app.use("/api/v1/auth", authRoutes);
// app.use("/api/v1/openai", require("./routes/openaiRoutes"));

// app.post('/api/v1/openai/paragraph', (req, res) => {
//   const { text } = req.body;
//   // Process the text and generate a paragraph
//   const generatedParagraph = "Your generated paragraph based on the input text.";
//   res.json({ paragraph: generatedParagraph });
// });

// //listen server
// app.listen(PORT, () => {
//   console.log(
//     `Servern Running in ${process.env.DEV_MODE} mode on port no ${PORT}`.bgCyan
//       .white
//   );
// });
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const colors = require("colors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

// routes path
const authRoutes = require("./routes/authRoutes");
const openaiRoutes = require("./routes/openaiRoutes");
const errorHandler = require("./middelwares/errorMiddleware");

// dotenv
dotenv.config();

// mongo connection
connectDB();

// rest object
const app = express();

// middlewares
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));

// API routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/openai", openaiRoutes);

// error middleware should be the last piece of middleware
app.use(errorHandler);

const PORT = process.env.PORT || 8080;

// listen server
app.listen(PORT, () => {
  console.log(
    `Server running in ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan.white
  );
});
