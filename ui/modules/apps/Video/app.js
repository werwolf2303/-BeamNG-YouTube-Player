angular.module('beamng.apps')
	.directive('youtubePlayer', [function () {
		return {
            templateUrl: "/ui/modules/apps/Video/app.html",
			replace: true,
			restrict: 'EA',
			link: function (scope, element, attrs) {
				// --------------------------------------------------
				// Error Codes for Player:
                // 
                //  Err 01x2 = Unable to loop 
				// --------------------------------------------------
				var debug = false;
				var loop = false;
				var errloop = false;
				var triggercheck = false;
				var hideytlogo = false;
				var enablejs = false;
				var playercolor = "red";

				scope.english = function() {
					document.getElementById("video").src="/ui/modules/apps/Video/luft.html";
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
				scope.setLoop = function() {
					loop = scope.checksel;
				}
				scope.setHideYTLogo = function() {
					hideytlogo = scope.hideyt;
				}
				scope.setEnableJS = function() {
					enablejs = scope.enjs;
				}
				scope.setColor = function() {
					playercolor = scope.col;
				}
				scope.sample = function() {
					var src = document.getElementById("video").src;
					var args = "";
					if(args=="") {
						if(hideytlogo) {
							args = args + "&modestbranding=1";
						}else{
							args = args + "&modestbranding=0";
						}
						if(enablejs) {
							args = args + "&enablejsapi=1";
						}else{
							args = args + "&enablejsapi=0";
						}
						args = args + "&color=" + playercolor;
					}
					if(debug) {
					console.log(src);
					}
					document.getElementById("url").value="Raportagen - Vogelperspektive (Official Video)";
					if(loop) {
					document.getElementById("video").src="https://www.youtube-nocookie.com/embed/kBymX2pIINM?&autoplay=1&loop=1" + args;
					}else{
					//if(src=="local://local/ui/modules/apps/Video/luft.html") {
					document.getElementById("video").src="https://www.youtube-nocookie.com/embed/kBymX2pIINM?&autoplay=1" + args;
					//}
					}
				}
				scope.keyhand = function(key) {
					if(key.keyCode=="13") {
						scope.play();
						if(debug) {
							console.log("Enter");
						}
					}
				}
				scope.hello = function () {

				};
				scope.openSettings = function() {
					var settings = document.getElementById("settings");
					var content = document.getElementById("control");
					var setdebu = document.getElementById("debu");
					var ejs = document.getElementById("ejs");
					var hytl = document.getElementById("hytl");
					scope.col = playercolor;
					if(hideytlogo) {
						hytl.checked = 1;
					}else{
						hytl.checked = 0;
					}
					if(enablejs) {
						ejs.checked = 1;
					}else{
						ejs.checked = 0;
					}
					if(debug) {
						setdebu.checked = 1;
					}else{
						setdebu.checked = 0;
					}
					content.setAttribute("style", "display:none");
					settings.setAttribute("style", "");
				}
				scope.closeSettings = function() {
					var settings = document.getElementById("settings");
					var content = document.getElementById("control");
					content.setAttribute("style", "");
					settings.setAttribute("style", "display:none");
				}
				scope.setDebug = function() {
					debug = scope.deb;
				}
				scope.style0 = function() {
					document.getElementById("lang1").setAttribute("id", "lang0");
				}
				scope.clear = function() {
					document.getElementById("url").value="";
					document.getElementById("video").src="/ui/modules/apps/Video/luft.html";
					var err = document.getElementById("error");
					err.textContent="";
				}
				scope.style1 = function() {
					document.getElementById("lang1").setAttribute("id", "lang1");
				}
				scope.play = function () {
					//Here comes the code for playing the videos
                    var url = document.getElementById("url").value;
					var newurl = "";
					var video = document.getElementById("video");
                    var args = "";
                    if(args=="") {
						if(hideytlogo) {
							args = args + "&modestbranding=1";
						}else{
							args = args + "&modestbranding=0";
						}
						if(enablejs) {
							args = args + "&enablejsapi=1";
						}else{
							args = args + "&enablejsapi=0";
						}
						args = args + "&color=" + playercolor;
					}
                    if(url.includes("you")&&url.includes("https://")) {
                        if(url.includes("&")) {
                            if(debug) {
                                console.log("Detected player arguments");
                            }
                            url = url.split("&")[0];
                        }
                        if(debug) {
                        console.log("Debug is: " + debug + " | Loop is: " + loop  + " | HideYTLogo is: " + hideytlogo + " | " + "EnableJS is: " + enablejs + " | SeekBarColor is: " + playercolor);
                        console.log(url);
                        }
						if(url.includes("/playlist")) {
                            if(debug) {
                                console.log("Playlist detected");
                            }
                            newurl = url.replace("https://www.youtube.com/playlist?list=", "https://www.youtube-nocookie.com/embed/videoseries?list=");
                            video.src=newurl;
						}else{
							if(url.includes("youtu.be")) {
								if(debug) {
									console.log("Load mobile youtube video");
								}
								newurl = url.replace("https://youtu.be/", "https://www.youtube-nocookie.com/embed/")
							    video.src=newurl + "?" + args;
                            }else{
                                if(url.includes("youtube.com")) {
                                    if(debug) {
                                        console.log("Detected normal youtube link");
                                    }
                                    newurl = url.replace("https://www.youtube.com/watch?v=", "https://www.youtube-nocookie.com/embed/");
                                    video.src=newurl + "?" + args;
                                }
                            }
						}
                        if(debug) {
                        console.log(newurl);
                        }
					}else{
                        var errord = document.getElementById("error");
						document.getElementById("settingsbutton").setAttribute("style","display:none");
                        errord.textContent = "Err 02x4";
						triggercheck = true;
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
				var tick = 0;
				scope.$on('streamsUpdate', function (event, streams) {
					if(tick==20) {
						scope.TickEvent();
                        tick = 0;						
					}
					tick = tick + 1;	
				});
				var ticks = 0;
				scope.TickEvent = function() {
					if(triggercheck) {
						if(ticks==5) {
							var check = document.getElementById("loopcheck");
							var errormessages = document.getElementById("error");
							var settingsbutton = document.getElementById("settingsbutton");
							check.checked=0;
							settingsbutton.setAttribute("style", "");
							errormessages.textContent = "";
							ticks=0;
							triggercheck=false;
						}
						ticks = ticks + 1;
					}
				}
				scope.down = function() {

				}
			}
		};
	}])
