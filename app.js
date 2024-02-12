//selectors
const todoTitle = document.querySelector('.todo-title');
const todoInput = document.querySelector('.todo-input');
const todoDate = document.querySelector('.todo-date');
const todoTime = document.querySelector('.todo-time')
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
        
        //create a div container for buttons
        const todoButtonsContainer = document.createElement('div');
        todoButtonsContainer.classList.add("todo-buttons-container");
        todoDiv.appendChild(todoButtonsContainer);


        //create new todo title
        const newTitle = document.createElement('li');
        newTitle.innerText = todoTitle.value
        newTitle.classList.add('item-title');
        todoDiv.appendChild(newTitle);
    
        //create single task item 
        const newTodo = document.createElement('li');
        newTodo.innerText = todoInput.value
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);

        //create new todo date item
        const newDate = document.createElement('li');
        newDate.innerText = todoDate.value
        newDate.classList.add('item-date');
        todoDiv.appendChild(newDate);

        //create new todo time item
        const newTime = document.createElement('li');
        newTime.innerText = todoTime.value
        newTime.classList.add('item-time');
        todoDiv.appendChild(newTime);
    
        // Add task to local storage
        // saveLocalTodos(todoTitle.value)
        // saveLocalTodos(todoInput.value)
        // saveLocalTodos(todoDate.value)
        // saveLocalTodos(todoTime.value)

        // create an object and save to locals 
        let taskItem = {
            "title": todoTitle.value,
            "description": todoInput.value,
            "date": todoDate.value,
            "time": todoTime.value
        }

        saveLocalTodos(taskItem);


        //edit button to update an already keyed in task.
        const updateButton = document.createElement('button');
        updateButton.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>';
        updateButton.classList.add('update-btn');
        // todoDiv.appendChild(updateButton);
        todoButtonsContainer.appendChild(updateButton);



        //check button for completed tasks
        const completedButton = document.createElement('button')
        completedButton.innerHTML = '<i class="fa-solid fa-check"></i>';
        completedButton.classList.add("complete-btn");
        // todoDiv.appendChild(completedButton);
        todoButtonsContainer.appendChild(completedButton);
    
        //undo a comleted task***************************************
        const undoComplete = document.createElement('button');
        undoComplete.innerHTML = '<i class="fa-solid fa-rotate-left"></i>';
        undoComplete.classList.add("undo-button");
        // todoDiv.appendChild(undoComplete);
    
        //delete button to delete tasks
        const trashButton = document.createElement('button')
        trashButton.innerHTML = '<i class="fa-solid fa-trash"></i>';
        trashButton.classList.add("trash-btn");
        // todoDiv.appendChild(trashButton);
        todoButtonsContainer.appendChild(trashButton);
    
        //append to list
        todoList.appendChild(todoDiv);
    } else {
        console.log("Input required")
    }

    //clear task input value
    todoTitle.value = "";
    todoInput.value = "";
    todoDate.value = "";
    todoTime.value = "";
    
}

//check completed task, delete task and update task
function deleteCheck(e) {
    const item = e.target;

    //delete task
    if(item.classList[0] === 'trash-btn'){
        const todo = item.parentNode.parentNode;
        //add fall animation 
        todo.classList.add("fall")
        removeLocalTodos(todo);
        todo.addEventListener('transitionend', function() {
            todo.remove();
        })
    }

    //mark tasks as completed
    if(item.classList[0] === 'complete-btn'){
        const todo = item.parentElement.parentElement
        todo.classList.toggle("completed");
        // item.innerHTML = '<i class="fa-solid fa-rotate-left"></i>'
    }

    //Edit task
    if(item.classList[0] === 'update-btn'){
        // const todoText= todo.innerText
        const todo = item.parentElement.parentElement;

        //edit the description
        const todoText = todo.querySelector('.todo-item').innerText
        todoInput.value = todoText;

        //edit the title
        const titleText = todo.querySelector('.item-title').innerText
        todoTitle.value = titleText;

        //edit the title
        const dateText = todo.querySelector('.item-date').innerText
        todoDate.value = dateText;

        //edit the title
        const timeText = todo.querySelector('.item-time').innerText
        todoTime.value = timeText;

        todo.remove();
        removeLocalTodos(todo)
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
                
        //create a div container for buttons
        const todoButtonsContainer = document.createElement('div');
        todoButtonsContainer.classList.add("todo-buttons-container");
        todoDiv.appendChild(todoButtonsContainer);

        //create new todo title
        const newTitle = document.createElement('li');
        newTitle.innerText = todo;
        newTitle.classList.add('item-title');
        todoDiv.appendChild(newTitle);
    
        //create single task item 
        const newTodo = document.createElement('li');
        newTodo.innerText = todo
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);

        //create new todo date item
        const newDate = document.createElement('li');
        newDate.innerText = todo
        newDate.classList.add('item-date');
        todoDiv.appendChild(newDate);

        //create new todo time item
        const newTime = document.createElement('li');
        newTime.innerText = todo
        newTime.classList.add('item-time');
        todoDiv.appendChild(newTime);

        //edit button to update an already keyed in task.
        const updateButton = document.createElement('button');
        updateButton.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>';
        updateButton.classList.add('update-btn');
        todoButtonsContainer.appendChild(updateButton);

        //check button for completed tasks
        const completedButton = document.createElement('button')
        completedButton.innerHTML= '<i class="fa-solid fa-check"></i>';
        completedButton.classList.add("complete-btn");
        todoButtonsContainer.appendChild(completedButton);

        //delete button to delete tasks
        const trashButton = document.createElement('button')
        trashButton.innerHTML= '<i class="fa-solid fa-trash"></i>';
        trashButton.classList.add("trash-btn");
        todoButtonsContainer.appendChild(trashButton);

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
    const todoIndex = todo.parentElement.innerText;
    console.log(todoIndex)
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}