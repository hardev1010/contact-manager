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
import path from "path"; // Required for handling file paths
import { fileURLToPath } from "url"; // Needed to resolve '__dirname'

const app = express();

// Resolve '__dirname' in ES6 modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// CORS configuration
app.use(cors({
    origin: 'https://contact-manager-2268.onrender.com', // Replace with your frontend origin
    methods: ['GET', 'PUT', 'POST', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'], 
    credentials: true
}));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static("public"));

// Log requests
app.use((req, res, next) => {
    console.log(`[${req.method}] ${req.url}`);
    next();
});

// Import routes
import userRouter from "./routes/user.routes.js";
import contactRouter from "./routes/contact.routes.js";

// Declare routes
app.use("/users", userRouter);
app.use("/contacts", contactRouter);

// Serve React frontend for any unhandled routes
const frontendPath = path.join(__dirname, "frontend", "dist"); // Adjust based on your project structure
app.use(express.static(frontendPath));
app.get("*", (req, res) => {
    res.sendFile(path.join(frontendPath, "index.html"));
});

export default app;

