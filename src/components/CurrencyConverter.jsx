import React, { useEffect, useState } from "react";
import Dropdown from "./Dropdown";
import { MdOutlineCurrencyExchange } from "react-icons/md";
import getSymbolFromCurrency from "currency-symbol-map";

const CurrencyConverter = () => {
  const [amount, setAmount] = useState();
  const [currencies, setCurrencies] = useState([]);
  const [from, setFrom] = useState("NPR");
  const [to, setTo] = useState("USD");
  const [convertedAmount, setConvertedAmount] = useState("");
  const [rate, setRate] = useState(null);

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

  const currenciesConverter = async () => {
    try {
      const res = await fetch(
        `https://api.frankfurter.app/latest?amount=${amount}&from=${from}&to=${to}`
      );
      const data = await res.json();
      setConvertedAmount(data.rates[to] + " " + to);
      setRate(data.rates[to] / amount);
    } catch (error) {
      console.error("Error found", error);
    }
  };

  const handleSwap = () => {
    setFrom(to);
    setTo(from);
  };

  const fromCurrencySymbol = getSymbolFromCurrency(from);
  const toCurrencySymbol = getSymbolFromCurrency(to);

  return (
    <div className="flex justify-center items-center h-screen absolute inset-0 bg-background bg-cover bg-center min-h-screen ">
      <div className="border-solid border-5 flex flex-col justify-center items-center w-1/3 h-[30rem] p-4 shadow-2xl rounded-lg bg-white">
        <h1 className="text-center text-3xl font-bold mb-10 ">
          CURRENCY CONVERTER
        </h1>

        <div className="relative w-full">
          <input
            id="amount"
            value={amount}
            type="number"
            placeholder=" "
            onChange={handleAmount}
            className="border h-12 w-full p-3 font-chakra-petch peer"
          />
          <label
            htmlFor="amount"
            className={`absolute left-3 top-3 text-gray-500 transition-all duration-200 transform 
              ${
                amount
                  ? "-translate-y-10 scale-75 text-green-600"
                  : "translate-y-0 scale-75 text-green-600"
              } peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-80 peer-placeholder-shown:top-3 peer-focus:-translate-y-10 peer-focus:scale-100 peer-focus:text-green-600`}
          >
            {from} ({fromCurrencySymbol})
          </label>
        </div>

        <div className="w-80 h-10 flex items-center justify-between space-x-2 mt-10">
          <Dropdown
            currencies={currencies}
            currency={from}
            setCurrency={setFrom}
          />
          <button onClick={handleSwap} className="text-lg">
            <MdOutlineCurrencyExchange className="size-6 text-green-600 hover:animate-spin" />
          </button>
          <Dropdown currencies={currencies} currency={to} setCurrency={setTo} />
        </div>

        <button
          type="button"
          className=" text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 mt-10 font-chakra-petch "
          onClick={currenciesConverter}
        >
          Convert
        </button>

        <div className="m-3 text-center w-full">
          <p className="text-left">
            {fromCurrencySymbol} {amount} = <br />
          </p>
          <p className="text-3xl text-left"> {convertedAmount}</p>
          <br />
          {rate && (
            <p className="text-black font-chakra-petch mt-3 text-left">
              1 {fromCurrencySymbol} = {rate.toFixed(3)} {toCurrencySymbol}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CurrencyConverter;
