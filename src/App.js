import { useState, useEffect } from "react";
import axios from "axios";
import { format } from "date-fns";
import "./App.css";
import CurrencyInput from "./components/CurrencyInput";

const API_KEY = "3a982b3755748561dde94802565b1267";
const CURRENCY_API = `http://data.fixer.io/api/latest?access_key=${API_KEY}`;

function App() {
  const [amountOne, setAmountOne] = useState(1);
  const [amountTwo, setAmountTwo] = useState(1);
  const [currencyOne, setCurrencyOne] = useState("USD");
  const [currencyTwo, setCurrencyTwo] = useState("INR");

  const [currencyRates, setCurrencyRates] = useState([]);

  useEffect(() => {
    axios
      .get(CURRENCY_API)
      .then((response) => setCurrencyRates(response.data.rates))
      .catch((err) => {
        console.log(err);
        setCurrencyRates(null);
      });
  }, []);

  useEffect(() => {
    if (!!currencyRates) {
      handleAmountOneChange(1);
    }
  }, [currencyRates]);

  const formatCurrency = (number) => {
    return number.toFixed(2);
  };

  const handleAmountOneChange = (amountOne) => {
    setAmountTwo(
      formatCurrency(
        (amountOne * currencyRates[currencyTwo]) / currencyRates[currencyOne]
      )
    );
    setAmountOne(amountOne);
  };

  const handleAmountTwoChange = (amountTwo) => {
    setAmountOne(
      formatCurrency(
        (amountTwo * currencyRates[currencyOne]) / currencyRates[currencyTwo]
      )
    );
    setAmountTwo(amountTwo);
  };

  const handleCurrencyOneChange = (currencyOne) => {
    setAmountTwo(
      formatCurrency(
        (amountOne * currencyRates[currencyTwo]) / currencyRates[currencyOne]
      )
    );
    setCurrencyOne(currencyOne);
  };

  const handleCurrencyTwoChange = (currencyTwo) => {
    setAmountOne(
      formatCurrency(
        (amountTwo * currencyRates[currencyOne]) / currencyRates[currencyTwo]
      )
    );
    setCurrencyTwo(currencyTwo);
  };

  if (!currencyRates) return <p>Something Went Wrong !</p>;

  if (currencyRates.length === 0) return <p>Loading...</p>;

  return (
    <div className="app">
      <h1>React Currency Converter</h1>
      <p className="oneCurrencyText">1 {currencyOne} equals</p>
      <p className="rateText">
        {formatCurrency(amountTwo / amountOne)} {currencyTwo}
      </p>
      <p className="date">{format(new Date(), "dd/MM/yyyy h:mm")}</p>
      <CurrencyInput
        amount={amountOne}
        currency={currencyOne}
        currencies={Object.keys(currencyRates)}
        onAmountChange={handleAmountOneChange}
        onCurrencyChange={handleCurrencyOneChange}
      />
      <CurrencyInput
        amount={amountTwo}
        currency={currencyTwo}
        currencies={Object.keys(currencyRates)}
        onAmountChange={handleAmountTwoChange}
        onCurrencyChange={handleCurrencyTwoChange}
      />
    </div>
  );
}

export default App;
