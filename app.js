//selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo')


//Event listeners
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);

//Functions
function addTodo(event) {

    //check if the user input is empty or not
    if (todoInput.value.length > 0) {
        event.preventDefault();
        // create div elelmet to display tasks to be done
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");
    
        //create single task item 
        const newTodo = document.createElement('li');
        newTodo.innerText = todoInput.value
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);
    
        // Add task to local storage
        saveLocalTodos(todoInput.value)
    
        //check button for completed tasks
        const completedButton = document.createElement('button')
        completedButton.innerHTML = '<i class="fa-solid fa-check"></i>';
        completedButton.classList.add("complete-btn");
        todoDiv.appendChild(completedButton);
    
        //undo a comleted task***************************************
        const undoComplete = document.createElement('button');
        undoComplete.innerHTML = '<i class="fa-solid fa-rotate-left"></i>';
        undoComplete.classList.add("undo-button");
        // todoDiv.appendChild(undoComplete);
    
        //delete button to delete tasks
        const trashButton = document.createElement('button')
        trashButton.innerHTML = '<i class="fa-solid fa-trash"></i>';
        trashButton.classList.add("trash-btn");
        todoDiv.appendChild(trashButton);
    
        //append to list
        todoList.appendChild(todoDiv);
    } else {
        console.log("Input required")
    }

    //clear task input value
    todoInput.value = "";
    
}

function deleteCheck(e) {
    const item = e.target;

    //delete task
    if(item.classList[0] === 'trash-btn'){
        const todo = item.parentElement;
        //add fall animation 
        todo.classList.add("fall")
        removeLocalTodos(todo);
        todo.addEventListener('transitionend', function() {
            todo.remove();
        })
    }

    //mark tasks as completed
    if(item.classList[0] === 'complete-btn'){
        const todo = item.parentElement
        todo.classList.toggle("completed");
        // item.innerHTML = '<i class="fa-solid fa-rotate-left"></i>'
    }
}


// filter out completed, uncompleted and all tasks
function filterTodo(e) {
    const todos = todoList.childNodes;
    todos.forEach(todo => {
        switch(e.target.value) {
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if (todo.classList.contains("completed")){
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
            case "uncompleted":
                if (todo.classList.contains("completed")){
                    todo.style.display = "none";
                } else {
                    todo.style.display = "flex";
                }
                break;
        }
    });
}

// save tasks in local storage
function saveLocalTodos(todo) {

    // check for pre-existing todo tasks in local storage
    let todos;
    if (localStorage.getItem('todos') === null){
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

// retrive tasks from local storage
function getTodos() { 
    let todos;
    if (localStorage.getItem('todos') === null){
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
        
    }
    todos.forEach(todo => {
        // create div elelmet to display tasks to be done
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");

        //create single task item 
        const newTodo = document.createElement('li');
        newTodo.innerText = todo;
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);

        //check button for completed tasks
        const completedButton = document.createElement('button')
        completedButton.innerHTML= '<i class="fa-solid fa-check"></i>';
        completedButton.classList.add("complete-btn");
        todoDiv.appendChild(completedButton);

        //delete button to delete tasks
        const trashButton = document.createElement('button')
        trashButton.innerHTML= '<i class="fa-solid fa-trash"></i>';
        trashButton.classList.add("trash-btn");
        todoDiv.appendChild(trashButton);

        //append to list
        todoList.appendChild(todoDiv);
    })
}


//Delete tasks from local storage
function removeLocalTodos(todo) {
    if (localStorage.getItem('todos') === null){
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    //get the index of the todo
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}