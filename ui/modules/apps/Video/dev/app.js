console.log("INFO \n\nThis is only for debugging");
console.log("Init success : Loaded app.js")
// --------------------------------------------------
				// Error Codes for Player:
                // 
                //  Err 01x2 = Unable to loop 
                //  Err 02x4 = Invalid URL
				// --------------------------------------------------
				
                var debug = false; //Is debug enabled
				var loop = false; //Is looping enabled
				var errloop = false; //Has looping failed
				var triggercheck = false; //Its true when errloop is true
				var hideytlogo = false; //Is youtube logo hiddeb
				var enablejs = false; //Is javascript enabled
				var playercolor = "red"; //Which color is the seekbar

                //Sets the values that the player selected
                function setLoop(value) {
					loop = value.checked;
				}
				function setHideYTLogo(value) {
					hideytlogo = value.checked;
				}
				function setEnableJS(value) {
					enablejs = value.checked;
				}
				function setColor(value) {
					playercolor = value.value;
				}
                function setDebug(value) {
					debug = value.checked;
				}
                // --------------END---------------------
                
                //For example video
				function sample() {
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
				function keyhand(key) {
					if(key.keyCode=="13") {
						play();
						if(debug) {
							console.log("Enter");
						}
					}
				}
                // --------------END---------------------

                //For open the settings
				function openSettings() {
					var settings = document.getElementById("settings");
					var content = document.getElementById("control");
					var setdebu = document.getElementById("debu");
					var ejs = document.getElementById("ejs");
					var hytl = document.getElementById("hytl");
					col = playercolor;
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
				function closeSettings() {
					var settings = document.getElementById("settings");
					var content = document.getElementById("control");
					content.setAttribute("style", "");
					settings.setAttribute("style", "display:none");
				}
                // --------------END---------------------

                //For clearing the url input field
				function clear() {
					document.getElementById("url").value="";
					document.getElementById("video").src="../luft.html";
					var err = document.getElementById("error");
					err.textContent="";
				}
                // --------------END---------------------

                //For playing the videos
				function play() {
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
                            newurl = url.replace("https://www.youtube.com/playlist?list=", "https://www.youtube.com/embed/videoseries?list=");
                            video.src=newurl;
						}else{
							if(url.includes("youtu.be")) {
								if(debug) {
									console.log("Load mobile youtube video");
								}
								newurl = url.replace("https://youtu.be/", "https://youtube.com/embed/")
							    video.src=newurl + "?" + args;
                            }else{
                                if(url.includes("youtube.com")) {
                                    if(debug) {
                                        console.log("Detected normal youtube link");
                                    }
                                    newurl = url.replace("https://www.youtube.com/watch?v=", "https://youtube.com/embed/");
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
                // --------------END---------------------

                //For hiding the ui
                function hides() {
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
				function urlshow() {
					var url = document.getElementById("url");
					url.setAttribute("placeholder", "");
				}
                // --------------END---------------------

                //For checking errors
				var ticks = 0;
                function everySecond() {
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
                setInterval(everySecond, 1000);
                // --------------END---------------------