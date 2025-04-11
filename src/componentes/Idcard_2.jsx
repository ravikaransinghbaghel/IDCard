import React, { useRef, useEffect } from "react";
import QRCode from "qrcode";
import { toPng } from "html-to-image";

const IDCard = ({ stData, stImg }) => {
  const cardRef = useRef();
  const qrCanvasRef = useRef();

  useEffect(() => {
    if (stData && qrCanvasRef.current) {
      QRCode.toCanvas(
        qrCanvasRef.current,
        JSON.stringify(stData),
        { width: 120 },
        (err) => {
          if (err) console.error("QR error:", err);
        }
      );
    }
  }, [stData]);

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

  return (
    <div className="p-5">
      <div
        ref={cardRef}
        className="w-80 mx-auto bg-white rounded-xl shadow-md overflow-hidden border text-center"
      >
        <div className="bg-blue-600 py-4">
          <img
            src={stImg}
            alt="student"
            crossOrigin="anonymous"
            className="w-24 h-24 rounded-full mx-auto border-4 border-white bg-white object-cover"
          />
        </div>

        <div className="p-4">
          <h2 className="text-lg font-bold text-gray-800">{stData.name}</h2>
          <p className="text-sm text-gray-700">ID: {stData.roll_no}</p>
          <p className="text-sm text-gray-700">{stData.college}</p>
        </div>

        <canvas ref={qrCanvasRef} className="mx-auto mb-4" />
      </div>

      <div className="text-center mt-4">
        <button
          onClick={handleDownload}
          className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
        >
          Download ID Card
        </button>
      </div>
    </div>
  );
};

export default IDCard;
