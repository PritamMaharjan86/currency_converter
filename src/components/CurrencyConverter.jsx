import React, { useState } from "react";

const CurrencyConverter = () => {
  const [amount, setAmount] = useState("");

  const handleAmount = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setAmount(value);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="border-solid border-2 flex flex-col justify-center items-center w-1/2 p-4">
        <h1 className="text-center font-bold mb-4">CURRENCY CONVERTER</h1>
        <label>
          Amount :-
          <input
            type="number"
            placeholder="1"
            pattern="[0-9]*"
            inputMode="numeric"
            onChange={handleAmount}
            className="ml-2 bg-[#f9fafb] border-b-2 border-[#d4d6dc] focus:outline-none p-2 h-10"
          />
        </label>
      </div>
    </div>
  );
};

export default CurrencyConverter;
