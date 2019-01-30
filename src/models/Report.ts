import { Message } from "./Message";

class Report{

    private _messages: Message[] = [];

    public addMessage(message: Message){
        this._messages.push(message);
    }

    public totalMessages(){
        return this._messages.length;
    }

    public get messages(){
        return this._messages
    }

}

export {Report}