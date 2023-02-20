import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useFormik } from 'formik';
import { loginSchema } from '../../schemas/schemas';
import { nextStepContext } from '../Context/NextStepContextProvider';

export default function LoginDialog(props) {
  const { nextStepObj, setNextStepObj } = React.useContext(nextStepContext);

  const [text, setText] = React.useState({
    syndesiPanw: 'Σύνδεση',
    email: 'Διεύθυνση email',
    kwdikos: 'Κωδικός',
    akyrwsh: 'ΑΚΥΡΩΣΗ',
    syndesh: 'ΣΥΝΔΕΣΗ',
  });

  //HANDLING LANGUAGE CHANGES
  React.useEffect(() => {
    switch (nextStepObj.locale) {
      case 'gr':
        setText({
          syndesiPanw: 'Σύνδεση',
          email: 'Διεύθυνση email',
          kwdikos: 'Κωδικός',
          akyrwsh: 'ΑΚΥΡΩΣΗ',
          syndesh: 'ΣΥΝΔΕΣΗ',
        });
        break;
      case 'uk':
        setText({
          syndesiPanw: 'Login',
          email: 'Email address',
          kwdikos: 'Password',
          akyrwsh: 'CANCEL',
          syndesh: 'LOGIN',
        });
        break;
      case 'fr':
        setText({
          syndesiPanw: 'Connexion',
          email: 'Adresse e-mail',
          kwdikos: 'Mot de passe',
          akyrwsh: 'ANNULER',
          syndesh: 'CONNEXION',
        });
        break;
      case 'pl':
        setText({
          syndesiPanw: 'Zaloguj sie',
          email: 'Adres e-mail',
          kwdikos: 'Hasło',
          akyrwsh: 'ANULOWAĆ',
          syndesh: 'ZALOGUJ SIE',
        });
        break;
      case 'it':
        setText({
          syndesiPanw: 'Accedere',
          email: 'Indirizzo e-mail',
          kwdikos: "Parola d'ordine",
          akyrwsh: 'ANNULLA',
          syndesh: 'ACCEDERE',
        });
        break;
    }
  }, [nextStepObj.locale]);

  //=================================================================

  const onSubmit = () => {
    props.onDialogLoginSubmitHandler(formik.values);
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: loginSchema,
    onSubmit,
  });

  return (
    <>
      <Dialog
        open={props.open}
        onClose={props.onDialogLoginCloseHandler}
        sx={{ minWidth: '400px' }}
      >
        <DialogTitle>{text.syndesiPanw}</DialogTitle>
        <form onSubmit={formik.handleSubmit}>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="loginEmail"
              name="email"
              label={text.email}
              fullWidth
              variant="standard"
              required
              //   onChange={handleChange}
              //   value={userCredentials.email}
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              //   helperText={formik.errors?.email ? `${formik.errors.email}` : ''}
            />
            <TextField
              autoFocus
              margin="dense"
              id="loginPassword"
              name="password"
              label={text.kwdikos}
              type="password"
              fullWidth
              variant="standard"
              required
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
          </DialogContent>
          <DialogActions>
            <Button type="button" onClick={props.onDialogLoginCloseHandler}>
              {text.akyrwsh}
            </Button>
            <Button type="submit">{text.syndesh}</Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}
