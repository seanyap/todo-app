const doContainer = document.querySelector("#todo ul");
const doneContainer = document.querySelector("#done ul");
const checkboxes = document.querySelectorAll(
  "input[type=checkbox][name=checkbox]"
);
const addTaskBtn = document.getElementById("addTask");
const todoList = document.getElementById("todoList");

addTaskBtn.addEventListener("click", (event) => {
  todoList.appendChild(createListElement("item 1"));
});

function handleCheck(event) {
  const label = event.target.nextElementSibling;
  if (event.target.checked) {
    label.style.textDecoration = "line-through";
    doneContainer.appendChild(event.target.parentElement);
  } else {
    label.style.textDecoration = "none";
    doContainer.appendChild(event.target.parentElement);
  }
}

function createListElement(label) {
  const liElem = document.createElement("li");
  const inputElem = document.createElement("input");
  const labelElem = document.createElement("label");

  inputElem.setAttribute("type", "checkbox");
  inputElem.setAttribute("name", "checkbox");
  inputElem.addEventListener("click", handleCheck);

  labelElem.textContent = label;

  liElem.appendChild(inputElem);
  liElem.appendChild(labelElem);

  return liElem;
}
