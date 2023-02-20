import React from 'react';
import { Card, Typography, Box } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { createTheme } from '@mui/material';
import { ThemeProvider } from '@mui/material';

const theme = createTheme();

function CustomerUtilityCard({
  icon,
  text,
  showBookingsHandler,
  showNewBookingHandler,
  option,
}) {
  const receivedIcon = React.cloneElement(icon);
  const clickHandler = () => {
    switch (option) {
      case 1:
        showNewBookingHandler();
        break;
      case 2:
        showBookingsHandler();
        break;
    }
  };
  return (
    <ThemeProvider theme={theme}>
      <Card
        onClick={clickHandler}
        variant="outlined"
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: '5px',

          width: {
            md: '350px',
            sm: '230px',
            xs: '230px',
          },
          height: '100px',
          cursor: 'pointer',
        }}
      >
        <Typography
          variant={useMediaQuery(theme.breakpoints.down('md')) ? 'body2' : 'h6'}
          sx={{
            width: {
              md: '200px',
              sm: '150px',
              xs: '150px',
            },
            display: 'flex',
            flexWrap: 'wrap',
            padding: '10px 20px',
          }}
        >
          {text}
        </Typography>

        <Box
          sx={{
            display: {
              md: 'block',
              sm: 'flex',
              xs: 'flex',
            },
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {receivedIcon}
        </Box>
      </Card>
    </ThemeProvider>
  );
}

export default CustomerUtilityCard;
