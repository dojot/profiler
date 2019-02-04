import * as _ from 'lodash';
class ResultFile{
    private _name:string;

    public constructor(name: string){
        this._name = name;
    }

    public get name(): string{
        return this._name;
    }

    public get formattedName(): string{
        let data = this._name.split('.')[0].split('_').map(n => this.formatNumber(_.toInteger(n)));
        return `${data[0]}/${data[1]}/${data[2]} ${data[3]}:${data[4]}:${data[5]}`;
    }

    private formatNumber(number: number): string{
        if(number < 10){
            return `0${number}`;
        }else{
            return `${number}`;
        }
    }
    
}

export { ResultFile }