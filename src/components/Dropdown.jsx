const CurrenciesDropdown = ({
  currencies,
  currency,
  setCurrency,
  fav,
  handleFav,
  title = "",
}) => {
  return (
    <div>
      <label htmlFor={title}>{title}</label>

      <div>
        <select>
            {currencies.map((currency)=>
            {
              return  <option value= {currency} key={currency}>
                    {currency}
                </option>
            })}
        </select>
      </div>
    </div>
  );
};

export default CurrenciesDropdown;
