import fetch from 'node-fetch';
import User from '../models/user.models.js';

export const getUserProfileAndRepos = async (req, res) => {

    const { username } = req.params;
    try {
        const userRes = await fetch(`https://api.github.com/users/${username}`, {
            headers: {
                authorization: `token ${process.env.GITHUB_API_KEY}`
            },
        });

        const userProfile = await userRes.json();

        const repoRes = await fetch(`https://api.github.com/users/${username}/repos`, {
            headers: {
                authorization: `token ${process.env.GITHUB_API_KEY}`
            },
        });

        const repos = await repoRes.json();
        res.status(200).json({ userProfile, repos });

    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }

}

export const likeProfile = async (req, res) => {
    try {
        const { username } = req.params;
        const user = await User.findById(req.user._id.toString());
        console.log(user, "auth")
        const userToLike = await User.findOne({ username: username });
        if (!userToLike) {
            return res.status(404).json({ message: "User not found" });
        }
        if (user.likedUsers.includes(usetToLike.username)) {
            return res.status(400).json({ message: "User already liked" });
        }
        userToLike.likedBy.push({ username: user.username, avtarUrl: user.avtarUrl, likedDate: Date.now() });
        user.likedProfiles.push(userToLike.username);

        // await userToLike.save();
        // await user.save();

        await Promise.all([userToLike.save(), user.save()]);
        res.status(200).json({ message: "User liked successfully" });

    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }


}

export const getLikes = async (req, res) => {
    try {
        const user = await User.findById(req.user._id.toString());
        // const likedProfiles = await User.find({ username: { $in: user.likedProfiles } });
        res.status(200).json({ likedBy: user.likedBy });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }

}