import React from 'react';
import customerData from '../../assets/dummyData/customerData.json';

function CustomerData(props) {
  React.useEffect(() => {
    //IIFE
    (async function () {
      try {
        // const response = await fetch('https://destinations.free.beeceptor.com');
        // //catch error 404
        // if (!response.ok) throw new Error('Problem getting events.');
        // const data = await response.json();

        props.sendCustomerData(customerData);
      } catch (err) {
        // TODO:
        //HAVE TO DISPLAY THE ERROR
        console.error(`${err} 💥💥💥`);
      }
    })();
  }, []);
  return <></>;
}

export default CustomerData;
