// import express from "express"
// import cors from "cors"
// import cookieParser from "cookie-parser"

// const app = express()

// // app.use(cors({
// //     origin: process.env.CORS_ORIGIN
// // }))

// app.use(cors({
//     origin: 'https://contact-manager-2268.onrender.com',  // Replace with your frontend origin
//     methods: ['GET', 'PUT', 'POST', 'PATCH', 'DELETE'],
//     allowedHeaders: ['Content-Type', 'Authorization'],  // Allow specific headers
//     credentials: true
// }));



// app.use(express.json())

// app.use(express.urlencoded({extended: true}))

// app.use(express.static("public"))

// app.use(cookieParser())

// app.use((req, res, next) => {
//     console.log(`[${req.method}] ${req.url}`);
//     next();
// });



// // user routes import
// import userRouter from "./routes/user.routes.js"

// //routes declaration
// app.use("/users", userRouter)

// // contact routes import
// import contactRouter from "./routes/contact.routes.js"

// //routes declaration
// app.use("/contacts", contactRouter)

// // Serve static files (this comes after the API routes)
// app.use(express.static(path.join(__dirname, 'dist')));
// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, 'dist', 'index.html'));
// });

// export default app

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";

const app = express();

// Middleware for CORS
app.use(
  cors({
    origin: "https://contact-manager-2268.onrender.com", // Replace with your frontend origin
    methods: ["GET", "PUT", "POST", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// Middleware for parsing JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Serve static files
const __dirname = path.resolve(); // Get the directory name
app.use(express.static(path.join(__dirname, "dist"))); // Serve the React frontend

// Logger middleware
app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.url}`);
  next();
});

// Import and use user routes
import userRouter from "./routes/user.routes.js";
app.use("/users", userRouter);

// Import and use contact routes
import contactRouter from "./routes/contact.routes.js";
app.use("/contacts", contactRouter);

// Fallback for React Router (must be after API routes)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

// Export the app
export default app;
