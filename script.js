
//add task button
function showCurrentSection(){
  const currentView=sessionStorage.getItem("currentView")||"main";
  const main=document.querySelector(".main-container");
  const view=document.querySelector(".view-task");
  const add=document.querySelector(".add-task-container");

  //first make all invisible
  main.classList.add("none");
  view.classList.add("none");
  add.classList.add("none");

  if(currentView=="main") main.classList.remove("none");
  else if(currentView=="view"){
    view.classList.remove("none");
    loadTask();
  }
  else add.classList.remove("none");
}
showCurrentSection();

const addtask = document.getElementById("add-task");
const viewtask = document.getElementById("view-task");
viewtask.addEventListener("click",viewTask);
addtask.addEventListener("click", addTask);
//main section add button
function addTask() {
  const main_container = document.querySelector(".main-container");
  const add_task = document.querySelector(".add-task-container");
  sessionStorage.setItem("currentView","add");
  main_container.classList.toggle("none");
  add_task.classList.toggle("none");
}
//main section view button
function viewTask() {
  const main_container = document.querySelector(".main-container");
  const view_task = document.querySelector(".view-task");
  sessionStorage.setItem("currentView","view");
  main_container.classList.toggle("none");
  view_task.classList.toggle("none");
  loadTask();
}

// add task section handling the form
const form = document.getElementById("task-form");
form.addEventListener("submit", (event) => {
  event.preventDefault();
  done();
  form.reset();
});
function done() {
  const input = document.querySelector("#task");
  const deadline = document.querySelector("#deadline");
  window.localStorage.setItem(input.value,deadline.value)
}
//add task: back button
const back = document.querySelector("#back");
back.addEventListener("click", (event) => {
  const main_container = document.querySelector(".main-container");
  const add_task = document.querySelector(".add-task-container");
  sessionStorage.setItem("currentView","main");
  if (main_container.classList.contains("none")) {
    add_task.classList.add("none");
    main_container.classList.remove("none");
  }
});

//view section
const back_view = document.querySelector("#back-view");
const add_view=document.querySelector("#add-task-view")
// view back button
back_view.addEventListener("click", () => {
  const view_sec = document.querySelector(".view-task");
  const main_sec = document.querySelector(".main-container");
  sessionStorage.setItem("currentView","main")
  main_sec.classList.remove("none");
  view_sec.classList.add("none");
});
//view add task button
add_view.addEventListener("click",()=>{
  const view_task=document.querySelector(".view-task");
  const add_task=document.querySelector(".add-task-container");
  sessionStorage.setItem("currentView","add");
  view_task.classList.toggle("none");
  add_task.classList.toggle("none");
})

//view loading tasks.

function loadTask(){
  const keys=Object.keys(localStorage);
  let sno=1;

  const tbody=document.querySelector("tbody");
  tbody.innerHTML="";
  console.log("tbody found: ",tbody);
  console.log(window.localStorage.length);
  for(let i=0;i<localStorage.length;i++){
    const row=document.createElement("tr");
    row.innerHTML=`<td>${sno++}</td>
    <td>${keys[i]}</td>
    <td>${localStorage.getItem(keys[i])}</td>
    <td><button id="done-btn" data-task="${keys[i]}" onclick="removeTask(this)">Done</button><td>`;
    tbody.appendChild(row);
  }

  if(localStorage.length===0){
    const row=document.createElement("tr");
    row.innerHTML=`<td colspan="4">No Task Created</td>`
    tbody.appendChild(row);
  }
}

function removeTask(button){
  const taskName=button.dataset.task;

  console.log(taskName);
  localStorage.removeItem(taskName);
  loadTask();
}