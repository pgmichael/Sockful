"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
class Sockful {
    constructor(url) {
        this.socket = new WebSocket(url);
        this.callbacks = {};
        this.ready = new Promise(resolve => this.socket.onopen = () => resolve());
        this.socket.onmessage = (event) => {
            const json = JSON.parse(event.data);
            this.dispatch(json.event, json.data);
        };
    }
    on(event, callback) {
        this.callbacks[event] = this.callbacks[event] || [];
        this.callbacks[event].push(callback);
    }
    dispatch(event, data) {
        if (typeof this.callbacks[event] === 'undefined') {
            return;
        }
        for (const callback of this.callbacks[event]) {
            callback(data);
        }
    }
    sendEvent(event, data) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.ready;
            this.socket.send(JSON.stringify({ event, data }));
        });
    }
    send(data) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.ready;
            this.socket.send(JSON.stringify(data));
        });
    }
}
exports.default = Sockful;
