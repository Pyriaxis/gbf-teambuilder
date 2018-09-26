import * as buffs from "./category/buffs";
import * as nukes from "./category/nukes";
import {round} from "lodash";

export function calcNormalAtk(array){
    let multiplier = 1.00;

    let mulA = 0;
    let mulB = 0;
    let mulC = 0;


    array.forEach(buff=>{
        if (buff instanceof buffs.ATK_UP_SINGLE){
            mulA = Math.max(buff.getValue(), mulA)
        } else if (buff instanceof buffs.ATK_UP_DUAL){
            mulB = Math.max(buff.getValue(), mulB)
        } else if (buff instanceof buffs.ATK_UP_OUGI){
            mulC = Math.max(buff.getValue(), mulC);
        }
    });

    return multiplier + mulA + mulB + mulC;
}

export function calcUniqueAtk(array){
    let multiplier = 1.00;

    array.forEach(buff=>{
        if (buff instanceof buffs.ATK_UP_STK_UNIQUE || buff instanceof buffs.ATK_UP_UNIQUE){
            multiplier *= (1+buff.getValue());
        }
    });

    multiplier = round(multiplier, 2);

    return multiplier;
}

export function calcCritical(array){
    let multiplier = 1.00;

    array.forEach(buff=>{
        if (buff instanceof buffs.CRITICAL){
            multiplier += buff.getValue();
        }
    });

    multiplier = round(multiplier, 2);

    return multiplier;
}

export function calcMultiattack(array){
    let multiplier = 1.00;

    //@todo: this is not a very accurate calculation
    array.forEach(buff=>{
        if (buff instanceof buffs.MULTIATTACK){
            multiplier += buff.getValue();
        }
    });

    multiplier = round(multiplier, 2);

    return multiplier;
}


export function calcEcho(array){
    let multiplier = 1.00;

    array.forEach(buff=>{
        if (buff instanceof buffs.ECHO){
            multiplier += buff.getValue();
        }
    });

    multiplier = round(multiplier, 2);

    return multiplier;
}

export function calcOugiSpecUp(array){
    let multiplier = 1.00;

    array.forEach(buff=>{
        if (buff instanceof buffs.OUGI_SPEC_UP){
            multiplier += buff.getValue();
        }
    });

    return multiplier;
}

export function calcOugiEcho(array){
    let addition = 0;

    array.forEach(nuke=>{
        if (nuke instanceof nukes.OUGI_ECHO){
            addition += nuke.getValue();
        }
    });

    return addition;
}