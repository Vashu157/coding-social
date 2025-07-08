import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';
import GitHubIcon from '@mui/icons-material/GitHub';
import CodeIcon from '@mui/icons-material/Code';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';

import { useState, useEffect } from 'react';
import { fetchLeetcodeProfile } from '../utils/fetchProfiles';
export default function UserCard({ user }) {
  const { name, email, github_username, leetcode_username, codeforces_username } = user;
  const [leetData,setLeetData] = useState(null);
  const [leetBoxVisible, setLeetBoxVisible] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    alert("📋 Email copied to clipboard!");
  };
  const handleMouseEnter = async()=>{
    setLeetBoxVisible(true);
    if(leetcode_username && !leetData){
      const data = await fetchLeetcodeProfile(leetcode_username);
      setLeetData(data[0]);
    }
  }
  const handleMouseLeave = () => {
    setLeetBoxVisible(false);
  }

  return (
    <Box sx={{ minWidth: 300, maxWidth: 380, m: 2 }}>
      <Card
        variant="outlined"
        sx={{
          p: 2,
          borderRadius: 3,
          boxShadow: 3,
          transition: '0.3s',
          '&:hover': {
            boxShadow: 6,
            transform: 'scale(1.02)',
          },
        }}
      >
        <CardContent>
          <Typography variant="h5" component="div" fontWeight="bold" gutterBottom>
            <strong className='text-orange-600'>{name}</strong>
          </Typography>

          <Box display="flex" alignItems="center" gap={1} mb={2}>
            <Typography variant="body1" color="text.secondary">
              {email}
            </Typography>
            <ContentCopyOutlinedIcon
              fontSize="small"
              sx={{ cursor: 'pointer', color: 'gray' }}
              onClick={handleCopy}
            />
          </Box>

          <Typography variant="subtitle2" fontWeight="medium" gutterBottom>
            Coding Profiles:
          </Typography>

          <CardActions sx={{ px: 0, pt: 0 }}>
            {github_username && (
              <Button
                size="small"
                startIcon={<GitHubIcon />}
                href={`https://github.com/${github_username}`}
                target="_blank"
              >
                GitHub
              </Button>
            )}
{leetcode_username && (
  <div
    className="relative inline-block"
    onMouseEnter={handleMouseEnter}
    onMouseLeave={() => setLeetBoxVisible(false)}
  >
    <a
      href={`https://leetcode.com/u/${leetcode_username}`}
      target="_blank"
      className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 rounded hover:bg-gray-200"
    >
      <CodeIcon fontSize="small" />
      LeetCode
    </a>

    {/* Hover Dialog Box */}
    {leetBoxVisible && leetData && (
      <div className="absolute top-full left-0 mt-2 w-64 bg-white border shadow-lg rounded-lg p-3 z-50">
        <div className="flex items-center gap-2 mb-2">
          <img
            src={leetData.avatar}
            alt="avatar"
            className="w-10 h-10 rounded-full"
          />
          <div>
            <p className="font-semibold">{leetData.realName}</p>
            <p className="text-sm text-gray-500">Ranking: {leetData.ranking}</p>
          </div>
        </div>
        <div className="text-sm">
          <p>★ {leetData.starRating}</p>
          <p>Total Solved: {leetData.totalSolved}</p>
          <p>
            Easy: {leetData.easySolved} | Medium: {leetData.mediumSolved} | Hard: {leetData.hardSolved}
          </p>
        </div>
      </div>
    )}
  </div>
)}

            {codeforces_username && (
              <Button
                size="small"
                startIcon={<SportsEsportsIcon />}
                href={`https://codeforces.com/profile/${codeforces_username}`}
                target="_blank"
              >
                Codeforces
              </Button>
            )}
          </CardActions>
        </CardContent>
      </Card>
    </Box>
  );
}
