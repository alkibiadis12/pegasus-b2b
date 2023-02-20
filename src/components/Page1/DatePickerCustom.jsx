import React from 'react';
import { Box } from '@mui/system';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { createTheme } from '@mui/material/styles';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';
import dayjs from 'dayjs';
import { inputLabelClasses } from '@mui/material';
import { nextStepContext } from '../Context/NextStepContextProvider';

const theme = createTheme({
  palette: {
    primary: {
      main: '#000',
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 0,
            '&.Mui-focused fieldset': {
              borderColor: '#FFB30B',
            },
          },
        },
      },
    },
  },
});

const muiPickerDayTheme = createTheme({
  components: {
    MuiPickersDay: {
      styleOverrides: {
        root: {
          selected: {
            backgroundColor: '#0052B4 !important',
          },
        },
        today: {
          border: '2px solid #0052B4 !important',
          backgroundColor: 'inherit',
          color: 'black !important',
        },
      },
    },
  },
});

export default React.memo(function DatePickerCustom({
  data,
  sendSelectedDate,
  selectedCruise,
  selectedLocation,
  selectedDate,
  paramsDay,
}) {
  const [value, setValue] = React.useState(null);
  const { nextStepObj, setNextStepObj } = React.useContext(nextStepContext);

  const [text, setText] = React.useState({
    epiloghHmeromhnias: 'Επιλογή Ημερομηνίας',
  });

  //HANDLING LANGUAGE CHANGES
  React.useEffect(() => {
    switch (nextStepObj.locale) {
      case 'gr':
        setText({
          epiloghHmeromhnias: 'Επιλογή Ημερομηνίας',
        });
        break;
      case 'uk':
        setText({
          epiloghHmeromhnias: 'Date Selection',
        });
        break;
      case 'fr':
        setText({
          epiloghHmeromhnias: 'Sélection des dates',
        });
        break;
      case 'pl':
        setText({
          epiloghHmeromhnias: 'Wybór daty',
        });
        break;
      case 'it':
        setText({
          epiloghHmeromhnias: 'Selezione della data',
        });
        break;
    }
  }, [nextStepObj.locale]);

  //==========================================

  React.useEffect(() => {
    if (paramsDay === 'null' || paramsDay === undefined) {
      setValue(null);
    }
  }, [data, selectedCruise, selectedLocation]);

  React.useEffect(() => {
    setValue(selectedDate);
  }, [selectedDate]);

  React.useEffect(() => {
    if (paramsDay !== 'null' && paramsDay !== undefined) {
      const minDate = dayjs(new Date());
      const maxDate = dayjs(new Date()).add(3, 'month');
      const day = Number(paramsDay.slice(0, 2));
      const month = Number(paramsDay.slice(2, 4)) - 1;
      const year = Number(paramsDay.slice(4, 8));
      const receivedDateFropParams = dayjs(new Date(year, month, day));

      const diff1 = receivedDateFropParams.diff(minDate, 'day', true);
      const diff2 = maxDate.diff(receivedDateFropParams, 'month', true);

      if (diff1 > -1 && diff2 < 3 && diff2 > 0) {
        setValue(receivedDateFropParams);
      }
    }
  }, [paramsDay]);

  const now = dayjs();

  return (
    <ThemeProvider theme={theme}>
      <Box>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            minDate={dayjs(new Date())}
            maxDate={dayjs(new Date()).add(3, 'month')}
            // label={text.epiloghHmeromhnias}
            value={value}
            disabled={
              !Boolean(data) ||
              !Boolean(selectedLocation) ||
              !Boolean(selectedCruise)
            }
            inputFormat="DD/MM/YYYY"
            components={{
              OpenPickerIcon: KeyboardArrowDownIcon,
            }}
            onChange={newValue => {
              setValue(newValue);
              sendSelectedDate(newValue);
            }}
            renderInput={params => (
              <TextField
                {...params}
                // placeholder={text.epiloghHmeromhnias}
                inputProps={{
                  ...params.inputProps,
                  placeholder: text.epiloghHmeromhnias,
                }}
                // InputLabelProps={{
                //   // shrink: true,
                //   sx: {
                //     [`&.${inputLabelClasses.shrink}`]: {
                //       color: '#FFB30B',
                //     },
                //   },
                // }}
              />
            )}
            renderDay={
              data &&
              ((day, _value, DayComponentProps) => {
                const hasDayPassed =
                  now.diff(day) > 24 * 60 * 60 * 1000 ? true : false;

                const isSelected =
                  data.availableSeatsPerDay.filter(s => {
                    return (
                      s.day === String(day.$D) &&
                      s.month === String(day.$M + 1) &&
                      s.year === String(day.$y) &&
                      s.availableSeats < 10
                    );
                  }).length > 0 && !hasDayPassed;

                return (
                  <Box key={day.toString()}>
                    <ThemeProvider theme={muiPickerDayTheme}>
                      <PickersDay
                        {...DayComponentProps}
                        sx={{
                          backgroundColor: `${isSelected ? 'red ' : 'inherit'}`,
                          color: `${isSelected ? '#fff ' : 'inherit'}`,
                          ': hover': {
                            backgroundColor: `${
                              isSelected ? '#cc0000' : 'inherit'
                            }`,
                          },
                        }}
                      />
                    </ThemeProvider>
                  </Box>
                );
              })
            }
          />
        </LocalizationProvider>
      </Box>
    </ThemeProvider>
  );
});
