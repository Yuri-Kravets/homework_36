"use strict";

(function () {
const todoList = {
    formId: null,
    form: null,
    todo:null,
    countId: 0,
    
    findForm() {
        const form = document.getElementById(this.formId);
// находим и записываем в переменную форму

        if(form === null || form.nodeName !== 'FORM') {
            throw new Error ('There is no such form on the page');
        }

        this.form = form;
        return form;
    },
    findTodo() {
        const todo = document.getElementById('todoItems');
        //console.log(todo);
        if(todo === null) {
            throw new Error ('There is no such TODO on the page');
        }
        this.todo = todo;
        
        return todo;
        
    },
    addFormHandler() {
// вешаем слушатель событий на кнопку
        this.form.addEventListener(
            'submit',
            (event) => this.formHandler(event)
        ); 
        //console.log('form submitted');
    },
    addTodoHandler() {
        // вешаем слушатель событий на todo
                this.todo.addEventListener(
                    'click',
                    (event) => this.todoHandler(event)
                ); 
                //console.log('событие поймал');
            },

    todoHandler (event) {
        if (event.target.tagName === 'INPUT') {
            this.updateTodoItem(event.target.id); 
        }
    },
    updateTodoItem (id) {
       // console.log(id);
        const data = this.getData();
        console.log(data[id].completed);
        if (data[id].completed === 'true') {
            data[id].completed = 'false';

        } else  {
            data[id].completed = 'true';
        }
        localStorage.clear();
        localStorage.setItem(
            this.formId,
            JSON.stringify(data)
        );
        
    },

    preFillTodoList() {
        document
            .addEventListener(
                'DOMContentLoaded',  
            this.preFillHandler.bind(this)
            )
    },
    preFillHandler(){
        const data = this.getData();
        if(data !== null) {
            if (data.length > 0) {
                data.forEach(todoItem => {
                    todoItem.id = this.countId;
                    this.countId ++;
                    const template = this.createTemplate(todoItem);
                    console.log(todoItem);
                    document
                        .getElementById('todoItems')
                        .prepend(template);
                })
            }
        }
    },

    formHandler(event) {
        event.preventDefault();       
        if (event.submitter.id === 'del'){
            if(confirm('точно удалить?')) {
                localStorage.clear();
                document.querySelectorAll('div.col-4.taskWrapper').forEach(divTask => {
                    divTask.remove();
                }) 
                return
            }
        }     
        const inputs = this.findInputs(event.target);
        const data = {};
            inputs.forEach(input => {
                data[input.name] = input.value;
            });
            data['completed'] = 'false';
            
            this.setData(data);
            data.id = this.countId ++;
            const template = this.createTemplate(data);
            document.getElementById('todoItems')
                .prepend(template);
                event.target.reset();
    },
    setData(data) {
        if(!localStorage.getItem(this.formId)) {
            let arr = [];
            arr.push(data);
            localStorage.setItem(
                this.formId,
                JSON.stringify(arr)
            );
            return;
        }
        
        let existingData = localStorage.getItem(this.formId);
        existingData =JSON.parse(existingData);
        existingData.push(data);
        localStorage.setItem(
            this.formId,
            JSON.stringify(existingData)
        )
        return;
    },
    getData () {
        return JSON.parse(localStorage.getItem(this.formId));
    },

    findInputs(target) {
        return target.querySelectorAll(
            'input:not([type=submit]), textarea'
        );
    },

    init(todoListFormId) {
        if(typeof todoListFormId !== 'string' || todoListFormId.length === 0)  {
            throw new Error ('To do list ID is not valid');
        }
        this.formId = todoListFormId;
        this.findForm();
        this.addFormHandler();
        this.findTodo();
        this.addTodoHandler();
        this.preFillTodoList();
        
    }, 

    createTemplate({title,description,completed,id}) {

        const todoItem = this.createElement('div','col-4');
        
        const taskWrapper = this.createElement('div','taskWrapper');
        
        todoItem.classList.add('taskWrapper');
        todoItem.append(taskWrapper);
        const taskHeading = this.createElement(
            'div',
            'taskHeading',
            '',
            title
        );
        const taskDescription = this.createElement(
            'div',
            'taskDescription',
            '',
            description   
            );
        taskWrapper.append(taskHeading);
        taskWrapper.append(taskDescription);

        const todoCheckBox = this.createCheckBox(
            id,
            'Выполнено',
            completed
        
            );
        todoItem.append(todoCheckBox);

        const removeItemBtn = this.createElement(
            'input',
            ['btn','btn-info'],
            'submit',
            'удалить'
            );
            console.log(removeItemBtn);
        todoItem.append(removeItemBtn);
        console.log(removeItemBtn);

        return todoItem
    },

    createElement(nodeName, classes, type, innerContent) {
        const el = document.createElement(nodeName);

        if(Array.isArray(classes)) {

            classes.forEach(singleClassName => {
                el.classList.add(singleClassName);
            })
        } else {
            el.classList.add(classes);
        }
        if (type !== '' && type) {
            el.setAttribute('type', type);
        }
        if (innerContent) {
            el.innerHTML = innerContent;
        }
        
        return el;
    },
    removeItem () {

    },

    createCheckBox (id,innerContent,completed) {
        const checkBox = this.createElement('div','form-check');
        
            const checkInput = this.createElement('input','form-check-input','checkbox');
            checkInput.setAttribute('id', id);
            checkBox.prepend(checkInput);
            
            const checkLabel = this.createElement('label','form-check-label');
            checkLabel.setAttribute('for', id);
            if (innerContent) {
                checkLabel.innerHTML = innerContent;
            }
            if (completed === 'true') {
                checkInput.setAttribute('checked','');
            }
            
            checkBox.prepend(checkLabel);
        return checkBox;
    },


todoList.init('todoForm');




})();

