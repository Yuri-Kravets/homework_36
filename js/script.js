"use strict";

(function () {
const todoList = {
    formId: null,
    form: null,
    
    findForm() {
        const form =document.getElementById(this.formId);

        if(form === null || form.nodeName !== 'FORM') {
            throw new Error ('There is no such form on the page');
        }

        this.form = form;
        return form;
    },
    addFormHandler() {
        this.form.addEventListener(
            'submit',
            (event) => this.formHandler(event)
        );
    },

    formHandler(event) {
        event.preventDefault();
        console.log('form submitted');

        const inputs = this.findInputs(event.target);
        const data = {};

        inputs.forEach(input => {
            data[input.name] = input.value;
        });

        this.setData(data);
        const template = this.createTamplate(data);

        document.getElementById('todoItems')
        .prepend(template);
        console.log(data);
        
    },
    setData(data) {
        localStorage.setItem(
            this.formId,
            JSON.stringify(data));
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
    }, 

    createTamplate({title,description}) {
        const divCol = this.createElement('div','col-4');

        const taskWrapper = this.createElement('div','taskWrapper');
        divCol.classList.add('taskWrapper');

        divCol.append(taskWrapper);

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
        return divCol
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

})();