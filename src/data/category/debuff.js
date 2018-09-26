import {round} from "lodash";
import {GENERIC} from "./generics";
import React from "react";
import {statusIconMap} from "../statusIconMap";

let iconStyle = {"width": "20px", "marginRight": "3px"};

export class GENERIC_DEBUFF extends GENERIC{
    constructor(param){
        super(param)
    }

    getModifier(){
        return <p className={'debuff'}>{this.value * 100}%</p>;
    }
}


export class ATK_DOWN_ELE extends GENERIC_DEBUFF{
    getDisplay(){
        return <p><img style={iconStyle} src={statusIconMap.atkDown}/>
            ATK Down (Elemental)
        </p>
    }
}

export class ATK_DOWN_SINGLE extends GENERIC_DEBUFF{
    getDisplay(){
        return <p><img style={iconStyle} src={statusIconMap.atkDown}/>
            ATK Down (A)
        </p>
    }
}

export class ATK_DOWN_DUAL extends GENERIC_DEBUFF{
    getDisplay(){
        return <p><img style={iconStyle} src={statusIconMap.atkDown}/>
            ATK Down (B)
        </p>
    }
}

export class ATK_DOWN_OUGI extends GENERIC_DEBUFF{
    getDisplay(){
        return <p><img style={iconStyle} src={statusIconMap.atkDown}/>
            ATK Down (C)
        </p>
    }
}

/**
 * DEFENSE DOWN SECTION
 */

export class DEF_DOWN_ELE extends GENERIC_DEBUFF{
    getDisplay(){
        return <p><img style={iconStyle} src={statusIconMap.defDown}/>
            DEF Down (Elemental)
        </p>
    }
}

export class DEF_DOWN_SINGLE extends GENERIC_DEBUFF{
    getDisplay(){
        return <p><img style={iconStyle} src={statusIconMap.defDown}/>
            DEF Down (A)
        </p>
    }
}

export class DEF_DOWN_DUAL extends GENERIC_DEBUFF{
    getDisplay(){
        return <p><img style={iconStyle} src={statusIconMap.defDown}/>
            DEF Down (B)
        </p>
    }
}

export class DEF_DOWN_OUGI extends GENERIC_DEBUFF{
    getDisplay(){
        return <p><img style={iconStyle} src={statusIconMap.defDown}/>
            DEF Down (C)
        </p>
    }
}

export class BLIND extends GENERIC{
    getValue(){
        //75% scaling
        return round(this.value * 0.75, 2);
    }

    getDisplay(){
        return `Blind (${this.value * 100}% Strength)`
    }

    getModifier(){
        return `S x${1 + this.getValue()}`;
    }
}