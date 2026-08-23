import { useEffect, useState } from "react";
import Dropdown from "./Dropdown";
import { MdOutlineCurrencyExchange } from "react-icons/md";
import getSymbolFromCurrency from "currency-symbol-map";
import Loader from "./Loader";

const CurrencyConverter = () => {
  const [amount, setAmount] = useState("");
  const [from, setFrom] = useState("AUD");
  const [to, setTo] = useState("NPR");
  const [convertedAmount, setConvertedAmount] = useState("0.00");
  const [rate, setRate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [spin, setSpin] = useState(false);

  const handleAmount = async (e) => {
    const value = e.target.value;

    if (value === "" || /^\d+$/.test(value)) {
      setAmount(value);
      const apiKey = import.meta.env.VITE_API_KEY;
      setLoading(true);

      try {
        const res = await fetch(
          `https://v6.exchangerate-api.com/v6/${apiKey}/pair/${from}/${to}/${value}`,
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
    setSpin(true);
    setTimeout(() => setSpin(false), 500);
  };

  const fromCurrencySymbol = getSymbolFromCurrency(from);
  const toCurrencySymbol = getSymbolFromCurrency(to);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-400 to-cyan-400 p-4">
      <div className="w-full max-w-md sm:max-w-lg bg-white bg-opacity-50 rounded-xl shadow-2xl p-6 sm:p-8 space-y-6">
        <h1 className="text-center text-xl sm:text-3xl font-bold font-blank mb-10 text-blue-500">
          CURRENCY CONVERTER
        </h1>

        <div className="relative w-full font-nunito font-bold">
          <input
            id="amount"
            value={amount}
            type="number"
            onChange={handleAmount}
            className="border h-12 w-full p-3 peer text-base sm:text-lg rounded-lg drop-shadow-lg"
          />
          {loading && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              <Loader />
            </div>
          )}
          <label
            htmlFor="amount"
            className={`absolute left-3 top-3 text-black transition-all duration-200 transform ${
              amount ?
                "-translate-y-10 scale-75"
              : "translate-y-0 scale-100 text-blue-500"
            } peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:top-3 peer-focus:-translate-y-10 peer-focus:scale-75`}>
            {from} ({fromCurrencySymbol})
          </label>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-4">
          <Dropdown
            className="bg-blue-500 w-full sm:w-auto"
            currency={from}
            setCurrency={setFrom}
          />
          <button onClick={handleSwap} className="text-lg">
            <MdOutlineCurrencyExchange
              className={`size-6 text-blue-500 cursor-pointer ${
                spin ? "animate-spin" : ""
              }`}
            />
          </button>
          <Dropdown
            className="bg-green-500 w-full sm:w-auto"
            currency={to}
            setCurrency={setTo}
          />
        </div>

        <div className="text-center w-full bg-slate-100 p-6 rounded-lg drop-shadow">
          <p className="text-2xl sm:text-4xl text-left font-nunito font-semibold">
            {convertedAmount}
          </p>
          {rate && (
            <p className="text-black mt-3 text-left font-nunito text-sm sm:text-base">
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
