import React from 'react';
import { Typography } from '@mui/material';
import CardInPage2 from '../Page2/CardInPage2';
import { Card } from '@mui/material';
import { Container } from '@mui/material';
import { Box } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import CostAnalyzePerson from '../Page2/CostAnalyzePerson';
import { nextStepContext } from '../Context/NextStepContextProvider';
import MobileStepper from '@mui/material/MobileStepper';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import Page3Inputs from './Page3Inputs';
import { Formik } from 'formik';
import * as yup from 'yup';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';
import dayjs from 'dayjs';

// const MyButton = styled(
//   Button,
//   props
// )(props => ({
//   background: props.color || 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
//   border: 0,
//   borderRadius: 3,
//   boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
//   color: 'white',
//   height: 48,
//   padding: '0 30px',
// }));

const MyButton = styled(Button)(props => ({
  backgroundColor: props.mybackgroundcolor,
  ':hover': {
    backgroundColor: props.myhovercolor,
  },

  color: props.mycolor,
  border: '1px solid black',
  textTransform: 'none',
  borderRadius: '8px',
  padding: '5px 30px',
  display: 'flex',
  flexDirection: 'column',
}));

const customTheme = createTheme({
  palette: {
    primary: {
      // light: will be calculated from palette.primary.main,
      main: '#ffb30b',
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
  },
});

function Page3b2b({ data, option }) {
  const { nextStepObj, setNextStepObj } = React.useContext(nextStepContext);

  const [text, setText] = React.useState({
    epivevaiwsh: 'ΕΠΙΒΕΒΑΙΩΣΗ ΚΑΤΑΧΩΡΗΣΗΣ ΕΚΔΡΟΜΗΣ',
    epexergasia: 'ΕΠΕΞΕΡΓΑΣΙΑ ΣΤΟΙΧΕΙΩΝ ΕΠΙΒΑΤΩΝ',
    stoixeiaEpivatwn: 'Στοιχεία επιβατών',
    analyshKostous: 'Ανάλυση κόστους',
    eishthriaEkdromis: 'Εισητήρια εκδρομής',
    telikhTimh: 'Τελική τιμή',
    plhrwmh: 'ΠΛΗΡΩΜΗ',
    epomenoVhma: 'Επόμενο βήμα',
    noAdult:
      'Πρέπει να υπάρχει τουλάχιστον ένας επιβάτης μεγαλύτερος από 12 ετών.',
  });

  //HANDLING LANGUAGE CHANGES
  React.useEffect(() => {
    switch (nextStepObj.locale) {
      case 'gr':
        setText({
          epivevaiwsh: 'ΕΠΙΒΕΒΑΙΩΣΗ ΚΑΤΑΧΩΡΗΣΗΣ ΕΚΔΡΟΜΗΣ',
          epexergasia: 'ΕΠΕΞΕΡΓΑΣΙΑ ΣΤΟΙΧΕΙΩΝ ΕΠΙΒΑΤΩΝ',
          stoixeiaEpivatwn: 'Στοιχεία επιβατών',
          analyshKostous: 'Ανάλυση κόστους',
          eishthriaEkdromis: 'Εισητήρια εκδρομής',
          telikhTimh: 'Τελική τιμή',
          plhrwmh: 'ΠΛΗΡΩΜΗ',
          noAdult:
            'Πρέπει να υπάρχει τουλάχιστον ένας επιβάτης μεγαλύτερος από 12 ετών.',
          epomenoVhma: 'Επόμενο βήμα',
        });
        break;
      case 'uk':
        setText({
          epivevaiwsh: 'TOUR REGISTRATION CONFIRMATION',
          epexergasia: 'PROCESSING OF PASSENGER INFORMATION',
          stoixeiaEpivatwn: 'Passenger details',
          analyshKostous: 'Cost analysis',
          eishthriaEkdromis: 'Excursion tickets',
          telikhTimh: 'Final price',
          plhrwmh: 'PAYMENT',
          noAdult: 'At least one passenger must be older than 12 years old.',
          epomenoVhma: 'Next step',
        });
        break;
      case 'fr':
        setText({
          epivevaiwsh: "CONFIRMATION D'INSCRIPTION TOUR",
          epexergasia: 'TRAITEMENT DES INFORMATIONS PASSAGERS',
          stoixeiaEpivatwn: 'Détails du passager',
          analyshKostous: 'Analyse de coût',
          eishthriaEkdromis: 'Billets excursions',
          telikhTimh: 'Prix ​​final',
          plhrwmh: 'PAIEMENT',
          noAdult: 'Au moins un passager doit être âgé de plus de 12 ans.',
          epomenoVhma: "L'étape suivante",
        });
        break;
      case 'pl':
        setText({
          epivevaiwsh: 'POTWIERDZENIE REJESTRACJI NA WYCIECZKĘ',
          epexergasia: 'PRZETWARZANIE DANYCH PASAŻERSKICH',
          stoixeiaEpivatwn: 'Dane pasażera',
          analyshKostous: 'Analiza kosztów',
          eishthriaEkdromis: 'Bilety wycieczkowe',
          telikhTimh: 'Cena ostateczna',
          plhrwmh: 'ZAPŁATA',
          noAdult: 'Co najmniej jeden pasażer musi mieć więcej niż 12 lat.',
          epomenoVhma: 'Następny krok',
        });
        break;
      case 'it':
        setText({
          epivevaiwsh: 'CONFERMA ISCRIZIONE TOUR',
          epexergasia: 'TRATTAMENTO DEI DATI DEL PASSEGGERO',
          stoixeiaEpivatwn: 'Dati del passeggero',
          analyshKostous: 'Analisi dei costi',
          eishthriaEkdromis: 'Biglietti per escursioni',
          telikhTimh: 'Prezzo finale',
          plhrwmh: 'PAGAMENTO',
          noAdult: 'Almeno un passeggero deve avere più di 12 anni.',
          epomenoVhma: 'Passo successivo',
        });
        break;
    }
  }, [nextStepObj.locale]);

  //=========================================

  const { adults, seniors, children, infants } = data.peopleCounter;
  const { adultPrice, seniorPrice, childPrice, infantPrice } = data;
  const totalPrice =
    adultPrice * adults +
    seniorPrice * seniors +
    childPrice * children +
    infantPrice * infants;

  //STEPPER
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  //VALIDATIONS
  const passengersSchema = yup.object().shape(data.schema);

  const submit = e => {
    if (option === submit) {
      setNextStepObj({
        ...nextStepObj,
        finalObjectb2b: { ...nextStepObj.finalObjectb2b, userInfo: e },
      });
      console.log(nextStepObj.finalObjectb2b);
    }

    switch (nextStepObj.status) {
      case 'complete':
        //TODO: POST FOR COMPLETE ACTION
        break;
      case 'save':
        //TODO: POST FOR SAVE ACTION
        break;
    }

    //GO TO HOME PAGE
    setNextStepObj({
      ...nextStepObj,
      showAllBookings: false,
      showNewBooking: false,
      filteredStatusBookingsCard: 'all',
      busViewController: true,
      b2bPageIndex: 1,
    });
  };

  const [deadline, setDeadline] = React.useState(null);

  //DEADLINE 3 DAYS BEFORE FULL DATE
  React.useEffect(() => {
    const tempDate = `${data.fullDate.slice(3, 5)}/${data.fullDate.slice(
      0,
      2
    )}/${data.fullDate.slice(6, 10)}`;

    const tempDeadline = dayjs(new Date(tempDate))
      .subtract(3, 'days')
      .format('DD/MM/YYYY');

    setDeadline(tempDeadline);
  }, []);

  let length;
  if (option === 'submit') {
    length = Object.keys(data.finalObjectb2b.userInfo).length / 6;
  } else {
    length = nextStepObj.selectedBookingCardInfo.selectedBookingTotalValues / 6;
  }

  console.log(length);

  return (
    <Box sx={{ backgroundColor: '#fff', paddingTop: '1px' }}>
      <Typography
        variant="h5"
        sx={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: '60px',
          fontWeight: '500',
          fontSize: {
            xs: '20px',
          },
        }}
      >
        {option === 'submit' ? text.epivevaiwsh : text.epexergasia}
      </Typography>
      <Container maxWidth="lg" sx={{ marginTop: '60px' }}>
        <Card
          sx={{
            backgroundColor: '#EEEEEE',
            borderRadius: '15px',
            height: {
              md: '850px',
              xs: '1600px',
            },
          }}
          elevation={2}
        >
          <Grid container spacing={2}>
            <Grid xs={12}>
              <CardInPage2 data={data} />
            </Grid>
            <Grid
              md={7}
              xs={12}
              sx={{
                padding: {
                  md: '19px 0 50px 50px',
                  xs: '20px 10px 50px 10px',
                },
              }}
            >
              <ThemeProvider theme={customTheme}>
                {length > 1 && (
                  <MobileStepper
                    variant="progress"
                    steps={length}
                    position="static"
                    activeStep={activeStep}
                    sx={{
                      maxWidth: { md: 650, xs: 400, sm: 1000 },
                      margin: { md: 0, xs: 0, sm: '40px' },
                    }}
                    nextButton={
                      <Button
                        size="small"
                        onClick={handleNext}
                        disabled={activeStep === length - 1}
                        sx={{
                          fontSize: { md: 'inherit', xs: '12px' },
                        }}
                      >
                        ΕΠΟΜΕΝΟΣ ΕΠΙΒΑΤΗΣ
                        {theme.direction === 'rtl' ? (
                          <KeyboardArrowLeft />
                        ) : (
                          <KeyboardArrowRight />
                        )}
                      </Button>
                    }
                    backButton={
                      <Button
                        size="small"
                        onClick={handleBack}
                        disabled={activeStep === 0}
                        sx={{ fontSize: { md: 'inherit', xs: '12px' } }}
                      >
                        {theme.direction === 'rtl' ? (
                          <KeyboardArrowRight />
                        ) : (
                          <KeyboardArrowLeft />
                        )}
                        ΠΡΟΗΓΟΥΜΕΝΟΣ ΕΠΙΒΑΤΗΣ
                      </Button>
                    }
                  />
                )}
              </ThemeProvider>
              <Box sx={{ marginTop: '20px' }}>
                <Typography
                  variant="h6"
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    margin: '30px 0 10px 0',
                  }}
                >
                  {activeStep === 0
                    ? 'Lead Επιβάτης'
                    : `Επιβάτης ${activeStep}`}
                </Typography>
                <Formik
                  initialValues={
                    option === 'submit'
                      ? data.finalObjectb2b.userInfo
                      : data.selectedBookingInitialValues
                  }
                  onSubmit={submit}
                  validationSchema={passengersSchema}
                >
                  {({
                    handleChange,
                    values,
                    setFieldValue,
                    handleSubmit,
                    errors,
                    touched,
                  }) => (
                    <Box>
                      <Page3Inputs
                        index={activeStep}
                        handleChange={handleChange}
                        values={values}
                        setFieldValue={setFieldValue}
                        errors={errors}
                        touched={touched}
                        option={option}
                      />
                      <Typography
                        variant="h6"
                        sx={{
                          display: 'flex',
                          justifyContent: 'center',
                          marginTop: '20px',
                          fontSize: {
                            md: 'inherit',
                            xs: '16px',
                          },
                        }}
                      >
                        Προθεσμία επιβεβαίωσης καταχώρησης:
                      </Typography>
                      {deadline && (
                        <Typography
                          variant="h6"
                          sx={{
                            display: 'flex',
                            justifyContent: 'center',
                          }}
                        >
                          {deadline}
                        </Typography>
                      )}
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-around',
                          padding: '0 20px',
                          marginTop: '20px',
                        }}
                      >
                        <MyButton
                          mybackgroundcolor="#0052b4"
                          myhovercolor="#004290"
                          mycolor="#fff"
                          onClick={() => {
                            setNextStepObj({
                              ...nextStepObj,
                              finalObjectb2b: {
                                ...nextStepObj.finalObjectb2b,
                                status: 'complete',
                              },
                            });
                            handleSubmit();
                          }}
                        >
                          <Typography variant="body2">Ολοκλήρωση</Typography>
                          <Typography variant="body2">καταχώρησης</Typography>
                        </MyButton>
                        <MyButton
                          mybackgroundcolor="#ffb30b"
                          myhovercolor="#e6a10a"
                          mycolor="#000"
                          onClick={() => {
                            setNextStepObj({
                              ...nextStepObj,
                              finalObjectb2b: {
                                ...nextStepObj.finalObjectb2b,
                                status: 'save',
                              },
                            });
                            handleSubmit();
                          }}
                        >
                          <Typography variant="body2">Αποθήκευση</Typography>
                          <Typography variant="body2">καταχώρησης</Typography>
                        </MyButton>
                      </Box>
                    </Box>
                  )}
                </Formik>
              </Box>
            </Grid>
            <Grid
              md={5}
              xs={12}
              sx={{ display: 'flex', justifyContent: 'center' }}
            >
              <Grid item md={9} xs={12}>
                <Card
                  sx={{
                    backgroundColor: '#FFF',
                    padding: '10px',
                    marginBottom: '30px',
                  }}
                >
                  <Box
                    sx={{
                      padding: '10px',
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                      <Typography variant="h6">
                        {text.analyshKostous}
                      </Typography>
                    </Box>
                    <Box sx={{ marginTop: '15px' }}>
                      <Typography variant="body1" sx={{ fontWeight: '500' }}>
                        {text.eishthriaEkdromis}
                      </Typography>
                    </Box>
                    <CostAnalyzePerson
                      marginTop={'5px'}
                      desc={'Adults'}
                      tickets={adults}
                      price={adultPrice}
                    />
                    <CostAnalyzePerson
                      marginTop={'-3px'}
                      desc={'Seniors'}
                      tickets={seniors}
                      price={seniorPrice}
                    />
                    <CostAnalyzePerson
                      marginTop={'-3px'}
                      desc={'Children'}
                      tickets={children}
                      price={childPrice}
                    />
                    <CostAnalyzePerson
                      marginTop={'-3px'}
                      desc={'Infants'}
                      tickets={infants}
                      price={infantPrice}
                    />
                    <Box
                      sx={{
                        marginTop: '100px',
                        display: 'flex',
                        justifyContent: 'space-between',
                      }}
                    >
                      <Typography variant="h6">{text.telikhTimh}:</Typography>
                      <Typography variant="h6">€ {totalPrice}</Typography>
                    </Box>
                  </Box>
                </Card>
              </Grid>
            </Grid>
          </Grid>
        </Card>
        <Box sx={{ height: '50px' }} />
      </Container>
    </Box>
  );
}

export default Page3b2b;
