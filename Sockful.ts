export interface IEvent {
  event: string
  data: any
}

export type TCallback = (data: any) => void

export default class Sockful {
  private socket: WebSocket
  private callbacks: { [key: string]: TCallback[] }
  private ready: Promise<void>

  constructor(url: string) {
    this.socket = new WebSocket(url)
    this.callbacks = {}
    this.ready = new Promise(resolve => this.socket.onopen = () => resolve())

    this.socket.onmessage = (event: MessageEvent) => {
      const json: IEvent = JSON.parse(event.data)
      this.dispatch(json.event, json.data)
    }
  }

  public on(event: string, callback: TCallback) {
    this.callbacks[event] = this.callbacks[event] || []
    this.callbacks[event].push(callback)
  }

  private dispatch(event: string, data: any) {
    if (typeof this.callbacks[event] === 'undefined') {
      return
    }

    for (const callback of this.callbacks[event]) {
      callback(data)
    }
  }

  public async sendEvent(event: string, data: any) {
    await this.ready
    this.socket.send(JSON.stringify({ event, data }))
  }

  public async send(data: any) {
    await this.ready
    this.socket.send(JSON.stringify(data))
  }
}