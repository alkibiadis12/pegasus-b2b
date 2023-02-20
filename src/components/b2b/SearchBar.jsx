import React from 'react';
import { nextStepContext } from '../Context/NextStepContextProvider';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import SearchIcon from '@mui/icons-material/Search';
import { Container } from '@mui/material';

function SearchBar(props) {
  const { nextStepObj, setNextStepObj } = React.useContext(nextStepContext);

  const changeHandler = e => {
    setNextStepObj({ ...nextStepObj, typedSearch: e.target.value });
  };

  return (
    <Container
      maxWidth="lg"
      sx={{
        display: { md: 'block', xs: 'flex', sm: 'flex' },
        justifyContent: 'center',
      }}
    >
      <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
        <OutlinedInput
          value={nextStepObj.typedSearch}
          sx={{ backgroundColor: '#fff' }}
          id="outlined-adornment-weight"
          endAdornment={
            <InputAdornment position="end">
              <SearchIcon />
            </InputAdornment>
          }
          aria-describedby="outlined-weight-helper-text"
          inputProps={{
            'aria-label': 'weight',
          }}
          onChange={changeHandler}
        />
      </FormControl>
    </Container>
  );
}

export default SearchBar;
