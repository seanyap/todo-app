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
  const liModal = createTaskModal(listID, label);

  checkbox.setAttribute("id", "checkbox");
  checkbox.setAttribute("name", "checkbox");
  checkbox.src = "./assets/circle.svg";
  checkbox.classList.add("col");
  checkbox.classList.add("unchecked");
  checkbox.style.backgroundSize = "contain";
  checkbox.addEventListener("click", handleCheck);

  labelElem.id = `label-${listID}`;
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

  task.id = "task-" + listID;
  task.classList.add("row");
  task.classList.add("taskBox");

  task.appendChild(checkbox);
  task.appendChild(labelElem);
  task.appendChild(liModal);
  task.appendChild(editElem);

  return task;
}

function createTaskModal(modalID, labelValue) {
  const modal = document.createElement("div");
  const modalDialog = document.createElement("div"); // to set width and margin of modal
  const modalContent = document.createElement("div");
  const modalHeader = document.createElement("div");
  const modalBody = document.createElement("div");
  const modalFooter = document.createElement("div");
  const heading = document.createElement("h5");
  const closeBtn = document.createElement("button");
  const taskName = document.createElement("label");
  const taskInput = document.createElement("input");
  const updateBtn = document.createElement("button");
  const deleteBtn = document.createElement("button");

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
  closeBtn.id = "close-" + modalID;
  closeBtn.type = "button";
  closeBtn.setAttribute("data-bs-dismiss", "modal");

  taskName.textContent = "Task name: ";
  taskInput.id = "input-" + modalID;
  taskInput.value = labelValue;

  updateBtn.textContent = "Update";
  updateBtn.type = "button";
  updateBtn.classList.add("btn");
  updateBtn.classList.add("btn-primary");
  updateBtn.addEventListener("click", handleUpdateTask);

  deleteBtn.textContent = "Delete";
  deleteBtn.type = "button";
  deleteBtn.classList.add("btn");
  deleteBtn.classList.add("btn-primary");
  deleteBtn.addEventListener("click", handleDeleteTask);

  modalHeader.appendChild(heading);
  modalHeader.appendChild(closeBtn);
  modalBody.appendChild(taskName);
  modalBody.appendChild(taskInput);
  modalFooter.appendChild(deleteBtn);
  modalFooter.appendChild(updateBtn);

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

function handleUpdateTask(event) {
  // get the new values from input to update our todo list
  const id =
    event.target.parentElement.previousSibling.parentElement.parentElement.parentElement.id.slice(
      -1
    );
  const newTask = document.getElementById(`input-${id}`);
  const labelElem = document.getElementById(`label-${id}`);

  labelElem.textContent = newTask.value;

  document.getElementById(`close-${id}`).click(); //close modal window
}

function handleDeleteTask(event) {
  const id =
    event.target.parentElement.previousSibling.parentElement.parentElement.parentElement.id.slice(
      -1
    );
  document.getElementById(`close-${id}`).click(); //close modal window
  document.getElementById(`task-${id}`).remove();
}
