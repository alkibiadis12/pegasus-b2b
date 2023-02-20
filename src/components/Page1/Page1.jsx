import React from 'react';
import { Box } from '@mui/system';
import { Grid } from '@mui/material';
import CruisesData from '../Data/CruisesData';
import StartLocationData from '../Data/StartLocationData';
import AutocompleteCustom from './AutocompleteCustom';
import DatePickerCustom from './DatePickerCustom';
import AvailableTicketsData from '../Data/AvailableTicketsData';
import CardCustom from './CardCustom';
import { Container } from '@mui/material';
import SelectedDay from './SelectedDate';
import dayjs from 'dayjs';
import OutsideAlerter from './OutsideAlerter';
import PricingPopUp from './PricingPopUp';
import { Alert } from '@mui/material';
import { Typography } from '@mui/material';
import BreadcrumbCustom from '../header/BreadcrumbCustom';
import { motion } from 'framer-motion';
import BusPopUp from './BusPopUp';
import { nextStepContext } from '../Context/NextStepContextProvider';

export default function Page1({
  pageIndex,
  setPageIndex,
  cruises,
  setCruises,
  searchParams,
  setSearchParams,
}) {
  //STATES
  //===============================================
  const [selectedCruise, setSelectedCruise] = React.useState(null);
  const [startLocation, setStartLocation] = React.useState(null);
  const [selectedLocation, setSelectedLocation] = React.useState(null);
  const [filteredLocations, setFilteredLocations] = React.useState(null);
  const [filteredAvailableTrips, setFilteredAvailableTrips] =
    React.useState(null);
  const [selectedCruizeAndLocation, setSelectedCruizeAndLocation] =
    React.useState(null);
  const [availableTicketsData, setAvailableTicketsData] = React.useState(null);
  const [filteredTicketsData, setFilteredTicketsData] = React.useState(null);
  const [selectedDate, setSelectedDate] = React.useState(null);
  const [selectedDayInAvailableTickets, setSelectedDayInAvailableTickets] =
    React.useState(null);
  const [whichCardIsSelected, SetWhichCardIsSelected] = React.useState(null);
  const [dataFromCard, setDataFromCard] = React.useState();
  const [showAlert, setShowAlert] = React.useState(false);
  const [showAlertOutOfRange, setShowAlertOutOfRange] = React.useState(false);
  const [showBus, setShowBus] = React.useState(null);
  const [whichAutocompleteSelectedFirst, setWhichAutocompleteSelectedFirst] =
    React.useState(null);

  const { nextStepObj, setNextStepObj } = React.useContext(nextStepContext);
  const [text, setText] = React.useState({
    diathesimesEkdromes: 'Διαθέσιμες εκδρομές',
    topothesiaAnaxwrhshs: 'Τοποθεσία Αναχώρησης',
    custody: 'Τα παιδιά και τα βρέφη πρέπει να συνοδεύονται από ενήλικα.',
    availableTickets: 'Τα διαθέσιμα εισητήρια είναι',
  });

  //HANDLING LANGUAGE CHANGES
  React.useEffect(() => {
    switch (nextStepObj.locale) {
      case 'gr':
        setText({
          diathesimesEkdromes: 'Διαθέσιμες εκδρομές',
          topothesiaAnaxwrhshs: 'Τοποθεσία Αναχώρησης',
          custody: 'Τα παιδιά και τα βρέφη πρέπει να συνοδεύονται από ενήλικα.',
          availableTickets: 'Τα διαθέσιμα εισητήρια είναι',
        });
        break;
      case 'uk':
        setText({
          diathesimesEkdromes: 'Available Trips',
          topothesiaAnaxwrhshs: 'Departure Location',
          custody:
            'Children and Infants needs to be in custody of at least an adult or a senior',
          availableTickets: 'Available tickets',
        });
        break;
      case 'fr':
        setText({
          diathesimesEkdromes: 'Voyages disponibles',
          topothesiaAnaxwrhshs: 'Lieu de départ',
          custody:
            "Les enfants et les bébés doivent être sous la garde d'au moins un adulte ou une personne âgée",
          availableTickets: 'Billets disponibles',
        });
        break;
      case 'pl':
        setText({
          diathesimesEkdromes: 'Dostępne wycieczki',
          topothesiaAnaxwrhshs: 'Lokalizacja wyjazdu',
          custody:
            'Dzieci i niemowlęta muszą znajdować się pod opieką co najmniej osoby dorosłej lub seniora',
          availableTickets: 'Dostępne bilety',
        });
        break;
      case 'it':
        setText({
          diathesimesEkdromes: 'Viaggi disponibili',
          topothesiaAnaxwrhshs: 'Luogo di partenza',
          custody:
            'Bambini e neonati devono essere affidati ad almeno un adulto o un anziano',
          availableTickets: 'Biglietti disponibili',
        });
        break;
    }
  }, [nextStepObj.locale]);

  React.useEffect(() => {
    setNextStepObj({ ...nextStepObj, affiliated: searchParams.get('af') });
  }, []);

  //SELECTED CRUISE FROM URL PARAMETERS
  React.useEffect(() => {
    if (
      searchParams.get('cr') !== 'null' &&
      cruises &&
      Number(searchParams.get('cr')) < cruises.length &&
      Number(searchParams.get('cr')) > -1
    ) {
      let selectedCruiseFromParams = cruises
        .filter(cruise => {
          return String(cruise.cruise_id) === searchParams.get('cr');
        })
        .at(0);
      selectedCruiseFromParams = {
        ...selectedCruiseFromParams,
        label: selectedCruiseFromParams.name,
      };

      setSelectedCruise(selectedCruiseFromParams);
    }
  }, [cruises]);

  //SELECTED LOCATION FROM URL PARAMETERS
  React.useEffect(() => {
    if (searchParams.get('cr') === 'null') {
      //TODO: maybe in the future!
    } else {
      if (selectedCruise !== null) {
        const selectedLocationFromParams =
          selectedCruise.boarding_locations.map(bl => {
            return {
              id: bl.startLocationId,
              name: bl.portName,
              label: bl.portName,
            };
          });

        changeRenderedAvailableTripsBasedOnCruises();

        setFilteredLocations(selectedLocationFromParams);

        const tempSelectedLocation = {
          id: selectedCruise.boarding_locations[Number(searchParams.get('bl'))]
            ?.id,

          name: selectedCruise.boarding_locations[
            Number(searchParams.get('bl'))
          ]?.portName,

          label:
            selectedCruise.boarding_locations[Number(searchParams.get('bl'))]
              ?.portName,
        };

        setSelectedLocation(tempSelectedLocation);
      }
    }
  }, [selectedCruise]);

  //SELECTED DATE FROM URL
  React.useEffect(() => {
    if (
      searchParams.get('d') !== 'null' &&
      searchParams.get('d').length === 8
    ) {
      const minDate = dayjs(new Date());
      const maxDate = dayjs(new Date()).add(3, 'month');
      const paramsDay = searchParams.get('d');
      const day = Number(paramsDay.slice(0, 2));
      const month = Number(paramsDay.slice(2, 4)) - 1;
      const year = Number(paramsDay.slice(4, 8));
      const receivedDateFropParams = dayjs(new Date(year, month, day));
      const diff1 = receivedDateFropParams.diff(minDate, 'day', true);
      const diff2 = maxDate.diff(receivedDateFropParams, 'day', true);

      if (diff1 > -1 && diff2 < 91 && diff2 > -1) {
        setSelectedDate(receivedDateFropParams);
      }
    }
  }, [selectedLocation]);

  //======================================================
  //GENERAL FUNCTIONS
  function changeRenderedCruizesBasedOnLocation() {
    const tempCruises = cruises.filter(cruise => {
      return (
        cruise.boarding_locations.filter(bl => {
          return bl.startLocationId === selectedLocation.id;
        }).length > 0
      );
    });
    setFilteredAvailableTrips(tempCruises);
  }

  function changeRenderedAvailableTripsBasedOnCruises() {
    const tempLoc = startLocation.filter(location => {
      return (
        selectedCruise.boarding_locations.filter(
          bl => bl.startLocationId === location.id
        ).length !== 0
      );
    });

    setFilteredLocations(tempLoc);
  }

  //======================================================
  //EVENT FUNCTIONS

  //RECEIVE DATA FROM JSON
  const receiveCruises = receivedCruises => {
    setCruises(receivedCruises);
  };

  //RECEIVE DATA FROM JSON
  const receiveLocations = reveivedLocations => {
    setStartLocation(reveivedLocations);
    // setFilteredLocations(reveivedLocations);
  };

  //RECEIVE THE SELECTED CRUISE FROM AVAILABLE TRIPS AUTOCOMPLETE
  const receiveSelectedCruise = receivedSelectedCruise => {
    setSelectedCruise(receivedSelectedCruise);
    //HANDLING THE AUTOCOMPLETE FORMS
    if (
      receivedSelectedCruise === null &&
      whichAutocompleteSelectedFirst === 1
    ) {
      setSelectedLocation(null);
      setWhichAutocompleteSelectedFirst(null);
    }
    if (selectedLocation === null) {
      setWhichAutocompleteSelectedFirst(1);
    }
    if (
      selectedLocation !== null &&
      receivedSelectedCruise !== null &&
      whichAutocompleteSelectedFirst === 1
    ) {
      const result = receivedSelectedCruise.boarding_locations.filter(bl => {
        return bl.portName === selectedLocation.name;
      });
      result.length === 0 && setSelectedLocation(null);
    }
    setSelectedDate(null);
  };

  //RECEIVE SELECTED LOCATION FROM AUTOCOMPLETE MENU
  const receiveSelectedLocation = receivedSelectedLocation => {
    setSelectedLocation(receivedSelectedLocation);
    //HANDLING THE AUTOCOMPLETE FORMS
    if (
      receivedSelectedLocation === null &&
      whichAutocompleteSelectedFirst === 2
    ) {
      setSelectedCruise(null);
      setWhichAutocompleteSelectedFirst(null);
    }
    if (selectedCruise === null) {
      setWhichAutocompleteSelectedFirst(2);
    }
    if (
      selectedCruise !== null &&
      receivedSelectedLocation !== null &&
      whichAutocompleteSelectedFirst === 2
    ) {
      const result = selectedCruise.boarding_locations.filter(bl => {
        return bl.portName === receivedSelectedLocation.name;
      });
      result.length === 0 && setSelectedCruise(null);
    }
    setSelectedDate(null);
  };

  const receiveAvailableTickets = receivedAvailableTickets => {
    setAvailableTicketsData(receivedAvailableTickets);
  };

  //----------

  const receiveSelectedDate = receivedSelectedDate => {
    setSelectedDate(receivedSelectedDate);
  };

  //----------

  const reveiveDataFromCard = reveivedDataFromCard => {
    setDataFromCard(reveivedDataFromCard);
    setShowBus(null);
  };

  //======================================================
  //Autocomplete menus

  React.useEffect(() => {
    const cr = Number(searchParams.get('cr'));
    const bl = Number(searchParams.get('bl'));
    const d = Number(searchParams.get('d'));

    //===============================
    if (!selectedCruise && !selectedLocation) {
      setWhichAutocompleteSelectedFirst(null);
      setFilteredLocations(startLocation);
      setFilteredAvailableTrips(cruises);
    }

    if (selectedCruise && !selectedLocation) {
      setWhichAutocompleteSelectedFirst(1);
      changeRenderedAvailableTripsBasedOnCruises();
    }
    if (!selectedCruise && selectedLocation) {
      setWhichAutocompleteSelectedFirst(2);
      changeRenderedCruizesBasedOnLocation();
    }
  }, [cruises, startLocation, selectedCruise, selectedLocation]);

  //////////////////////////////////////////////////////////////////////////

  //ALL MENUS SELECTED
  React.useEffect(() => {
    if (availableTicketsData && selectedCruise && selectedLocation) {
      const tempSelectedCruizeAndLocation =
        selectedCruise.boarding_locations.filter(bl => {
          return bl.startLocationId === selectedLocation.id;
        });

      setSelectedCruizeAndLocation(tempSelectedCruizeAndLocation[0]);

      const tempData = availableTicketsData.filter(t => {
        return (
          t?.cruise_id === selectedCruise?.cruise_id &&
          t?.boarding_locations_id === tempSelectedCruizeAndLocation[0]?.id
        );
      });

      setFilteredTicketsData(tempData[0]);

      if (tempData[0]) {
        const temp = tempData[0].availableSeatsPerDay.filter(day => {
          return (
            day.day === String(dayjs(selectedDate).get('date')) &&
            day.month === String(dayjs(selectedDate).get('month') + 1) &&
            day.year === String(dayjs(selectedDate).get('year'))
          );
        });

        // if (filteredTicketsData) {
        //   const temp = filteredTicketsData.availableSeatsPerDay.filter(day => {
        //     return (
        //       day.day === String(dayjs(selectedDate).get('date')) &&
        //       day.month === String(dayjs(selectedDate).get('month') + 1) &&
        //       day.year === String(dayjs(selectedDate).get('year'))
        //     );
        //   });

        setSelectedDayInAvailableTickets(temp);
      }
    }
  }, [availableTicketsData, selectedLocation, selectedCruise, selectedDate]);

  // SET VALUES TO NULL WHEN CHANGE PAGE

  React.useEffect(() => {
    setSelectedCruise(null);
    setSelectedLocation(null);
    setSelectedDate(null);
    setFilteredAvailableTrips(null);
  }, [pageIndex]);

  //------------------------------------------------------------------
  return (
    <>
      <BreadcrumbCustom pageIndex={pageIndex} setPageIndex={setPageIndex} />
      {cruises === null && <CruisesData onSendCruises={receiveCruises} />}
      {startLocation === null && (
        <StartLocationData onSendLocations={receiveLocations} />
      )}

      {filteredAvailableTrips && (
        <>
          <Grid
            container
            spacing={2}
            justifyContent="center"
            alignItems="center"
            sx={{
              backgroundColor: '#FAFAFA',
              padding: '40px 0',
            }}
          >
            <Grid
              item
              xs={12}
              md={4}
              sx={{
                display: 'flex',
                justifyContent: {
                  xs: 'center',
                  md: 'end',
                },
              }}
            >
              <AutocompleteCustom
                data={filteredAvailableTrips}
                label={text.diathesimesEkdromes}
                sendPickedValue={receiveSelectedCruise}
                searchParams={searchParams}
                searchParamsCR={
                  searchParams?.get('cr') === 'null'
                    ? null
                    : Number(searchParams?.get('cr'))
                }
                setSearchParams={setSearchParams}
              />
            </Grid>
            <Grid
              item
              xs={12}
              md={4}
              sx={{ display: 'flex', justifyContent: 'center' }}
            >
              <AutocompleteCustom
                maxLength={startLocation?.length}
                data={filteredLocations}
                label={text.topothesiaAnaxwrhshs}
                sendPickedValue={receiveSelectedLocation}
                searchParams={searchParams}
                searchParamsBL={
                  searchParams?.get('bl') === 'null'
                    ? null
                    : Number(searchParams?.get('bl'))
                }
                setSearchParams={setSearchParams}
              />
            </Grid>

            <Grid
              item
              xs={12}
              md={4}
              sx={{
                display: 'flex',
                justifyContent: {
                  xs: 'center',
                  md: 'start',
                },
              }}
            >
              {availableTicketsData === null &&
                selectedLocation &&
                selectedCruise && (
                  <AvailableTicketsData
                    sendAvailableTickets={receiveAvailableTickets}
                  />
                )}

              <DatePickerCustom
                data={filteredTicketsData}
                sendSelectedDate={receiveSelectedDate}
                selectedLocation={selectedLocation}
                selectedCruise={selectedCruise}
                selectedDate={selectedDate}
                paramsDay={searchParams?.get('d')}
              />
            </Grid>
          </Grid>
        </>
      )}
      {selectedLocation &&
        selectedCruise &&
        selectedDate &&
        selectedCruizeAndLocation && (
          <Container
            maxWidth="md"
            sx={{
              marginTop: '50px',
              marginBottom: '200px',
            }}
          >
            <SelectedDay
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
            />
            <OutsideAlerter
              SetWhichCardIsSelected={SetWhichCardIsSelected}
              setDataFromCard={setDataFromCard}
              setShowBus={setShowBus}
            >
              {selectedDayInAvailableTickets &&
                selectedDayInAvailableTickets[0]?.availableSeatsPerTrip.map(
                  (trip, index) => {
                    return (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        key={`card${index}`}
                      >
                        <CardCustom
                          selectedDate={selectedDate}
                          ticketData={trip}
                          selectedCruise={selectedCruise}
                          index={index}
                          selectedCruizeAndLocation={selectedCruizeAndLocation}
                          whichCardIsSelected={whichCardIsSelected}
                          SetWhichCardIsSelected={SetWhichCardIsSelected}
                          sendDataFromCard={reveiveDataFromCard}
                          setDataFromCard={setDataFromCard}
                        />
                      </motion.div>
                    );
                  }
                )}
              <Box>
                {dataFromCard && !showBus && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <PricingPopUp
                      dataFromCard={dataFromCard}
                      setShowAlert={setShowAlert}
                      setShowAlertOutOfRange={setShowAlertOutOfRange}
                      setShowBus={setShowBus}
                      showBus={showBus}
                      // affiliated={affiliated}
                    />
                  </motion.div>
                )}
                {dataFromCard && showBus && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <BusPopUp />
                  </motion.div>
                )}
              </Box>
              {showAlert && (
                <Alert
                  sx={{
                    position: 'fixed',
                    left: '42%',
                    bottom: '150px',
                    zIndex: 150,
                  }}
                  severity="warning"
                  onClose={() => {
                    setShowAlert(false);
                  }}
                >
                  <Typography variant="subtitle1">{text.custody}</Typography>
                </Alert>
              )}
              {showAlertOutOfRange && (
                <Alert
                  sx={{
                    position: 'fixed',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    bottom: '150px',
                    zIndex: 150,
                  }}
                  severity="error"
                  onClose={() => {
                    setShowAlertOutOfRange(false);
                  }}
                >
                  <Typography variant="subtitle1">
                    {text.availableTickets} {dataFromCard.availableSeatsPerTrip}
                    .
                  </Typography>
                </Alert>
              )}
            </OutsideAlerter>
          </Container>
        )}
    </>
  );
}
