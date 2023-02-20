import React from 'react';

export const nextStepContext = React.createContext();

export default function NextStepContextProvider(props) {
  return (
    <nextStepContext.Provider value={props.value}>
      {props.children}
    </nextStepContext.Provider>
  );
}

NextStepContextProvider.defaultProps = {
  nextStepObj: null,
  setNextStepObj: null,
};
