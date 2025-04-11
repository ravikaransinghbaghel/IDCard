import React, { useRef } from "react";
import { QRCodeSVG } from 'qrcode.react';
import {toPng} from 'html-to-image'

const IDCard = ({ stData, stImg }) => {
   const cardRef = useRef();

 
   const handleDownload = () => {
     if (!cardRef.current) return;
 
     toPng(cardRef.current, {
       cacheBust: true,
       useCors: true,
     })
       .then((dataUrl) => {
         const link = document.createElement("a");
         link.download = `${stData.name}_IDCard.png`;
         link.href = dataUrl;
         link.click();
       })
       .catch((err) => {
         console.error("Download error", err);
       });
   };
 
   if (!stData || !stImg) {
     return (
       <div className="text-center py-10 text-red-600">
         <h1>No Student Data Found</h1>
         <p>Please fill the form to generate an ID Card.</p>
       </div>
     );
   }

  return stData && stImg ? (
    <div className="min-w-96">
      <div ref={cardRef} className="max-w-xs mx-auto bg-white rounded-xl shadow-lg overflow-hidden text-center">
        {/* Top Section */}
        <div className="relative bg-gray-900 pb-16">
          <div className="absolute bottom-0 left-0 w-full h-6 bg-gray-900 clip-triangle "></div>

          <img
            src={stImg}
            alt="Profile"
            className="w-28 h-28 rounded-full border-4 border-teal-500 absolute left-1/2 transform -translate-x-1/2 translate-y-7 bg-white object-cover"
          />
        </div>

        <div className="pt-24 pb-2 px-4">
          <h2 className="text-lg font-semibold text-gray-800">
            <span className="font-bold text-black">{stData.name}</span>
          </h2>
        </div>

        <div className="my-4">
          <div className="w-32 h-32 mx-auto border-4 border-teal-500 bg-white">
            <QRCodeSVG
              value={JSON.stringify(stData)}
              size={200}
              fgColor={"#000000"}
              bgColor={"#ffffff"}
              className="w-full h-full object-cover p-1"
            />
          </div>
        </div>

        <div className="mb-4">
          <span className="bg-gray-900 text-white px-4 py-1 rounded-full text-sm font-medium">
            Student ID : {stData.roll_no}
          </span>
        </div>

        <div className="bg-teal-500 text-white py-3 font-bold text-sm">
          {stData.college}
        </div>
      </div>

      {/* Print Button */}
      <div className="text-center my-5">
        <button
          onClick={handleDownload}
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded"
        >
          Download ID
        </button>
      </div>
    </div>
  ) : (
    <div className="text-center py-10">
      <h1>No Student Data Found</h1>
      <p>Please fill the form to generate an ID Card.</p>
    </div>
  );
};

export default IDCard;
