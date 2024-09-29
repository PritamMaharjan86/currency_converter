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
    <div className="flex justify-center items-center h-screen absolute inset-0 bg-background bg-cover bg-center min-h-screen">
      <div className="border-solid border-2 flex flex-col justify-center items-center w-1/2 p-4 shadow-lg rounded-lg bg-white ">
        <h1 className="text-center font-bold mb-4">CURRENCY CONVERTER</h1>
        <label>
          Amount
          <input
            type="number"
            placeholder="1"
            pattern="[0-9]*"
            inputMode="numeric"
            onChange={handleAmount}
            className="ml-2 bg-[#f9fafb] border-b-2 border-[#d4d6dc] focus:outline-none p-2 h-10"
          />
        </label>

        <form class="max-w-sm mx-auto mt-10">
          <label for="underline_select">
            From
            <select
              id="underline_select"
              className="ml-2 bg-[#f9fafb] border-b-2 border-[#d4d6dc] focus:outline-none p-2 h-10"
            >
              <option selected>Choose a currency</option>
              <option value="USD">United States</option>
              <option value="CAD">Canada</option>
              <option value="FR">France</option>
              <option value="DE">Germany</option>
            </select>
          </label>
        </form>

        <form class="max-w-sm mx-auto mt-10">
          <label for="underline_select">
            To
            <select
              id="underline_select"
              className="ml-2 bg-[#f9fafb] border-b-2 border-[#d4d6dc] focus:outline-none p-2 h-10"
            >
              <option selected>Choose a currency</option>
              <option value="USD">United States</option>
              <option value="CAD">Canada</option>
              <option value="FR">France</option>
              <option value="DE">Germany</option>
            </select>
          </label>
        </form>

        <button
          type="button"
          class="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 mt-10"
        >
          Convert
        </button>
      </div>
    </div>
  );
};

export default CurrencyConverter;
