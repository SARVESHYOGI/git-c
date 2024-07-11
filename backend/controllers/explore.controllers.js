import fetch from 'node-fetch';
export const explorePopularRepos = async (req, res) => {
    const { language } = req.params;
    try {
        const response = await fetch(`https://api.github.com/search/repositories?q=language:${language}&sort=stars&order=desc&per_page=10`, {
            headers: {
                // 'Content-Type': 'application/json',
                authorization: `token ${process.env.GITHUB_API_KEY}`
            }
        });
        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// import fetch from 'node-fetch';

// export const explorePopularRepos = async (req, res) => {
//     const { language } = req.params;
//     try {
//         const response = await fetch(`https://api.github.com/search/repositories?q=language:${language}&sort=stars&order=desc&per_page=10`, {
//             headers: {
//                 authorization: `token ${process.env.GITHUB_API_KEY}`
//             }
//         });

//         if (!response.ok) {
//             return res.status(response.status).json({ message: `GitHub API Error: ${response.statusText}` });
//         }

//         const data = await response.json();

//         const repositories = data.items.map(repo => ({
//             id: repo.id,
//             name: repo.name,
//             full_name: repo.full_name,
//             html_url: repo.html_url,
//             description: repo.description,
//             stargazers_count: repo.stargazers_count,
//             language: repo.language
//         }));

//         res.status(200).json({ repositories });
//     } catch (error) {
//         res.status(500).json({ message: `Server Error: ${error.message}` });
//     }
// };

