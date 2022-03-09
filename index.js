const doContainer = document.querySelector("#todo ul");
const doneContainer = document.querySelector("#done ul");
const checkboxes = document.querySelectorAll(
  "input[type=checkbox][name=checkbox]"
);
const addTaskBtn = document.getElementById("addTask");
const todoList = document.getElementById("todoList");

addTaskBtn.addEventListener("click", (event) => {
  const inputElem = document.getElementById("taskInput");
  const popover = new bootstrap.Popover(inputElem);

  // create list element only if user filled up task name else prompt user
  if (inputElem.value) {
    todoList.appendChild(createListElement(inputElem.value));
    inputElem.value = "";
    popover.hide();
    document.getElementById("closeModal").click();
  } else {
    // show popup to prompt user to input task name
    popover.show();
  }
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
