import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function UserCard({ user }) {
  const { name, email, github_username, leetcode_username, codeforces_username } = user;

  return (
    <Box sx={{ minWidth: 300, maxWidth: 400, m: 2 }}>
      <Card variant="outlined">
        <CardContent>
          <Typography variant="h6" component="div" gutterBottom>
            {name}
          </Typography>
          <Typography sx={{ color: 'text.secondary', fontSize: 14 }} gutterBottom>
            {email}
          </Typography>

          <Box mt={2}>
            {github_username && (
              <Button
                size="small"
                href={`https://github.com/${github_username}`}
                target="_blank"
              >
                GitHub
              </Button>
            )}
            {leetcode_username && (
              <Button
                size="small"
                href={`https://leetcode.com/u/${leetcode_username}`}
                target="_blank"
              >
                LeetCode
              </Button>
            )}
            {codeforces_username && (
              <Button
                size="small"
                href={`https://codeforces.com/profile/${codeforces_username}`}
                target="_blank"
              >
                Codeforces
              </Button>
            )}
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
