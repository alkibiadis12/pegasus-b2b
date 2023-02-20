import React from 'react';
import availableTickets from '../../assets/dummyData/availableTickets.json';

export default function AvailableTicketsData(props) {
  React.useEffect(() => {
    //IIFE
    (async function () {
      try {
        // const response = await fetch('https://destinations.free.beeceptor.com');
        // //catch error 404
        // if (!response.ok) throw new Error('Problem getting events.');
        // const data = await response.json();

        props.sendAvailableTickets(availableTickets);
      } catch (err) {
        // TODO:
        //HAVE TO DISPLAY THE ERROR
        console.error(`${err} 💥💥💥`);
      }
    })();
  }, []);

  return <></>;
}
