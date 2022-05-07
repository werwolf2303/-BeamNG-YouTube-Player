angular.module('beamng.apps')
.directive('youtubePlayer', [function () {
    return {
        //Here is templateurl but only template works for some reason
        replace: true, //Not sure 
        restrict: 'EA', //Not sure
        link: function (scope, element, attrs) {
                
                // --------------------------------------------------
				// Error Codes for Player:
                // 
                //  Err 01x2 = Unable to loop 
				// --------------------------------------------------
				
                var debug = false; //Is debug enabled
				var loop = false; //Is looping enabled
				var errloop = false; //Has looping failed
				var triggercheck = false; //Its true when errloop is true
				var hideytlogo = false; //Is youtube logo hiddeb
				var enablejs = false; //Is javascript enabled
				var playercolor = "red"; //Which color is the seekbar

				//Sets the values that the player selected
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
                scope.setDebug = function() {
					debug = scope.deb;
				}
                // --------------END---------------------
                
                //For example video
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
					document.getElementById("video").src="https://www.youtube-nocookie.com/embed/kBymX2pIINM?&autoplay=1" + args;
					}
				}
                // --------------END---------------------

                //For key presses -- DEPRECEATED --
				scope.keyhand = function(key) {
					if(key.keyCode=="13") {
						scope.play();
						if(debug) {
							console.log("Enter");
						}
					}
				}
                // --------------END---------------------

                //For open the settings
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
                // --------------END---------------------

                // For closing the settings
				scope.closeSettings = function() {
					var settings = document.getElementById("settings");
					var content = document.getElementById("control");
					content.setAttribute("style", "");
					settings.setAttribute("style", "display:none");
				}
                // --------------END---------------------

                //For clearing the url input field
				scope.clear = function() {
					document.getElementById("url").value="";
					document.getElementById("video").src="/ui/modules/apps/Video/luft.html";
					var err = document.getElementById("error");
					err.textContent="";
				}
                // --------------END---------------------

                //For playing the videos
				scope.play = function () {
                    //Here comes to code for playing the videos
                }
                // --------------END---------------------

                //For hiding the ui
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
                // --------------END---------------------

                //Not sure if used or not
				scope.urlshow = function() {
					var url = document.getElementById("url");
					url.setAttribute("placeholder", "");
				}
                // --------------END---------------------

                //For checking errors
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
                // --------------END---------------------
			}
		};
	}])