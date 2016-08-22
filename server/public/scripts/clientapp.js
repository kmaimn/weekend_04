$(document).ready(function () {
  // console.log('This works!')
  getItems();

  //event listeners
  $('#todoSubmit').on('click', addToList);
  $('#todoList').on('click', '#completed', todoComplete);
  $('#todoList').on('click', '#delete', todoDelete);
});

//GET items and append to DOM;
function getItems() {
  $.ajax({
    type: 'GET',
    url: '/items',
    success: function (items) {
      console.log('GET /items returns: ', items);
      items.forEach(function (item) {

        var $el = $('<li></li>');
        //use data to assign id for later use;
        $el.data('todoID', item.id);
        $el.append('<button id="delete">Delete</button>');
        $el.append('<button id="completed" class="completed">Update</button>');
        $el.append('<span class="todo">' + item.todo + '</span>');

        $('#todoList').append($el);

        //strike through doesn't actually strike through.. changes class based on item.complete boolean;
        function strikeThrough() {
          if (item.completed === true) {
            $el.append('<span class="toggleSpan">THIS TASK IS DONE!!</span>');
            // $('.completed').toggleClass('test');

            //change class is suppoed to change the button class to not allow mouse
            //hovers and lower opacity..doesn't work;
            // changeClass();
          }
        }

        strikeThrough();
      });
    },

    error: function (response) {
      console.log('GET /items failed');
    },
  });
}

function addToList() {
  event.preventDefault();

  //upon entry, status is set to false;
  var item = {};
  item.completed = false;

  $.each($('#entryForm').serializeArray(), function (i, field) {
    item[field.name] = field.value;
  });

  console.log('To-Do item created: ', item);

  $.ajax({
    type: 'POST',
    url: '/items',
    data: item,
    success: function () {
      console.log('POST /items works');
      $('#todoList').empty();
      getItems();
    },

    error: function (response) {
      console.log('POST /items did not work');
    },
  });

  //clears the form and refocuses on the todo entry;
  $('#entryForm').find('input[type=text]').val('');
  $('#todoItem').focus();
}

function todoComplete() {
  var item = {};

  //data!
  var todoID = $(this).parent().data('todoID');
  console.log(todoID);

  $.ajax({
    type: 'PUT',
    url: '/items/' + todoID,
    data: item,
    success: function () {
      $('#todoList').empty();
      getItems();
    },

    error: function () {
      console.log('PUT /items/' + itemID + 'did not work');
    },
  });
}

function todoDelete() {

  //data!
  var todoID = $(this).parent().data('todoID');

  $.ajax({
    type: 'DELETE',
    url: '/items/' + todoID,
    success: function () {
      console.log('DELETE of ID ' + todoID + ' successful');
      $('#todoList').empty();
      getItems();
    },

    error: function () {
      console.log('DELETE failed');
    },
  });
}

//this doesn't work;
// function changeClass() {
  // $(this).parent().children().sibling().addClass('test');
// }
