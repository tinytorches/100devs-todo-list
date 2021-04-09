const todo = document.querySelectorAll('.todo span');
const todoComplete = document.querySelectorAll('.todo span.completed');
const deleteButton = document.querySelectorAll('.delete');

Array.from(todo).forEach((element)=>{
    element.addEventListener('click', markComplete)
});

Array.from(todoComplete).forEach((element)=>{
    element.addEventListener('click', undo)
});

Array.from(deleteButton).forEach((element)=>{
    element.addEventListener('click', deleteTodo)
});

async function markComplete() {
    const todoText = this.parentNode.childNodes[1].innerText;
    try {
        const res = await fetch('markComplete', {
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'textToComplete': todoText
            })
        });
        const data = await res.json();
        console.log(data);
        location.reload();
    } catch(err) {
        console.log(err);
    };
};

async function undo() {
    const todoText = this.parentNode.childNodes[1].innerText;
    try {
        const res = await fetch('undo', {
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'textToUndo': todoText
            })
        });
        const data = await res.json();
        console.log(data);
        location.reload();
    } catch(err) {
        console.log(err);
    };
};

async function deleteTodo() {
    const todoText = this.parentNode.childNodes[1].innerText;
    try {
        const res = await fetch('deleteTodo', {
            method: 'delete',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'textToDelete': todoText
            })
        });
        const data = await res.json();
        console.log(data);
        location.reload();
    } catch(err) {
        console.log(err);
    };
};