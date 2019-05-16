// load dom fully before starting handlers
$(function() {
  $(".devour-btn").on("click", function(event) {
    console.log("devour clicked!")
    var id = $(this).data("id");

    var devourState = {
      devoured: 1
    };

    // Send the PUT request.
    $.ajax("/api/tacos/" + id, {
      type: "PUT",
      data: devourState
    }).then(
      function() {
        console.log("Devoured taco: " + id);
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });

  $(".create-taco").on("submit", function(event) {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();
    console.log("attempting to create a taco")
    var newTaco = {
      name: $("#ta").val().trim(),
      devoured: 0
    };

    // Send the POST request.
    $.ajax("/api/tacos", {
      type: "POST",
      data: newTaco
    }).then(
      function() {
        console.log("created new taco");
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });

  $(".delete-btn").on("click", function(event) {
    console.log("delete clicked!")
    var id = $(this).data("id");
    // Send the DELETE request.
    $.ajax("/api/tacos/" + id, {
      type: "DELETE"
    }).then(location.reload());
  });

});
