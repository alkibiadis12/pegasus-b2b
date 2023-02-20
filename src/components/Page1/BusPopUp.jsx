import React from 'react';
import { Box } from '@mui/system';
import { Typography } from '@mui/material';
import { Button } from '@mui/material';
import { nextStepContext } from '../Context/NextStepContextProvider';
import Slider from '@mui/material/Slider';

export default function BusPopUp({ data }) {
  const { nextStepObj, setNextStepObj } = React.useContext(nextStepContext);
  const [text, setText] = React.useState({
    shmeioParalavhs: 'Επιλογή σημείου παραλαβής λεωφορείου',
    epomenoVhma: 'Επόμενο βήμα',
  });

  //HANDLING LANGUAGE CHANGES
  React.useEffect(() => {
    switch (nextStepObj.locale) {
      case 'gr':
        setText({
          shmeioParalavhs: 'Επιλογή σημείου παραλαβής λεωφορείου',
          epomenoVhma: 'Επόμενο βήμα',
        });
        break;
      case 'uk':
        setText({
          shmeioParalavhs: 'Choose a bus pick-up point',
          epomenoVhma: 'Next step',
        });
        break;
      case 'fr':
        setText({
          shmeioParalavhs: 'Choisissez un point de prise en charge du bus',
          epomenoVhma: "L'étape suivante",
        });
        break;
      case 'pl':
        setText({
          shmeioParalavhs: 'Wybierz punkt odbioru autobusu',
          epomenoVhma: 'Następny krok',
        });
        break;
      case 'it':
        setText({
          shmeioParalavhs: "Scegli un punto di raccolta dell'autobus",
          epomenoVhma: 'Passo successivo',
        });
        break;
    }
  }, [nextStepObj.locale]);

  //====================================================

  const clickHandler = event => {
    //change context
    setNextStepObj(prev => {
      return {
        ...prev,
        busViewController: 'false',
        busRoute: mark[value].label,
      };
    });
  };

  const [value, setValue] = React.useState(0);

  const [mark, setMark] = React.useState(
    nextStepObj.displayCardData.pickUpPlace.map(e => {
      return {
        value: e.id,
        label: e.name,
      };
    })
  );

  return (
    <Box
      sx={{
        position: 'fixed',
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 100,
        backgroundColor: '#FAFAFA',
        height: {
          md: '150px',
          sm: '300px',
          xs: '400px',
        },
        flexDirection: {
          md: 'row',
          sm: 'column',
          xs: 'column',
        },
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: {
          md: '0 50px',
          sm: '20px 50px',
          xs: '20px 50px',
        },
      }}
    >
      <Typography variant="h5">{text.shmeioParalavhs}</Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '20px',
          marginLeft: {
            md: '-250px',
            sm: '0',
            xs: '0',
          },
        }}
      >
        <Typography
          variant="body2"
          sx={{
            backgroundColor: '#ffb30b',
            padding: '15px 30px',
            textTransform: 'uppercase',
            fontWeight: 500,
          }}
        >
          {mark[value].label}
        </Typography>
        <Box
          sx={{
            width: {
              md: 400,
              xs: 200,
              sm: 200,
            },
          }}
        >
          <Slider
            min={0}
            max={mark.length - 1}
            defaultValue={0}
            step={1}
            onChange={(_, value) => setValue(value)}
            size="large"
            sx={{ position: 'relative' }}
            marks
          />
        </Box>
      </Box>

      <Button
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
  );
}
