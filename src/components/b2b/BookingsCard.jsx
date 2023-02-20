import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import { Box, Typography } from '@mui/material';
import { Container } from '@mui/material';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import { grey } from '@mui/material/colors';
import Grid from '@mui/material/Unstable_Grid2';
import { createTheme, ThemeProvider, styled } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button } from '@mui/material';
import { nextStepContext } from '../Context/NextStepContextProvider';
import ModalSelectedBookingDetails from './ModalSelectedBookingDetails';
import CruisesData from '../Data/CruisesData';
import * as yup from 'yup';
import NationalitiesData from '../Data/NationalitiesData';
import useMediaQuery from '@mui/material/useMediaQuery';

const theme = createTheme({
  components: {
    // Name of the component
    MuiCheckbox: {
      styleOverrides: {
        // Name of the slot
        root: {
          checked: {
            // Some CSS
            color: '#1976d2',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          color: '#191919',
          borderColor: '#dddddd',
          backgroundColor: '#F6F6F6',
        },
      },
    },
  },
});

export default function BookingsCard({ data, status }) {
  const { nextStepObj, setNextStepObj } = React.useContext(nextStepContext);
  const [filtered, setFiltered] = React.useState([]);
  const [dataToUse, setDataToUse] = React.useState(data);
  const [cruises, setCruises] = React.useState(null);
  const [checked, setChecked] = React.useState([0]);
  const [nationalitiesData, setNationalitiesData] = React.useState(null);

  //=============================================
  //language handling
  const [text, setText] = React.useState({
    epiloghAtomwn: 'Επιλογή ατόμων',
    telikhTimh: 'Τελική τιμή',
    epomenoVhma: 'Επόμενο Βήμα',
    adults: 'Ενήλικες',
    seniors: 'Ηλικιωμένοι',
    children: 'Παιδιά',
    infants: 'Βρέφη - Μικρά παιδιά',
    validationFirstNameMin: 'Το όνομα πρέπει να έχει τουλάχιστον 2 χαρακτήρες.',
    validationFirstNameMatch: 'Το όνομα πρέπει να περιέχει μόνο γράμματα.',
    validationLastNameMin:
      'Το επίθετο πρέπει να έχει τουλάχιστον 2 χαρακτήρες.',
    validationLastNameMatch: 'Το επίθετο πρέπει να περιέχει μόνο γράμματα.',
    emailValidation: 'Παρακαλώ δώστε έγκυρη διεύθυνση email.',
    phoneValidation: 'Παρακαλώ δώστε έναν έγκυρο αριθμό τηλεφώνου',
  });

  //HANDLING LANGUAGE CHANGES
  React.useEffect(() => {
    switch (nextStepObj.locale) {
      case 'gr':
        setText({
          epiloghAtomwn: 'Επιλογή ατόμων',
          telikhTimh: 'Τελική τιμή',
          epomenoVhma: 'Επόμενο Βήμα',
          adults: 'Ενήλικες',
          seniors: 'Ηλικιωμένοι',
          children: 'Παιδιά',
          infants: 'Βρέφη - Μικρά παιδιά',
          validationFirstNameMin:
            'Το όνομα πρέπει να έχει τουλάχιστον 2 χαρακτήρες.',
          validationFirstNameMatch:
            'Το όνομα πρέπει να περιέχει μόνο γράμματα.',
          validationLastNameMin:
            'Το επίθετο πρέπει να έχει τουλάχιστον 2 χαρακτήρες.',
          validationLastNameMatch:
            'Το επίθετο πρέπει να περιέχει μόνο γράμματα.',
          emailValidation: 'Παρακαλώ δώστε έγκυρη διεύθυνση email.',
          phoneValidation: 'Παρακαλώ δώστε έναν έγκυρο αριθμό τηλεφώνου',
        });
        break;
      case 'uk':
        setText({
          epiloghAtomwn: 'Select people',
          telikhTimh: 'Final Price',
          epomenoVhma: 'Next Step',
          adults: 'Adults',
          seniors: 'Seniors',
          children: 'Children',
          infants: 'Infants',
          validationFirstNameMin:
            'First name must contain at least 2 characters.',
          validationFirstNameMatch: 'First name must only contain letters.',
          validationLastNameMin:
            'Last name must contain at least 2 characters.',
          validationLastNameMatch: 'Last name must only contain letters.',
          emailValidation: 'Please provide a valid email address.',
          phoneValidation: 'Please provide a valid phone number.',
        });
        break;
      case 'fr':
        setText({
          epiloghAtomwn: 'Sélectionnez des personnes',
          telikhTimh: 'Prix ​​final',
          epomenoVhma: "L'étape suivante",
          adults: 'Adultes',
          seniors: 'Séniors',
          children: 'Enfants',
          infants: 'Nourrissons',
          validationFirstNameMin:
            'Le prénom doit contenir au moins 2 caractères.',
          validationFirstNameMatch:
            'Le prénom ne doit contenir que des lettres.',
          validationLastNameMin:
            'Le nom de famille doit contenir au moins 2 caractères.',
          validationLastNameMatch:
            'Le nom de famille ne doit contenir que des lettres.',
          emailValidation: 'Veuillez fournir une adresse email valide.',
          phoneValidation: 'Veuillez fournir un numéro de téléphone valide.',
        });
        break;
      case 'pl':
        setText({
          epiloghAtomwn: 'Wybierz osoby',
          telikhTimh: 'Cena ostateczna',
          epomenoVhma: 'Następny krok',
          adults: 'Dorośli ludzie',
          seniors: 'Seniorzy',
          children: 'Dzieci',
          infants: 'Niemowlęta',
          validationFirstNameMin: 'Imię musi zawierać co najmniej 2 znaki.',
          validationFirstNameMatch: 'Imię może zawierać tylko litery.',
          validationLastNameMin: 'Nazwisko musi zawierać co najmniej 2 znaki.',
          validationLastNameMatch: 'Nazwisko może zawierać tylko litery.',
          emailValidation: 'Prosimy o wprowadzenie poprawnego adresu e-mail.',
          phoneValidation: 'Podaj prawidłowy numer telefonu.',
        });
        break;
      case 'it':
        setText({
          epiloghAtomwn: 'Seleziona le persone',
          telikhTimh: 'Prezzo finale',
          epomenoVhma: 'Passo successivo',
          adults: 'Adults',
          seniors: 'Gli anziani',
          children: 'Bambino',
          infants: 'Neonato',
          validationFirstNameMin: 'Il nome deve contenere almeno 2 caratteri.',
          validationFirstNameMatch: 'Il nome deve contenere solo lettere.',
          validationLastNameMin:
            'Il cognome deve contenere almeno 2 caratteri.',
          validationLastNameMatch: 'Il cognome deve contenere solo lettere.',
          emailValidation: 'Si prega di fornire un indirizzo email valido.',
          phoneValidation: 'Si prega di fornire un numero di telefono valido.',
        });
        break;
    }
  }, [nextStepObj.locale]);

  //=========================================

  React.useEffect(() => {
    switch (status) {
      case 'completed':
        const temp1 = data?.filter(e => e.status === 'completed');
        setDataToUse(temp1);
        setChecked([0]);
        break;
      case 'optional':
        const temp2 = data?.filter(e => e.status === 'optional');
        setDataToUse(temp2);
        setChecked([0]);
        break;
      case 'canceled':
        const temp3 = data?.filter(e => e.status === 'canceled');
        setDataToUse(temp3);
        setChecked([0]);
        break;
      default:
        setDataToUse(data);
        break;
    }
  }, [status]);

  React.useEffect(() => {
    const temp = dataToUse.map(e => {
      return (
        String(String(e.details[0].firstName).toLowerCase()).includes(
          String(nextStepObj.typedSearch).toLowerCase()
        ) ||
        String(String(e.details[0].lastName).toLowerCase()).includes(
          String(nextStepObj.typedSearch).toLowerCase()
        ) ||
        String(e.bookingId).includes(nextStepObj.typedSearch) ||
        // String(e.details[0].email).includes(nextStepObj.typedSearch) ||
        String(e.details[0].phoneNumber).includes(nextStepObj.typedSearch)
      );
    });

    setFiltered(temp);
  }, [nextStepObj.typedSearch]);

  const receiveCruises = receivedCruises => {
    setCruises(receivedCruises);
  };

  const handleToggle = value => () => {
    console.log(checked);
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  //SCHEMA FOR INPUTS
  const createSchema = index => {
    const phoneRegExp =
      /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/;
    return {
      [`firstName${index}`]: yup
        .string()
        .min(2, `${text.validationFirstNameMin}`)
        .matches(/^[A-Za-zΑ-Ωα-ω]*$/, `${text.validationFirstNameMatch}`)
        .max(40)
        .required('Required'),
      [`lastName${index}`]: yup
        .string()
        .min(2, `${text.validationLastNameMin}`)
        .matches(/^[A-Za-zΑ-Ωα-ω ]*$/, `${text.validationFirstNameMatch}`)
        .max(40)
        .required('Required'),
      [`email${index}`]: yup.string().email(`${text.emailValidation}`),
      [`phoneNumber${index}`]: yup
        .string()
        .matches(phoneRegExp, `${text.phoneValidation}`),
    };
  };

  const clickHandler = () => {
    if (cruises) {
      // "cruise_id": 0,
      // "departs_return_id": 1,
      // "boarding_locations_id": 0,
      const tempSelectedTrip = cruises.filter(
        cruise => checked[1].cruise_id === cruise.cruise_id
      );

      const tempSelectedBoardingLoc =
        tempSelectedTrip[0].boarding_locations.filter(
          bl => checked[1].boarding_locations_id === bl.id
        );
      const tempSelectedDepartReturn =
        tempSelectedBoardingLoc[0].departs_return.filter(
          dr => checked[1].departs_return_id === dr.id
        );

      //-----------------------------------------------------

      //will be used as data for page3b2b
      const tempObj = {
        name: tempSelectedTrip[0].name,
        portName: tempSelectedBoardingLoc[0].portName,
        adultPrice: tempSelectedBoardingLoc[0].adultPrice,
        childPrice: tempSelectedBoardingLoc[0].childPrice,
        seniorPrice: tempSelectedBoardingLoc[0].seniorPrice,
        infantPrice: tempSelectedBoardingLoc[0].infantPrice,
        totalPrice: tempSelectedBoardingLoc[0].price,
        departureTime: tempSelectedDepartReturn[0].departureTime,
        returnTime: tempSelectedDepartReturn[0].returnTime,
        peopleCounter: checked[1].peopleCounter,
      };

      setNextStepObj({
        ...nextStepObj,
        selectedBookingModal: true,
        selectedBookingId: checked[1].bookingId,
        selectedBookingCruiseId: checked[1].cruise_id,
        selectedBookingDepartsReturnId: checked[1].departs_return_id,
        selectedBookingBoardingLocationsId: checked[1].boarding_locations_id,
        selectedBookingFullDate: checked[1].fullDate,
        selectedBookingComment: checked[1].comment,
        selectedBookingCardInfo: tempObj,
      });
    }
  };

  //=====================================================================
  ///MODIFY

  const modifyHandler = () => {
    if (cruises && nationalitiesData) {
      const tempSelectedTrip = cruises.filter(
        cruise => checked[1].cruise_id === cruise.cruise_id
      );

      const tempSelectedBoardingLoc =
        tempSelectedTrip[0].boarding_locations.filter(
          bl => checked[1].boarding_locations_id === bl.id
        );
      const tempSelectedDepartReturn =
        tempSelectedBoardingLoc[0].departs_return.filter(
          dr => checked[1].departs_return_id === dr.id
        );

      //-----------------------------------------------------

      //schema
      const counter =
        checked[1].peopleCounter.adults +
        checked[1].peopleCounter.seniors +
        checked[1].peopleCounter.children +
        checked[1].peopleCounter.infants;

      const initialValues = {
        firstName0: checked[1].details[0].firstName,
        lastName0: checked[1].details[0].lastName,
        nationality0: {
          name: checked[1].details[0].nationality.name,
          id: checked[1].details[0].nationality.id,
        },
        dateOfBirth0: checked[1].details[0].dateOfBirth,
        email0: checked[1].details[0].email,
        phoneNumber0: checked[1].details[0].phoneNumber,
      };

      for (let i = 0; i < counter - 1; i++) {
        initialValues[`firstName${i + 1}`] =
          checked[1].details[i + 1].firstName;
        initialValues[`lastName${i + 1}`] = checked[1].details[i + 1].lastName;
        initialValues[`nationality${i + 1}`] = {
          name: checked[1].details[i + 1].nationality.name,
          id: checked[1].details[i + 1].nationality.id,
        };
        initialValues[`dateOfBirth${i + 1}`] =
          checked[1].details[i + 1].dateOfBirth;
        initialValues[`email${i + 1}`] = checked[1].details[i + 1].email;
        initialValues[`phoneNumber${i + 1}`] =
          checked[1].details[i + 1].phoneNumber;
      }

      let schema = {};
      for (let i = 0; i < counter; i++) {
        schema = { ...schema, ...createSchema(i) };
      }

      const tempLength = Object.keys(initialValues).length;

      //will be used as data for page3b2b
      const tempObj = {
        adultPrice: tempSelectedBoardingLoc[0].adultPrice,
        childPrice: tempSelectedBoardingLoc[0].childPrice,
        seniorPrice: tempSelectedBoardingLoc[0].seniorPrice,
        infantPrice: tempSelectedBoardingLoc[0].infantPrice,
        totalPrice: tempSelectedBoardingLoc[0].price,
        peopleCounter: checked[1].peopleCounter,
        selectedBookingTotalValues: tempLength,
        selectedBookingInitialValues: initialValues,
        fullDate: checked[1].fullDate,
        displayCardData: {
          cruiseName: tempSelectedTrip[0].name,
          portName: tempSelectedBoardingLoc[0].portName,
          departureTime: tempSelectedDepartReturn[0].departureTime,
          returnTime: tempSelectedDepartReturn[0].returnTime,
          urlWithDetails: tempSelectedBoardingLoc[0].urlWithDetails,
          imgUrl: tempSelectedBoardingLoc[0].imgUrl,
          oneDayTrip: tempSelectedBoardingLoc[0].oneDayTrip,
        },
      };

      setTimeout(() => {
        setNextStepObj({
          ...nextStepObj,
          selectedBookingId: checked[1].bookingId,
          selectedBookingCruiseId: checked[1].cruise_id,
          selectedBookingDepartsReturnId: checked[1].departs_return_id,
          selectedBookingBoardingLocationsId: checked[1].boarding_locations_id,
          selectedBookingFullDate: checked[1].fullDate,
          selectedBookingComment: checked[1].comment,
          selectedBookingCardInfo: tempObj,
          selectedBookingSchema: schema,

          showModifyPage: true,
        });
      }, 100);
    }
  };

  //TODO: SEND DELETE REQUEST TO THE SERVER???
  const deleteHandler = () => {
    console.log('HTTP DELETE TO THE SERVER?');
    console.log(checked[1]);
    console.log('=============================');
  };

  const selectAllHandler = () => {
    setChecked([0]);
  };

  return (
    <Container
      maxWidth="lg"
      sx={{ display: { lg: 'block', xs: 'flex' }, justifyContent: 'center' }}
    >
      <ThemeProvider theme={theme}>
        {!nationalitiesData && (
          <NationalitiesData setNationalitiesData={setNationalitiesData} />
        )}
        <CruisesData onSendCruises={receiveCruises} />
        {cruises && checked.length > 1 && (
          <ModalSelectedBookingDetails data={dataToUse} />
        )}
        <List
          sx={{
            width: { lg: '100%', xs: '70%', sm: '70%' },
            bgcolor: 'background.paper',
            padding: '20px 0px 20px 10px',
            borderRadius: '10px',
          }}
        >
          <ListItem
            secondaryAction={<IconButton edge="end" aria-label="comments" />}
            disablePadding
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: {
                  lg: 'row',
                  sm: 'column-reverse',
                  xs: 'column-reverse',
                },
                gap: {
                  lg: 0,
                  sm: '10px',
                  xs: '10px',
                },

                alignItems: {
                  lg: 'center',
                  xs: 'flex-start',
                },
                margin: {
                  lg: '0 0 15px 18px',
                  xs: '0 0 15px 15px',
                },
              }}
            >
              <Box sx={{ display: 'flex', gap: '5px' }}>
                <Box sx={{ width: '40px' }}>
                  <Box
                    onClick={selectAllHandler}
                    sx={{
                      display: `${checked.length > 1 ? 'flex' : 'none'}`,
                      cursor: `${checked.length > 1 ? 'pointer' : 'auto'}`,
                      width: '15px',
                      height: '15px',
                      marginLeft: {
                        lg: '12px',
                      },
                      borderRadius: '1.5px',
                      padding: '10px',
                      // display: 'flex',

                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: `${
                        checked?.length && checked.length !== 1
                          ? '#1976d2'
                          : 'inherit'
                      } `,
                      color: `${
                        checked?.length && checked.length !== 1
                          ? '#fff'
                          : 'inherit'
                      } `,
                      boxShadow: `${
                        checked?.length && checked.length !== 1
                          ? `0px 0px 0px 2px #1976d2`
                          : `0px 0px 0px 2px ${grey[700]}`
                      } `,
                    }}
                  >
                    <Typography variant="subtitle2">
                      {checked?.length &&
                        checked.length !== 1 &&
                        checked.length - 1}
                    </Typography>
                  </Box>
                </Box>
                <Typography variant="subtitle2" sx={{ width: '80px' }}>
                  {checked?.length &&
                    checked.length !== 1 &&
                    `${checked.length - 1} Selected`}
                </Typography>
              </Box>

              <DeleteIcon
                fontSize="small"
                sx={{
                  color: `${
                    checked?.length &&
                    checked.length === 2 &&
                    checked[1].status === 'optional'
                      ? '#9b9b9b'
                      : '#dddddd'
                  }`,
                  marginRight: '20px',
                  cursor: `${
                    checked?.length &&
                    checked.length !== 1 &&
                    checked[1].status === 'optional'
                      ? 'pointer'
                      : 'auto'
                  }`,
                }}
                onClick={deleteHandler}
              />
              <Button
                variant="outlined"
                size="small"
                onClick={clickHandler}
                disabled={checked.length === 2 ? false : true}
              >
                Εμφάνιση κράτησης
              </Button>
              <Button
                sx={{ marginLeft: { lg: '20px', xs: '0' } }}
                variant="outlined"
                size="small"
                onClick={modifyHandler}
                disabled={checked.length === 2 ? false : true}
              >
                Τροποποίηση κράτησης
              </Button>
            </Box>
          </ListItem>
          <Divider component="li" />

          {/* ---------------------------------------- */}
          {dataToUse.map((value, index) => {
            const labelId = `checkbox-list-label-${value}`;

            return (
              <Box key={value.bookingId}>
                {filtered[index] && (
                  <ListItem
                    secondaryAction={
                      <IconButton edge="end" aria-label="comments"></IconButton>
                    }
                    //sos
                    // disablePadding
                  >
                    <ListItemButton
                      role={undefined}
                      onClick={handleToggle(value)}
                      dense
                    >
                      <Grid
                        container
                        justifyContent="space-between"
                        alignItems="center"
                        spacing={{ lg: 3, xs: 1, sm: 1 }}
                      >
                        <Grid xs={12} md={0.5}>
                          <ListItemIcon>
                            <Checkbox
                              edge="start"
                              checked={checked.indexOf(value) !== -1}
                              tabIndex={-1}
                              disableRipple
                              inputProps={{ 'aria-labelledby': labelId }}
                            />
                          </ListItemIcon>
                        </Grid>
                        <Grid xs={0} sm={0} md={0} lg={0.5}>
                          <ListItemAvatar
                            sx={{
                              minWidth: '30px',
                              minHeight: '30px',
                              borderRadius: '1000px',
                              border: '1px solid black',
                              display: {
                                lg: 'flex',
                                sm: 'none',
                                xs: 'none',
                              },
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}
                          >
                            <Typography variant="subtitle2">AS</Typography>
                          </ListItemAvatar>
                        </Grid>

                        <Grid xs={12} md={12} lg={2}>
                          <ListItemText
                            id={labelId}
                            primary={`${value.details?.at(0).firstName} ${
                              value.details?.at(0).lastName
                            }`}
                            sx={{
                              width: '150px',
                            }}
                          />
                        </Grid>
                        <Grid xs={12} lg={2.5} md={12}>
                          <ListItemText
                            id={labelId}
                            primary={`${value.details?.at(0).email} `}
                            sx={{ width: '150px' }}
                          />
                        </Grid>
                        <Grid xs={12} md={1}>
                          <ListItemText
                            id={labelId}
                            primary={`${value.bookingId} `}
                            sx={{ width: '100px' }}
                          />
                        </Grid>
                        <Grid xs={12} md={12} lg={1.5}>
                          <ListItemText
                            id={labelId}
                            primary={`${value.details?.at(0).phoneNumber} `}
                            sx={{ width: '100px' }}
                          />
                        </Grid>
                        <Grid xs={12} md={12} lg={1}>
                          <ListItemText
                            id={labelId}
                            primary={`Ενήλικας`}
                            sx={{ width: '100px' }}
                          />
                        </Grid>
                        <Grid xs={12} md={12} lg={1}>
                          <ListItemText
                            id={labelId}
                            primary={`€ ${value.price} `}
                            sx={{ width: '100px' }}
                          />
                        </Grid>
                        <Grid xs={12} md={12} lg={2}>
                          <ListItemText
                            sx={{
                              width: '100px',
                            }}
                            id={labelId}
                            primary={`${
                              value.status === 'optional'
                                ? `optional έως ${value.deadlineDate}`
                                : value.status
                            } `}
                          />
                        </Grid>
                      </Grid>
                    </ListItemButton>
                  </ListItem>
                )}
                <Divider component="li" />
              </Box>
            );
          })}
        </List>
      </ThemeProvider>
    </Container>
  );
}
