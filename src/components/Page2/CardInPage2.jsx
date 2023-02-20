import React from 'react';
import { Box } from '@mui/system';
import { Typography } from '@mui/material';
import { Link } from '@mui/material';
import { nextStepContext } from '../Context/NextStepContextProvider';

export default function CardInPage2(props) {
  const { nextStepObj, setNextStepObj } = React.useContext(nextStepContext);
  const [text, setText] = React.useState({
    apo: 'ΑΠΟ',
    hmeromhniaEkdromis: 'Ημερομηνία εκδρομής',
    wraAnaxwrhshs: 'Ώρα αναχώρησης',
    epistrofh: 'Επιστροφή',
    plhrofories: 'ΠΛΗΡΟΦΟΡΙΕΣ',
    monohmerh: 'Μονοήμερη Κρουαζιέρα',
    polyhmerh: 'Πολυήμερη Κρουαζιέρα',
    diathesimesTheseis: 'Διαθέσιμες θέσεις',
    eksantlimenaEishthria: 'Εξαντλημένα εισιτήρια',
    timh: 'Τιμή',
    elikse: 'ΕΛΗΞΕ',
  });

  //HANDLING LANGUAGE CHANGES
  React.useEffect(() => {
    switch (nextStepObj.locale) {
      case 'gr':
        setText({
          apo: 'ΑΠΟ',
          hmeromhniaEkdromis: 'Ημερομηνία εκδρομής',
          wraAnaxwrhshs: 'Ώρα αναχώρησης',
          epistrofh: 'Επιστροφή',
          plhrofories: 'ΠΛΗΡΟΦΟΡΙΕΣ',
          monohmerh: 'Μονοήμερη Κρουαζιέρα',
          polyhmerh: 'Πολυήμερη Κρουαζιέρα',
          diathesimesTheseis: 'Διαθέσιμες θέσεις',
          eksantlimenaEishthria: 'Εξαντλημένα εισιτήρια',
          timh: 'Τιμή',
          elikse: 'ΕΛΗΞΕ',
        });
        break;
      case 'uk':
        setText({
          apo: 'FROM',
          hmeromhniaEkdromis: 'Excursion date',
          wraAnaxwrhshs: 'Time of department',
          epistrofh: 'Returns to',
          plhrofories: 'Information',
          monohmerh: 'One day cruise',
          polyhmerh: 'Multi day cruise',
          diathesimesTheseis: 'Available tickets',
          eksantlimenaEishthria: 'Out of stock',
          timh: 'Price',
          elikse: 'FINISHED',
        });
        break;
      case 'fr':
        setText({
          apo: 'DEPUIS',
          hmeromhniaEkdromis: "Date de l'excursion",
          wraAnaxwrhshs: 'Heure du département',
          epistrofh: 'Retourne à',
          plhrofories: 'Renseignements',
          monohmerh: "Croisière d'un jour",
          polyhmerh: 'Croisière de plusieurs jours',
          diathesimesTheseis: 'Billets disponibles',
          eksantlimenaEishthria: 'Rupture de stock',
          timh: 'Prix',
          elikse: 'ACHEVÉE',
        });
        break;
      case 'pl':
        setText({
          apo: 'Z',
          hmeromhniaEkdromis: 'Data wycieczki',
          wraAnaxwrhshs: 'Czas działu',
          epistrofh: 'Wraca do',
          plhrofories: 'Informacja',
          monohmerh: 'Jednodniowy rejs',
          polyhmerh: 'Wielodniowy rejs',
          diathesimesTheseis: 'Dostępne bilety',
          eksantlimenaEishthria: 'Obecnie brak na stanie',
          timh: 'Cena',
          elikse: 'SKOŃCZONE',
        });
        break;
      case 'it':
        setText({
          apo: 'DA',
          hmeromhniaEkdromis: "Data dell'escursione",
          wraAnaxwrhshs: 'Tempo di reparto',
          epistrofh: 'Ritorna a',
          plhrofories: 'Informazione',
          monohmerh: 'Crociera di un giorno',
          polyhmerh: 'Crociera di più giorni',
          diathesimesTheseis: 'Biglietti disponibili',
          eksantlimenaEishthria: 'Esaurito',
          timh: 'Prezzo',
          elikse: 'FINITA',
        });
        break;
    }
  }, [nextStepObj.locale]);

  //==============================================

  const { fullDate, displayCardData } = props.data;
  const {
    cruiseName,
    portName,
    departureTime,
    returnTime,
    oneDayTrip,
    urlWithDetails,
    imgUrl,
  } = displayCardData;

  return (
    <>
      <Box
        sx={{
          backgroundImage: `url(${imgUrl})`,
          backgroundSize: 'cover',
          width: '100%',
          height: {
            md: '150px',
            sm: '180px',
            xs: '180px',
          },
          padding: '10px 20px',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
        }}
      >
        <Box
          sx={{
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
          }}
        />
        <Box
          sx={{
            display: 'flex',
            flexDirection: {
              md: 'row',
              sm: 'column',
              xs: 'column',
            },
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Typography variant="h6" sx={{ color: '#fff', zIndex: '100' }}>
            {cruiseName} {text.apo} {portName}
          </Typography>
          <Typography variant="subtitle2" sx={{ color: '#fff', zIndex: '100' }}>
            {oneDayTrip === 'true' ? `${text.monohmerh}` : `${text.polyhmerh}`}
          </Typography>
        </Box>
        <Box
          sx={{
            marginTop: {
              md: '15px',
              sm: '10px',
              xs: '10px',
            },
            zIndex: '100',
            display: { md: 'block', sm: 'flex', xs: 'flex' },
            justifyContent: 'center',
          }}
        >
          <Typography variant="body1" sx={{ color: '#fff', zIndex: '100' }}>
            {text.hmeromhniaEkdromis}: {fullDate}
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: {
              md: 'row',
              sm: 'column',
              xs: 'column',
            },
            gap: {
              md: 0,
              sm: '10px',
              xs: '10px',
            },
            marginTop: {
              md: '30px',
              sm: '10px',
              xs: '10px',
            },
            zIndex: '100',
          }}
        >
          <Typography variant="body1" sx={{ color: '#fff' }}>
            {text.wraAnaxwrhshs}: {departureTime} - {returnTime}
          </Typography>
          <Link
            href={urlWithDetails}
            target="_blank"
            rel="noopener noreferrer"
            variant="button"
            color={'#ffb30b'}
            sx={{ zIndex: '100' }}
          >
            {text.plhrofories}
          </Link>
        </Box>
      </Box>
    </>
  );
}
