
$(document).ready(function () {

	var view = this;
	var graph = new Graph(this);
  var typeahead = new Typeahead();
	var fb = new Facebook(this, function(id) {
		// called on successful login
		view.showLogout(id);
    view.addData("me");
    fb.getFriends(function(data){
      typeahead.setDataList(data);
    });
	});

	// create our spinner
	this.spinner = new Spinner({radius: 30, length: 30}).spin($("#spinner")[0]);
	
  this.addData = function(target) {
    console.log("data: ", target)
    fb.getPhotoData(target, function(data, my_id) {
      graph.parseData(data, my_id);
    });
  }

	this.showLogin = function() {
		// show and hide the right buttons
		$(".logout").addClass("hide");
		$(".login").removeClass("hide");
		$("#user_img").attr("src","");
	}

	this.showLogout = function(user_id) {
		$(".login").addClass("hide");
		$(".logout").removeClass("hide");
		$("#user_img").attr("src", "//graph.facebook.com/"+user_id+"/picture?type=large");
	}

	this.showSpinner = function() {
		$("#spinner").removeClass("hide");
	}

	this.hideSpinner = function() {
		$("#spinner").addClass("hide");
	}

	$(".login").click(function() {
		fb.login();
	});

	$(".logout").click(function() {
		fb.logout();
	});

  $("#user").on("keyup", function() {

    typeahead.search($("#user").val(), function(list) {
      $("#search_dropdown").empty();
      $("#search_dropdown").removeClass("hide");

      if(list.length == 0) {
        $("#search_dropdown").addClass("hide");
      }
      for (var i in list) {
        $('<div/>', {
          class: "drop_item",
          "data-id": list[i].id,
          text: list[i].name
        })
        .appendTo("#search_dropdown")
        .click(function() {
          $("#user").val($(this).html());
          view.addData($(this).data("id"));
          $("#search_dropdown").empty();
          $("#search_dropdown").addClass("hide");
        });
      }
    });
  });

  $(".clear").click(function() {
    graph.stop();
  })

});

