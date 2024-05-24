import { Typography, Box } from '@mui/material';

type Proptype = {
  text: string;
};

const CenteredText = ({ text }: Proptype) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <Typography variant="h6" align="center">
        {text}
      </Typography>
    </Box>
  );
};

export default CenteredText;
