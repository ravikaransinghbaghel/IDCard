import React from 'react';
import IDCard from './Idcard';
import IDCard_2 from './Idcard_2';

function Home() {
  const stData = JSON.parse(localStorage.getItem("userData"));
  const image = localStorage.getItem('myImage');

//  console.log(stData);
//  console.log(image);
 
  return (
    <div className='flex flex-wrap justify-center  '>
      <IDCard stData={stData} stImg={image}/>
      <IDCard_2 stData={stData} stImg={image}/>
    </div>
  );
}

export default Home;
