import React from 'react';
import { round } from 'lodash';
import {GENERIC} from "./generics";

/**
 * GENERICS
 *
 * Normal Attack
 * Unique Attack
 * Critical
 * Multiattack
 * Echoes
 *
 */

class GENERIC_BUFF extends GENERIC{
    constructor(param, uptime = 1){
        super(param);
        this.uptime = uptime;
    }

    getModifier(){
        return (<p className="generic">x{(1+this.getValue()).toFixed(2)}</p>);
    }

    getTeamDisplay(){
        return (<div>
                <span>Team</span>{this.getDisplay()}
            </div>)
    }
}

export class SERAPH extends GENERIC{
    constructor(){
        super(0); //0 points for most part
    }

    getDisplay(){
        return <p>20% Seraphic Bonus damage against weak element<br/>
                  Does not stack with Seraph Weapon</p>
    }

    getModifier(){
        return <p>-</p>
    }
}

/**
 * Attack Up Section
 */

export class ATK_UP_SINGLE extends GENERIC_BUFF{
    getValue(){
        //70% weightage due to normal overload
        return round(this.value * this.uptime * 0.7, 2);
    }

    getDisplay(){
        return <p>Normal Attack Mod (A) <br/>(+{this.value * 100}%, {Math.round(this.uptime * 100)}% Uptime) </p>
    }
}

export class ATK_UP_DUAL extends GENERIC_BUFF{
    getValue(){
        //70% weightage due to normal overload
        return round(this.value * this.uptime * 0.7, 2);
    }

    getDisplay(){
        return <p>Normal Attack Mod (B) <br/>(+{this.value * 100}%, {Math.round(this.uptime * 100)}% Uptime) </p>
    }
}

export class ATK_UP_OUGI extends GENERIC_BUFF{
    getValue(){
        //70% weightage due to normal overload
        return round(this.value * this.uptime * 0.7, 2);
    }

    getDisplay(){
        return <p>Normal Attack Mod (C) <br/>(+{this.value * 100}%, {Math.round(this.uptime * 100)}% Uptime) </p>
    }
}

export class ATK_UP_STK_UNIQUE extends GENERIC_BUFF{
    getValue(){
        //Scaled to 70% due to time taken to stack
        return round(this.value * 0.7, 2);
    }

    getDisplay(){
        return <p>Stackable Unique Attack Mod <br/>
            (+{this.value * 100}% Max)</p>
    }

}

export class ATK_UP_UNIQUE extends GENERIC_BUFF{
    constructor(strength, uptime = 1, char = undefined){
        super(strength, uptime);
        this.char = char;
    }

    getValue(){
        //100% scaling
        return round(this.value * this.uptime, 2);
    }

    getDisplay() {
        if (this.char === 'romeo') return (
            <p>Consumes 1 Stack <br/>Unique Attack Mod (+{this.value * 100}%)</p>)
        return (<p>Unique Attack Mod <br/>(+{this.value * 100}%)</p>)
    }
}

export class ATK_UP_ELEMENT extends GENERIC_BUFF{
    getValue(){
        //on element, 66% scaling
        return round(this.value * 2/3, 2)
    }

    getDisplay(){
        return <p>Elemental Attack Up <br/>(+{this.value * 100}%, {Math.round(this.uptime * 100)}% Uptime)</p>
    }
}

/**
 * DEF UP Section
 */

export class DEF_UP_SINGLE extends GENERIC_BUFF{
    getValue(){
        return round(this.value * this.uptime, 2);
    }

    getDisplay(){
        return <p>Defense Up (A) <br/>(+{this.value * 100}%, {Math.round(this.uptime * 100)}% Uptime) </p>
    }

    getModifier(){
        return '+Srv'
    }
}

export class DEF_UP_SPECIAL extends GENERIC_BUFF{
    getValue(){
        return round(this.value * this.uptime, 2);
    }

    getDisplay(){
        return <p>Defense Up (C) <br/>(+{this.value * 100}%, {Math.round(this.uptime * 100)}% Uptime) </p>
    }

