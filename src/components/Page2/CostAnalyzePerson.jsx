import React from 'react';
import { Box } from '@mui/system';
import { Grid } from '@mui/material';
import { Typography } from '@mui/material';
import { nextStepContext } from '../Context/NextStepContextProvider';

export default function CostAnalyzePerson({ marginTop, desc, tickets, price }) {
  const { nextStepObj, setNextStepObj } = React.useContext(nextStepContext);

  const [text, setText] = React.useState({
    adults: 'Ενήλικες',
    seniors: 'Ηλικιωμένοι',
    children: 'Παιδιά',
    infants: 'Βρέφη - Μικρά παιδιά',
  });

  //HANDLING LANGUAGE CHANGES
  React.useEffect(() => {
    switch (nextStepObj.locale) {
      case 'gr':
        setText({
          adults: 'Ενήλικες',
          seniors: 'Ηλικιωμένοι',
          children: 'Παιδιά',
          infants: 'Βρέφη',
        });
        break;
      case 'uk':
        setText({
          adults: 'Adults',
          seniors: 'Seniors',
          children: 'Children',
          infants: 'Infants',
        });
        break;
      case 'fr':
        setText({
          adults: 'Adultes',
          seniors: 'Séniors',
          children: 'Enfants',
          infants: 'Nourrissons',
        });
        break;
      case 'pl':
        setText({
          adults: 'Dorośli ludzie',
          seniors: 'Seniorzy',
          children: 'Dzieci',
          infants: 'Niemowlęta',
        });
        break;
      case 'it':
        setText({
          adults: 'Adults',
          seniors: 'Gli anziani',
          children: 'Bambino',
          infants: 'Neonato',
        });
        break;
    }
  }, [nextStepObj.locale]);

  //====================================================

  const [localDesc, setLocalDesc] = React.useState(desc);
  React.useEffect(() => {
    switch (desc) {
      case 'Adults':
        setLocalDesc(text.adults);
        break;
      case 'Seniors':
        setLocalDesc(text.seniors);
        break;
      case 'Children':
        setLocalDesc(text.children);
        break;
      case 'Infants':
        setLocalDesc(text.infants);
        break;
    }
  }, [text]);

  return (
    <Box
      sx={{
        marginTop: { marginTop },
        display: 'flex',
        // justifyContent: 'space-between',
      }}
    >
      <Grid item xs={4} sx={{ width: '200px' }}>
        <Typography variant="subtitle1">{localDesc}:</Typography>
      </Grid>

      <Grid
        item
        xs={4}
        sx={{ display: 'flex', justifyContent: 'center', width: '50px' }}
      >
        <Typography
          variant="subtitle1"
          sx={{
            fontWeight: '500',
            justifySelf: 'center',
          }}
        >
          x{tickets}
        </Typography>
      </Grid>
      <Grid
        item
        xs={4}
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          width: '50px',
        }}
      >
        <Typography
          variant="subtitle1"
          sx={{ marginLeft: '40px', fontWeight: '600' }}
        >
          {tickets !== 0 ? `€${tickets * price}` : ''}
        </Typography>
      </Grid>
    </Box>
  );
}
