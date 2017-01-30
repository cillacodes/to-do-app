$(document).ready(function() {
  console.log('doc is ready!');

  getTasks();

  $('#taskForm').on('click', '#submit', addTask);
  $('#taskForm').on('click', '.update', updateTask);
  $('#taskList').on('click', '.delete', deleteTask);

}); //end of doc.ready

function getTasks() {
  $.ajax({
    url: '/tasks',
    type: 'GET',
    success: displayTasks
  });
}

function displayTasks(tasks) {
  console.log('Got tasks from server', tasks);

  $('#taskList').empty();

  tasks.forEach(function(task) {
    //dynamically created li's for tasks
    var $li = $('<li></li>');

    var $form = $('<form></form>');

    // $form.append('<input type="checkbox" name="completed" value="' + task.completed + '"/>');
    $form.append('<input type="checkbox" name="completed" value="' + task.completed + '"/>' + '<input type="text" name="insertTask" value="' + task.todo + '">' );

    //var to create delete button with each li
    var $deleteButton = $('<button class="delete">Delete!</button>');
    $deleteButton.data('id', task.id);
    $form.append($deleteButton);

    var $updatebutton= $('<button class="update">Update</button>');
    $updatebutton.data('id', task.id);
    $form.append($updatebutton);


    $li.append($form);
    $('#taskList').append($li);
  });

} //end of displayTasks fnc


function addTask(event) {
  event.preventDefault();

  var formData = $('#taskForm').serialize();
  formData.completed = false;
  console.log(formData);

  $.ajax({
    url: '/tasks',
    type: 'POST',
    data: formData,
    success: getTasks
  })
  // $('#insertTask').val(''); //empties the input field
} //end of addtoDo fnc

function updateTask(event) {
  event.preventDefault();

  var $button = $(this);
  var $form = $button.closest('form');

  var data = $form.serialize();

  $.ajax({
    url: '/tasks/' + $button.data('id'),
    type: 'PUT',
    data: data,
    success: getTasks
  });
}

function deleteTask(event){
  event.preventDefault();

  $.ajax({
    url: '/tasks/' + $(this).data('id'),
    type: 'DELETE',
    success: getTasks
  });

}
