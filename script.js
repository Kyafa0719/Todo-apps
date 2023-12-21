const List = document.getElementById('list');
const CreateButton = document.getElementById('create-button');

let todos = [{
    id: new Date().getTime(),
    text: '',
    complete: false
}];

CreateButton.addEventListener('click', createNewTodo);

function createNewTodo() {
    const item = {
        id: new Date().getTime(),
        text: '',
        complete: false
    }
    todos.unshift(item);

    const { itemElement, inputElement } = createTodoElement(item);
    List.prepend(itemElement);

    inputElement.removeAttribute('disabled');
    inputElement.focus();

    saveToLocalStorage();
}

function createTodoElement(item) {
    const itemElement = document.createElement('div');
    itemElement.classList.add('item');

    const checkBoxElement = document.createElement('input');
    checkBoxElement.type = 'checkBox';
    checkBoxElement.checked = item.complete;

    if (item.complete) {
        itemElement.classList.add('complete');
    }

    const inputElement = document.createElement('input');
    inputElement.type = 'text';
    inputElement.value = item.text;
    inputElement.setAttribute('disabled', '');

    const actionElement = document.createElement('div');
    actionElement.classList.add('actions');

    const editElement = document.createElement('button');
    editElement.classList.add('material-icons');
    editElement.innerText = 'edit';

    const removeElement = document.createElement('button');
    removeElement.classList.add('material-icons', 'remove-btn');
    removeElement.innerText = 'remove_circles';

    inputElement.addEventListener('input', () => {
        item.text = inputElement.value
    });

    inputElement.addEventListener('blur', () => {
        inputElement.setAttribute('disabled', '');
        saveToLocalStorage();
    });

    checkBoxElement.addEventListener('change', () => {
        item.complete = checkBoxElement.checked;
        if (item.complete) {
            itemElement.classList.add('complete');
        } else {
            itemElement.classList.remove('complete');
        }
        saveToLocalStorage();
    });

    editElement.addEventListener('click', () => {
        inputElement.removeAttribute('disabled');
        inputElement.focus();
    });

    removeElement.addEventListener('click', () => {
        todos = todos.filter(t => t.id !== item.id)
        itemElement.remove();
        saveToLocalStorage();
    });

    actionElement.append(editElement);
    actionElement.append(removeElement);

    itemElement.append(checkBoxElement);
    itemElement.append(inputElement);
    itemElement.append(actionElement);

    return { itemElement, inputElement, editElement, removeElement }
}

function saveToLocalStorage() {
    const data = JSON.stringify(todos);
    localStorage.setItem('my_todos', data);
}

function loadFromLocalStorage() {
    const data = localStorage.getItem('my_todos');

    if (data) {
        todos = JSON.parse(data);
    }
}

function displayTodos() {
    loadFromLocalStorage();

    for (let i = 0; i < todos.length; i++) {
        const item = todos[i];
        const { itemElement } = createTodoElement(item);

        List.append(itemElement);
    }
}

displayTodos();
