import dotenv from "dotenv";
dotenv.config();

export async function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.status(401).json({ message: "User is not authenticated" });
    res.redirect(process.env.CLIENT_BASE_URL + '/login');
}