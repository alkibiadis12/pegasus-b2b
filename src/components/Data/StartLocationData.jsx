import React from 'react';
import startLocation from '../../assets/dummyData/startLocation.json';

export default function StartLocationData(props) {
  React.useEffect(() => {
    //IIFE
    (async function () {
      try {
        // const response = await fetch('https://destinations.free.beeceptor.com');
        // //catch error 404
        // if (!response.ok) throw new Error('Problem getting events.');
        // const data = await response.json();

        props.onSendLocations(startLocation);
      } catch (err) {
        // TODO:
        //HAVE TO DISPLAY THE ERROR
        console.error(`${err} 💥💥💥`);
      }
    })();
  }, []);

  return <></>;
}
