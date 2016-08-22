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

        //using an if statement to check if the item has been completed prior to appending to the DOM; will append differently based on criteria;
        if (item.completed === true) {
          //use data to assign id for later use;
          $el.data('todoID', item.id);
          $el.append('<button id="delete">Delete</button>');
          $el.append('<button id="test" class="test">Update</button>');

          //set class for done to reflect a strike through and greyout/no-mouse click;
          $el.append('<span class="done">' + item.todo + '</span>');
          $el.append('<span class="toggleSpan">THIS TASK IS DONE!!</span>');

          $('#todoList').append($el);

        }else {
          //use data to assign id for later use;
          $el.data('todoID', item.id);
          $el.append('<button id="delete">Delete</button>');
          $el.append('<button id="completed" class="completed">Update</button>');
          $el.append('<span>' + item.todo + '</span>');

          $('#todoList').append($el);
        }
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
  //add a built in dialog box;
  if(confirm("Sure?!")){
  //the 'correct way': div dialog box: appends a new div element with p/h tag with some buttons; on click-it removes/hides the div that was just appended;
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
}
