import React from 'react';
import { Stack } from '@mui/system';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { createTheme, ThemeProvider, styled } from '@mui/material';
import CancelIcon from '@mui/icons-material/AlarmOff';
import ActiveIcon from '@mui/icons-material/MoreTime';
import CompleteIcon from '@mui/icons-material/AlarmOn';
import { Box } from '@mui/material';
import { nextStepContext } from '../Context/NextStepContextProvider';
import ListIcon from '@mui/icons-material/List';
import AddIcon from '@mui/icons-material/AddCircleOutlineOutlined';

const theme = createTheme({
  components: {
    // Name of the component
    MuiAccordion: {
      styleOverrides: {
        // Name of the slot
        root: {
          boxShadow: 'none',
          backgroundColor: '#F6F6F6',
        },
      },
    },
    MuiAccordionSummary: {
      styleOverrides: {
        root: {
          flexDirection: 'row-reverse',
          gap: '5px',
        },
      },
    },
  },
});

const boxStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '5px',
  cursor: 'pointer',
};

function Sidebar(props) {
  const { nextStepObj, setNextStepObj } = React.useContext(nextStepContext);

  const allHandler = () => {
    setNextStepObj({
      ...nextStepObj,
      filteredStatusBookingsCard: 'all',
      showAllBookings: true,
      b2bPageIndex: null,
      showModifyPage: false,
    });
  };

  const completedHandler = () => {
    setNextStepObj({
      ...nextStepObj,
      filteredStatusBookingsCard: 'completed',
      showAllBookings: true,
      b2bPageIndex: null,
      showModifyPage: false,
    });
  };

  const optionalHandler = () => {
    setNextStepObj({
      ...nextStepObj,
      filteredStatusBookingsCard: 'optional',
      showAllBookings: true,
      b2bPageIndex: null,
      busViewController: true,
      showModifyPage: false,
    });
  };

  const canceledHandler = () => {
    setNextStepObj({
      ...nextStepObj,
      filteredStatusBookingsCard: 'canceled',
      showAllBookings: true,
      b2bPageIndex: null,
      busViewController: true,
      showModifyPage: false,
    });
  };

  const newBookingHandler = () => {
    setNextStepObj({
      ...nextStepObj,
      b2bPageIndex: 1,
      busViewController: true,
      showAllBookings: false,
      showNewBooking: true,
      showModifyPage: false,
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <Stack sx={{ width: '90%', marginLeft: '25px' }}>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Κρατήσεις</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Stack spacing={1}>
              <Box sx={boxStyle} onClick={allHandler}>
                <ListIcon />
                <Typography variant="body2" pt={'5px'}>
                  Όλες
                </Typography>
              </Box>
              <Box sx={boxStyle} onClick={completedHandler}>
                <CompleteIcon />
                <Typography variant="body2" pt={'5px'}>
                  Ολοκληρωμένες
                </Typography>
              </Box>
              <Box sx={boxStyle} onClick={optionalHandler}>
                <ActiveIcon />
                <Typography variant="body2" pt={'5px'}>
                  Ενεργές
                </Typography>
              </Box>
              <Box sx={boxStyle} onClick={canceledHandler}>
                <CancelIcon />
                <Typography variant="body2" pt={'5px'}>
                  Ακυρωμένες
                </Typography>
              </Box>
              <Box sx={boxStyle} onClick={newBookingHandler}>
                <AddIcon />
                <Typography variant="body2" pt={'5px'}>
                  Nέα κράτηση
                </Typography>
              </Box>
            </Stack>
          </AccordionDetails>
        </Accordion>
      </Stack>
    </ThemeProvider>
  );
}

export default Sidebar;