    getModifier(){
        return '+Srv'
    }
}

export class OUGI_SPEC_UP extends GENERIC_BUFF {
    constructor(dmgUp, capUp){
        super();
        this.dmgUp = dmgUp;
        this.capUp = capUp;
    }

    getValue(){
        //66% weightage to dmgUp, 33% weightage to capUp
        return round((this.capUp * 1/3 + this.dmgUp * 2/3), 2);
    }

    getDisplay(){
        return <p>Ougi Specs Up <br/>({this.dmgUp*100}% Damage, {this.capUp*100}% Cap Up)</p>
    }
}

export class CRITICAL extends GENERIC_BUFF {
    constructor(critChance, critDmg, uptime = 1){
        super();
        this.cc = critChance;
        this.cd = critDmg;
        this.uptime = uptime;
    }

    getValue(){
        //100% scaling
        return round((this.cc) * (this.cd) * this.uptime, 2);
    }

    getDisplay(){
        return (<p>Critical Buff <br/>({this.cc*100}% CC, {this.cd*100}% CD, {this.uptime* 100}% Uptime)</p>)
    }

    getTeamDisplay(){
        return (<p>Team Critical Buff <br/>({this.cc*100}% CC, {this.cd*100}% CD, {this.uptime* 100}% Uptime)</p>)
    }
}

export class MULTIATTACK extends GENERIC_BUFF {
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
        return <p>Multiattack Buff<br/>
            ({this.da*100}% DA, {this.ta*100}% TA, {this.uptime * 100}% Uptime)</p>
    }

    getTeamDisplay(){
        return <p>Team Multiattack Buff<br/>
            ({this.da*100}% DA, {this.ta*100}% TA, {this.uptime * 100}% Uptime)</p>
    }
}

export class DEBUFF_SUCCESS extends GENERIC_BUFF {
    getValue(){
        //@todo: decide on score aftewards
        return 0;
    }

    getDisplay(){
        return <p>Debuff Success Buff <br/>
            ({this.value * 100}% Up, {this.uptime * 100}% Uptime)</p>
    }

    getTeamDisplay(){
        return <p>Team Debuff Success Buff <br/>
            ({this.value * 100}% Up, {this.uptime * 100}% Uptime)</p>
    }
}

export class ECHO extends GENERIC_BUFF{
    getValue(){
        //100% scaling
        return round(this.value * this.uptime, 2)
    }

    getDisplay(){
        return <p>Echos Buff <br/>
            ({this.value * 100}% Strength, {this.uptime * 100}% Uptime)</p>
    }

    getTeamDisplay(){
        return <p>Team Echos Buff <br/>
            ({this.value * 100}% Strength, {this.uptime * 100}% Uptime)</p>
    }
}

export class ELE_CUT extends GENERIC_BUFF{
    constructor(strength, cooldown = 10){
        super(strength);
        this.cooldown = cooldown;
    }

    getValue(){
        //@todo: decide on score afterwards;
        return 0;
    }

    getDisplay(){
        return <p>Self Element Damage Cut <br/>({this.value * 100}% Strength, {this.cooldown}T Cooldown)</p>
    }

    getTeamDisplay(){
        return <p>Team Element Damage Cut <br/>({this.value * 100}% Strength, {this.cooldown}T Cooldown)</p>
    }

    getModifier(){
        return '';
    }
}

export class CHARGE_BAR_BOOST extends GENERIC_BUFF{
    constructor(strength, cooldown = 10){
        super(strength);
        this.cooldown = cooldown;
    }

    getValue(){
        return (this.strength / this.cooldown);
    }

    getDisplay(){
        return <p>Charge Bar Boost <br/>({this.value*100}%, {this.cooldown}T Cooldown)</p>
    }

    getModifier(){
        return (<p className="ougi">+{(this.getValue()).toFixed(2)} cb/t</p>)
    }
}

//***** UNIQUE CHARACTER SKILLS **********
