//Function
function getFavourites() {
	
	var email = localStorage['email'];
	var password = localStorage['password'];
	
	if( email != null && password != null ){
		$.ajax({
	        type: "GET",
			url: "https://testing305cde.herokuapp.com/favourite/getList/email=" + email + "&pw=" + password,
			format:"jsonp",
			dataType: "jsonp",
			beforeSend: function(){	            
				$("#loader").show();
			},
			success : function(data) {
				if(data[0] == "1"){
					$("#favourites-system-message").html(data[1]);
					$("#favourites-error-message").html("");
					$("#favourites-list").html("");
					for (var i = 0; i < data[1].length; i++) { 
						$("#favourites-list").append("<tr><td>" + data[1][i].cityname + "</td><td><button id='favourite-remove' class='btn btn-primary btn-sm' type='button' onclick='showFavourites(\"" + data[1][i].cityname + "\")'>Show</button> <button id='favourite-remove' class='btn btn-primary btn-sm' type='button' onclick='removeFavourites(\"" + data[1][i].cityname + "\")'>Remove</button></td></tr>");
					}
				} else {
					$("#favourites-system-message").html("");
					$("#favourites-error-message").html(data[1]);
				}
	         },
			error : function(e) {
				$("#favourites-system-message").html("");
				$("#favourites-error-message").html("Get Favourites Fail: " + e.responseText);
			},
			complete : function(data) {
				$("#loader").hide();
			}
		});
	} else {
		$("#favourites-system-message").html("");
		$("#favourites-error-message").html("Get Favourites Fail: Havent Login");
	}
}

function addFavourites(cityname) {
	console.log(cityname);
	var email = localStorage['email'];
	var password = localStorage['password'];
	
	if( email != null && password != null && cityname != null ){
		$.ajax({
	        type: "GET",
			url: "https://testing305cde.herokuapp.com//favourite/add/email=" + email + "&pw=" + password + "&cityname=" + cityname,
			format:"jsonp",
			dataType: "jsonp",
			beforeSend: function(){	            
				$("#loader").show();
			},
			success : function(data) {
				if(data[0] == "1"){
					getFavourites();
					$("#add-system-message").html(data[1]);
					$("#add-error-message").html("");
				} else {
					$("#add-system-message").html("");
					$("#add-error-message").html(data[1]);
				}
	         },
			error : function(e) {
				$("#add-system-message").html("");
				$("#add-error-message").html("Add Favourites Fail: " + e.responseText);
			},
			complete : function(data) {
				$("#loader").hide();
			}
		});
	} else {
		$("#add-system-message").html("");
		$("#add-error-message").html("Add Favourites Fail: Havent Login");
	}
}

function removeFavourites(cityname){
	
	var email = localStorage['email'];
	var password = localStorage['password'];
	
	if( email != null && password != null && cityname != null ){
		$.ajax({
	        type: "GET",
			url: "https://testing305cde.herokuapp.com​/favourite/remove/email=" + email + "&pw=" + password + "&cityname=" + cityname,
			format:"jsonp",
			dataType: "jsonp",
			beforeSend: function(){	            
				$("#loader").show();
			},
			success : function(data) {
				if(data[0] == "1"){
					getFavourites();
					$("#favourites-system-message").html(data[1]);
					$("#favourites-error-message").html("");
				} else {
					$("#favourites-system-message").html("");
					$("#favourites-error-message").html(data[1]);
				}
	         },
			error : function(e) {
				$("#favourites-system-message").html("");
				$("#favourites-error-message").html("Remove Favourites Fail: " + e.responseText);
			},
			complete : function(data) {
				$("#loader").hide();
			}
		});
	} else {
		$("#favourites-system-message").html("");
		$("#favourites-error-message").html("Remove Favourites Fail: Havent Login");
	}
}


function showFavourites(cityname){
	weatherSearch("name", cityname);	
	$('#favouritesModal').removeClass("show");
	$('#favouritesModal').attr("style","display:none");
	$('.modal-backdrop').remove();
}
	

