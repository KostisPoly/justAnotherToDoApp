$(document).ready(function(){
    $.getJSON("/api/todo")
    .then(loadtoDos)

    $('#todoInput').keypress(function(event){
        if (event.which == 13){
            createtoDo();
            //var entered = $("#todoInput").val();
        }
    });
    $('.list').on('click', 'li', function(){
        updatetoDo($(this));
    });
    $('.list').on('click','span', function(event){
        event.stopPropagation();//Not triggering parent click
        removetoDo($(this).parent());
    });
});

function loadtoDos(todos){
    todos.forEach(function(todo){
        addtoDo(todo);
         
    });
}
function createtoDo(){
    var userInput = $('#todoInput').val();
    $.post('/api/todo',{name: userInput})
    .then(function(newtoDo){
        addtoDo(newtoDo);
        $("#todoInput").val('');
    })
    .catch(function(err){
        
    })
}
function addtoDo(todo){
    var newtoDo = $('<li class="list-item">' + todo.name + '<span>X</span></li>');
    newtoDo.data('id', todo._id);
    newtoDo.data('completed', todo.completed);
    if (todo.completed) {
        newtoDo.addClass("done");
    }  
    $('.list').append(newtoDo);
}
function removetoDo (todo){
    var hasId = todo.data('id');
    $.ajax({
        method: 'DELETE',
        url: '/api/todo/' + hasId
    })
    .then(function (data) {
        todo.remove();
    })
}
function updatetoDo(todo){//when trigger update with oposite completed status
    var iscompleted = todo.data('completed');
    var updateData = {completed: !iscompleted}
    $.ajax({
        method: 'PUT',
        url: '/api/todo/'+todo.data('id'),
        data: updateData
    })
    .then(function(update){
        todo.toggleClass('done');
        todo.data('completed', !iscompleted);
    })
}