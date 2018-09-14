import {round} from "lodash";

export class GENERIC{
    constructor(value = undefined) {
        this.value = value;
    }

    getValue(){
        return round(this.value, 2);
    }

    getTeamDisplay(){
        return `Generic Team template String`;
    }

    getModifier(){
        return this.getValue();
    }

    getDisplay(){
        return `Generic template String`;
    }
};

export class CUSTOM_STRING extends GENERIC{

    constructor(string, value){
        super();
        this.value = value;
        this.string = string;
    }

    getDisplay(){
        return this.string + ` ${this.getValue()} pts`;
    }
}