
const form = document.querySelector("form");
const input = document.querySelector("#txtTask");
const newTask = document.querySelector("#addNewTask");
const clearTask = document.querySelector("#clearTask");
const deleteAllTask = document.querySelector("#btnDeleteAll");
const taskList = document.querySelector("#task-list");
const changeColor = document.querySelector("#change-color");
const changeColorPurple = document.querySelector("#change-color-purple");
const clockItem = document.querySelector("#clock");
const clockItem2 = document.querySelector("#clock-min");
const clockItem3 = document.querySelector("#clock-scnd");
const cardHeader = document.querySelector("#card-header");
const taskColor = document.querySelector("#task-color");
let todoitem;

itemload();
events();
Clock();

function events(){
    form.addEventListener("submit", addNewItem);
    clearTask.addEventListener("click", clearItem);
    taskList.addEventListener("click", deleteItem);
    deleteAllTask.addEventListener("click", deleteAllItems);
    changeColor.addEventListener("click", changeColorThemeLight);
    changeColorPurple.addEventListener("click", changeColorThemePurple);
}

function itemload(){
    todoitem = GetItemLocal();
    todoitem.forEach(function(item){
        createItem(item);
    })
}

function GetItemLocal(){
    if(localStorage.getItem("todoitem") === null){
        todoitem = [];
    }
    else{
        todoitem = JSON.parse(localStorage.getItem("todoitem"));
    }
    return todoitem;
}

function SetItemLocal(newToDo){
    todoitem = GetItemLocal();
    todoitem.push(newToDo);
    localStorage.setItem("todoitem", JSON.stringify(todoitem));
}

function createItem(newToDo){
    const li = document.createElement("li");
    li.className = "list-group-item list-group-item-secondary p-3";
    li.appendChild(document.createTextNode(newToDo));

    const a = document.createElement("a");
    
    a.className = "delete-item btn-danger btn-sm";
    a.id = "color-change";
    a.setAttribute("href", "#");
    a.style.float = "right";
    a.style.textDecoration = "none";
    a.innerHTML = `Delete`;

    li.appendChild(a);
    taskList.appendChild(li);
}

function addNewItem(element){
    if(input.value === ''){
        alert("You can't leave the task field blank.");
        console.log(submit);
    }

    createItem(input.value);
    SetItemLocal(input.value);
    
    input.value = '';
    element.preventDefault();
}

function clearItem(){
    input.value = '';
}

function deleteItem(element){
    if(element.target.className === "delete-item btn-danger btn-sm"){
        if(confirm("Are you sure, you want to delete?")){
            element.target.parentElement.remove();
            clearToStorage(element.target.parentElement.textContent);
        }
    }
    element.preventDefault();
}

function clearToStorage(clearTodo){
    let todoitem = GetItemLocal();

    todoitem.forEach(function(todo, index){
        todo += "Delete";
        if(todo === clearTodo){
            todoitem.splice(index, 1);
        }
    });
    localStorage.setItem("todoitem", JSON.stringify(todoitem));
}

function deleteAllItems(element){
    if(confirm("Are you sure, you want to delete all?")){
        while(taskList.firstChild){
            taskList.removeChild(taskList.firstChild);
        }
        localStorage.clear();
    }
}

function Clock(){
    const d = new Date();
    clockItem.textContent = d.getHours();

    const m = new Date();
    clockItem2.textContent = m.getMinutes();

    if(m.getMinutes() < 10){
        clockItem2.textContent = "0" + m.getMinutes();
    }
}

function changeColorThemeLight(){    
    cardHeader.classList.remove("bg-warning");
    cardHeader.classList.add("bg-light");
    cardHeader.style.color = "#000";

    taskColor.classList.remove("bg-warning");
    taskColor.classList.add("bg-light");
    taskColor.style.color = "#000";

    clearTask.classList.remove("btn-secondary");
    clearTask.classList.add("btn-warning");

    newTask.style.color = "#fff";
    newTask.style.backgroundColor = "#280549";
}

function changeColorThemePurple(){
    cardHeader.classList.remove("bg-warning");
    cardHeader.classList.remove("bg-light");
    cardHeader.style.backgroundColor = "#280549";
    cardHeader.style.color = "#fff";

    newTask.classList.remove("btn-warning");
    newTask.style.backgroundColor = "#280549";
    newTask.style.color = "#fff";

    clearTask.classList.remove("btn-secondary");
    clearTask.classList.add("btn-warning");
    
    taskColor.classList.remove("bg-warning");
    taskColor.classList.remove("bg-light");
    taskColor.style.backgroundColor = "#280549";
    taskColor.style.color = "#fff";

    deleteAllTask.classList.remove("btn-danger");
    deleteAllTask.classList.add("btn-warning");

    // const colorChange = document.querySelector("#color-change");
    // colorChange.classList.remove("bg-danger");
    // colorChange.classList.add("bg-warning");
    

}