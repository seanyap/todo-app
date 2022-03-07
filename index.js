const doContainer = document.querySelector("#todo ul");
const doneContainer = document.querySelector("#done ul");
const checkboxes = document.querySelectorAll(
  "input[type=checkbox][name=checkbox]"
);

//add event listeners to all list input
checkboxes.forEach((checkbox) => {
  checkbox.addEventListener("change", (event) => {
    if (event.target.checked) {
      doneContainer.appendChild(event.target.parentElement);
    } else {
      doContainer.appendChild(event.target.parentElement);
    }
  });
});

function createListElement() {
  const liElem = document.createElement("li");
  const inputElem = document.createElement("input");
  const labelElem = document.createElement("label");

  inputElem.setAttribute("type", "checkbox");
  inputElem.setAttribute("name", "checkbox");

  labelElem.textContent = "example label";

  liElem.appendChild(inputElem);
  liElem.appendChild(labelElem);
}
