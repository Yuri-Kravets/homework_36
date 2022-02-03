'use strict'

const DB_NAME = 'saved_data';

document.querySelector('#todoForm')
    .addEventListener('submit', e => {
        e.preventDefault();
        const inputs = e.target.querySelectorAll('input, textarea');

        const obj = {};

        for(const input of inputs) {
            if(!input.value.length) return alert('No way you can add this shit');
            obj[input.name] = input.value;
        }

        saveData(obj);
        renderItem(obj);
        e.target.reset();
    });

function saveData(todoItem) {
    if(localStorage[DB_NAME]) {
        const data = JSON.parse(localStorage[DB_NAME]);
        data.push(todoItem)
        localStorage.setItem(DB_NAME, JSON.stringify(data));
        return data;
    }

    const data = [todoItem]
    localStorage.setItem(DB_NAME, JSON.stringify(data));
    return data
}

window.addEventListener('load', () => {
    if(!localStorage[DB_NAME].length) return;
    const data = JSON.parse(localStorage[DB_NAME]);
    data.forEach(item => renderItem(item));
})


function renderItem(todoItem) {
    const template = createTemplate(todoItem.title, todoItem.description);
    document.querySelector('#todoItems').prepend(template);
}

function createTemplate(titleText = '', descriptionText = '') {
    const mainWrp = document.createElement('div');
    mainWrp.className = 'col-4';

    const wrp = document.createElement('div');
    wrp.className = 'taskWrapper';
    mainWrp.append(wrp);

    const title = document.createElement('div');
    title.innerHTML = titleText;
    title.className = 'taskHeading';
    wrp.append(title);

    const description = document.createElement('div');
    description.innerHTML = descriptionText;
    description.className = 'taskDescription'
    wrp.append(description);

    return mainWrp;
}