import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { createTheme, ThemeProvider, styled, Typography } from '@mui/material';
import logo from '../../assets/logo_black.png';
import Grid from '@mui/material/Unstable_Grid2';
import { Avatar } from '@mui/material';
import { nextStepContext } from '../Context/NextStepContextProvider';
import useMediaQuery from '@mui/material/useMediaQuery';

const theme = createTheme({
  components: {
    // Name of the component
    MuiAppBar: {
      styleOverrides: {
        // Name of the slot
        root: {
          boxShadow: 'none',
          borderBottom: '1px solid black',
        },
      },
    },
  },
});

export default function Header({
  setSidebarStatus,
  customerName,
  setPageIndex,
}) {
  const { nextStepObj, setNextStepObj } = React.useContext(nextStepContext);

  const clickHandler = () => {
    setSidebarStatus(prev => !prev);
  };

  const clickLogoHandler = () => {
    // nextStepObj?.showAllBookings

    setNextStepObj({
      ...nextStepObj,
      showAllBookings: false,
      showNewBooking: false,
      filteredStatusBookingsCard: 'all',
      busViewController: true,
      b2bPageIndex: 1,
      showModifyPage: false,
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <AppBar position="static" color="transparent">
        <Toolbar>
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            sx={{ width: '100%' }}
          >
            <Grid xs={3.5} sm={4.5} md={5} lg={5.5}>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="open drawer"
                sx={{ mr: 2 }}
                onClick={clickHandler}
              >
                <MenuIcon />
              </IconButton>
            </Grid>
            <Grid
              xs={8.5}
              sm={7.5}
              md={7}
              lg={6.5}
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: { sm: 'center', xs: 'center' },
              }}
            >
              <Box sx={{ cursor: 'pointer' }} onClick={clickLogoHandler}>
                <img
                  src={logo}
                  alt="Pegasus Cruises logo"
                  width="130px"
                  id="pegasusLogo"
                />
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Avatar
                  sx={{
                    bgcolor: 'inherit',
                    color: 'black',
                    border: '1px solid black',
                    display: { md: 'inherit', xs: 'none', sm: 'none' },
                  }}
                >
                  {customerName.slice(0, 2).toUpperCase()}
                </Avatar>
                <Typography
                  variant={
                    useMediaQuery(theme.breakpoints.down('md'))
                      ? 'caption'
                      : 'subtitle1'
                  }
                >
                  {customerName}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
}
