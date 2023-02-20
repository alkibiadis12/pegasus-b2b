import React from 'react';
import { Box } from '@mui/material';
import { Typography } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import dayjs from 'dayjs';
import { nextStepContext } from '../Context/NextStepContextProvider';

const boxOuterContainer = {
  display: 'flex',
  flexDirection: {
    md: 'row',
    sm: 'column',
    xs: 'column',
  },
  alignItems: 'center',
  marginBottom: '50px',
  gap: '20px',
};

const boxInnerContainer = {
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
};

const minDate = dayjs(new Date());
const maxDate = dayjs(new Date()).add(3, 'month');

export default function SelectedDay({ selectedDate, setSelectedDate }) {
  const { nextStepObj, setNextStepObj } = React.useContext(nextStepContext);

  const [text, setText] = React.useState({
    epilegmenhHmeromhnia: 'Επιλεγμένη ημερομηνία',
  });

  //HANDLING LANGUAGE CHANGES
  React.useEffect(() => {
    switch (nextStepObj.locale) {
      case 'gr':
        setText({
          epilegmenhHmeromhnia: 'Επιλεγμένη ημερομηνία',
        });
        break;
      case 'uk':
        setText({
          epilegmenhHmeromhnia: 'Selected Date',
        });
        break;
      case 'fr':
        setText({
          epilegmenhHmeromhnia: 'Date sélectionnée',
        });
        break;
      case 'pl':
        setText({
          epilegmenhHmeromhnia: 'Wybrana data',
        });
        break;
      case 'it':
        setText({
          epilegmenhHmeromhnia: 'Data selezionata',
        });
        break;
    }
  }, [nextStepObj.locale]);

  //==================================
  const dayPlusOne = () => {
    const dayAfterNow = dayjs(selectedDate).add(1, 'day');
    const difference = maxDate.diff(dayAfterNow, 'day', true);
    if (difference < 0) {
      console.log('===============');
      console.log('Out of Range');
      console.log('===============');
    } else {
      setSelectedDate(prevDay => dayjs(prevDay).add(1, 'day'));
    }
  };

  const dayMinusOne = () => {
    const dayBeforeNow = dayjs(selectedDate).subtract(1, 'day');
    const difference = dayBeforeNow.diff(minDate, 'day', true);
    if (difference < -1) {
    } else {
      setSelectedDate(prevDay => dayjs(prevDay).subtract(1, 'day'));
    }
  };

  return (
    <>
      <Box sx={boxOuterContainer}>
        <Typography variant="h6">{text.epilegmenhHmeromhnia}:</Typography>
        <Box sx={boxInnerContainer}>
          <ArrowBackIosIcon onClick={dayMinusOne} sx={{ cursor: 'pointer' }} />
          <Typography variant="h6">
            {dayjs(selectedDate).format('DD/MM/YYYY')}
          </Typography>
          <ArrowForwardIosIcon
            onClick={dayPlusOne}
            sx={{ cursor: 'pointer' }}
          />
        </Box>
      </Box>
    </>
  );
}
