import {round} from "lodash";
import {GENERIC} from "./generics";

export class ATK_DOWN_ELE extends GENERIC{
    constructor(strength, uptime = 1){
        super(strength);
        this.uptime = uptime;
    }

    getValue(){
        //20% ele atk down is 10 pts;
        return round(this.value/0.2 * 10 * this.uptime, 1)
    }

    getDisplay(){
        return `ATK_(${this.value * 100}% Strength, ${this.uptime * 100}% Uptime +${this.getValue()} pts`
    }
}

export class DEF_DOWN_ELE extends GENERIC{
    constructor(strength, uptime = 1){
        super(strength);
    }

    getValue(){

    }

    getDisplay(){

    }
}

export class BLIND extends GENERIC{
    constructor(strength, uptime = 1){
        super(strength);
        this.uptime = uptime;
    }

    getValue(){

    }

    getDisplay(){
        return `Blind (${this.value}% Strength, ${this.uptime}% Uptime)`
    }
}