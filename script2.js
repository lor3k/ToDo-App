function ToDo(container) {
    this.container = document.querySelector(container)
    this.main = document.createElement('div')
    this.main.className = 'main'
    this.container.appendChild(this.navButtons())
    this.container.appendChild(this.main)
}

ToDo.prototype.navButtons = function () {
    let self = this
    let buttonsDiv = document.createElement('div')
    let addButton = document.createElement('button')
    let viewButton = document.createElement('button')
    buttonsDiv.className = 'buttonsContainer'
    addButton.className = 'add'
    viewButton.className = 'view'
    addButton.innerText = 'Add new task'
    viewButton.innerText = 'View tasks list'
    buttonsDiv.appendChild(addButton)
    buttonsDiv.appendChild(viewButton)
    addButton.addEventListener('click', function () { self.create() })
    viewButton.addEventListener('click', function () { self.render() })
    return buttonsDiv
}

ToDo.prototype.create = function () {
    let self = this
    this.main.innerText = ''
    let note = document.createElement('div')
    let title = document.createElement('input')
    let content = document.createElement('textarea')
    let addButton = document.createElement('button')
    let clearButton = document.createElement('button')
    note.className = 'note'
    title.className = 'title'
    content.className = 'content'
    addButton.className = 'add'
    clearButton.className = 'del'
    title.setAttribute('placeholder', 'Title...')
    content.setAttribute('placeholder', 'Text...')
    addButton.innerText = 'Add'
    clearButton.innerText = 'Clear'
    note.appendChild(title)
    note.appendChild(content)
    note.appendChild(addButton)
    note.appendChild(clearButton)
    this.main.appendChild(note)
    addButton.addEventListener('click', addTask)
    clearButton.addEventListener('click', clearTask)

    function addTask() {
        if (title.value !== '' && content.value !== '') {
            let taskList = localStorage.getItem('taskList') || '{}'
            taskList = JSON.parse(taskList)
            taskList[Date.now()] = [title.value, content.value]
            taskList = JSON.stringify(taskList)
            localStorage.setItem('taskList', taskList)
            note.remove()
            self.main.innerText = 'Task added to tasks list!'
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
}

ToDo.prototype.render = function () {
    this.main.innerText = ''
    let tasks = localStorage.getItem('taskList') || '{}'
    if (tasks === '{}')
        this.main.innerText = 'Task list is empty. Add fist task!'
    else {
        tasks = JSON.parse(tasks)
        for (let property in tasks)
            new Task(property, tasks[property][0], tasks[property][1], this.main)
    }
}

function Task(dateStamp, taskTitle, taskContent, main) {
    let self = this
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
    delNote.addEventListener('click', function () { self.removeTask(dateStamp, note, main) })
    main.appendChild(note)
}

Task.prototype.removeTask = function (dateStamp, note, main) {
    let taskList = localStorage.getItem('taskList')
    taskList = JSON.parse(taskList)
    delete taskList[dateStamp]
    taskList = JSON.stringify(taskList)
    localStorage.setItem('taskList', taskList)
    note.remove()
    let alert = document.createElement('span')
    alert.innerText = 'Task removed from tasks list!\n'
    main.prepend(alert)
}