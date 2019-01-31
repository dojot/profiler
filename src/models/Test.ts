import { Message } from "./Message";
import * as _ from 'lodash';

class Test{

    private _messages: Message[] = [];

    public addMessage(message: Message){
        this._messages.push(message);
    }

    public get totalMessages(){
        return this._messages.length;
    }

    public get messages(){
        return this._messages
    }

    public get delayAvarage(): number{
        if(this.messages.length == 0){
            throw new TypeError('There are not messages to calculate delay avarage');
        }
        return _.round(this.messages.map(m => m.delay).reduce( (a, b) =>  a + b ) / this.totalMessages, 2);
    }

    public get standardDerivation(): number{
        let avarage = this.delayAvarage;
        let derivationSum = 0;
        this.messages.forEach( m =>{
            let distance = m.delay - avarage;
            let derivation = distance * distance;
            derivationSum += derivation;
        })
        let derivationAvarage = derivationSum / this.totalMessages;

        return _.round(Math.sqrt(derivationAvarage), 2);
    }

    get outOfOrderMessages(){
        let total = 0;
        let devicesTime = this.messages.map( m => m.deviceTimestamp );
        let devicesTimeOrdered = this.messages.map( m => m.deviceTimestamp ).sort();

        this.messages.forEach(message => {
            let deviceTimeIndex = devicesTime.indexOf(message.deviceTimestamp);
            let deviceTimeOrderedIndex = devicesTimeOrdered.indexOf(message.deviceTimestamp);

            if(deviceTimeIndex != deviceTimeOrderedIndex){
                total += 1;
            }
        });

        return total;
    }

}

export { Test }