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
    //   recentSubmissions: recentRaw.slice(0, 3).map(sub => ({
    //     title: sub.title,
    //     status: sub.statusDisplay,
    //     lang: sub.lang
    //   })),
    //   activeBadge: activeBadge
    //     ? {
    //         name: activeBadge.displayName,
    //         icon: activeBadge.icon
    //       }
    //     : null
    // };
}
  } catch (err) {
    console.error("Error fetching LeetCode data:", err.message);
    throw err;
  }
};

export default fetchLeetcode;
