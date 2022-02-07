"use strict";

(function () {
const todoList = {
    formId: null,
    form: null,
    
    findForm() {
        const form = document.getElementById(this.formId);
// находим и записываем в переменную форму

        if(form === null || form.nodeName !== 'FORM') {
            throw new Error ('There is no such form on the page');
        }

        this.form = form;
        return form;
    },
    addFormHandler() {
// вешаем слушатель событий на кнопку
        this.form.addEventListener(
            'submit',
            (event) => this.formHandler(event)
        ); 
    },
    deleteAllTasks () {
        this.form.addEventListener(
            'onclick',
            (event) => this.formHandler(event)
            );
            console.log('!!!');
    },
    preFillTodoList() {
        //console.log('this ' + bind(this));//fix this
        document
            .addEventListener(
                'DOMContentLoaded',  
            this.preFillHandler.bind(this)

            )
    },
    preFillHandler(){
        const data = this.getData();
       // console.dir(data);
        if(data !== null) {
            if (data.length > 0) {
                data.forEach(todoItem => {
                    const template = this.createTemplate(todoItem);
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
            localStorage.clear();
            document.getElementById('todoItems')
                .remove();
            return
        }

        
// отменяем перезагрузку страницы        
        //console.log('form submitted');
        const inputs = this.findInputs(event.target);
// записываем в переменную инпуты из формы
        const data = {};
        //console.log(event.target);
// записываем в обьект ключ и значение каждого инпута
            inputs.forEach(input => {
                data[input.name] = input.value;
            });
// вызываем функцию записи данных в localstorage
            this.setData(data);
            const template = this.createTemplate(data);

            document.getElementById('todoItems')
                .prepend(template);
                //console.log(event.target);
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
// проверяем существует ли такой id
            throw new Error ('To do list ID is not valid');
        }
        this.formId = todoListFormId;
// записываем в переменную id формы
        this.findForm();
// вызов функции поиска формы
        this.addFormHandler();
// вызов функции слушателя событий
        this.preFillTodoList();
        //this.deleteAllTasks ();
        
    }, 

    createTemplate({title,description}) {
        //console.log({title,description});
        const todoItem = this.createElement('div','col-4');

        const taskWrapper = this.createElement('div','taskWrapper');
        todoItem.classList.add('taskWrapper');
        todoItem.append(taskWrapper);
        const taskHeading = this.createElement(
            'div',
            'taskHeading',
            title
        );
        const taskDescription = this.createElement(
            'div',
            'taskDescription',
            description   
            );
        taskWrapper.append(taskHeading);
        taskWrapper.append(taskDescription);
        return todoItem
    },

    createElement(nodeName, classes, innerContent) {
        const el = document.createElement(nodeName);

        if(Array.isArray(classes)) {

            classes.forEach(singleClassName => {
                el.classList.add(singleClassName);
            })
        } else {
            el.classList.add(classes);
        }

        if (innerContent) {
            el.innerHTML = innerContent;
        }
        
        return el;
    }
}



todoList.init('todoForm');
// Передаем id формы в функцию init

localStorage.setItem('name','yuri');

localStorage.getItem('name');

})();