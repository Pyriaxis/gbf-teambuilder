import React from 'react';
import { round } from "lodash";
import { GENERIC } from "./generics";

export class GENERIC_NUKE extends GENERIC{
    constructor(dmgCap, cooldown, desc='Generic Nuke'){
        super(dmgCap);
        this.cooldown = cooldown;
        this.desc = desc
    }

    getValue(){
        //10k dmg is one point.
        return round(this.value/(this.cooldown*10000),1)
    }

    getModifier(){
        return <p className={'nuke'}>+{this.getValue()}</p>
    }

    getDisplay(){
        return <p>{this.desc}</p>;
    }
}

export class OUGI_ECHO extends GENERIC{
    constructor(dmgCap, desc='Ougi Echo'){
        super(dmgCap);
        this.desc = desc
    }

    getValue(){
        return round(this.value/(10000),1)
    }

    getModifier(){
        return <p className={'ougi'}>+{this.getValue()}</p>
    }

    getDisplay(){
        return <p>{this.desc}</p>;
    }
}