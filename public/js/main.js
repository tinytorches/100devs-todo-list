// alert('Test test...')

const deleteButton = document.querySelectorAll('.delete');

Array.from(deleteButton).forEach((element) => {
    element.addEventListener('click', deleteTodo);
});

async function deleteTodo() {
    const todoText = this.parentNode.childNodes[1].innerText;
    try {
        const res = await fetch('deleteTodo', {
            method: 'delete',
            headers: {'Conent-type': 'application/json'},
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