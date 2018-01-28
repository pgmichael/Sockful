var Sockful = function(url){
    var socket = new WebSocket(url)
    this.callbacks = {}

    this.send = function(data){
        socket.send(data)
    }

    this.sendEvent = function(eventName, eventData){
        json = {
            event: eventName,
            data: eventData
        }
        socket.send(JSON.stringify(json))
    }

    this.on = function(eventName, callback){
        this.callbacks[eventName] = this.callbacks[eventName] || []
        this.callbacks[eventName].push(callback)
    }

    this.dispatch = function(eventName, eventData) {
        let callbacks = this.callbacks[eventName]
        if (typeof callbacks === 'undefined') {
            return
        }
        
        for (let i = 0; i < callbacks.length; i++) {
            callbacks[i](eventData)
        }
    }

    socket.onmessage = (event) => {
        var json = JSON.parse(event.data)
        this.dispatch(json.event, json.data)
    }
}