angular.module('beamng.apps')
	.directive('youtubePlayer', [function () {
		return {
			template: '<div ng-click="urlshow()"> <div id="todisplay"> <div id="control"> <button id="hideshow" ng-click="hides()">Hide</button> <a id="cval" style="display:none">false</a> <div id="controls" style="display:inline"> <input ng-keypress="keyhand($event)" ng-mousedown="pastec()" class="form-control form-control-sm" onclick="document.getElementById(' + "down" + ').click()" id="url" type="text" style="width:73%" class="form-control" placeholder="Youtube URL" aria-label="Username" aria-describedby="basic-addon1"> <button ng-click="down" style="display:none" id="down">Down</button> <button ng-click="clear()" style="left:1px;color:red">x</button> <button id="lang1" style="display:inline;left:3" ng-click="play()">Play</button> <button ng-click="sample()">Play example</button> <button id="settingsbutton" ng-click="openSettings()">Settings</button> <input type="checkbox" id="loopcheck" ng-model="checksel" ng-change="setLoop()"><a style="color:white">Loop Video</a></input> <a style="color:red" id="error"></a> <div class="video-container"> <iframe sandbox="allow-scripts allow-same-origin" oncontextmenu="console.log(' + "Try to open url" + ')" onload="console.log(this.src)" ng-click="error()" id="video" style="height:100%" frameBorder="0" width="95%" height="100%" src="/ui/modules/apps/Video/luft.html" allow="fullscreen"></iframe> </div> </div> </div> <div id="settings" style="display:none"> <a style="display:inline">Debug </a><input style="display:inline" id="debu" ng-model="deb" ng-change="setDebug()" type="checkbox"> <br> <label>Seekbar Color </label> <md-select ng-model="col" ng-change="setColor()" placeholder="Select color"> <md-option value="red">Red</md-option> <md-option value="white">White</md-option> </md-select> <br> <a>Enable JavaScript </a><input style="display:inline" id="ejs" ng-model="enjs" ng-change="setEnableJS()" type="checkbox"> <br> <a>Hide YouTube Logo </a><input style="display:inline" id="hytl" ng-model="hideyt" ng-change="setHideYTLogo()" type="checkbox"> <br> <a style="color:red">!!Press play to apply settings!!</a> <br> <button ng-click="closeSettings()">Close</button> </div> <style> .hideshow { position: relative; padding-bottom: 56.25%; /* 16:9 */ height: 0; } .video-container { position: relative; padding-bottom: 56.25%; /* 16:9 */ height: 0; } .video-container iframe { position: absolute; top: 1; left: 0; width: 100%; height: 100%; } #url { } #lang1 { background-color:white; } #lang0 { } #settings { overflow:scroll; } </style> </div> </div>',
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
						if(debug) {
							console.log("toload is: " + toload);
						}
						if(toload.includes("https://www.youtube.com/playlist?list")) {
							if(debug) {
								console.log("Bug detection triggered: Fix playlist url");
							}
							var fix = toload.replace("https://www.youtube.com/playlist?list=", "https://www.youtube.com/embed/?listType=playlist&list=");
							video.src=fix;
							return;
						}else{
						video.src=toload;
						}
						if(loop) {
							triggercheck = true;
							document.getElementById("settingsbutton").setAttribute("style","display:none");
							document.getElementById("error").textContent="Not Available";	
						}					
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
