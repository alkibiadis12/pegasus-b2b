import React from 'react';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import Typography from '@mui/material/Typography';
import LoginDialog from './LoginDialog';
import { Box } from '@mui/system';
import { nextStepContext } from '../Context/NextStepContextProvider';

//=====================================================
//Custom Styles - repeated

const typographyLikeButton = {
  color: '#0052b4',
  cursor: 'pointer',
};

//=====================================================
export default function Login() {
  const { nextStepObj, setNextStepObj } = React.useContext(nextStepContext);

  const [text, setText] = React.useState({
    syndesi: 'Σύνδεση',
  });

  //HANDLING LANGUAGE CHANGES
  React.useEffect(() => {
    switch (nextStepObj.locale) {
      case 'gr':
        setText({
          syndesi: 'Σύνδεση',
        });
        break;
      case 'uk':
        setText({
          syndesi: 'Login',
        });
        break;
      case 'fr':
        setText({
          syndesi: 'Connexion',
        });
        break;
      case 'pl':
        setText({
          syndesi: 'Zaloguj sie',
        });
        break;
      case 'it':
        setText({
          syndesi: 'Accedere',
        });
        break;
    }
  }, [nextStepObj.locale]);

  //Dialog login
  const [dialogLoginOpen, setDialogLoginOpen] = React.useState(false);

  //on click event from login
  const dialogLoginOpenHandler = () => {
    setDialogLoginOpen(true);
  };

  //on click event from LoginDialog component
  const dialogLoginCloseHandler = () => {
    setDialogLoginOpen(false);
  };

  //TODO: VALIDATION WITH THE SERVER! CLOSE THE DIALOG ONLY IF THE INFO IS CORRECT!
  const [userCredentials, setUserCredentials] = React.useState(null);
  const dialogLoginSubmitHandler = submitedUserCredentials => {
    setDialogLoginOpen(false);
    setUserCredentials(submitedUserCredentials);
    setNextStepObj({ ...nextStepObj, isLoggedIn: true });
  };

  //==========================================================

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          gap: '10px',
          alignItems: 'center',
          paddingRight: '15px',
        }}
      >
        <PersonRoundedIcon
          sx={{ color: '#0052b4', fontSize: '20px', marginBottom: '3px' }}
        />

        <div>
          <Typography
            variant="subtitle2"
            sx={typographyLikeButton}
            onClick={dialogLoginOpenHandler}
          >
            {text.syndesi}
          </Typography>
        </div>
      </Box>
      <LoginDialog
        open={dialogLoginOpen}
        onDialogLoginCloseHandler={dialogLoginCloseHandler}
        onDialogLoginSubmitHandler={dialogLoginSubmitHandler}
      />
    </>
  );
}
