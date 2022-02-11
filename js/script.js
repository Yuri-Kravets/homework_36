"use strict";

(function () {
const todoList = {
    formId: null,
    form: null,
    todo:null,
    
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
        console.log(todo);
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
    },
    addTodoHandler() {
        // вешаем слушатель событий на todo
                this.todo.addEventListener(
                    'onclick',
                    (event) => this.formHandler(event)
                ); 
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

                //console.log(this.todo);
                //document.querySelector('todoItems').addEventListener('onclick',(event) {
//
  //              })
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
        // записываем в переменную инпуты из формы
        const data = {};
            // записываем в обьект ключ и значение каждого инпута
            inputs.forEach(input => {
                //console.log(input);
                data[input.name] = input.value;
            });
            data['completed'] = 'false';
            data['id'] = this.getIdTodoItem();
            
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

        this.findTodo();
// вызов функции слушателя событий
        this.preFillTodoList();
        //this.deleteAllTasks ();
        
    }, 

    createTemplate({title,description,completed,id}) {
       //console.log({title,description,completed,id});

        const todoItem = this.createElement('div','col-4');
        
        const taskWrapper = this.createElement('div','taskWrapper');
        
        todoItem.classList.add('taskWrapper');
        //todoItem.setAttribute('id')
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

    getIdTodoItem () {
        let idNumber = 1;
        if (localStorage.getItem('lastIdTodoItem')) {
            let oldIdNumber = localStorage.getItem('lastIdTodoItem');
            idNumber = +oldIdNumber + 1;
            localStorage.setItem('lastIdTodoItem',idNumber);
            return idNumber
        } 
        localStorage.setItem('lastIdTodoItem',idNumber);
        return idNumber
    } 

}



todoList.init('todoForm');
// Передаем id формы в функцию init

localStorage.setItem('name','yuri');
localStorage.setItem('name','Igor')

localStorage.getItem('name');

})();










function listenDeleteTodo(element) {
    element.addEventListener("click", (event) => {
        element.parentElement.remove();
        event.stopPropagation();
    });
}
        
        // const divCheckBox = this.createElement('div','form-check');
        //     const checkBox = this.createElement('input','form-check-input','checkbox','false');
        //     divCheckBox.prepend(checkBox);
        //     const checkLabel = this.createElement('label','form-check-label','false');
        //     divCheckBox.prepend(checkBox);
        // todoItem.append(divCheckBox);
        //todoItem.append(divCheckBox);
        

