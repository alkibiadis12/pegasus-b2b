import React from 'react';
import { Card } from '@mui/material';
import { Box } from '@mui/system';
import { Typography } from '@mui/material';
import dayjs from 'dayjs';
import { Link } from '@mui/material';
import BusAlertIcon from '@mui/icons-material/BusAlert';
import { nextStepContext } from '../Context/NextStepContextProvider';

const container = {
  width: '100%',

  height: {
    md: '150px',
    xs: '305px',
    sm: '305px',
  },

  marginBottom: '40px',
  padding: '10px 20px',
  display: 'flex',
  flexDirection: 'column',
  gap: '5px',
  position: 'relative',
};

export default function CardCustom({
  selectedCruise,
  selectedCruizeAndLocation,
  selectedDate,
  index,
  ticketData,
  whichCardIsSelected,
  SetWhichCardIsSelected,
  sendDataFromCard,
  setDataFromCard,
}) {
  const [differenceInMinutes, setdifferenceInMinutes] = React.useState(null);
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

  React.useEffect(() => {
    const temp = selectedCruizeAndLocation.departs_return[index].departureTime;
    const tempIndex = temp.indexOf(':');
    const hours = selectedCruizeAndLocation.departs_return[
      index
    ].departureTime.slice(0, tempIndex);
    const day = dayjs(selectedDate).get('date');
    const month = dayjs(selectedDate).get('month');
    const year = dayjs(selectedDate).get('year');
    const cardDate = dayjs(new Date(year, month, day, hours));
    setdifferenceInMinutes(cardDate.diff(dayjs(), 'minute'));
  }, [ticketData]);

  const handleClick = availableTickets => {
    //YOU CANT BOOK TICKETS IN THE LAST 1 MINUTE!!!!
    if (differenceInMinutes < 1) return;

    if (availableTickets === 0) {
      return;
    } else {
      if (whichCardIsSelected === index) {
        SetWhichCardIsSelected(null);
        setDataFromCard(null);
      } else {
        SetWhichCardIsSelected(index);

        const returnedObject = {
          cruise_id: selectedCruise.cruise_id,
          departReturnId: index,
          boarding_locations_id: selectedCruizeAndLocation.id,
          // startLocationId: selectedCruizeAndLocation.startLocationId,
          fullDate: dayjs(selectedDate).format('DD/MM/YYYY'),
          availableSeatsPerTrip: availableTickets,
          infantPrice: selectedCruizeAndLocation.infantPrice,
          childPrice: selectedCruizeAndLocation.childPrice,
          adultPrice: selectedCruizeAndLocation.adultPrice,
          seniorPrice: selectedCruizeAndLocation.seniorPrice,
          displayCardData: {
            cruiseName: selectedCruise.name,
            portName: selectedCruizeAndLocation.portName,
            departureTime:
              selectedCruizeAndLocation.departs_return[index].departureTime,
            returnTime:
              selectedCruizeAndLocation.departs_return[index].returnTime,
            oneDayTrip: selectedCruizeAndLocation.oneDayTrip,
            urlWithDetails: selectedCruizeAndLocation.urlWithDetails,
            imgUrl: selectedCruise.boarding_locations[index].imgUrl,
            bus: `${selectedCruizeAndLocation.bus === 'false' ? false : true}`,
            returnAt: selectedCruizeAndLocation.returnAt,
            pickUpPlace: selectedCruizeAndLocation.pickUpPlace,
          },
        };
        sendDataFromCard(returnedObject);
      }
    }
  };

  return (
    <>
      {differenceInMinutes !== null && (
        <Card
          square
          onClick={e => handleClick(ticketData.availableSeatsPerTrip)}
          sx={[
            container,
            {
              backgroundImage: `url(${selectedCruise.boarding_locations[index].imgUrl})`,
              backgroundSize: 'cover',
              cursor: `${
                differenceInMinutes < 1 ||
                ticketData.availableSeatsPerTrip === 0
                  ? 'auto'
                  : 'pointer'
              }`,
              ': hover': {
                boxShadow: `${
                  differenceInMinutes < 1 ||
                  (ticketData.availableSeatsPerTrip === 0 &&
                    whichCardIsSelected !== index)
                    ? '0 0 0 2px red'
                    : '0 0 0 5px #FFB30B'
                }`,
              },
              boxShadow: `${
                whichCardIsSelected === index
                  ? '0 0 0 5px #FFB30B'
                  : differenceInMinutes < 1 ||
                    ticketData.availableSeatsPerTrip === 0
                  ? '0 0 0 2px red'
                  : '0 0 5px 1px rgba(0, 0, 0, 0.3)'
              }`,
            },
          ]}
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
              gap: {
                md: 0,
                sm: '5px',
                xs: '5px',
              },
            }}
          >
            <Typography variant="h6" sx={{ color: '#fff', zIndex: '100' }}>
              {selectedCruise.name} {text.apo}{' '}
              {selectedCruizeAndLocation.portName}
            </Typography>
            {differenceInMinutes < 1 && (
              <Typography
                variant="h6"
                sx={{
                  backgroundColor: '#ffb30b',
                  padding: '5px 10px',
                  zIndex: '100',
                }}
              >
                {text.elikse}
              </Typography>
            )}
            <Typography
              variant="subtitle2"
              sx={{ color: '#fff', zIndex: '100' }}
            >
              {selectedCruizeAndLocation.oneDayTrip === 'true'
                ? `${text.monohmerh}`
                : `${text.polyhmerh}`}
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: {
                md: 'row',
                sm: 'column',
                xs: 'column',
              },
              alignItems: 'center',
              justifyContent: {
                md: 'space-between',
                sm: 'start',
                xs: 'start',
              },
              gap: {
                md: '0',
                sm: '10px',
                xs: '10px',
              },
              height: '200px',
            }}
          >
            <Typography variant="body2" sx={{ color: '#fff', zIndex: '100' }}>
              {text.hmeromhniaEkdromis}:{' '}
              {dayjs(selectedDate).format('DD/MM/YYYY')}
            </Typography>
            {/* {ticketData.availableSeatsPerTrip < 10 && ( */}
            <Box
              sx={{
                backgroundColor: '#ffb30b',
                padding: '5px 10px',
                zIndex: '100',
              }}
            >
              <Typography variant="subtitle2" sx={{ color: '#000' }}>
                {ticketData.availableSeatsPerTrip === 0 &&
                  `${text.eksantlimenaEishthria}`}
                {ticketData.availableSeatsPerTrip <= 10 &&
                  ticketData.availableSeatsPerTrip > 0 &&
                  `${text.diathesimesTheseis}: ${ticketData.availableSeatsPerTrip}`}
                {ticketData.availableSeatsPerTrip > 10 &&
                  `${text.diathesimesTheseis}: >10`}
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              marginTop: {
                md: '10px',
                sm: '-130px',
                xs: '-130px',
              },
              display: 'flex',
              alignItems: 'center',
              justifyContent: {
                md: 'space-between',
                sm: 'start',
                xs: 'start',
              },
              flexDirection: {
                md: 'row',
                sm: 'column',
                xs: 'column',
              },
              gap: {
                md: '0',
                sm: '10px',
                xs: '10px',
              },
            }}
          >
            <Typography variant="body2" sx={{ color: '#fff', zIndex: '100' }}>
              {text.wraAnaxwrhshs}:{' '}
              {selectedCruizeAndLocation.departs_return[index].departureTime} -{' '}
              {selectedCruizeAndLocation.departs_return[index].returnTime}(
              {text.epistrofh} {selectedCruizeAndLocation.returnAt?.slice(0, 1)}
              {selectedCruizeAndLocation.returnAt
                ?.toLowerCase()
                ?.slice(1, selectedCruizeAndLocation.returnAt.length)}
              )
            </Typography>
            <Link
              href={selectedCruizeAndLocation.urlWithDetails}
              target="_blank"
              rel="noopener noreferrer"
              variant="button"
              sx={{ zIndex: '100', color: '#ffb30b' }}
            >
              {text.plhrofories}
            </Link>
            <Box
              sx={{
                backgroundColor: '#ffb30b',
                padding: '5px 10px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                zIndex: '100',
              }}
            >
              {}
              {selectedCruizeAndLocation.bus === 'true' && <BusAlertIcon />}
              <Typography variant="h6" sx={{ color: '#000' }}>
                {text.timh}:€{selectedCruizeAndLocation.adultPrice}
              </Typography>
            </Box>
          </Box>
        </Card>
      )}
    </>
  );
}
