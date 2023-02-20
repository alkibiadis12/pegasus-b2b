import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { inputLabelClasses } from '@mui/material';

const theme = createTheme({
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

export default React.memo(function AutocompleteCustom(props) {
  const [renderedOptions, setRenderedOptions] = React.useState(null);
  const [defValue, setDefValue] = React.useState(null);

  React.useEffect(() => {
    const tempData = props.data.map(e => {
      return { ...e, label: e.name };
    });

    setRenderedOptions(tempData);
    setDefValue(null);
  }, [props.data]);

  React.useEffect(() => {
    if (renderedOptions && props.searchParamsCR !== undefined) {
      if (
        props.searchParamsCR < renderedOptions.length &&
        props.searchParamsCR > -1
      ) {
        setDefValue(
          props.searchParamsCR !== null && props.searchParamsCR !== undefined
            ? renderedOptions[props.searchParamsCR]
            : null
        );
      }
    }

    if (props?.maxLength && renderedOptions?.length < props?.maxLength) {
      if (renderedOptions && props.searchParamsBL !== undefined) {
        if (
          props.searchParamsBL < renderedOptions.length &&
          props.searchParamsBL > -1
        ) {
          setDefValue(
            props.searchParamsBL !== null && props.searchParamsBL !== undefined
              ? renderedOptions[props.searchParamsBL]
              : null
          );
        }
      }
    }
  }, [renderedOptions]);

  return (
    <ThemeProvider theme={theme}>
      {renderedOptions && (
        <>
          <Autocomplete
            key={Math.random()}
            disablePortal
            value={defValue}
            options={renderedOptions}
            sx={{ width: 300 }}
            renderInput={params => (
              <TextField
                {...params}
                // label={props.label}
                placeholder={props.label}
                // InputLabelProps={{
                //   //  shrink: true,

                //   sx: {
                //     [`&.${inputLabelClasses.shrink}`]: {
                //       // set the color of the label when shrinked (usually when the TextField is focused)
                //       color: '#FFB30B',
                //     },
                //   },
                // }}
              />
            )}
            onChange={(_, value) => {
              setDefValue(value);

              if (
                props?.searchParamsCR !== null &&
                props?.searchParamsCR !== undefined
              ) {
                props.setSearchParams({
                  ...props.SearchParams,
                  cr:
                    value?.cruise_id === undefined
                      ? 'notvalid'
                      : value.cruise_id,
                });
              }

              if (
                props?.searchParamsBL !== null &&
                props?.searchParamsBL !== undefined
              ) {
                console.log('==============');
                console.log(value);
                props.setSearchParams({
                  ...props.SearchParams,
                  bl: value?.id === undefined ? 'notvalid' : value.id,
                });
              }

              props.sendPickedValue(value);
            }}
          />
        </>
      )}
    </ThemeProvider>
  );
});
