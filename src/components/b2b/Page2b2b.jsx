import React from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import { Box } from '@mui/material';
import { Button } from '@mui/material';
import { Grid } from '@mui/material';
import { Typography } from '@mui/material';
import { Container } from '@mui/material';
import NationalitiesData from '../Data/NationalitiesData';
import { CircularProgress } from '@mui/material';
import Inputs from '../Page2/Inputs';

import BreadcrumbCustom from '../header/BreadcrumbCustom';
import CardInPage2 from '../Page2/CardInPage2';
import dayjs from 'dayjs';
import { Alert } from '@mui/material';
import { nextStepContext } from '../Context/NextStepContextProvider';

import CostAnalyzePerson from '../Page2/CostAnalyzePerson';

export default function Page2b2b({ data }) {
  const { nextStepObj, setNextStepObj } = React.useContext(nextStepContext);
  const [text, setText] = React.useState({
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

  //====================================================
  const passengersSchema = yup.object().shape(data.schema);

  const [nationalitiesData, setNationalitiesData] = React.useState(null);
  const [filteredNationalitiesData, setFilteredNationalitiesData] =
    React.useState(null);

  const { adults, seniors, children, infants } = data.peopleCounter;
  const { adultPrice, seniorPrice, childPrice, infantPrice, totalPrice } = data;

  //=============================
  React.useEffect(() => {
    if (nationalitiesData) {
      setFilteredNationalitiesData(
        nationalitiesData.map((e, index) => {
          return { name: e, id: index };
        })
      );
    }
  }, [nationalitiesData]);

  const [noAdultOrSenior, setNoAdultOrSenior] = React.useState(false);

  const submit = values => {
    let now = dayjs();
    for (let i = 0; i < Object.entries(values).length / 6; i++) {
      const diff = values[`dateOfBirth${i}`].diff(now, 'year');
      //pegasus considers children 5 - 12
      //I suppose adults are 12+
      if (diff < -12) {
        setNoAdultOrSenior(false);

        ///code here
        const returnedFinalObject = {
          customerId: data.customerId,
          cruise_id: data.cruise_id,
          boarding_locations_id: data.boarding_locations_id,
          departReturnId: data.departReturnId,
          bus: data.displayCardData.bus,
          busRoute: data?.busRoute,
          totalTickets: data.totalTickets,
          totalPrice: data.totalPrice,
          peopleCounter: data.peopleCounter,
          affiliated: data.affiliated,
          userInfo: values,
          fullDate: data.fullDate,
          departureTime: data.displayCardData.departureTime,
        };
        console.log(returnedFinalObject);
        setNextStepObj({
          ...nextStepObj,
          finalObjectb2b: returnedFinalObject,
          b2bPageIndex: 3,
        });
        return;
      }
    }
    setNoAdultOrSenior(true);
  };

  return (
    <>
      <CardInPage2 data={data} />

      {!nationalitiesData && (
        <NationalitiesData setNationalitiesData={setNationalitiesData} />
      )}
      {/* && !isModified */}
      {!filteredNationalitiesData ? (
        <Box
          sx={{ display: 'flex', justifyContent: 'center', marginTop: '100px' }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <Container maxWidth="xl" sx={{ padding: '0 0 100px 0' }}>
          <Formik
            initialValues={data.initialValues}
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
              <form onSubmit={handleSubmit}>
                <Grid container spacing={10} sx={{ marginTop: '1px' }}>
                  <Grid item md={7} xs={12}>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        paddingBottom: '20px',
                      }}
                    >
                      <Typography variant="h5">
                        {text.stoixeiaEpivatwn}
                      </Typography>
                    </Box>

                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '50px',
                      }}
                    >
                      {data.totalTicketsArray.map((_, index) => {
                        return (
                          <div key={`key${index}`}>
                            <Inputs
                              filteredNationalitiesData={
                                filteredNationalitiesData
                              }
                              handleChange={handleChange}
                              values={values}
                              setFieldValue={setFieldValue}
                              index={index}
                              errors={errors}
                              touched={touched}
                            />
                          </div>
                        );
                      })}
                    </Box>
                  </Grid>
                  <Grid
                    item
                    md={5}
                    xs={12}
                    sx={{
                      display: { md: 'inherit', xs: 'flex' },
                      justifyContent: 'center',
                    }}
                  >
                    <Grid item xs={9}>
                      <Box
                        sx={{
                          backgroundColor: '#FAFAFA',
                          padding: '10px',
                          margin: '52px 0 30px 0',
                          border: '2px solid #0052b4',
                        }}
                      >
                        <Box
                          sx={{
                            padding: '10px',
                            display: 'flex',
                            flexDirection: 'column',
                          }}
                        >
                          <Box
                            sx={{ display: 'flex', justifyContent: 'center' }}
                          >
                            <Typography variant="h6">
                              {text.analyshKostous}
                            </Typography>
                          </Box>
                          <Box sx={{ marginTop: '15px' }}>
                            <Typography
                              variant="body1"
                              sx={{ fontWeight: '500' }}
                            >
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
                            <Typography variant="h6">
                              {text.telikhTimh}:
                            </Typography>
                            <Typography variant="h6">€{totalPrice}</Typography>
                          </Box>
                        </Box>
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Button
                          type="submit"
                          size="large"
                          variant="outlined"
                          sx={{
                            // fontSize: '18px',
                            backgroundColor: '#ffb30b',
                            borderRadius: '0',
                            padding: '10px 100px',
                            color: '#000',
                            transition: '0.3s',
                            ':hover': {
                              backgroundColor: '#0052b4',
                              color: '#fff',
                            },
                          }}
                        >
                          {text.epomenoVhma}
                        </Button>
                      </Box>
                      {noAdultOrSenior && (
                        <Alert severity="warning" sx={{ marginTop: '20px' }}>
                          {text.noAdult}
                        </Alert>
                      )}
                    </Grid>
                  </Grid>
                </Grid>
              </form>
            )}
          </Formik>
        </Container>
      )}
    </>
  );
}
