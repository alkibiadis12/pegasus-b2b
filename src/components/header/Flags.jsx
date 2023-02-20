import React from 'react';
import greekFlag from '../../assets/flags/gr.svg';
import unitedKingdomFlag from '../../assets/flags/gb.svg';
import franceFlag from '../../assets/flags/fr.svg';
import polandFlag from '../../assets/flags/pl.svg';
import italianFlag from '../../assets/flags/it.svg';
import { Box } from '@mui/system';
import { nextStepContext } from '../Context/NextStepContextProvider';

export default function Flags({ searchParams, setSearchParams }) {
  const { nextStepObj, setNextStepObj } = React.useContext(nextStepContext);

  const changeLanguageHandler = e => {
    switch (e.target.id) {
      case 'gr':
        setNextStepObj({ ...nextStepObj, locale: 'gr' });
        setSearchParams({ ...searchParams, lg: 'gr' });
        break;
      case 'uk':
        setNextStepObj({ ...nextStepObj, locale: 'uk' });
        setSearchParams({ ...searchParams, lg: 'uk' });
        break;
      case 'fr':
        setNextStepObj({ ...nextStepObj, locale: 'fr' });
        setSearchParams({ ...searchParams, lg: 'fr' });
        break;
      case 'pl':
        setNextStepObj({ ...nextStepObj, locale: 'pl' });
        setSearchParams({ ...searchParams, lg: 'pl' });
        break;
      case 'it':
        setNextStepObj({ ...nextStepObj, locale: 'it' });
        setSearchParams({ ...searchParams, lg: 'it' });
        break;
    }
  };

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          gap: '10px',
          marginLeft: '15px',
          alignItems: 'center',
        }}
      >
        <img
          src={greekFlag}
          alt="Greek flag"
          width="20"
          onClick={changeLanguageHandler}
          id="gr"
          style={{ cursor: 'pointer' }}
        />
        <img
          src={unitedKingdomFlag}
          alt="United Kingdom flag"
          width="20"
          onClick={changeLanguageHandler}
          id="uk"
          style={{ cursor: 'pointer' }}
        />
        <img
          src={franceFlag}
          alt="France flag"
          width="20"
          onClick={changeLanguageHandler}
          id="fr"
          style={{ cursor: 'pointer' }}
        />
        <img
          src={polandFlag}
          alt="Poland flag"
          width="20"
          onClick={changeLanguageHandler}
          id="pl"
          style={{ cursor: 'pointer' }}
        />
        <img
          src={italianFlag}
          alt="Italian flag"
          width="20"
          onClick={changeLanguageHandler}
          id="it"
          style={{ cursor: 'pointer' }}
        />
      </Box>
    </>
  );
}
