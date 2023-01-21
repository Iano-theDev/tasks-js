//selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');


//Event listeners
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);

//Functions
function addTodo(event) {
    event.preventDefault();
    console.log("Hello")
    // create div elelmet to display tasks to be done
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    //create single task item 
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value
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

    
}

function deleteCheck(e) {
    const item = e.target;

    //delete task
    if(item.classList[0] === 'trash-btn'){
        const todo = item.parentElement;
        //add fall animation 
        todo.classList.add("fall")
        // todo.remove()
    }

    //mark tasks as completed
    if(item.classList[0] === 'complete-btn'){
        const todo = item.parentElement
        todo.classList.toggle("some-class");
        // item.innerHTML = '<i class="fa-solid fa-rotate-left"></i>'
    }
}