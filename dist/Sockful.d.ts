export interface IEvent {
    event: string;
    data: any;
}
export declare type TCallback = (data: any) => void;
export default class Sockful {
    private socket;
    private callbacks;
    private ready;
    constructor(url: string);
    on(event: string, callback: TCallback): void;
    private dispatch;
    sendEvent(event: string, data: any): Promise<void>;
    send(data: any): Promise<void>;
}
