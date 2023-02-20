import React from 'react';
import cruises from '../../assets/dummyData/cruises.json';

export default function CruisesData(props) {
  React.useEffect(() => {
    //IIFE
    (async function () {
      try {
        // const response = await fetch('https://destinations.free.beeceptor.com');
        // //catch error 404
        // if (!response.ok) throw new Error('Problem getting events.');
        // const data = await response.json();

        // console.log(cruises);
        //Passing Data to Display component
        props.onSendCruises(cruises);
      } catch (err) {
        // TODO:
        //HAVE TO DISPLAY THE ERROR
        console.error(`${err} 💥💥💥`);
      }
    })();
  }, []);
}
