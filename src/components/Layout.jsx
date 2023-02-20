import React from 'react';
import Page1 from './Page1/Page1';
import NextStepContextProvider from './Context/NextStepContextProvider';
import Page2 from './Page2/Page2';
import { Box } from '@mui/system';
import Flags from './header/Flags';
import Login from './header/Login';
import LogoContainer from './header/LogoContainer';
import { motion } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import CustomerData from './Data/CustomerData';
import CustomerOverview from './b2b/CustomerOverview';
import Page4 from './Page4/Page4';

export default function Layout() {
  const [cruises, setCruises] = React.useState(null);
  const [pageIndex, setPageIndex] = React.useState(1);
  const [nextStepObj, setNextStepObj] = React.useState({
    locale: 'gr',
    isLoggedIn: false,
    typedSearch: '',
    customerId: null,
  });

  React.useEffect(() => {
    if (nextStepObj?.busViewController === 'false') {
      setPageIndex(2);
    }
  }, [nextStepObj]);

  //ROUTER PARAMS
  // ?cr=0&bl=2&d=03012023&af=12345678&lg=uk
  const [searchParams, setSearchParams] = useSearchParams({
    cr: null,
    bl: null,
    d: null,
    af: null,
    lg: null,
  });

  React.useEffect(() => {
    let locale;
    switch (searchParams.get('lg')) {
      case 'gr':
        locale = 'gr';
        break;
      case 'uk':
        locale = 'uk';
        break;
      case 'fr':
        console.log('HERE');
        locale = 'fr';
        break;
      case 'pl':
        locale = 'pl';
        break;
      case 'it':
        locale = 'it';
        break;
      default:
        locale = 'gr';
        break;
    }

    setNextStepObj({
      ...nextStepObj,
      locale,
      affiliated: searchParams.get('af'),
    });
  }, []);

  const [customerData, setCustomerData] = React.useState(null);
  const receiveCustomerData = receivedCustomerData => {
    setCustomerData(receivedCustomerData);
  };

  const [final, setFinal] = React.useState(null);
  const getFinal = finalReceived => {
    setFinal(finalReceived);
  };

  return (
    <>
      <NextStepContextProvider
        value={{ nextStepObj: nextStepObj, setNextStepObj: setNextStepObj }}
      >
        {!nextStepObj.isLoggedIn && (
          <>
            <Box
              sx={{
                display: 'flex',
                minWidth: '100%',
                backgroundColor: '#ffb30b',
                height: {
                  xs: '40px',
                  md: '25px',
                },
                justifyContent: 'space-between',
              }}
            >
              <Flags
                searchParams={searchParams}
                setSearchParams={setSearchParams}
              />
              <Login />
            </Box>
            <LogoContainer setPageIndex={setPageIndex} />
            {pageIndex === 1 && (
              // <motion.div
              //   initial={{ opacity: 0, scale: 0.5 }}
              //   animate={{ opacity: 1, scale: 1 }}
              //   transition={{ duration: 0.1 }}
              // >
              <Page1
                pageIndex={pageIndex}
                setPageIndex={setPageIndex}
                cruises={cruises}
                setCruises={setCruises}
                searchParams={searchParams}
                setSearchParams={setSearchParams}
              />
              // </motion.div>
            )}
            {pageIndex === 2 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Page2
                  data={nextStepObj}
                  pageIndex={pageIndex}
                  setPageIndex={setPageIndex}
                  setFinal={getFinal}
                />
              </motion.div>
            )}
            {pageIndex === 4 && final && <Page4 final={final} />}
          </>
        )}
        {nextStepObj.isLoggedIn && (
          <div>
            <CustomerData sendCustomerData={receiveCustomerData} />
            {customerData && (
              <CustomerOverview
                data={customerData}
                pageIndex={pageIndex}
                setPageIndex={setPageIndex}
                cruises={cruises}
                setCruises={setCruises}
                searchParams={searchParams}
                setSearchParams={setSearchParams}
              />
            )}
          </div>
        )}
      </NextStepContextProvider>
    </>
  );
}
