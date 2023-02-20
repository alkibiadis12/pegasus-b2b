import React from 'react';
import { Box } from '@mui/system';
import { Typography } from '@mui/material';
import PeopleCounter from './PeopleCounter';
import { Button } from '@mui/material';
import { nextStepContext } from '../Context/NextStepContextProvider';
import * as yup from 'yup';

export default function pricingPopUp({
  dataFromCard,
  setShowAlert,
  setShowAlertOutOfRange,
  showBus,
  setShowBus,
  affiliated,
}) {
  const { nextStepObj, setNextStepObj } = React.useContext(nextStepContext);
  const { infantPrice, childPrice, adultPrice, seniorPrice } = dataFromCard;
  const [peopleCounter, setPeopleCounter] = React.useState({
    adults: 0,
    seniors: 0,
    children: 0,
    infants: 0,
  });

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
    validationLastNameMatch: 'Το επώνυμο πρέπει να περιέχει μόνο γράμματα.',
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

  //====================================================

  React.useEffect(() => {
    setPeopleCounter({
      adults: 0,
      seniors: 0,
      children: 0,
      infants: 0,
    });
  }, [dataFromCard]);

  //------------------------------------------------
  //SCHEMA FOR PAGE2 INPUTS
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

  //------------------------------------------------

  const clickHandler = () => {
    //===============================================
    //CREATE DATA FOR PAGE2
    const counter =
      peopleCounter.adults +
      peopleCounter.seniors +
      peopleCounter.children +
      peopleCounter.infants;

    if (counter > dataFromCard.availableSeatsPerTrip) {
      setShowAlertOutOfRange(true);
      return;
    } else {
      setShowAlertOutOfRange(false);
    }

    if (dataFromCard.displayCardData.bus === 'true') {
      setShowBus(true);
    }

    const initialValues = {
      firstName0: '',
      lastName0: '',
      nationality0: { name: '', id: null },
      dateOfBirth0: null,
      email0: '',
      phoneNumber0: '',
    };

    const counterArray = [];

    for (let i = 0; i < counter - 1; i++) {
      initialValues[`firstName${i + 1}`] = '';
      initialValues[`lastName${i + 1}`] = '';
      initialValues[`nationality${i + 1}`] = { name: '', id: null };
      initialValues[`dateOfBirth${i + 1}`] = null;
      initialValues[`email${i + 1}`] = '';
      initialValues[`phoneNumber${i + 1}`] = '';
    }

    for (let i = 0; i < counter; i++) {
      counterArray.push(i);
    }

    let tempObj = {};
    for (let i = 0; i < counter; i++) {
      tempObj = { ...tempObj, ...createSchema(i) };
    }

    //===============================================

    const returnedObject = {
      ...dataFromCard,
      peopleCounter: { ...peopleCounter },
      totalPrice: price,
      totalTickets: counter,
      totalTicketsArray: counterArray,
      initialValues: initialValues,
      schema: tempObj,
      // affiliated: affiliated,
      busViewController: `${
        dataFromCard.displayCardData.bus === 'false' ? false : true
      }`,
    };

    //context
    setNextStepObj({ ...nextStepObj, ...returnedObject });
  };

  const [price, setPrice] = React.useState(
    (
      Math.round(
        (peopleCounter.adults * adultPrice +
          peopleCounter.seniors * seniorPrice +
          peopleCounter.children * childPrice +
          peopleCounter.infants * infantPrice) *
          100
      ) / 100
    ).toFixed(2)
  );

  React.useEffect(() => {
    setPrice(
      (
        Math.round(
          (peopleCounter.adults * adultPrice +
            peopleCounter.seniors * seniorPrice +
            peopleCounter.children * childPrice +
            peopleCounter.infants * infantPrice) *
            100
        ) / 100
      ).toFixed(2)
    );
  }, [peopleCounter]);

  return (
    <Box>
      {
        <Box
          sx={{
            position: 'fixed',
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 99999,
            backgroundColor: '#FAFAFA',
            borderTop: {
              md: 'inherit',
              sm: '2px solid black',
              xs: '2px solid black',
            },

            height: {
              md: '150px',
              sm: '650px',
              xs: '650px',
            },
            display: 'flex',
            flexDirection: {
              md: 'row',
              sm: 'column',
              xs: 'column',
            },
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: {
              md: '0 50px',
              xs: '20px 50px',
            },
          }}
        >
          <Typography variant="h5">{text.epiloghAtomwn}</Typography>
          <PeopleCounter
            peopleCounter={peopleCounter}
            setPeopleCounter={setPeopleCounter}
            text="Adults"
            price={adultPrice}
            setShowAlert={setShowAlert}
            setShowAlertOutOfRange={setShowAlertOutOfRange}
            altText={text.adults}
          />
          <PeopleCounter
            peopleCounter={peopleCounter}
            setPeopleCounter={setPeopleCounter}
            text="Seniors"
            price={seniorPrice}
            setShowAlert={setShowAlert}
            setShowAlertOutOfRange={setShowAlertOutOfRange}
            altText={text.seniors}
          />
          <PeopleCounter
            peopleCounter={peopleCounter}
            setPeopleCounter={setPeopleCounter}
            text="Children"
            price={childPrice}
            setShowAlert={setShowAlert}
            setShowAlertOutOfRange={setShowAlertOutOfRange}
            altText={text.children}
          />
          <PeopleCounter
            peopleCounter={peopleCounter}
            setPeopleCounter={setPeopleCounter}
            text="Infants"
            price={infantPrice}
            setShowAlert={setShowAlert}
            setShowAlertOutOfRange={setShowAlertOutOfRange}
            altText={text.infants}
          />
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography variant="h5">{text.telikhTimh}</Typography>
            <Typography variant="h5">
              €{price}
              {/* {(
            Math.round(
              (peopleCounter.adults * adultPrice +
                peopleCounter.seniors * seniorPrice +
                peopleCounter.children * childPrice +
                peopleCounter.infants * infantPrice) *
                100
            ) / 100
          ).toFixed(2)} */}
            </Typography>
          </Box>
          <Button
            disabled={peopleCounter.adults === 0 && peopleCounter.seniors === 0}
            onClick={clickHandler}
            size="large"
            sx={{
              textTransform: 'none',
              fontSize: '18px',
              backgroundColor: '#ffb30b',
              borderRadius: '0',
              padding: '10px 20px',
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
      }
    </Box>
  );
}
