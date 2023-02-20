import React from 'react';
import { nextStepContext } from '../Context/NextStepContextProvider';

export default function NationalitiesData(props) {
  const { nextStepObj, setNextStepObj } = React.useContext(nextStepContext);
  React.useEffect(() => {
    //IIFE
    (async function () {
      try {
        const response = await fetch('https://restcountries.com/v2/all');
        //catch error 404
        if (!response.ok) throw new Error('Problem getting events.');
        const data = await response.json();
        const filteredData = data.map(e => e.name);

        //Passing Data to Display component
        props.setNationalitiesData(filteredData);
        setNextStepObj({ ...nextStepObj, nationalitiesData: filteredData });

        //filtered nationalities data
        const tempData = filteredData.map((e, index) => {
          return { name: e, id: index };
        });
        setNextStepObj({ ...nextStepObj, nationalitiesData: tempData });
      } catch (err) {
        // TODO:
        //HAVE TO DISPLAY THE ERROR
        console.error(`${err} 💥💥💥`);
      }
    })();
  }, []);
}
