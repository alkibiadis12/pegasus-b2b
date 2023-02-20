import React from 'react';
import { Box } from '@mui/material';
import { TextField } from '@mui/material';
import { nextStepContext } from '../Context/NextStepContextProvider';
import { Autocomplete } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

function Page3Inputs({
  index,
  handleChange,
  values,
  setFieldValue,
  errors,
  touched,
  option,
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

  //======================================================================

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: {
            md: 'space-between',
            xs: 'center',
          },
          alignItems: { md: 'inherit', xs: 'center' },
          flexDirection: {
            md: 'row',
            xs: 'column',
          },
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
            // autoFocus={index === 0 ? true : false}

            autoFocus={false}
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
            isOptionEqualToValue={(option, value) => option.name === value.name}
            disableClearable
            id={`nationality${index}`}
            name={`nationality${index}`}
            // disablePortal
            options={nextStepObj.nationalitiesData}
            getOptionLabel={option => option.name}
            value={values[`nationality${index}`]}
            sx={{ width: 300, backgroundColor: '#FAFAFA' }}
            onChange={(e, value) => {
              setFieldValue(
                `nationality${index}`,
                value !== null
                  ? value
                  : option === 'submit'
                  ? nextStepObj?.finalObjectb2b?.userInfo[`nationality${index}`]
                  : nextStepObj?.selectedBookingCardInfo
                      ?.selectedBookingInitialValues[`nationality${index}`]
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
            error={touched[`email${index}`] && Boolean(errors[`email${index}`])}
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
              touched[`lastName${index}`] && Boolean(errors[`lastName${index}`])
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
      <Box
        sx={{
          marginTop: '40px',

          // marginLeft: { md: 0, xs: '40px', sm: '210px' },
          margin: { md: 0, xs: '20px 40px', sm: '20px 200px' },
          display: 'flex',
        }}
      >
        <TextField
          // autoFocus

          margin="dense"
          label="Παρατηρήσεις"
          fullWidth
          multiline
          variant="outlined"
          value={
            nextStepObj.finalObjectb2b?.comment
              ? nextStepObj.finalObjectb2b.comment
              : ''
          }
          onChange={e =>
            setNextStepObj({
              ...nextStepObj,
              finalObjectb2b: {
                ...nextStepObj.finalObjectb2b,
                comment: e.target.value,
              },
            })
          }
          sx={{ backgroundColor: '#FAFAFA' }}
        />
      </Box>
    </Box>
  );
}

export default Page3Inputs;
