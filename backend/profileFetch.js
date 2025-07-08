import { LeetCode } from "leetcode-query";
const leetcode = new LeetCode();

const fetchLeetcode = async (username) => {
  try {
    const data = await leetcode.user(username);

    const profile = data?.matchedUser?.profile || {};
    const stats = data?.matchedUser?.submitStats?.acSubmissionNum || [];
    const recentRaw = data?.recentSubmissionList || [];
    const badges = data?.matchedUser?.badges || [];
    const activeBadgeId = data?.matchedUser?.activeBadge?.id;

    const activeBadge = badges.find(b => b.id === activeBadgeId);

    return {
      username,
      avatar: profile.userAvatar,
      realName: profile.realName,
      ranking: profile.ranking,
      starRating: profile.starRating,
      totalSolved: stats.find(x => x.difficulty === "All")?.count || 0,
      easySolved: stats.find(x => x.difficulty === "Easy")?.count || 0,
      mediumSolved: stats.find(x => x.difficulty === "Medium")?.count || 0,
      hardSolved: stats.find(x => x.difficulty === "Hard")?.count || 0,
}
  } catch (err) {
    console.error("Error fetching LeetCode data:", err.message);
    throw err;
  }
};
export const fetchGithub = async (username) => {
  try {
    const response = await fetch(`https://api.github.com/users/${username}`);
    const data = await response.json();

    return {
      username: data.login,
      avatar: data.avatar_url,
      publicRepos: data.public_repos,
      createdAt: data.created_at,
      name: data.name,
      bio: data.bio,
    };
  } catch (err) {
    console.error("Error fetching GitHub data:", err.message);
    throw err;
  }
};


export default fetchLeetcode;
