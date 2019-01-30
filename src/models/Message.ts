class Message{

    private _deviceTime: Date;
    private _moscaTime: Date;
    private _socketTime: Date;
    private _order: Number;

    constructor(data: string){
        var row = data.split(';');
        this._deviceTime = new Date(Number(row[0]));
        this._moscaTime = new Date(Number(row[1]));
        this._socketTime = new Date(Number(row[2]));
        this._order = Number(row[3]);
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

}

export {Message}