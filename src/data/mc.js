import * as buffs from './category/buffs';
import * as debuffs from './category/debuff';

import { CUSTOM_STRING } from "./category/generics";
import { clone } from 'lodash';

let mcPresets = [{
    value: 'berserker',
    label: 'Berserker',
    children: [{
      value: 'rage4',
      label: 'Rage IV',
      children: [{
        value: 'abreak2',
        label: 'Armor Break II',
        children: [{
            value: 'mm',
            label: 'Miserable Mist',
        },{
            value: 'roa',
            label: 'Rain of Arrows',
        }]
      }, {
        value: 'mm',
        label: 'Miserable Mist',
        children: [{
            value: 'dispel',
            label: 'Dispel',
        },{
            value: 'clarity',
            label: 'Clarity',
        }]
      }],
    }],
  }];

let mcClassTemplates = {
    'berserker': {
        name: 'MC Berserker',
        picture: '/img/mc/berserker.jpg',
        pictureMC: true,
        description: 'One of the strongest offensive classes, signature ability is to do T1 Ougis with a great mainhand as well as Rage IV which is a strong raid/party buff.',
        spec: [],
        strengths: [],
        nukes:[],
        team_buffs: [],
        debuffs: [],
        weaknesses: []
    },
};

let skillTemplates = {
    'rage4': {
        skill: [new buffs.ATK_UP_SINGLE(0.4, 3/5)],
        category: 'team_buffs',
    },
    'mm': {
        skill: [new debuffs.ATK_DOWN_DUAL(0.25), new debuffs.DEF_DOWN_DUAL(0.25)],
        category: 'debuffs'
    },
    'abreak2': {
        skill: [new debuffs.DEF_DOWN_SINGLE(0.25)],
        category: 'debuffs'
    },
    'roa': {
        skill: [new debuffs.ATK_DOWN_SINGLE(0.25)],
        category: 'debuffs'
    },

    //@todo: this needs to be fixed
    'dispel': {
        skill: [new CUSTOM_STRING('DISPEL', 0)],
        category: 'strengths'
    },
    'clarity': {
        skill: [new CUSTOM_STRING('CLARITY', 0)],
        category: 'strengths'
    },
};

let generateMcFromTemplate = function(array){
    let djeeta = clone(mcClassTemplates[array[0]]);

    for (let i = 1; i < array.length; i++){
        if (skillTemplates[array[i]]){
            djeeta[skillTemplates[array[i]].category] = djeeta[skillTemplates[array[i]].category].concat(skillTemplates[array[i]].skill);
        }
    }

    return djeeta;
};

export { mcPresets, generateMcFromTemplate };