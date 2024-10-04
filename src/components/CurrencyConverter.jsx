import React, { useEffect, useState } from "react";
import Dropdown from "./Dropdown";
import { MdOutlineCurrencyExchange } from "react-icons/md";
import getSymbolFromCurrency from "currency-symbol-map";
import Loader from "./Loader";

const CurrencyConverter = () => {
  const [amount, setAmount] = useState("");
  const [from, setFrom] = useState("AUD");
  const [to, setTo] = useState("NPR");
  const [convertedAmount, setConvertedAmount] = useState("");
  const [rate, setRate] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAmount = async (e) => {
    const value = e.target.value;
    console.log(import.meta.API_KEY);

    if (value === "" || /^\d+$/.test(value)) {
      setAmount(value);
      const apiKey = import.meta.env.VITE_API_KEY;
      setLoading(true);

      try {
        const res = await fetch(
          `https://v6.exchangerate-api.com/v6/${apiKey}/pair/${from}/${to}/${value}`
        );
        const data = await res.json();

        if (data.conversion_rate) {
          const converted = (data.conversion_rate * value).toFixed(2);
          setConvertedAmount(`${converted} ${to}`);
          setRate(data.conversion_rate);
        } else {
          console.error("Invalid response from the API");
        }
      } catch (error) {
        console.error("Error fetching conversion rate", error);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    if (amount > 0) {
      handleAmount({ target: { value: amount } });
    }
  }, [from, to]);

  const handleSwap = () => {
    const temp = from;
    setFrom(to);
    setTo(temp);
  };

  const fromCurrencySymbol = getSymbolFromCurrency(from);
  const toCurrencySymbol = getSymbolFromCurrency(to);

  return (
    <div className="flex justify-center items-center h-screen absolute inset-0 bg-background bg-cover bg-center min-h-screen p-4">
      <div className="border-solid border-5 flex flex-col justify-center items-center w-full max-w-lg p-4 shadow-2xl rounded-lg bg-white outline outline-1 outline-black">
        <h1 className="text-center text-2xl sm:text-3xl font-bold mb-6 sm:mb-10 font-chakra">
          CURRENCY CONVERTER
        </h1>

        <div className="relative w-full font-chakra mb-6 sm:mb-8 ">
          <input
            id="amount"
            value={amount}
            type="number"
            onChange={handleAmount}
            className="border h-12 w-full p-3 peer text-base sm:text-lg"
          />
          {loading && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              <Loader />
            </div>
          )}

          <label
            htmlFor="amount"
            className={`absolute left-3 top-3 text-gray-500 transition-all duration-200 transform
          ${
            amount
              ? "-translate-y-10 scale-75 text-green-600"
              : "translate-y-0 scale-100 text-green-600"
          } peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:top-3 peer-focus:-translate-y-10 peer-focus:scale-75 peer-focus:text-green-600`}
          >
            {from} ({fromCurrencySymbol})
          </label>
        </div>

        <div className="w-full sm:w-80 h-10 flex items-center justify-between space-x-2 mt-6 sm:mt-10">
          <Dropdown currency={from} setCurrency={setFrom} />
          <button onClick={handleSwap} className="text-lg">
            <MdOutlineCurrencyExchange className="size-6 text-green-600 hover:animate-spin" />
          </button>
          <Dropdown currency={to} setCurrency={setTo} />
        </div>

        <div className="mt-6 sm:mt-10 text-center w-full bg-green-400 p-3 rounded-md outline outline-1 outline-black">
          <p className="text-left font-chakra">
            {fromCurrencySymbol} {amount} = <br />
          </p>
          <p className="text-3xl sm:text-4xl text-left font-chakra font-semibold">
            {convertedAmount}
          </p>
          <br />
          {rate && (
            <p className="text-black font-chakra-petch mt-3 text-left font-chakra">
              1 {fromCurrencySymbol} = {Number(rate).toFixed(3)}{" "}
              {toCurrencySymbol}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CurrencyConverter;
