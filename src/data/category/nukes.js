import {round} from "lodash";
import {GENERIC} from "./generics";

export class GENERIC_NUKE extends GENERIC{
    constructor(dmgCap, cooldown){
        super(dmgCap);
        this.cooldown = cooldown;
    }

    getValue(){
        //2 pts for 100k dmg/turn
        return round(2 * this.value/(this.cooldown*100000),1)
    }

    getDisplay(){
        return `Generic Nuke Template String Holder`;
    }
}

export class OUGI_ECHO extends GENERIC{
    constructor(dmgCap){
        super(dmgCap);
    }

    getValue(){
        //assume ougi every 4 turns.
        //3 points for every 400k dmg cap - higher because its free damage
        return round(3 * this.value, 1);
    }
}

export class NUKE_ROMEO extends GENERIC_NUKE{
    constructor(dmgCap, cooldown){
        super(dmgCap, cooldown)
    }

    getValue(){
        //romeo can recast, so roughly multiply by 2
        return round(4 * this.value/(this.cooldown*100000),1)
    }

    getDisplay(){
        return `Romeo Nuke Stronk`
    }
}
