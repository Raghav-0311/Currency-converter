import React from 'react';
import "./CurrencyInput.css";

const CurrencyInput = ({amount, currency, currencies, onAmountChange, onCurrencyChange}) => {
  return (
    <div className="wrapper">
        <input className="inputBox" type='number' value={amount} onChange={(e => onAmountChange(e.target.value))}/>
        <select value={currency} onChange={(e => onCurrencyChange(e.target.value))}>
            {currencies.map((currency) => (
                <option className='inputItem' value={currency}>{currency}</option>
            ))}
        </select>
    </div>
  )
}

export default CurrencyInput;
