var socket;
			window.onload = function() {
				
				socket = io.connect('http://localhost:3000');
				
				socket.on('message-from-others', function(message){
					var html = '<div class="message-box others-message-box">' +
								'<div class="message others-message"> ' + message + ' </div>' +
								'<div class="separator"></div>' +
							'</div>';
							
					document.getElementById("msger-chat").innerHTML += html;
				})
			}

function sendMessage() {
				var message = document.getElementById("msger-input").value;
				var html = '<div class="message-box my-message-box">' +
								'<div class="message my-message"> ' + message + ' </div>' +
								'<div class="separator"></div>' +
							'</div>';
							
				document.getElementById("msger-chat").innerHTML += html;
				document.getElementById("msger-input").value = "";
				
				socket.emit('codeboard-message', message);
			}
