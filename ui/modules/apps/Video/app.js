angular.module('beamng.apps')
.directive('myApps', [function () {
  return {
	templateUrl: '/ui/modules/apps/Video/app.html',
    replace: true,
    restrict: 'EA',
    link: function (scope, element, attrs) {
      scope.english = function() {
		  document.getElementById("video").src="/ui/modules/apps/Video/404e.html";
		  document.getElementById("lang1").textContent="Play";
		  document.getElementById("auswahl").setAttribute("style", "display:none");
		  document.getElementById("todisplay").setAttribute("style", "");
      }
      scope.deutsch = function() {
		  document.getElementById("language").textContent="de";
		  document.getElementById("auswahl").setAttribute("style", "display:none");
		  document.getElementById("todisplay").setAttribute("style", "");
      }	  
	  scope.pastec = function() {
		  
	  }
	  scope.sample = function() {
		var src = document.getElementById("video").src;
		console.log(src);
		//if(src=="local://local/ui/modules/apps/Video/luft.html") {
		document.getElementById("video").src="https://www.youtube.com/embed/eAxXx80zITM?autoplay=1"; 
        //}		
	  }
	  scope.keyhand = function(key) {
	  console.log(key.keyCode);
		  if(key.keyCode=="13") {
			scope.play();
			console.log("Enter");
		  }
	  }
	  scope.hello = function () {
		  
	  };
	  scope.style0 = function() {
		  document.getElementById("lang1").setAttribute("id", "lang0");
	  }
	  scope.clear = function() {
		document.getElementById("url").value="";  
		document.getElementById("video").src="/ui/modules/apps/Video/luft.html";
	  }
	  scope.style1 = function() {
          document.getElementById("lang1").setAttribute("id", "lang1");
	  }
	  scope.play = function () {
		  var video = document.getElementById("video");
		  var url1 = document.getElementById("url").value;
		  var url = url1.replace("watch?v=", "embed/").replace("www.youtube.com", "www.youtube-nocookie.com").replace("&ab_channel=", "?&1").replace("&t=", "?2").replace("&?", "?");
		  if(!url1==""){
			  console.log("Try to load video: " + url);
			  if(url1.includes("youtu.be")) {
				console.log("youtu.be link");
				url = url1.replace("https://youtu.be/", "https://www.youtube-nocookie.com/embed/");
				video.src=url + "?autoplay=1";			  
			  }
			  if(url.includes("&list")) {
				console.log("Playlist erkannt");
				var psplit = url.split("&list");
				console.log(psplit[0]);
				video.src=psplit[0] + "?autoplay=1";  
			  }else{
			  if(url.includes("youtube")) {
				  console.log("YouTube link");
			  if(url.includes("https://youtu.be/")) {
				  console.log("youtu.be link");
				url = url1.replace("https://youtu.be/", "https://www.youtube-nocookie.com/embed/");
				video.src=url + "?autoplay=1";
				//return;
			  }
			  if(url.includes("&start=")) {
				  url = url + "";
		          video.src=url+"&autoplay=1";
				  //return;
			  }else{
			  if(url.includes("&ab_channel=")) {
	      url = url + "&autoplay=1";
		  video.src=url;
		  //return;
			  }else{
				  url = url + "?autoplay=1";
		  video.src=url;
		  //return;
			  }
			  }
			  }
		    }
		  }			
		  }
	  scope.hides = function() {
		  var cval = document.getElementById("cval").textContent;
		  //Visible
		  if(cval=="false") {
			document.getElementById("cval").textContent = "true";
			document.getElementById("hideshow").innerHTML = "Show";
            document.getElementById("controls").setAttribute("style", "display:none");	
		  }
		  //Hidden
		  if(cval=="true") {
			document.getElementById("cval").textContent = "false";
			document.getElementById("hideshow").innerHTML = "Hide";
			document.getElementById("controls").setAttribute("style", "display:inline");
		  }
	  }
	  scope.urlshow = function() {
		var url = document.getElementById("url");  
		url.setAttribute("placeholder", "");
	  }
	  scope.$on('streamsUpdate', function (event, streams) {
		  
      });
	  scope.down = function() {
		
	  }
    }
  };
}])
