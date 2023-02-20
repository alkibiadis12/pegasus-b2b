import React from 'react';
import { Box } from '@mui/system';
import { Typography } from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { Badge } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#ffb30b',
    },
  },
});

export default function PeopleCounter({
  peopleCounter,
  setPeopleCounter,
  text,
  price,
  setShowAlert,
  altText,
}) {
  const clickHandler = (minusOrPlus, setPeopleCounter) => {
    if (minusOrPlus === '+') {
      if (
        (text === 'Children' || text === 'Infants') &&
        peopleCounter.adults === 0 &&
        peopleCounter.seniors === 0
      ) {
        setShowAlert(true);
      }
      if (text === 'Adults' || text === 'Seniors') {
        setShowAlert(false);
      }

      setPeopleCounter(prev => {
        return {
          ...prev,
          [text.toLowerCase()]: Number(prev[text.toLowerCase()] + 1),
        };
      });
    } else if (
      minusOrPlus === '-' &&
      Number(peopleCounter[text.toLowerCase()] > 0)
    ) {
      setPeopleCounter(prev => {
        return {
          ...prev,
          [text.toLowerCase()]: Number(prev[text.toLowerCase()] - 1),
        };
      });
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <ThemeProvider theme={theme}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {text === 'Adults' && <Typography variant="h6">{altText}</Typography>}
          {text === 'Seniors' && (
            <Typography variant="h6">{altText}</Typography>
          )}
          {text === 'Children' && (
            <Badge
              // sx={{ backgroundColor: 'inherit' }}
              color="primary"
              badgeContent={'5 - 12'}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
            >
              <Typography variant="h6">{altText}</Typography>
            </Badge>
          )}
          {text === 'Infants' && (
            <Badge
              color="primary"
              badgeContent={'0 - 5'}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
            >
              <Typography variant="h6">{altText}</Typography>
            </Badge>
          )}
        </Box>
      </ThemeProvider>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-around',
          gap: '10px',
          backgroundColor: '#fff',
          border: '2px solid #ffb30b',
          width: '130px',
          height: '40px',
        }}
      >
        <RemoveIcon
          fontSize="large"
          onClick={() => clickHandler('-', setPeopleCounter)}
          sx={{ cursor: 'pointer', paddingLeft: '10px' }}
        />
        <Typography variant="h6">
          {peopleCounter[text.toLowerCase()]}
        </Typography>

        <AddIcon
          fontSize="large"
          onClick={() => clickHandler('+', setPeopleCounter)}
          sx={{ cursor: 'pointer', paddingRight: '10px' }}
        />
      </Box>
      <Box>
        <Typography variant="h6">
          €
          {/* {Math.round(
            (price * Number(peopleCounter[text.toLowerCase()] * 100)) / 100
          ).toFixed(2)} */}
          {Math.round((price * 100) / 100).toFixed(2)}
        </Typography>
      </Box>
    </Box>
  );
}
