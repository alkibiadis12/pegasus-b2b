import React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { TextField } from '@mui/material';
import { Box } from '@mui/material';
import { Autocomplete } from '@mui/material';
import { Typography } from '@mui/material';
import { nextStepContext } from '../Context/NextStepContextProvider';

export default function Inputs({
  filteredNationalitiesData,
  handleChange,
  values,
  setFieldValue,
  index,
  touched,
  errors,
}) {
  const { nextStepObj, setNextStepObj } = React.useContext(nextStepContext);
  const [text, setText] = React.useState({
    epivatis: 'Επιβάτης',
    onoma: 'Όνομα',
    epitheto: 'Επίθετο',
    ethnikotita: 'Εθνικότητα',
    hmeromhniaGennhshs: 'Ημερομηνία Γέννησης',
    thlefwnoEpikoinwnias: 'Τηλέφωνο επικοινωνίας',
  });

  //HANDLING LANGUAGE CHANGES
  React.useEffect(() => {
    switch (nextStepObj.locale) {
      case 'gr':
        setText({
          epivatis: 'Επιβάτης',
          onoma: 'Όνομα',
          epitheto: 'Επίθετο',
          ethnikotita: 'Εθνικότητα',
          hmeromhniaGennhshs: 'Ημερομηνία γέννησης',
          thlefwnoEpikoinwnias: 'Τηλέφωνο επικοινωνίας',
        });
        break;
      case 'uk':
        setText({
          epivatis: 'Passenger',
          onoma: 'first name',
          epitheto: 'Last name',
          ethnikotita: 'Nationality',
          hmeromhniaGennhshs: 'Date of birth',
          thlefwnoEpikoinwnias: 'Phone number',
        });
        break;
      case 'fr':
        setText({
          epivatis: 'Numéro de téléphone',
          onoma: 'prénom',
          epitheto: 'Nom de famille',
          ethnikotita: 'Nationalité',
          hmeromhniaGennhshs: 'Date de naissance',
          thlefwnoEpikoinwnias: 'Numéro de téléphone',
        });
        break;
      case 'pl':
        setText({
          epivatis: 'Pasażer',
          onoma: 'Imię',
          epitheto: 'Nazwisko',
          ethnikotita: 'Narodowość',
          hmeromhniaGennhshs: 'Data urodzenia',
          thlefwnoEpikoinwnias: 'Numer telefonu',
        });
        break;
      case 'it':
        setText({
          epivatis: 'Passegger',
          onoma: 'nome di battesimo',
          epitheto: 'Cognome',
          ethnikotita: 'Nazionalità',
          hmeromhniaGennhshs: 'Data di nascita',
          thlefwnoEpikoinwnias: 'Numero di telefono',
        });
        break;
    }
  }, [nextStepObj.locale]);

  //====================================================
  const inputReference = React.useRef(null);

  return (
    <Box
      sx={{
        display: { md: 'block', sm: 'flex', xs: 'flex' },
        justifyContent: 'center',
      }}
    >
      <Box
        sx={{
          backgroundColor: '#fdfdfd',
          padding: '10px',
        }}
      >
        <Typography variant="body1">
          {index === 0 && 'LEADER'} {text.epivatis} {index + 1}
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexDirection: {
              md: 'row',
              sm: 'column',
              xs: 'column',
            },
            justifyContent: 'space-between',
          }}
        >
          <Box
            sx={{
              width: '300px',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
            }}
          >
            <TextField
              autoFocus={index === 0 ? true : false}
              margin="dense"
              id={`firstName${index}`}
              name={`firstName${index}`}
              label={text.onoma}
              fullWidth
              variant="outlined"
              required
              value={values[`firstName${index}`]}
              onChange={handleChange}
              sx={{ backgroundColor: '#FAFAFA' }}
              error={
                touched[`firstName${index}`] &&
                Boolean(errors[`firstName${index}`])
              }
              helperText={
                touched[`firstName${index}`] && errors[`firstName${index}`]
              }
            />

            <Autocomplete
              disableClearable
              id={`nationality${index}`}
              name={`nationality${index}`}
              // disablePortal
              options={filteredNationalitiesData}
              getOptionLabel={option => option.name}
              // value={formik.values.nationality}
              sx={{ width: 300, backgroundColor: '#FAFAFA' }}
              onChange={(e, value) => {
                setFieldValue(
                  `nationality${index}`,
                  value !== null
                    ? value
                    : initialValues[values[`firstName${index}`]]
                );
              }}
              renderInput={params => (
                <TextField
                  {...params}
                  label={text.ethnikotita}
                  name="nationality"
                  sx={{ backgroundColor: '#FAFAFA' }}
                  required
                />
              )}
            />
            <TextField
              // autoFocus
              margin="dense"
              id={`email${index}`}
              name={`email${index}`}
              label="Email"
              fullWidth
              variant="outlined"
              required={index === 0 ? true : false}
              value={values[`email${index}`]}
              onChange={handleChange}
              sx={{ backgroundColor: '#FAFAFA' }}
              error={
                touched[`email${index}`] && Boolean(errors[`email${index}`])
              }
              helperText={touched[`email${index}`] && errors[`email${index}`]}
            />
          </Box>
          <Box
            sx={{
              width: '300px',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
            }}
          >
            <TextField
              // autoFocus
              margin="dense"
              id={`lastName${index}`}
              name={`lastName${index}`}
              label={text.epitheto}
              fullWidth
              variant="outlined"
              required
              value={values[`lastName${index}`]}
              onChange={handleChange}
              sx={{ backgroundColor: '#FAFAFA' }}
              error={
                touched[`lastName${index}`] &&
                Boolean(errors[`lastName${index}`])
              }
              helperText={
                touched[`lastName${index}`] && errors[`lastName${index}`]
              }
            />

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DesktopDatePicker
                label={text.hmeromhniaGennhshs}
                inputFormat="DD/MM/YYYY"
                id={`dateOfBirth${index}`}
                name={`dateOfBirth${index}`}
                value={values[`dateOfBirth${index}`]}
                // onChange={newValue => handleDateChange(newValue)}
                onChange={newValue => {
                  setFieldValue(`dateOfBirth${index}`, newValue);
                }}
                renderInput={params => (
                  <TextField
                    {...params}
                    required
                    sx={{ backgroundColor: '#FAFAFA' }}
                  />
                )}
              />
            </LocalizationProvider>

            <TextField
              // autoFocus
              margin="dense"
              id={`phoneNumber${index}`}
              name={`phoneNumber${index}`}
              label={text.thlefwnoEpikoinwnias}
              fullWidth
              variant="outlined"
              required={index === 0 ? true : false}
              value={values[`phoneNumber${index}`]}
              onChange={handleChange}
              sx={{ backgroundColor: '#FAFAFA' }}
              error={
                touched[`phoneNumber${index}`] &&
                Boolean(errors[`phoneNumber${index}`])
              }
              helperText={
                touched[`phoneNumber${index}`] && errors[`phoneNumber${index}`]
              }
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
