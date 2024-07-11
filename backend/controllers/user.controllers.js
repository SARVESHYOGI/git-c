import fetch from 'node-fetch';

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

// import fetch from 'node-fetch';

// export const getUserProfileAndRepos = async (req, res) => {
//     const { username } = req.params;
//     try {
//         const userRes = await fetch(`https://api.github.com/users/${username}`, {
//             headers: {
//                 authorization: `token ${process.env.GITHUB_API_KEY}`
//             },
//         });

//         if (!userRes.ok) {
//             return res.status(userRes.status).json({ message: `GitHub API Error: ${userRes.statusText}` });
//         }

//         const userProfile = await userRes.json();

//         const repoRes = await fetch(`https://api.github.com/users/${username}/repos`, {
//             headers: {
//                 authorization: `token ${process.env.GITHUB_API_KEY}`
//             },
//         });

//         if (!repoRes.ok) {
//             return res.status(repoRes.status).json({ message: `GitHub API Error: ${repoRes.statusText}` });
//         }

//         const repos = await repoRes.json();
//         res.status(200).json({ userProfile, repos });

//     } catch (error) {
//         res.status(500).json({ message: 'Server Error' });
//     }
// };
