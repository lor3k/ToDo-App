let viewListButton = document.getElementById('viewTasksList');
let addTaskButton = document.getElementById('addNewTask');

viewListButton.addEventListener('click',viewList)
addTaskButton.addEventListener('click', addNewTask)

function addNewTask(){
    let note = document.createElement('div')
    let title = document.createElement('input')
    let content = document.createElement('textarea')
    let addNote = document.createElement('button')
    let delNote = document.createElement('button')
    note.className = 'note'
    note.appendChild(title)
    note.appendChild(content)
    note.appendChild(addNote)
    note.appendChild(delNote)
    addNote.innerText = 'Add'
    delNote.innerText = 'Delete'
    document.body.appendChild(note)
    addTaskToTasksList = () => {
        let taskList = localStorage.getItem('taskList') || '{}'
        taskList = JSON.parse(taskList)
        taskList[title.value] = (content.value)
        taskList = JSON.stringify(taskList)
        localStorage.setItem('taskList', taskList)
        document.body.removeChild(note)
    }
    addNote.addEventListener('click', addTaskToTasksList)
}

function viewList(){
    let tasksListItems = localStorage.getItem('taskList')
    tasksListItems = JSON.parse(tasksListItems)
    for (let property in tasksListItems) {
        if (tasksListItems.hasOwnProperty(property)) {
            let taskListItem = document.createElement('p')
            document.body.appendChild(taskListItem)
            taskListItem.innerText = JSON.stringify(tasksListItems)
        }
    }
}
