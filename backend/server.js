import express from 'express';
import userRoutes from './routes/user.route.js';
import exploreRoutes from './routes/explore.route.js';
import dotenv from 'dotenv';
import cors from 'cors';
import connectMongoDB from './db/connectMongoDB.js';
import authRoutes from './routes/auth.route.js';
import "./passport/github.auth.js";
import passport from 'passport';
import session from 'express-session';
import path from 'path';


dotenv.config();

const app = express();
app.use(cors());

// app.get('/', (req, res) => {
//     res.send('Hello World');
// });
app.use(session({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));
// Initialize Passport!  Also use passport.session() middleware, to support
// persistent login sessions (recommended).
app.use(passport.initialize());
app.use(passport.session());
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/explore", exploreRoutes);

const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, '/frontend/dist')));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    connectMongoDB();
});
