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

export default function UserCard({ user }) {
  const { name, email, github_username, leetcode_username, codeforces_username } = user;

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    alert("📋 Email copied to clipboard!");
  };

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
              <Button
                size="small"
                startIcon={<CodeIcon />}
                href={`https://leetcode.com/u/${leetcode_username}`}
                target="_blank"
              >
                LeetCode
              </Button>
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
