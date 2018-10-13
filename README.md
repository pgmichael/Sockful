# Sockful
A thin client-side abstraction layer build on top of the native WebSocket interface purposed for better event handling.

## How to use
Simply install, import and use!
```bash
npm install sockful
```

```javascript
import Sockful from "sockful"
const socket = new Sockful("ws://socket.localhost:8080/")
socket.on("event", () => console.log(data))
```
Keep in mind the server responses must be in JSON and must have the following format:

```js
{ "event": "eventName", "data": "eventData" }
```

## Why?
Event handling using the native WebSocket interface becomes unelegant as there are more events to handle. For instance,

```js
const socket = new WebSocket("ws://live.localhost:8080")

function.onmessage = (event) => {
    const response = JSON.parse(event.data)
    switch (response.event) {
        case "something":
            doSomething(response.data)
            break;
        case "somethingElse":
            doSomethingElse(response.data)
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
const socket = new Sockful("ws://live.localhost:8080")

socket.on("something", (data) => {
    // Do something
})

socket.on("somethingElse", (data) => {
    // Do something
})
```

## License

[MIT](/LICENSE)
