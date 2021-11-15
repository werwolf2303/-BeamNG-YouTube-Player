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
				var debug = true;
				var loop = false;
				var errloop = false;
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
				scope.setLoop = function() {
					loop = scope.checksel;
				}
				scope.sample = function() {
					var src = document.getElementById("video").src;
					if(debug) {
					console.log(src);
					}
					if(loop) {
					document.getElementById("video").src="https://www.youtube.com/embed/mR8FsJi-8cs?&autoplay=1&loop=1";
					}else{
					//if(src=="local://local/ui/modules/apps/Video/luft.html") {
					document.getElementById("video").src="https://www.youtube.com/embed/mR8FsJi-8cs?&autoplay=1";
					//}
					}
				}
				scope.keyhand = function(key) {
					console.log(key.keyCode);
					if(key.keyCode=="13") {
						scope.play();
						if(debug) {
							console.log("Enter");
						}
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
					var err = document.getElementById("error");
					err.textContent="";
				}
				scope.style1 = function() {
					document.getElementById("lang1").setAttribute("id", "lang1");
				}
				scope.play = function () {
					var video = document.getElementById("video");
					var url1 = document.getElementById("url").value;
					var url = url1.replace("watch?v=", "embed/").replace("www.youtube.com", "www.youtube.com").replace("&ab_channel=", "?&1").replace("&t=", "?2").replace("&?", "?");
					var viewid = url1.replace("watch?v=", "").replace("www.youtube.com", "www.youtube.com").replace("&ab_channel=", "?&1").replace("&t=", "?2").replace("&?", "?");
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
                        errord.textContent = "Err 01x2";
                        viewid = "";	
                        errloop=true;	
						}						
						}
						if(url1.includes("/playlist")) {
						if(debug) {
							console.log("Roh playlist erkannt");
                        }	
                        var toload = url.replace("==", "=").replace("https://www.youtube.com/playlist?", "https://www.youtube.com/embed/?listType=playlist&");
						video.src=toload;
						if(loop) {
							document.getElementById("error").textContent="Not Available";	
						}
                        return;						
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
							video.src=url + "?&autoplay=1";
						    }else{
							if(loop) {
							video.src=url + "?&autoplay=1&loop=1&playlist=" + viewid;
							}else{
							video.src=url + "?&autoplay=1";
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
							video.src="https://www.youtube.com/embed/?&listType=playlist&list" + psplit[1];
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
									video.src=url + "?&autoplay=1";
									}else{
									if(loop) {
									video.src=url + "?&autoplay=1&loop=1&playlist=" + viewid;
									}else{
									video.src=url + "?&autoplay=1";
									}
									}
									//return;
								}
								if(url.includes("&start=")) {
									url = url + "";
									viewid = viewid.replace("https://www.youtube.com/embed/", "");
									if(errloop) {
									video.src=url + "&autoplay=1";	
									}else{
									if(loop) {
									video.src=url + "&autoplay=1&loop=1&playlist=" + viewid;
									}else{
									video.src=url + "&autoplay=1";
									}
									}
									//return;
								}else{
									if(url.includes("&ab_channel=")) {
										viewid = viewid.replace("https://www.youtube.com/embed/", "");
										fin = viewid.split("?&1");
							            viewid=fin[0].replace("https://www.youtube.com/", "");
										if(errloop) {
										url = url + "&autoplay=1";	
										}else{
										if(loop) {
										url = url + "&autoplay=1&loop=1&playlist=" + viewid;	
										}else{
										url = url + "&autoplay=1";
										}
										}
										video.src=url;
										
										//return;
									}else{
										viewid = viewid.replace("https://www.youtube.com/embed/", "");
										if(errloop) {
										url = url + "?&autoplay=1";	
										}else{
										if(loop) {
										url = url + "?&autoplay=1&loop=1&playlist=" + viewid;
										}else{
										url = url + "?&autoplay=1";
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
				scope.TickEvent = function() {
					
				}
				scope.down = function() {

				}
			}
		};
	}])
