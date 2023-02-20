import React from 'react';
import { Box, Breadcrumbs } from '@mui/material';
import ArrowRightOutlinedIcon from '@mui/icons-material/ArrowRightOutlined';
import Typography from '@mui/material/Typography';
import { createTheme } from '@mui/material';
import { ThemeProvider } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useNavigate } from 'react-router-dom';
import { nextStepContext } from '../Context/NextStepContextProvider';
import MenuIcon from '@mui/icons-material/Menu';

let theme = createTheme();
theme = createTheme(theme, {
  components: {
    // Name of the component
    MuiBreadcrumbs: {
      styleOverrides: {
        // Name of the slot
        ol: {
          // [theme.breakpoints.down('lg')]: {
          //   display: 'flex',
          //   flexDirection: 'column',
          // },
          [theme.breakpoints.down('md')]: {
            display: 'flex',
            flexDirection: 'column',
          },
        },
        li: {
          // Some CSS
          // display: 'block',
        },
      },
    },
  },
});

export default function BreadcrumbCustom({ pageIndex, setPageIndex }) {
  const { nextStepObj, setNextStepObj } = React.useContext(nextStepContext);
  const size = useWindowSize();

  const navigate = useNavigate();

  const [text, setText] = React.useState({
    epilogiEkdromis: 'Επιλογή εκδρομής',
    stoixeiaEpivatwn: 'Στοιχεία επιβατών',
    payment: 'Payment',
    ekdosiEisithriwn: 'Έκδοση εισιτηρίων',
  });

  //HANDLING LANGUAGE CHANGES
  React.useEffect(() => {
    switch (nextStepObj.locale) {
      case 'gr':
        setText({
          epilogiEkdromis: 'Επιλογή εκδρομής',
          stoixeiaEpivatwn: 'Στοιχεία επιβατών',
          payment: 'Payment',
          ekdosiEisithriwn: 'Έκδοση εισιτηρίων',
        });
        break;
      case 'uk':
        setText({
          epilogiEkdromis: 'Trip Selection',
          stoixeiaEpivatwn: 'Passenger Information',
          payment: 'Payment',
          ekdosiEisithriwn: 'Issued tickets',
        });
        break;
      case 'fr':
        setText({
          epilogiEkdromis: 'Selección de viaxe',
          stoixeiaEpivatwn: 'Información de pasaxeiros',
          payment: 'Pago',
          ekdosiEisithriwn: 'Tickets emitidos',
        });
        break;
      case 'pl':
        setText({
          epilogiEkdromis: 'Wybór podróży',
          stoixeiaEpivatwn: 'Informacje o pasażerach',
          payment: 'Zapłata',
          ekdosiEisithriwn: 'Wydane bilety',
        });
        break;
      case 'it':
        setText({
          epilogiEkdromis: 'Selezione del viaggio',
          stoixeiaEpivatwn: 'Informazioni sui passeggeri',
          payment: 'Pagamento',
          ekdosiEisithriwn: 'Biglietti emessi',
        });
        break;
    }
  }, [nextStepObj.locale]);

  const handleClick1 = e => {
    let fullDate = nextStepObj.fullDate;
    fullDate =
      fullDate.slice(0, 2) + fullDate.slice(3, 5) + fullDate.slice(6, 10);
    navigate(
      `/?cr=${nextStepObj.cruise_id}&bl=${nextStepObj.boarding_locations_id}&d=${fullDate}&af=${nextStepObj.affiliated}`
    );
    setPageIndex(1);
    window.location.reload();
  };
  const handleClick2 = e => {
    e.preventDefault();
    console.log('hello2');
  };
  const handleClick3 = e => {
    e.preventDefault();
    console.log('hello3');
  };
  const handleClick4 = e => {
    e.preventDefault();
    console.log('hello4');
  };

  const linkStyle = {
    textDecoration: 'none',
    color: '#5BA6FF',
    cursor: 'pointer',
  };

  const breadcrumb = [
    <Typography
      variant="subtitle2"
      key="breadcrumb1"
      color="inherit"
      href="/"
      onClick={e => {
        if (pageIndex === 1) {
          return;
        } else {
          handleClick1(e);
        }
      }}
      sx={{
        color: '#5BA6FF',
        cursor: `${pageIndex === 1 ? 'auto' : 'pointer'}`,
        // display: {
        //   md: 'block',
        //   sm: `${pageIndex === 1 || pageIndex === 2 ? 'block' : 'none'}`,
        //   xs: `${pageIndex === 1 || pageIndex === 2 ? 'block' : 'none'}`,
        // },
      }}
    >
      {text.epilogiEkdromis}
    </Typography>,
    <Typography
      variant="subtitle2"
      key="breadcrumb1"
      color="inherit"
      href="/"
      onClick={e => {
        if (pageIndex === 1 || pageIndex === 2) {
          return;
        } else {
          handleClick2(e);
        }
      }}
      sx={{
        color: `${pageIndex === 1 ? '#ffb30b' : '#5BA6FF'}`,
        cursor: `${pageIndex === 1 || pageIndex === 2 ? 'auto' : 'pointer'}`,
        // display: {
        //   md: 'block',
        //   sm: `${pageIndex === 2 ? 'block' : 'none'}`,
        //   xs: `${pageIndex === 2 ? 'block' : 'none'}`,
        // },
      }}
    >
      {text.stoixeiaEpivatwn}
    </Typography>,
    <Typography
      variant="subtitle2"
      key="breadcrumb1"
      color="inherit"
      href="/"
      onClick={e => {
        if (pageIndex === 1 || pageIndex === 2 || pageIndex === 3) {
          return;
        } else {
          handleClick3(e);
        }
      }}
      sx={{
        color: `${pageIndex === 1 || pageIndex === 2 ? '#ffb30b' : '#5BA6FF'}`,
        cursor: `${
          pageIndex === 1 || pageIndex === 2 || pageIndex === 3
            ? 'auto'
            : 'pointer'
        }`,
        // display: {
        //   md: 'block',
        //   sm: `${pageIndex === 3 ? 'block' : 'none'}`,
        //   xs: `${pageIndex === 3 ? 'block' : 'none'}`,
        // },
      }}
    >
      {text.payment}
    </Typography>,
    <Typography
      variant="subtitle2"
      key="breadcrumb1"
      color="inherit"
      href="/"
      onClick={e => {
        if (
          pageIndex === 1 ||
          pageIndex === 2 ||
          pageIndex === 3 ||
          pageIndex === 4
        ) {
          return;
        } else {
          handleClick4(e);
        }
      }}
      sx={{
        color: `${
          pageIndex === 1 || pageIndex === 2 || pageIndex === 3
            ? '#ffb30b'
            : '#5BA6FF'
        }`,
        cursor: `${
          pageIndex === 1 ||
          pageIndex === 2 ||
          pageIndex === 3 ||
          pageIndex === 4
            ? 'auto'
            : 'pointer'
        }`,
        // display: {
        //   md: 'block',
        //   sm: `${pageIndex === 4 ? 'block' : 'none'}`,
        //   xs: `${pageIndex === 4 ? 'block' : 'none'}`,
        // },
      }}
    >
      {text.ekdosiEisithriwn}
    </Typography>,
  ];

  const [menu, setMenu] = React.useState(
    useMediaQuery(theme.breakpoints.down('md')) ? false : true
  );
  const clickMenuHandler = () => {
    setMenu(oldMenu => !oldMenu);
  };

  let [pageIndicator, setPageIndicator] = React.useState('');
  React.useEffect(() => {
    switch (pageIndex) {
      case 1:
        setPageIndicator(text.epilogiEkdromis);
        break;
      case 2:
        setPageIndicator(text.stoixeiaEpivatwn);

        break;
      case 3:
        setPageIndicator(text.payment);

        break;
      case 4:
        setPageIndicator(text.ekdosiEisithriwn);

        break;
    }
  }, [pageIndex]);

  React.useEffect(() => {
    if (size.width >= 900) {
      setMenu(true);
    }
  });

  return (
    <div>
      <ThemeProvider theme={theme}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#666666',
            color: '#ffb30b',
            position: 'relative',

            height: `${menu ? 'auto' : '60px'}`,
            height: `${size.width > 900 && '45px'}`,

            flexWrap: 'wrap',
            padding: {
              sm: '20px',
              xs: '20px',
              md: '20px 0',
            },
          }}
        >
          {useMediaQuery(theme.breakpoints.down('md')) && (
            <MenuIcon
              sx={{
                position: 'absolute',
                right: 20,
                top: 20,
              }}
              onClick={clickMenuHandler}
            />
          )}
          <Breadcrumbs
            separator={
              useMediaQuery(theme.breakpoints.up('md')) ? (
                <ArrowRightOutlinedIcon
                  sx={{
                    color: '#33363F',
                    fontSize: '35px',
                  }}
                />
              ) : (
                <ExpandMoreIcon
                  sx={{
                    color: '#33363F',
                    fontSize: '35px',
                  }}
                />
              )
            }
            aria-label="breadcrumb"
            sx={{
              color: 'inherit',
              marginTop: `${pageIndex === 1 ? '-15px' : '-13px'}`,
            }}
          >
            {menu && breadcrumb}
          </Breadcrumbs>
          {!menu && (
            <Typography
              variant="body2"
              sx={{
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              {pageIndicator}
            </Typography>
          )}
        </Box>
      </ThemeProvider>
    </div>
  );
}

// Hook
function useWindowSize() {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [windowSize, setWindowSize] = React.useState({
    width: undefined,
    height: undefined,
  });
  React.useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    // Add event listener
    window.addEventListener('resize', handleResize);
    // Call handler right away so state gets updated with initial window size
    handleResize();
    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []); // Empty array ensures that effect is only run on mount
  return windowSize;
}
