let input = document.getElementById('input-value')
let button = document.getElementById('btn')
let output = document.getElementById('list-container')
let moonIcon = document.getElementById('moon')
let sunIcon = document.getElementById('sun')
let bgChange = document.getElementById('bg-light')




moonIcon.addEventListener('click', function () {
    let body = document.body;
    let isDarkMode = body.classList.toggle('dark-mode');

    let currentColor = window.getComputedStyle(body, null).getPropertyValue('background-color');
    body.style.backgroundColor = currentColor === 'rgb(240, 240, 240)' ? '#000000' : '#f0f0f0';

    sunIcon.style.display = isDarkMode ? 'none' : 'inline';
    moonIcon.style.display = isDarkMode ? 'inline' : 'none';
});




button.addEventListener('click',function(){
    let value = input.value;
    if(value === ""){
        alert('Please enter a value')
    }else{
        let li = document.createElement('li')
        let span = document.createElement('span');
        li.textContent = value;
        output.appendChild(li);
        span.innerHTML = "\u00d7";
        li.appendChild(span);
    }
    input.value = "";
    saveData();
})
output.addEventListener('click',function(e){
    if(e.target.tagName === "LI"){
        e.target.classList.toggle("checked");
        saveData();
    }else if(e.target.tagName === "SPAN"){
        e.target.parentElement.remove();
        saveData();
    }
}, false);

// Function to save tasks to local storage
function saveData() {
    let tasks = Array.from(output.children).map(task => task.textContent);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to load tasks from local storage
function showTasks() {
    let data = localStorage.getItem('tasks');
    if (data) {
        let tasks = JSON.parse(data);
        tasks.forEach(task => createTask(task));
    }
}

// Initial setup: load tasks from local storage
showTasks();