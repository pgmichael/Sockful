# pgmichael/WebSocket
A thin abstraction layer build on top of the native WebSocket interface purposed for better event handling.

## How to use
Simply serve the `WebSocket.js` file found in the root directory of this project.
```html
<script src="/scripts/WebSocket.js"></script>
<script>
    var socket = new WebSocket("ws://live.localhost:8080")

    socket.on("something", function(data){
        console.log(data)
    })
</script>
```
Server response must be in JSON and must have this format:

```js
{ "event": "eventName", "data": "eventData" }
```

## Why?
Event handling using the native WebSocket interface becomes unelegant as there are more events to handle. For instance,

```js
var socket = new WebSocket("ws://live.localhost:8080")

function.onmessage = function(event){
    response = JSON.parse(event.data)
    switch (response.event) {
        case "something":
            doSomething(data)
            break;
        case "somethingElse":
            doSomethingElse(data)
            break;
    }
}

function doSometing(data){
    // Do something
}

function doSomethingElse(data){
    // Do something
}
```

can be translated to this:

```js
var socket = new WebSocket("ws://live.localhost:8080")

socket.on("something", function(data){
    console.log(data)
})

socket.on("somethingElse", function(data){
    console.log(data)
})
```

## License

[MIT](/LICENSE)
