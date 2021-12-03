angular.module('beamng.apps')
	.directive('myApps', [function () {
		return {
			templateUrl: '/ui/modules/apps/Video/app.html',
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
					document.getElementById("url").value="Katyusha (Катюша) Hardbass";
					if(loop) {
					document.getElementById("video").src="https://www.youtube-nocookie.com/embed/wd_sjd6zKsQ?&autoplay=1&loop=1" + args;
					}else{
					//if(src=="local://local/ui/modules/apps/Video/luft.html") {
					document.getElementById("video").src="https://www.youtube-nocookie.com/embed/wd_sjd6zKsQ?&autoplay=1" + args;
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
					var args = "";
					var video = document.getElementById("video");
					var url1 = document.getElementById("url").value;
					var url = url1.replace("watch?v=", "embed/").replace("www.youtube.com", "www.youtube.com").replace("&ab_channel=", "?&1=").replace("&t=", "?2").replace("&?", "?");
					var viewid = url1.replace("watch?v=", "").replace("www.youtube.com", "www.youtube.com").replace("&ab_channel=", "?&1").replace("&t=", "?2").replace("&?", "?");
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
					if(!url1==""){
						if(debug) {
							console.log("Try to load video: " + url);
						}
						if(viewid.includes("?&1")) {
							if(loop) {
							if(debug) {
							console.log("[VIEWID] Apply fix");	
							}
							fin = viewid.split("?&1");
							viewid=fin[0].replace("https://www.youtube.com/", "");
							url1
							if(debug) {
							console.log("[VIEWID] Is now " + viewid);	
							}
							if(debug) {
							console.log("[VIEWID] " + viewid);	
							console.log("[VIEWID] Test: " + fin[1]);
							}
							}
						}
						if(viewid.startsWith("_")) {
						if(loop) {
						var errord = document.getElementById("error");
						document.getElementById("settingsbutton").setAttribute("style","display:none");
                        errord.textContent = "Err 01x2";
						triggercheck = true;
                        viewid = "";	
                        errloop=true;	
						}						
						}
						if(url1.includes("/playlist")) {
						if(debug) {
							console.log("Roh playlist erkannt");
                        }	
						var urlv = url1.replace("watch?v=", "embed/").replace("www.youtube.com", "www.youtube.com").replace("&ab_channel=", "&1=").replace("&t=", "?2").replace("&?", "?");
                        var toload = urlv.replace("==", "=").replace("https://www.youtube.com/playlist?", "https://www.youtube.com/embed/?listType=playlist&");
						video.src=toload;
						if(loop) {
							triggercheck = true;
							document.getElementById("settingsbutton").setAttribute("style","display:none");
							document.getElementById("error").textContent="Not Available";	
						}
                        //return;						
						}
						if(url1.includes("youtu.be")) {
							if(debug) {
								console.log("youtu.be link");
							}
							viewid = url1.replace("https://youtu.be/", "");
							url = url1.replace("https://youtu.be/", "https://www.youtube.com/embed/");
							if(debug) {
							console.log(viewid);	
							}
							if(errloop) {
							video.src=url + "?&autoplay=1" + args;
						    }else{
							if(loop) {
							video.src=url + "?&autoplay=1&loop=1&playlist=" + viewid + args;
							}else{
							video.src=url + "?&autoplay=1" + args;
							}
							}
						}
						if(url.includes("&list")) {
							if(debug) {
								console.log("Playlist erkannt");
							}
							var psplit = url.split("&list");
							var list = psplit[1];
							if(debug) {
							console.log(psplit[0]);
							}
							if(loop) {
							document.getElementById("error").textContent="Not Available";	
							}
							video.src="https://www.youtube.com/embed/?&listType=playlist&list" + psplit[1].replace("?&1", "&1") + args + "&autoplay=1";
						}else{
							if(url.includes("youtube")) {
								if(debug) {
									console.log("YouTube link");
								}
								if(url.includes("https://youtu.be/")) {
									if(debug) {
										console.log("youtu.be link");
									}
									url = url1.replace("https://youtu.be/", "https://www.youtube.com/embed/");
									viewid = viewid.replace("https://www.youtube.com/embed/", "").replace("https://www.youtube.com/", "");
									if(errloop) {
									video.src=url + "?&autoplay=1" + args;
									}else{
									if(loop) {
									video.src=url + "?&autoplay=1&loop=1&playlist=" + viewid + args;
									}else{
									video.src=url + "?&autoplay=1" + args;
									}
									}
									//return;
								}
								if(url.includes("&start=")) {
									url = url + "";
									viewid = viewid.replace("https://www.youtube.com/embed/", "");
									if(errloop) {
									video.src=url + "&autoplay=1" + args;	
									}else{
									if(loop) {
									video.src=url + "&autoplay=1&loop=1&playlist=" + viewid + args;
									}else{
									video.src=url + "&autoplay=1" + args;
									}
									}
									//return;
								}else{
									if(url.includes("&ab_channel=")) {
										viewid = viewid.replace("https://www.youtube.com/embed/", "");
										fin = viewid.split("?&1");
							            viewid=fin[0].replace("https://www.youtube.com/", "");
										if(errloop) {
										url = url + "&autoplay=1" + args;	
										}else{
										if(loop) {
										url = url + "&autoplay=1&loop=1&playlist=" + viewid + args;	
										}else{
										url = url + "&autoplay=1" + args;
										}
										}
										video.src=url;
										
										//return;
									}else{
										viewid = viewid.replace("https://www.youtube.com/embed/", "");
										if(errloop) {
										url = url + "?&autoplay=1" + args;	
										}else{
										if(loop) {
										url = url + "?&autoplay=1&loop=1&playlist=" + viewid + args;
										}else{
										url = url + "?&autoplay=1" + args;
										}
										}
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
