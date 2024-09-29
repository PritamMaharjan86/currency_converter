import React, { useEffect, useState } from "react";
import Dropdown from "./Dropdown";

const CurrencyConverter = () => {
  const [amount, setAmount] = useState(1);
  const [currencies, setCurrencies] = useState([]);
  const [from, setFrom] = useState("AUD");
  const [to, setTo] = useState("USD");

  const handleAmount = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setAmount(value);
    }
  };

  const Currencies = async () => {
    try {
      const res = await fetch("https://api.frankfurter.app/currencies");
      const data = await res.json();
      setCurrencies(Object.keys(data));
    } catch (error) {
      console.error("Error found", error);
    }
  };

  useEffect(() => {
    Currencies();
  }, []);

  console.log(currencies);

  const currenciesConverter = () => {};

  return (
    <div className="flex justify-center items-center h-screen absolute inset-0 bg-background bg-cover bg-center min-h-screen">
      <div className="border-solid border-2 flex flex-col justify-center items-center w-1/2 p-4 shadow-2xl rounded-lg bg-white ">
        <h1 className="text-center font-bold mb-4 ">CURRENCY CONVERTER</h1>
        <label htmlFor="amount">
          Amount
          <input
            value={amount}
            type="number"
            placeholder="1"
            onChange={handleAmount}
            className="ml-2 bg-[#f9fafb] border-b-2 border-[#d4d6dc] focus:outline-none p-2 h-10 w-full text-blue-400"
          />
        </label>

        <form class="w-100 mx-auto mt-10">
          <label for="underline_select">
            From
            <Dropdown currencies={currencies} />
          </label>
        </form>

        <form class="max-w-sm mx-auto mt-10">
          <label for="underline_select">
            To
            <Dropdown currencies={currencies} />
          </label>
        </form>

        <button
          type="button"
          class="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 mt-10"
          onClick={currenciesConverter}
        >
          Convert
        </button>

        <div>Converted Currencies</div>
      </div>
    </div>
  );
};

export default CurrencyConverter;
