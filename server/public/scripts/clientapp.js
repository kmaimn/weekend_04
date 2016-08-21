$(document).ready(function () {
  // console.log('This works!')
  getItems();

  $('#todoSubmit').on('click', addToList);

  $('#todoList').on('click', '#completed', todoComplete);
  $('#todoList').on('click', '#delete', todoDelete);

});

function getItems() {
  $.ajax({
    type: 'GET',
    url: '/items',
    success: function (items) {
      console.log('GET /items returns: ', items);
      items.forEach(function (item) {
        var $el = $('<li></li>');

        $el.data('todoID', item.id);
        $el.append('<button id="delete">Delete</button>');
        $el.append('<button id="completed" class="completed">Done</button>');
        $el.append('<span>' + item.todo + '</span>');

        $('#todoList').append($el);

        function strikeThrough() {
          if (item.completed === true) {
            $el.append('<span class="toggleSpan">TASK IS DONE!</span>');
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

  $('#entryForm').find('input[type=text]').val('');
  $('#todoItem').focus();
}

function todoComplete() {
  var item = {};

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

function changeClass () {
  $(this).parent().children().sibling().addClass('test');
}
