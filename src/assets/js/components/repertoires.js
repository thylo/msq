function repertoires() {
  const repertoireElements = document.querySelectorAll(".js-repertoire"),
    selectElement = document.querySelector(".js-repertoire-select");

  repertoireElements.forEach((repertoireElement, index) => {
    repertoireElement
      .querySelector(".js-repertoire-name")
      ?.classList.toggle("u-hidden", true);
    repertoireElement.classList.toggle("u-hidden", index !== 0);
    const optionElement = document.createElement("option");
    optionElement.innerHTML = repertoireElement.dataset.name;
    selectElement.appendChild(optionElement);
  });
  selectElement?.classList.toggle("u-hidden", false);
  selectElement?.addEventListener("change", (e) => {
    repertoireElements.forEach((repertoireElement, index) => {
      repertoireElement.classList.toggle(
        "u-hidden",
        repertoireElement.dataset.name !== e.currentTarget.value
      );
    });
  });
}

module.exports = repertoires;
