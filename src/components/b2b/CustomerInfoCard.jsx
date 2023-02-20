import React from 'react';
import {
  createTheme,
  ThemeProvider,
  styled,
  Typography,
  Stack,
} from '@mui/material';
import { Card } from '@mui/material';
import { Box } from '@mui/material';
import { nextStepContext } from '../Context/NextStepContextProvider';

const theme = createTheme({
  palette: {
    primary: {
      main: '#FFFFFF',
    },
    secondary: {
      main: '#FFB30B',
    },
  },
});

function CustomerInfoCard({ icon, text, info, option }) {
  const { nextStepObj, setNextStepObj } = React.useContext(nextStepContext);

  const clickHandler = () => {
    switch (option) {
      case 1:
        setNextStepObj({
          ...nextStepObj,
          filteredStatusBookingsCard: 'all',
          showAllBookings: true,
        });
        break;
      case 2:
        break;
      case 3:
        setNextStepObj({
          ...nextStepObj,
          filteredStatusBookingsCard: 'optional',
          showAllBookings: true,
        });
        break;
    }
  };

  const receivedIcon = React.cloneElement(icon);
  return (
    <ThemeProvider theme={theme}>
      <Card
        onClick={clickHandler}
        variant="outlined"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: {
            md: '350px',
            sm: '230px',
            xs: '230px',
          },
          height: {
            md: '70px',
            sm: '100px',
            xs: '100px',
          },
          paddingRight: '20px',
          overflow: 'hidden',
          cursor: `${option === 2 ? 'auto' : 'pointer'}`,
        }}
      >
        <Box
          sx={{
            backgroundColor: theme.palette.secondary.main,
            borderBottomRightRadius: '1000px',
            borderTopRightRadius: '500px',
          }}
        >
          {receivedIcon}
        </Box>
        <Stack spacing={1} alignItems="center" justifyContent="center">
          <Typography
            variant="subtitle1"
            sx={{
              paddingLeft: { sm: '25px', xs: '25px' },
              fontSize: {
                xs: 'inherit',
                md: '12px',
                lg: 'inherit',
              },
            }}
          >
            {text}
          </Typography>
          <Typography variant="subtitle2">{info}</Typography>
        </Stack>
      </Card>
    </ThemeProvider>
  );
}

export default CustomerInfoCard;
