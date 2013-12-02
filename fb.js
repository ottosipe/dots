
var Facebook = function(view, callback, fail) {
	this.id = 0;
	this.login = function() {

		var that = this;
		FB.login(function(response) {
			if (response.authResponse) {
				this.id = response.authResponse.userID;
				callback(this.id);
			} else {
				fail();
			}
		},{
			scope: 'friends_location,user_location,friends_photos,user_photos,user_status,friends_status'
		});
	}

	this.logout = function() {
		// log the user out
		FB.logout();
		view.showLogin();
	}
	
	this.getFriends = function(cb) {
		var that = this;
		FB.api('/me', function(me) {
			that.me = me;
			FB.api('/me/friends', function(response) {
				response.data.push(me);
				cb(response.data);
			});
		});
	}

	this.getPhotoData = function (target, parser) {
		view.showSpinner();
		var that = this;
		var limit = 60;
		FB.api(target+"/photos?fields=tags.fields(id,name),likes.fields(name,id)&limit="+limit, function(res) {
			parser(res.data, that.id);
			view.hideSpinner();
		});
	}

	this.init = function() {
		var that = this;
		window.fbAsyncInit = function() {
	
			// init the FB JS SDK
			FB.init({
				appId      : '195936307261513',	// App ID from the app dashboard
				channelUrl : '/channel.html', 	// Channel file for x-domain comms
				status     : true,				// Check Facebook Login status
				xfbml      : true				// Look for social plugins on the page
			});

			FB.getLoginStatus(function(response) {
				if (response.status === 'connected') {
					// the user is logged in and has authenticated
					that.id = response.authResponse.userID;
					callback(that.id);
				} else {
					fail();
				}
			});
		};

		// Load the SDK asynchronously
		(function(d, s, id){
			var js, fjs = d.getElementsByTagName(s)[0];
			if (d.getElementById(id)) {return;}
			js = d.createElement(s); js.id = id;
			js.src = "//connect.facebook.net/en_US/all.js";
			fjs.parentNode.insertBefore(js, fjs);
		}(document, 'script', 'facebook-jssdk'));
	}	

	this.init();
}


