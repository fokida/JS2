const currencySelect = document.getElementById("currency");
const amountInput = document.getElementById("amount");
const convertBtn = document.getElementById("convertBtn");
const resultElement = document.getElementById("result");

convertBtn.addEventListener("click", () => {
  const selectedCurrency = currencySelect.value;
  const amount = parseFloat(amountInput.value);

  if (isNaN(amount) || amount <= 0) {
    resultElement.textContent = "Wprowadź poprawną dodatnią kwotę.";
    return;
  }

  fetch(
    `https://api.nbp.pl/api/exchangerates/rates/a/${selectedCurrency}/?format=json`
  )
    .then((response) => response.json())
    .then((data) => {
      const exchangeRate = data?.rates?.[0]?.mid;

      if (exchangeRate) {
        const convertedAmount = (amount * exchangeRate).toFixed(2);
        resultElement.textContent = `${amount} ${selectedCurrency} = ${convertedAmount} PLN`;
      } else {
        resultElement.textContent = "Wystąpił błąd podczas pobierania danych.";
      }
    })
    .catch((error) => {
      resultElement.textContent = "Wystąpił błąd podczas pobierania danych.";
      console.error(error);
    });
});
