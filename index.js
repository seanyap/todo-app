const doContainer = document.querySelector("#todo #todoList");
const doneContainer = document.querySelector("#done #doneList");
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
    const listID = todoList.children.length;
    todoList.appendChild(createListElement(inputElem.value, listID));
    inputElem.value = "";
    popover.hide();
    document.getElementById("closeModal").click();
  } else {
    // show popup to prompt user to input task name
    popover.show();
  }
});

function handleCheck(event) {
  const checkbox = event.target;
  const label = event.target.nextElementSibling;
  if (checkbox.classList.contains("unchecked")) {
    checkbox.classList.remove("unchecked");
    checkbox.classList.add("checked");
    checkbox.src = "./assets/checkbox.svg";
    label.style.textDecoration = "line-through";
    doneContainer.appendChild(event.target.parentElement);
  } else {
    checkbox.classList.remove("checked");
    checkbox.classList.add("unchecked");
    checkbox.src = "./assets/circle.svg";
    label.style.textDecoration = "none";
    doContainer.appendChild(event.target.parentElement);
  }
}

function createListElement(label, listID) {
  const task = document.createElement("div");
  const checkbox = document.createElement("img");
  const labelElem = document.createElement("label");
  const editElem = document.createElement("img");
  const liModal = createTaskModal(listID);

  checkbox.setAttribute("id", "checkbox");
  checkbox.setAttribute("name", "checkbox");
  checkbox.src = "./assets/circle.svg";
  checkbox.classList.add("col");
  checkbox.classList.add("unchecked");
  checkbox.style.backgroundSize = "contain";
  checkbox.addEventListener("click", handleCheck);

  labelElem.textContent = label;
  labelElem.classList.add("col");
  labelElem.classList.add("col-8");

  editElem.src = "./assets/pen-solid.svg";
  editElem.style.width = "20px";
  editElem.style.height = "20px";
  editElem.classList.add("col");
  editElem.setAttribute("data-bs-toggle", "modal");
  editElem.setAttribute("data-bs-target", `modal-${listID}`);
  editElem.addEventListener("click", openModal);

  task.setAttribute("id", "taskBox");
  task.classList.add("row");

  task.appendChild(checkbox);
  task.appendChild(labelElem);
  task.appendChild(liModal);
  task.appendChild(editElem);

  return task;
}

function createTaskModal(modalID) {
  const modal = document.createElement("div");
  const modalDialog = document.createElement("div"); // to set width and margin of modal
  const modalContent = document.createElement("div");
  const modalHeader = document.createElement("div");
  const modalBody = document.createElement("div");
  const modalFooter = document.createElement("div");
  const heading = document.createElement("h5");
  const closeBtn = document.createElement("button");
  const content = document.createElement("p");

  modal.classList.add("modal");
  modal.classList.add("fade");
  modal.setAttribute("tabindex", "-1");
  modal.id = "modal-" + modalID;
  modalDialog.classList.add("modal-dialog");
  modalContent.classList.add("modal-content");
  modalHeader.classList.add("modal-header");
  modalBody.classList.add("modal-body");
  modalFooter.classList.add("modal-footer");
  heading.classList.add("modal-title");
  closeBtn.classList.add("btn-close");

  heading.textContent = "Update Task";
  closeBtn.type = "button";
  closeBtn.setAttribute("data-bs-dismiss", "modal");

  modalHeader.appendChild(heading);
  modalHeader.appendChild(closeBtn);

  content.textContent = "test body";
  modalBody.appendChild(content);

  modalContent.appendChild(modalHeader);
  modalContent.appendChild(modalBody);
  modalContent.appendChild(modalFooter);
  modalDialog.appendChild(modalContent);
  modal.appendChild(modalDialog);

  return modal;
}

function openModal(event) {
  // open model for user to manipulate task field
  const modalID = event.target.getAttribute("data-bs-target");
  const modal = new bootstrap.Modal(document.getElementById(modalID));
  modal.show();
}
