
//add student button
function showCurrentSection(){
  const currentView=sessionStorage.getItem("currentView")||"main";
  const main=document.querySelector(".main-container");
  const view=document.querySelector(".view-student");
  const add=document.querySelector(".add-student-container");

  //first make all invisible
  main.classList.add("none");
  view.classList.add("none");
  add.classList.add("none");

  if(currentView=="main") main.classList.remove("none");
  else if(currentView=="view"){
    view.classList.remove("none");
    loadStudents();
  }
  else add.classList.remove("none");
}
showCurrentSection();

const addStudent = document.getElementById("add-student");
const viewStudent = document.getElementById("view-student");
viewStudent.addEventListener("click",viewStudents);
addStudent.addEventListener("click", addStudentForm);
//main section add button
function addStudentForm() {
  const main_container = document.querySelector(".main-container");
  const add_student = document.querySelector(".add-student-container");
  sessionStorage.setItem("currentView","add");
  main_container.classList.toggle("none");
  add_student.classList.toggle("none");
}
//main section view button
function viewStudents() {
  const main_container = document.querySelector(".main-container");
  const view_student = document.querySelector(".view-student");
  sessionStorage.setItem("currentView","view");
  main_container.classList.toggle("none");
  view_student.classList.toggle("none");
  loadStudents();
}

// add student section handling the form
const form = document.getElementById("student-form");
form.addEventListener("submit", (event) => {
  event.preventDefault();
  done();
  form.reset();
});
function done() {
  const input = document.querySelector("#student-name");
  const studentId = document.querySelector("#student-id");
  window.localStorage.setItem(input.value,studentId.value)
}
//add student: back button
const back = document.querySelector("#back");
back.addEventListener("click", (event) => {
  const main_container = document.querySelector(".main-container");
  const add_student = document.querySelector(".add-student-container");
  sessionStorage.setItem("currentView","main");
  if (main_container.classList.contains("none")) {
    add_student.classList.add("none");
    main_container.classList.remove("none");
  }
});

//view section
const back_view = document.querySelector("#back-view");
const add_view=document.querySelector("#add-student-view")
// view back button
back_view.addEventListener("click", () => {
  const view_sec = document.querySelector(".view-student");
  const main_sec = document.querySelector(".main-container");
  sessionStorage.setItem("currentView","main")
  main_sec.classList.remove("none");
  view_sec.classList.add("none");
});
//view add student button
add_view.addEventListener("click",()=>{
  const view_student=document.querySelector(".view-student");
  const add_student=document.querySelector(".add-student-container");
  sessionStorage.setItem("currentView","add");
  view_student.classList.toggle("none");
  add_student.classList.toggle("none");
})

//view loading students.

function loadStudents(){
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
    <td><button class="delete-btn" data-student="${keys[i]}" onclick="removeStudent(this)">Delete</button></td>`;
    tbody.appendChild(row);
  }

  if(localStorage.length===0){
    const row=document.createElement("tr");
    row.innerHTML=`<td colspan="4">No Students Added</td>`
    tbody.appendChild(row);
  }
}

function removeStudent(button){
  const studentName=button.dataset.student;

  console.log(studentName);
  localStorage.removeItem(studentName);
  loadStudents();
}