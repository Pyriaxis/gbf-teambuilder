import React from 'react';
import { round } from 'lodash';
import {GENERIC} from "./generics";
import { Row, Col } from 'antd';

export class SERAPH extends GENERIC {
    constructor(){
        super(2); //2 points for rather useless buff
    }

    getDisplay(){
        return <p>20% Seraphic Bonus damage against weak element<br/>
                  Does not stack with Seraph Weapon</p>
    }
}

export class ATTACK_UP_STK extends GENERIC{
    constructor(strength){
        super(strength);
    }

    getValue(){
        //100% unique stacking up is 15 points
        return round(15 * this.value, 1);
    }

    getDisplay(){
        return <p>Stackable Unique Attack Mod <br/>
            ({this.value * 100}% Max Strength)</p>
    }
}

export class ATTACK_UP_UNIQUE extends GENERIC{
    constructor(strength, uptime = 1, char = undefined){
        super(strength);
        this.uptime = uptime;
        this.char = char;
    }

    getValue(){
        //100% unique up is 22 points
        return round(22 * this.value, 1);
    }

    getDisplay() {
        if (this.char === 'romeo') return (
            <p>Consumes 1 Stack <br/>Unique Attack Mod ({this.value * 100}% Max Strength)</p>)
        return (<p>Unique Attack Mod <br/>({this.value * 100}% Max Strength)</p>)
    }
}

export class OUGI_SPEC_UP extends GENERIC {
    constructor(dmgUp, capUp){
        super();
        this.dmgUp = dmgUp;
        this.capUp = capUp;
    }

    getValue(){
        return round(Math.floor(this.capUp * 5),1);
        //100% CAP up is 10 points
    }

    getDisplay(){
        return <p>Ougi Specs Up <br/>({this.dmgUp*100}% Damage, {this.capUp*100}% Cap Up)</p>
    }
}

export class TEAM_CRITICAL extends GENERIC {
    constructor(critChance, critDmg, uptime = 1){
        super();
        this.cc = critChance;
        this.cd = critDmg;
        this.uptime = uptime;
    }

    getValue(){
        //100% dmg up is 25 points * uptime
        return round(25 * (this.cc) * (1 + this.cd) * this.uptime, 1);
    }

    getDisplay(){
        return (<p>Team Critical Buff <br/>({this.cc*100}% CC, {this.cd*100}% CD, {this.uptime* 100}% Uptime)</p>)
    }
}

export class TEAM_MULTIATTACK extends GENERIC {
    constructor(da, ta, uptime = 1){
        super();
        this.da = da;
        this.ta = ta;
        this.uptime = uptime;
    }

    getValue(){
        //100% TA is 35 points * uptime
        return round( (35 * (this.ta) + 15 * ((1-this.ta) * this.da)) * this.uptime,1)
    }

    getDisplay(){
        return <p>Team Multiattack Buff<br/>
            ({this.da*100}% DA, {this.ta*100}% TA, {this.uptime * 100}% Uptime)</p>
    }
}

export class TEAM_DEBUFF_SUCCESS extends GENERIC {
    constructor(strength, uptime = 1){
        super(strength);
        this.uptime = uptime;
    }

    getValue(){
        //100% debuff success up is 10 points * uptime
        return round(this.value * 10 * this.uptime, 1)
    }

    getDisplay(){
        return <p>Team Debuff Success Buff <br/>
            ({this.value * 100}% Up, {this.uptime * 100}% Uptime)</p>
    }
}

export class TEAM_ECHO extends GENERIC{
    constructor(strength, uptime = 1){
        super(strength);
        this.uptime = uptime;
    }

    getValue(){
        //100% echoes is 25 points * uptime
        return round(this.value * 25 * this.uptime, 1)
    }

    getDisplay(){
        return <p>Team Echos Buff <br/>
            ({this.value * 100}% Strength, {this.uptime * 100}% Uptime)</p>
    }
}

export class TEAM_ELE_CUT extends GENERIC{
    constructor(strength, cooldown = 10){
        super(strength);
        this.cooldown = cooldown;
    }

    getValue(){
        //5 points for 100% cut on 6 turn cd
        return round(this.value * 5 / this.cooldown * 6, 1);
    }

    getDisplay(){
        return <p>Team Element Cut <br/>({this.value * 100}% Strength, {this.cooldown}T Cooldown)</p>
    }
}

//***** UNIQUE CHARACTER SKILLS **********
