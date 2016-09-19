var ws;
function openSocket(){

	var socket, path;
    // path = 'wss://echo.websocket.org'; // successfully access this path.
    path = 'ws://localhost:8080/EchoChamber/echo';
    console.log( '===> Tested path :: ', path );
    try {
        ws = new WebSocket( path );
    }
    catch ( e ) {
        console.error( '===> WebSocket creation error :: ', e );
    }

	ws.onopen = function(){
		alert('open...');
		ws.send('text');
	}
	
	ws.onmessage = function(e){
		alert("receive: " + e.data);
	}
	
	ws.onclose = function(e){
		ws = undefined;
		alert('close...' + e);
	}
}

(function(){
	openSocket();
	browser.browserAction.onClicked.addListener(function(tab) {
	    if(ws === undefined){
	    	openSocket();
	    }else if(ws && ws.readyState === WebSocket.OPEN){
	    	alert('send');
	    	ws.send('text');
	    }else{
	    	alert('websocket is closed.');
	    }            
  	});
})();
