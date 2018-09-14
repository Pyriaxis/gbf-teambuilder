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
                <p>{this.props.character.description}</p>
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
        let formatMultiplier = function(multiplier){
            return `x${multiplier}`
        };

        let aatable = [];
        let multipliers = this.props.multipliers;

        if (multipliers.normalAtk > 1){
            aatable.push(<Row key={'na'}>
                <Col className={'buffs'} span={18}><p>Normal ATK Up</p></Col>
                <Col className={'ppoints'} span={6}><p>{formatMultiplier(multipliers.normalAtk)}</p></Col>
            </Row>)
        }

        if (multipliers.uniqueAtk > 1){
            aatable.push(<Row key={'ua'}>
                <Col className={'buffs'} span={18}><p>Unique ATK Up</p></Col>
                <Col className={'ppoints'} span={6}><p>{formatMultiplier(multipliers.uniqueAtk)}</p></Col>
            </Row>)
        }

        if (multipliers.critical > 1){
            aatable.push(<Row key={'crt'}>
                <Col className={'buffs'} span={18}><p>Critical</p></Col>
                <Col className={'ppoints'} span={6}><p>{formatMultiplier(multipliers.critical)}</p></Col>
            </Row>)
        }

        if (multipliers.multiattack > 1){
            aatable.push(<Row key={'ma'}>
                <Col className={'buffs'} span={18}><p>Multiattack</p></Col>
                <Col className={'ppoints'} span={6}><p>{formatMultiplier(multipliers.multiattack)}</p></Col>
            </Row>)
        }

        if (multipliers.echo > 1){
            aatable.push(<Row key={'echo'}>
                <Col className={'buffs'} span={18}><p>Echoes</p></Col>
                <Col className={'ppoints'} span={6}><p>{formatMultiplier(multipliers.echo)}</p></Col>
            </Row>)
        }

        return(
            <div>
                <h3>Individual Attack Score</h3>
                <Row>
                    <Col className={'base'} span={18}><p>Base AA Score</p></Col>
                    <Col className={'ppoints'} span={6}><p>{this.props.multipliers.baseAA}</p></Col>
                </Row>
                {aatable}
            </div>
        )
    }
}

export class CAAFinalScore extends Character{
    constructor(props) {
        super(props);
    }

    render(){
        return(
            <div>
                <Row>
                    <Col className={'final'} span={18}><p>Final AA Score</p></Col>
                    <Col className={'finalpts'} span={6}><p>{this.props.multipliers.finalAA}</p></Col>
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

