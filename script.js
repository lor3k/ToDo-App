let viewListButton = document.getElementsByClassName('view')[0];
let addTaskButton = document.getElementsByClassName('add')[0];
let main = document.getElementsByTagName('main')[0]

viewListButton.addEventListener('click', viewList)
addTaskButton.addEventListener('click', addNewTask)

function addNewTask() {
    main.innerText = ''
    let note = document.createElement('div')
    let title = document.createElement('input')
    let content = document.createElement('textarea')
    let addNote = document.createElement('button')
    let clearNote = document.createElement('button')
    note.className = 'note'
    title.className = 'title'
    content.className = 'content'
    addNote.className = 'add'
    clearNote.className = 'del'
    title.setAttribute('placeholder', 'Title...')
    content.setAttribute('placeholder', 'Text...')
    addNote.innerText = 'Add'
    clearNote.innerText = 'Clear'
    note.appendChild(title)
    note.appendChild(content)
    note.appendChild(addNote)
    note.appendChild(clearNote)
    main.appendChild(note)
    function addTaskToTasksList() {
        if (title.value !== '' && content.value !== '') {
            let taskList = localStorage.getItem('taskList') || '{}'
            taskList = JSON.parse(taskList)
            taskList[title.value] = (content.value)
            taskList = JSON.stringify(taskList)
            localStorage.setItem('taskList', taskList)
            main.removeChild(note)
            main.innerText = 'Task added to tasks list!'
        }
        else {
            let text = 'This field is required!'
            title.setAttribute('placeholder', text)
            content.setAttribute('placeholder', text)
        }
    }
    function clearTask() {
        title.value = ''
        content.value = ''
    }
    addNote.addEventListener('click', addTaskToTasksList)
    clearNote.addEventListener('click', clearTask)
}

function viewList() {
    main.innerText = ''
    let tasksListItems = localStorage.getItem('taskList')
    if (tasksListItems === '{}')
        main.innerText = 'Task list is empty. Add fist task!'
    else {
        tasksListItems = JSON.parse(tasksListItems)
        for (let property in tasksListItems) {
            if (tasksListItems.hasOwnProperty(property)) {
                new CreateNewTask(property, tasksListItems[property])
            }
        }
    }
}

function CreateNewTask(taskTitle, taskContent) {
    let note = document.createElement('div')
    let title = document.createElement('div')
    let content = document.createElement('div')
    let delNote = document.createElement('button')
    note.className = 'note'
    title.className = 'title'
    content.className = 'content'
    delNote.className = 'del'
    note.appendChild(title)
    note.appendChild(content)
    note.appendChild(delNote)
    title.innerText = taskTitle
    content.innerText = taskContent
    delNote.innerText = 'Delete'
    delNote.addEventListener('click', removeTaskFromTasksList)
    main.appendChild(note)

    function removeTaskFromTasksList() {
        let taskList = localStorage.getItem('taskList')
        taskList = JSON.parse(taskList)
        delete taskList[taskTitle]
        taskList = JSON.stringify(taskList)
        localStorage.setItem('taskList', taskList)
        main.removeChild(note)
        let alert = document.createElement('span')
        alert.innerText = 'Task removed from tasks list!\n'
        main.prepend(alert)
    }
}