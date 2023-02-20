import React from 'react';
import { Box } from '@mui/system';
import logo from '../../assets/logo.png';
import { useNavigate } from 'react-router-dom';
import { nextStepContext } from '../Context/NextStepContextProvider';

export default function LogoContainer({ setPageIndex }) {
  const { nextStepObj, setNextStepObj } = React.useContext(nextStepContext);
  const navigate = useNavigate();
  return (
    <>
      <Box
        sx={{
          height: '70px',
          backgroundColor: '#0052b4',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box
          sx={{ cursor: 'pointer' }}
          onClick={() => {
            navigate(
              `/?af=${
                nextStepObj?.affiliated ? nextStepObj.affiliated : null
              }&lg=${nextStepObj.locale}`
            );
            setPageIndex(1);
            window.location.reload();
          }}
        >
          <img
            src={logo}
            alt="Pegasus Cruises logo"
            width="150"
            id="pegasusLogo"
          />
        </Box>
      </Box>
    </>
  );
}
