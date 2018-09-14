import * as buffs from './category/buffs';
import * as debuffs from './category/debuff';

import { CUSTOM_STRING } from "./category/generics";
import {NUKE_ROMEO, OUGI_ECHO} from "./category/nukes";

import { round } from 'lodash';

export default [
    {
        name: 'Blank',
        picture: '/img/blankSSR.jpg',
        description: 'Empty Slot',
        spec: [],
        strengths: [],
        nukes:[],
        team_buffs: [],
        debuffs: [],
        weaknesses: []
    },
    {
        name: 'Altair',
        picture: '/img/water/altair.jpg',
        description: 'Bookworm that is one of Water\'s premier buffers. Covers a wide assortment of buffs and debuffs - his sole weakness is that he cannot provide multiattack as well.',
        spec: ['staff'],
        strengths: [ new buffs.SERAPH(),
            new buffs.ATK_UP_STK_UNIQUE(0.4),
            new buffs.OUGI_SPEC_UP(1.5, 1)],
        nukes:[],
        team_buffs: [
            new buffs.CRITICAL(0.7, 0.2, 0.5),
            new buffs.ATK_UP_DUAL(0.3, 3/7),
            new buffs.ATK_UP_ELEMENT(0.3, 3/7),
            new buffs.DEF_UP_SINGLE(0.3,3/7),
            new buffs.CHARGE_BAR_BOOST(0.3, 7)
        ],
        debuffs: [
            new debuffs.ATK_DOWN_DUAL(0.2),
            new debuffs.DEF_DOWN_DUAL(0.2),
            new debuffs.DEF_DOWN_ELE(0.1)
        ],
        weaknesses: []
    },
    {
        name: 'Izmir',
        picture: '/img/water/izmir.jpg',
        description: 'Draph Attacker-Buffer, that can do some serious Ougi damage given the opportunity. Shines when granted MA, such as from an Atma Sword.',
        spec: ['sword'],
        strengths: [ new buffs.SERAPH(),
            new buffs.ATK_UP_STK_UNIQUE(0.4),
            new buffs.OUGI_SPEC_UP(1.5, 1)],
        nukes:[],
        team_buffs: [new buffs.CRITICAL(0.5, 0.5, 0.6)],
        debuffs: [],
        weaknesses: [
            new CUSTOM_STRING('Difficult to utilize her Icy Blade stacks fully.', -3)
        ]
    },
    {
        name: 'Yuel (Wet)',
        picture: '/img/water/yuel.jpg',
        description: 'Foxy Erune that utilizes flames but is somehow in water. Selling point is the MA Team buff, which Water sorely needs.',
        spec: ['sword', 'katana'],
        strengths: [],
        nukes:[],
        team_buffs: [
            new buffs.MULTIATTACK(0.3, 0.15, 0.5),
            new buffs.DEBUFF_SUCCESS(0.2, 0.5),
            new buffs.ECHO(0.1, round(6/7, 2))
        ],
        debuffs:[
            new debuffs.ATK_DOWN_ELE(0.1),
            new debuffs.DEF_DOWN_ELE(0.25),
            new debuffs.BLIND(0.25)
        ],
        weaknesses: []
    },
    {
        name: 'Romeo',
        picture: '/img/water/romeo.jpg',
        description: 'Former lord turned Batman, he hits hard with stacks and is relatively bursty with his triple nuke while being able to protect the team. Not ideal for long fights, however.',
        spec: ['sword'],
        strengths:[
                new OUGI_ECHO(635000),
                new NUKE_ROMEO(630000, 6),
                new buffs.ATK_UP_UNIQUE(0.3, 1, 'romeo'),
                new CUSTOM_STRING('Able to tank multihit Ougis with Substitute and 80% Cut, 6T CD.', 5)
        ],
        nukes:[],
        team_buffs: [
            new buffs.ELE_CUT(0.8, 6)
        ],
        debuffs: [
            new debuffs.DEF_DOWN_ELE(0.2)
        ],
        weaknesses: [
            new CUSTOM_STRING('Requires stack micromanagement. Hit to ATK when out of stacks.', -2)
        ]
    }
];