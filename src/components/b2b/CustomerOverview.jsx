import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import { createTheme, ThemeProvider, styled } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { Box } from '@mui/system';
import { motion } from 'framer-motion';
import CustomerInfoCard from './CustomerInfoCard';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import EuroOutlinedIcon from '@mui/icons-material/EuroOutlined';
import ActiveIcon from '@mui/icons-material/MoreTime';

import AddIcon from '@mui/icons-material/AddOutlined';
import VisibilityIcon from '@mui/icons-material/VisibilityOutlined';
import CustomerUtilityCard from './CustomerUtilityCard';
import { nextStepContext } from '../Context/NextStepContextProvider';
import BookingsCard from './BookingsCard';
import SearchBar from './SearchBar';
import NewBooking from './NewBooking';
import Page2b2b from './Page2b2b';
import Page3b2b from './Page3b2b';

const theme = createTheme({
  palette: {
    primary: {
      main: '#F6F6F6',
    },
    secondary: {
      main: '#FFFFFF',
    },
  },
});

function CustomerOverview({
  data,
  pageIndex,
  setPageIndex,
  cruises,
  setCruises,
  searchParams,
  setSearchParams,
}) {
  const [sidebarStatus, setSidebarStatus] = React.useState(true);
  const { nextStepObj, setNextStepObj } = React.useContext(nextStepContext);

  React.useEffect(() => {
    setNextStepObj({
      ...nextStepObj,
      b2bPageIndex: 1,
      customerId: data.customerID,
    });
  }, []);

  React.useEffect(() => {
    if (nextStepObj?.busViewController === 'false') {
      setNextStepObj({ ...nextStepObj, b2bPageIndex: 2 });
    }
  }, [nextStepObj?.busViewController]);

  const showBookingsHandler = () => {
    setNextStepObj({ ...nextStepObj, showAllBookings: true });
  };

  const showNewBookingHandler = () => {
    setNextStepObj({ ...nextStepObj, showNewBooking: true });
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid
        container
        // sos
        sx={{ backgroundColor: theme.palette.primary.main }}
      >
        <Grid xs={12}>
          <Header
            setSidebarStatus={setSidebarStatus}
            customerName={data.customerName}
            setPageIndex={setPageIndex}
          />
        </Grid>

        {sidebarStatus && (
          <Grid
            md={2.5}
            xs={12}
            sx={{
              padding: '10px 10px 0 0',
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.5, x: '-100%' }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Sidebar />
            </motion.div>
          </Grid>
        )}
        <Grid
          md={sidebarStatus ? 9.5 : 12}
          xs={12}
          sx={{
            padding: '0 0px 0px 0px',
            height: '100vh',
          }}
        >
          {!nextStepObj?.showAllBookings && !nextStepObj?.showNewBooking && (
            <Box
              sx={{
                backgroundColor: theme.palette.secondary.main,
                padding: '20px',
                borderRadius: '10px',
                height: '100vh',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: {
                    md: 'row',
                    sm: 'column',
                    xs: 'column',
                  },
                  alignItems: {
                    md: 'flex-start',
                    sm: 'center',
                    xs: 'center',
                  },
                  justifyContent: 'space-around',
                  gap: '15px',
                }}
              >
                <CustomerInfoCard
                  icon={
                    <CalendarMonthIcon
                      fontSize="large"
                      sx={{
                        boxSizing: 'content-box',
                        padding: '50px 50px 50px 20px',
                        color: '#fff',
                      }}
                    />
                  }
                  text="Συνολικές Κρατήσεις"
                  info={data.totalBookings}
                  option={1}
                />
                <CustomerInfoCard
                  icon={
                    <EuroOutlinedIcon
                      fontSize="large"
                      sx={{
                        boxSizing: 'content-box',
                        padding: '50px 50px 50px 20px',
                        color: '#fff',
                      }}
                    />
                  }
                  text="Συνολικά Κέρδη"
                  info={`€ ${data.totalEarnings}`}
                  option={2}
                />
                <CustomerInfoCard
                  icon={
                    <ActiveIcon
                      fontSize="large"
                      sx={{
                        boxSizing: 'content-box',
                        padding: '50px 50px 50px 20px',
                        color: '#fff',
                      }}
                    />
                  }
                  text="Ενεργές Κρατήσεις"
                  info={data.activeBookings}
                  option={3}
                />
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: {
                    md: 'row',
                    sm: 'column',
                    xs: 'column',
                  },
                  alignItems: 'center',
                  gap: '15px',
                  marginTop: '20px',
                  justifyContent: 'space-around',
                }}
              >
                <Box>
                  <CustomerUtilityCard
                    icon={
                      <AddIcon
                        sx={{
                          fontSize: {
                            md: '100px',
                            sm: '70px',
                            xs: '70px',
                          },
                        }}
                      />
                    }
                    text="ΚΑΤΑΧΩΡΗΣΗ ΝΕΑΣ ΚΡΑΤΗΣΗΣ"
                    showNewBookingHandler={showNewBookingHandler}
                    option={1}
                  />
                </Box>

                <Box>
                  <CustomerUtilityCard
                    icon={
                      <VisibilityIcon
                        sx={{
                          fontSize: {
                            md: '100px',
                            sm: '70px',
                            xs: '70px',
                          },
                        }}
                      />
                    }
                    text="ΠΡΟΒΟΛΗ ΚΡΑΤΗΣΕΩΝ"
                    showBookingsHandler={showBookingsHandler}
                    option={2}
                  />
                </Box>
                <Box sx={{ width: '350px' }} />
              </Box>
            </Box>
          )}
          {/* --------------------------------------------------------- */}
          {nextStepObj?.showAllBookings && !nextStepObj?.showModifyPage && (
            <Box
              sx={{
                // backgroundColor: theme.palette.secondary.main,
                padding: '20px',
                borderRadius: '10px',
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
                gap: '20px',
                marginBottom: '50px',
                backgroundColor: '#F6F6F6',

                // height: '100vh',
              }}
            >
              <SearchBar />
              <BookingsCard
                data={data.bookingsArray}
                status={nextStepObj?.filteredStatusBookingsCard}
              />
            </Box>
          )}
          {nextStepObj?.showNewBooking && nextStepObj?.b2bPageIndex === 1 && (
            <NewBooking
              pageIndex={pageIndex}
              cruises={cruises}
              setCruises={setCruises}
              searchParams={searchParams}
              setSearchParams={setSearchParams}
            />
          )}
          {nextStepObj?.showNewBooking && nextStepObj?.b2bPageIndex === 2 && (
            <Box sx={{ backgroundColor: '#fff' }}>
              <Page2b2b data={nextStepObj} />
            </Box>
          )}
          {nextStepObj?.showNewBooking && nextStepObj?.b2bPageIndex === 3 && (
            <Page3b2b data={nextStepObj} option={'submit'} />
          )}
          {nextStepObj?.showModifyPage && (
            <Page3b2b
              data={nextStepObj.selectedBookingCardInfo}
              option={'modify'}
            />
          )}
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default CustomerOverview;
