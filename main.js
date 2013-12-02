
$(document).ready(function () {

  var meny = Meny.create({
    menuElement: $('.toolbar').get(0),
    contentsElement: $('.contents').get(0),
    position: 'top',
    height: 55,
    width: 300,
    mouse: true,
    touch: true
  });

  // remove odd render bug...
  $(".toolbar").removeClass("hide");

	var view = this;
	var graph = new Graph(this);
  var typeahead = new Typeahead();
	var fb = new Facebook(this, function(id) {
		// called on successful login
    view.showMainView();
		view.showLogout(id);
    view.addData({id:"me", name:"me"});
    fb.getFriends(function(data){
      typeahead.setDataList(data);
    });
	}, function() {
    // called on bad login
    view.showLoginView();
  });

	// create the spinner
	this.spinner = new Spinner({radius: 30, length: 30, color: '#FFF'}).spin($("#spinner")[0]);
	
  this.addData = function(target) {
    fb.getPhotoData(target.id, function(data) {
      if(data.length == 0) return;
      $('<div/>', {
        class: "drop_item",
        text: target.name,
        style: "border-color:"+colors.get()+";"
      }).appendTo("#ongraph");
      graph.parseData(data);
    });
  }

  this.showMainView = function() {
    $(".view").addClass("hide");
    $("#main_view").removeClass("hide");
  }

  this.showLoginView = function() {
    $(".view").addClass("hide");
    $("#login_view").removeClass("hide");
  }

  $(".about").click(function() {
    view.showAboutView();
  });
  this.showAboutView = function() {
    $("#about_view").removeClass("hide");
    $("#about_view .close").click(function(){
      view.showMainView();
    })
  }

  this.setPeople = function(num) {
    $("#people").html(num);
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
    graph.stop();
    $("#ongraph").empty();
    $("#people").html("0");
	});

  $("#search_form").submit(function(e) {
    e.preventDefault();
    var $first = $(".drop_item").first();
    $first.trigger("click");
    $("#search_dropdown").empty();
  })

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
          $("#user").val("");
          view.addData({
            id: $(this).data("id"),
            name: $(this).html()
          });
          $("#search_dropdown").empty();
          $("#search_dropdown").addClass("hide");
        });
      }
    });
  });

  $(".clear").click(function() {
    graph.stop();
    $("#people").html("0");
    $("#ongraph").empty();
  });

});

console.log("Hey, thanks for checking out dots. Feel free to reach out to me with questions");

(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-20831199-15', 'ottosipe.com');
ga('send', 'pageview');

