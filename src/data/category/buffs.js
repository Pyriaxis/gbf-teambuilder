import React from 'react';
import { round } from 'lodash';
import {GENERIC} from "./generics";
import { Row, Col } from 'antd';

/**
 * GENERICS
 *
 * Attack
 *
 *
 * Ougi
 *
 *
 */

class GENERIC_BUFF extends GENERIC{
    constructor(param){
        super(param);
    }

    getModifier(){
        return `x${1+this.getValue()}`
    }
}

class GENERIC_NORMAL_ATTACK extends GENERIC_BUFF{

}

export class SERAPH extends GENERIC_BUFF {
    constructor(){
        super(0); //0 points for most part
    }

    getDisplay(){
        return <p>20% Seraphic Bonus damage against weak element<br/>
                  Does not stack with Seraph Weapon</p>
    }
}

export class ATTACK_UP_STK_UNIQUE extends GENERIC_BUFF{
    constructor(strength){
        super(strength);
    }

    getValue(){
        //Scaled to 70% due to time taken to stack
        return round(this.value * 0.7, 2);
    }

    getDisplay(){
        return <p>Stackable Unique Attack Mod <br/>
            ({this.value * 100}% Max Strength)</p>
    }
}

export class ATTACK_UP_UNIQUE extends GENERIC_BUFF{
    constructor(strength, uptime = 1, char = undefined){
        super(strength);
        this.uptime = uptime;
        this.char = char;
    }

    getValue(){
        //100% scaling
        return round(this.value * this.uptime, 2);
    }

    getDisplay() {
        if (this.char === 'romeo') return (
            <p>Consumes 1 Stack <br/>Unique Attack Mod ({this.value * 100}% Max Strength)</p>)
        return (<p>Unique Attack Mod <br/>({this.value * 100}% Max Strength)</p>)
    }
}

export class OUGI_SPEC_UP extends GENERIC_BUFF {
    constructor(dmgUp, capUp){
        super();
        this.dmgUp = dmgUp;
        this.capUp = capUp;
    }

    getValue(){
        //33% weightage to dmgUp, 66% weightage to capUp
        return round((this.capUp * 2/3 + this.dmgUp * 1/3), 2);
    }

    getDisplay(){
        return <p>Ougi Specs Up <br/>({this.dmgUp*100}% Damage, {this.capUp*100}% Cap Up)</p>
    }
}

/**
 * TEAM BUFFS
 */

export class TEAM_CRITICAL extends GENERIC_BUFF {
    constructor(critChance, critDmg, uptime = 1){
        super();
        this.cc = critChance;
        this.cd = critDmg;
        this.uptime = uptime;
    }

    getValue(){
        //100% scaling
        return round((this.cc) * (1 + this.cd) * this.uptime, 2);
    }

    getDisplay(){
        return (<p>Team Critical Buff <br/>({this.cc*100}% CC, {this.cd*100}% CD, {this.uptime* 100}% Uptime)</p>)
    }
}

export class TEAM_MULTIATTACK extends GENERIC_BUFF {
    constructor(da, ta, uptime = 1){
        super();
        this.da = da;
        this.ta = ta;
        this.uptime = uptime;
    }

    getValue(){
        // 110% scaling - cos MA is king.
        return round((((this.ta)*2 + ((1-this.ta) * this.da)) * this.uptime) * 1.1 ,2)
    }

    getDisplay(){
        return <p>Team Multiattack Buff<br/>
            ({this.da*100}% DA, {this.ta*100}% TA, {this.uptime * 100}% Uptime)</p>
    }
}

export class TEAM_DEBUFF_SUCCESS extends GENERIC_BUFF {
    constructor(strength, uptime = 1){
        super(strength);
        this.uptime = uptime;
    }

    getValue(){
        //@todo: decide on score aftewards
        return 0;
    }

    getDisplay(){
        return <p>Team Debuff Success Buff <br/>
            ({this.value * 100}% Up, {this.uptime * 100}% Uptime)</p>
    }
}

export class TEAM_ECHO extends GENERIC_BUFF{
    constructor(strength, uptime = 1){
        super(strength);
        this.uptime = uptime;
    }

    getValue(){
        //100% scaling
        return round(this.value * this.uptime, 2)
    }

    getDisplay(){
        return <p>Team Echos Buff <br/>
            ({this.value * 100}% Strength, {this.uptime * 100}% Uptime)</p>
    }
}

export class TEAM_ELE_CUT extends GENERIC_BUFF{
    constructor(strength, cooldown = 10){
        super(strength);
        this.cooldown = cooldown;
    }

    getValue(){
        //@todo: decide on score afterwards;
        return 0;
    }

    getDisplay(){
        return <p>Team Element Cut <br/>({this.value * 100}% Strength, {this.cooldown}T Cooldown)</p>
    }
}

//***** UNIQUE CHARACTER SKILLS **********
