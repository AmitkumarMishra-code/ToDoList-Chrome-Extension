chrome.storage.sync.set({ pendingTasks: [], completedTasks: [] })
let contentDiv = document.querySelector('.content')

let newTask = document.querySelector('.new-task')
let addTaskButton = document.querySelector('.add-task')

addTaskButton.addEventListener('click', clickHandler)

function clickHandler() {
    if (!newTask.value.trim().length) {
        alert('Please provide a valid input!')
        return
    }
    let pendingTasks = []
    chrome.storage.sync.get(['pendingTasks'], (result) => {
        pendingTasks = [...result]
    })
    console.log(pendingTasks)
    pendingTasks.push(newTask.value)
    chrome.storage.sync.set({ pendingTasks })
    displayList()
}

function displayList() {
    let pendingTasks = []
    chrome.storage.sync.get(['pendingTasks'], (result) => {
        pendingTasks = [...result]
    })
    let completedTasks = chrome.storage.sync.get(['completedTasks'])

    pendingTasks.forEach(task => {
        let toDoTask = document.createElement('div')
        let p1 = document.createElement('p')
        let p2 = document.createElement('p')
        p1.innerText = task
        p2.innerText = '✖'
        p2.className = 'completed'
        p2.addEventListener('click', completedTaskHandler)
        toDoTask.appendChild(p1)
        toDoTask.appendChild(p2)
        contentDiv.appendChild(toDoTask)
    })

    completedTasks.forEach(task => {
        let finishedTask = document.createElement('div')
        let p1 = document.createElement('p')
        let p2 = document.createElement('p')
        p1.innerText = task
        p2.innerText = '✔'
        p1.style.textDecoration = 'strike-through'
        p2.className = 'completed'
        p2.addEventListener('click', addToPendingTaskHandler)
        finishedTask.appendChild(p1)
        finishedTask.appendChild(p2)
        contentDiv.appendChild(finishedTask)
    })
}

function completedTaskHandler(e) {
    let pendingTasks = chrome.storage.sync.get(['pendingTasks'])
    let completedTasks = chrome.storage.sync.get(['completedTasks'])
    console.log(e.target.value)
}

function addToPendingTaskHandler(e) {
    let pendingTasks = chrome.storage.sync.get(['pendingTasks'])
    let completedTasks = chrome.storage.sync.get(['completedTasks'])
    console.log(e.target.value)

}