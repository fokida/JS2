const currencySelect = document.getElementById("currency");
const amountInput = document.getElementById("amount");
const convertBtn = document.getElementById("convertBtn");
const resultElement = document.getElementById("result");

convertBtn.addEventListener("click", () => {
  const selectedCurrency = currencySelect.value;
  const amount = parseFloat(amountInput.value);

  if (isNaN(amount)) {
    resultElement.textContent = "Wprowadź poprawną kwotę.";
    return;
  }

  fetch(
    `https://api.nbp.pl/api/exchangerates/rates/a/${selectedCurrency}/?format=json`
  )
    .then((response) => response.json())
    .then((data) => {
      const exchangeRate = data.rates[0].mid;
      const convertedAmount = (amount * exchangeRate).toFixed(2);
      resultElement.textContent = `${amount} ${selectedCurrency} = ${convertedAmount} PLN`;
    })
    .catch((error) => {
      resultElement.textContent = "Wystąpił błąd podczas pobierania danych.";
      console.error(error);
    });
});
