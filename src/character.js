import React, { Component } from 'react';
import { round } from 'lodash';
import {Col, Row} from "antd";


import * as buffs from './data/category/buffs';

import './character.css';

class Character extends Component {
    constructor(props) {
        super(props);
    }
}

export class CGeneral extends Character {
    render(){
        return (
            <div>
                <img style={{"width": "200px"}} src={this.props.character.picture}/>
                <h1>{this.props.character.name}</h1>
                <p>{this.props.character.buffsription}</p>
            </div>
        )
    }
}

export class CStrengths extends Character {
    constructor(props) {
        super(props);
    }

    render(){
        let positives = this.props.character.strengths.map((item, index)=>{
            return generatePositiveList(item, index);
        });

        return (
            <div>
                <div>{positives}</div>
            </div>
        )
    }
}

export class CTeamBuffs extends Character{
    constructor(props) {
        super(props);
    }

    render(){
        let teamBuffs = this.props.character.team_buffs.map((item, index)=>{
            return generateTeamList(item, index);
        });

        return(
            <div>
                <div>{teamBuffs}</div>
            </div>
        )
    }
}

export class CDebuffs extends Character{
    constructor(props){
        super(props);
    }

    render(){
        let debuffs = this.props.character.debuffs.map((item, index)=>{
           return generatePositiveList(item, index);
        });

        return(
            <div>
                <div>{debuffs}</div>
            </div>
        )
    }
}

export class CWeaknesses extends Character{
    constructor(props) {
        super(props);
    }

    render(){
        let weaknesses = this.props.character.weaknesses.map((item, index)=>{
            return generatePositiveList(item, index);
        });

       return (
           <div>
               <ul>{weaknesses}</ul>
           </div>
       )
    }
}

export class CIndividualScores extends Character{
    constructor(props) {
        super(props);
    }

    render(){
        let baseAA = 20;

        let buffArray = [...this.props.character.strengths, ...this.props.team];
        let normalAtk = calcNormalAtk(buffArray)
        let uniqueAtk = calcUniqueAtk(buffArray)
        let critical = calcCritical(buffArray)
        let multiattack = calcMultiattack(buffArray)
        let echo = calcEcho(buffArray);

        let finalAA = round(1.00 * normalAtk * uniqueAtk * critical * multiattack * echo * baseAA, 2);

        let formatMultiplier = function(multiplier){
            return `x${multiplier}`
        }

        return(
            <div>
                <h3>Individual Attack Score</h3>
                <Row>
                    <Col className={'base'} span={18}><p>Base AA Score</p></Col>
                    <Col className={'ppoints'} span={6}><p>{baseAA}</p></Col>
                </Row>
                <Row>
                    <Col className={'buffs'} span={18}><p>Normal ATK Up</p></Col>
                    <Col className={'ppoints'} span={6}><p>{formatMultiplier(normalAtk)}</p></Col>
                </Row>
                <Row>
                    <Col className={'buffs'} span={18}><p>Unique ATK Up</p></Col>
                    <Col className={'ppoints'} span={6}><p>{formatMultiplier(uniqueAtk)}</p></Col>
                </Row>
                <Row>
                    <Col className={'buffs'} span={18}><p>Critical</p></Col>
                    <Col className={'ppoints'} span={6}><p>{formatMultiplier(critical)}</p></Col>
                </Row>
                <Row>
                    <Col className={'buffs'} span={18}><p>Multiattack</p></Col>
                    <Col className={'ppoints'} span={6}><p>{formatMultiplier(multiattack)}</p></Col>
                </Row>
                <Row>
                    <Col className={'buffs'} span={18}><p>Echoes</p></Col>
                    <Col className={'ppoints'} span={6}><p>{formatMultiplier(echo)}</p></Col>
                </Row>
                <Row>
                    <Col className={'final'} span={18}><p>Final AA Score</p></Col>
                    <Col className={'finalpts'} span={6}><p>{finalAA}</p></Col>
                </Row>
            </div>
        )
    }
}

function generatePositiveList(item, index){
    return (
        <div key={index}>
            <Row>
                <Col className={'desc'} span={18}>{item.getDisplay()}</Col>
                <Col className={'ppoints'} span={6}><p>{item.getModifier()}</p></Col>
            </Row>
        </div>)
}

function generateTeamList(item, index){
    return (
        <div key={index}>
            <Row>
                <Col className={'desc'} span={18}>{item.getTeamDisplay()}</Col>
                <Col className={'ppoints'} span={6}><p>{item.getModifier()}</p></Col>
            </Row>
        </div>)
}

function calcNormalAtk(array){
    let multiplier = 1.00;

    return multiplier;
}

function calcUniqueAtk(array){
    let multiplier = 1.00;

    array.forEach(buff=>{
        if (buff instanceof buffs.ATTACK_UP_STK_UNIQUE || buff instanceof buffs.ATTACK_UP_UNIQUE){
            multiplier *= (1+buff.getValue());
        }
    })

    multiplier = round(multiplier, 2);

    return multiplier;
}

function calcCritical(array){
    let multiplier = 1.00;

    array.forEach(buff=>{
        if (buff instanceof buffs.CRITICAL){
            multiplier += buff.getValue();
        }
    })
    
    multiplier = round(multiplier, 2);

    return multiplier;
}

function calcMultiattack(array){
    let multiplier = 1.00;

    //@todo: this is not a very accurate calculation
    array.forEach(buff=>{
        if (buff instanceof buffs.MULTIATTACK){
            multiplier += buff.getValue();
        }
    })
    
    multiplier = round(multiplier, 2);

    return multiplier;
}


function calcEcho(array){
    let multiplier = 1.00;

    array.forEach(buff=>{
        if (buff instanceof buffs.ECHO){
            multiplier += buff.getValue();
        }
    })
    
    multiplier = round(multiplier, 2);

    return multiplier;
}