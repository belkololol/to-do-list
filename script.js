
const taskList = document.querySelector('.list-group');
const input = document.querySelector('input');
const list = document.querySelector('ul');



input.addEventListener('keydown', (e) => {
    if (e.code == 'Enter' && input.value.length > 0) {
        createTask();
        e.target.value = '';
        hangEvent()
    }

})

function createTask() {
    let createLi = document.createElement('li');
    createLi.classList.add('list-group-item')
    let createP = document.createElement('p');
    createP.classList.add('task');
    let createDiv =  document.createElement('div');
    createDiv.classList.add('buttons');
    let createButtonEdit = document.createElement('button');
    createButtonEdit.classList.add('button-edit');
    let createButtonDelete = document.createElement('button');
    createButtonDelete.classList.add('button-delete');
    let createIconDelete = document.createElement('i');
    createIconDelete.classList.add('fas');
    createIconDelete.classList.add('fa-trash');
    let createIconEdit = document.createElement('i');
    createIconEdit.classList.add('fas');
    createIconEdit.classList.add('fa-edit');
    createP.innerHTML = input.value;
    taskList.appendChild(createLi);
    createLi.appendChild(createP);
    createLi.appendChild(createDiv);
    createDiv.appendChild(createButtonEdit);
    createDiv.appendChild(createButtonDelete);
    createButtonDelete.appendChild(createIconDelete);
    createButtonEdit.appendChild(createIconEdit);
}

function editTask(listItems, index) {
    const listItem = listItems[index];
    const currentEditButton = listItem.querySelector('.button-edit');
    const currentTask = listItem.querySelector('.task');

    return () => {
        if (currentEditButton.classList.contains('active-button-edit')) {
            for (let i = 0; i < listItems.length; i++) {
                const task = listItems[i].querySelector('.task');
                task.classList.remove('active');
                task.removeAttribute('contentEditable', true);
            }
            currentEditButton.classList.remove('active-button-edit');
        } else {
            for (let i = 0; i < listItems.length; i++) {
                const task = listItems[i].querySelector('.task');
                task.classList.remove('active');
                task.removeAttribute('contentEditable', true);
                const editButton = listItems[i].querySelector('.button-edit');
                editButton.classList.remove('active-button-edit');
            }
            currentTask.classList.add('active');
            currentTask.setAttribute('contentEditable', true);
            currentEditButton.classList.add('active-button-edit');
            setCursorToEnd(currentTask);
        }

        if (currentTask.classList.contains('decor')) {
            currentTask.classList.remove('decor');
        }


        currentTask.onkeydown = function (e) {
            if (e.code == 'Enter') {
                if (currentTask.textContent) {
                    currentTask.removeAttribute('contentEditable', true);
                    currentTask.classList.remove('active');
                    currentEditButton.classList.remove('active-button-edit');
                } else {
                    list.removeChild(listItems[index]);
                }
            }
        }

        if (!currentTask.textContent) {
            list.removeChild(listItems[index]);
        }
    }
}

function deleteTask(listItems, index) {
    return () => {
        list.removeChild(listItems[index]);
    }
}

function toggleTask(listItems, index) {
    const listItem = listItems[index];
    const currentTask = listItem.querySelector('.task');
    return () => {
        if (!currentTask.classList.contains('active')) {
            for (let i = 0; i < listItems.length; i++) {
                const task = listItems[i].querySelector('.task');
                task.classList.remove('active');
            }
            for (let i = 0; i < listItems.length; i++) {
                const editButton = listItems[i].querySelector('.button-edit');
                editButton.classList.remove('active-button-edit');
            }
        }
        if (currentTask.classList.contains('decor') || currentTask.classList.contains('active')) {
            currentTask.classList.remove('decor');
        } else {
            currentTask.classList.add('decor');
        }
    }
}

function hangEvent() {
    let listItems = list.querySelectorAll('li');


    listItems.forEach((listItem, index) => {
        const editButton = listItem.querySelector('.button-edit');
        const deleteButton = listItem.querySelector('.button-delete');
        const task = listItem.querySelector('.task');
        editButton.onclick = editTask(listItems, index);
        deleteButton.onclick = deleteTask(listItems, index);
        task.onclick = toggleTask(listItems, index);
    });
}

function setCursorToEnd(ele) {
    var range = document.createRange();
    var sel = window.getSelection();
    range.setStart(ele, ele.childNodes.length);
    range.collapse(true);
    sel.removeAllRanges();
    sel.addRange(range);
    ele.focus();
}

document.addEventListener('click', (e) => {
    let task = document.querySelectorAll('.task');
    let edit = document.querySelectorAll('.button-edit');
    let iconedit = document.querySelectorAll('.fa-edit');
    if (!e.target.classList.contains('task') && !e.target.classList.contains('button-edit') && !e.target.classList.contains('fa-edit') ) {
        console.log('df')
        for (let i = 0; i < task.length; i++) {
            task[i].classList.remove('active');
            task[i].removeAttribute('contentEditable', true);
        }
        for (let i = 0; i < edit.length; i++) {
            edit[i].classList.remove('active-button-edit');
        }
    };
})


