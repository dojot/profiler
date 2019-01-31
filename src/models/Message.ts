import { throws } from "assert";

class Message{

    private _deviceTime: Date;
    private _moscaTime: Date;
    private _socketTime: Date;
    private _order: Number;

    constructor(deviceTime: Date, moscaTime: Date, socketTime: Date, order: Number){
        this._deviceTime = deviceTime;
        this._moscaTime = moscaTime;
        this._socketTime = socketTime;
        this._order = order;
    }

    public deviceTime(): Date{
        return this._deviceTime;
    }

    public moscaTime(): Date{
        return this._moscaTime;
    }

    public socketTime(): Date{
        return this._socketTime;
    }

    public get order(): Number{
        return this._order;
    }

    public get delay(){
        return this.socketTime().getTime() - this.deviceTime().getTime(); 
    }

    public static instance(data: String): Message{
        if(data == null || data.length == 0){
            throw new TypeError("Data can't be empty");
        }
        var row = data.split(';');
        if(row.length < 3){
            throw new TypeError("Message doens't have enough data");
        }

        let deviceTime = new Date(Number(row[0]));
        let moscaTime = new Date(Number(row[1]));
        let socketTime = new Date(Number(row[2]));
        let order = Number(row[3]);
        return new Message(deviceTime, moscaTime, socketTime, order);
    }

}

export {Message}