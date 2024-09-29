const CurrenciesDropdown = ({
  currencies,
  currency,
  setCurrency,
  title = "",
}) => {
  return (
    <div>
      <label htmlFor={title}>{title}</label>

      <div>
        <select
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          className="w-full border p-2 border-gray-200 rounded-md shadow-md bg-[#f9fafb] focus:outline-none h-10  text-blue-400"
        >
          {currencies.map((currency) => {
            return (
              <option value={currency} key={currency}>
                {currency}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
};

export default CurrenciesDropdown;
