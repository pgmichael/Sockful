var OldWebSocket = WebSocket
var WebSocket = function(url){
    var socket = new OldWebSocket(url)
    this.callbacks = {}

    this.on = function(eventName, callback){
        this.callbacks[eventName] = this.callbacks[eventName] || []
        this.callbacks[eventName].push(callback)
    }

    this.dispatch = function(eventName, eventData) {
        let callbacks = this.callbacks[eventName];
        if (typeof callbacks === 'undefined') {
            return
        }
        
        for (let i = 0; i < callbacks.length; i++) {
            callbacks[i](eventData);
        }
    }

    socket.onmessage = (event) => {
        var json = JSON.parse(event.data);
        this.dispatch(json.event, json.data);
    }
}
