
$(document).ready(function () {

	var view = this;
	var graph = new Graph();
 
	var fb = new Facebook(this, function(id) {
		// called on successful login
		view.showLogout(id);
		fb.getPhotoData(function(data, my_id) {
      graph.parseData(data, my_id);
    });
	});

	// create our spinner
	this.spinner = new Spinner({radius: 30, length: 30}).spin($("#spinner")[0]);
	
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
	
});




  $(document).ready(function(){


    // or, equivalently:
    //
    // sys.graft({
    //   nodes:{
    //     f:{alone:true, mass:.25}
    //   }, 
    //   edges:{
    //     a:{ b:{},
    //         c:{},
    //         d:{},
    //         e:{}
    //     }
    //   }
    // })
    
  })



