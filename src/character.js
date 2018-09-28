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
        let picture;
        if (this.props.character.pictureMC){
            picture =
                (<div style={{"width": "200px", overflow: 'hidden', margin: 0, border: "2px solid gold"}}>
                    <img style={{"width": '226.926%', 'marginLeft': '-10%'}} src={this.props.character.picture}/>
                </div>)
        } else {
            picture = <img style={{"width": "200px"}} src={this.props.character.picture}/>
        }

        return (
            <div>
                {picture}
                <h1>{this.props.character.name}</h1>
                <p>{this.props.character.description}</p>
            </div>
        )
    }
}

export class CStrengths extends Character {
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
    render(){
        let weaknesses = this.props.character.weaknesses.map((item, index)=>{
            return generateFlawList(item, index);
        });

       return (
           <div>
               <div>{weaknesses}</div>
           </div>
       )
    }
}

export class CIndividualAAScores extends Character{
    render(){
        let formatMultiplier = function(multiplier){
            return `x${multiplier.toFixed(2)}`
        };

        let aatable = [];
        let modifiers = this.props.modifiers;

        let multipliers = modifiers.aaMultiplier;

        if (multipliers.normalAtk > 1){
            aatable.push(<Row key={'na'}>
                <Col className={'buffs'} span={18}><p>Normal ATK Up</p></Col>
                <Col className={'ppoints'} span={6}><p className="generic">{formatMultiplier(multipliers.normalAtk)}</p></Col>
            </Row>)
        }

        if (multipliers.uniqueAtk > 1){
            aatable.push(<Row key={'ua'}>
                <Col className={'buffs'} span={18}><p>Unique ATK Up</p></Col>
                <Col className={'ppoints'} span={6}><p className="generic">{formatMultiplier(multipliers.uniqueAtk)}</p></Col>
            </Row>)
        }

        if (multipliers.critical > 1){
            aatable.push(<Row key={'crt'}>
                <Col className={'buffs'} span={18}><p>Critical</p></Col>
                <Col className={'ppoints'} span={6}><p className="generic">{formatMultiplier(multipliers.critical)}</p></Col>
            </Row>)
        }

        if (multipliers.multiattack > 1){
            aatable.push(<Row key={'ma'}>
                <Col className={'buffs'} span={18}><p>Multiattack</p></Col>
                <Col className={'ppoints'} span={6}><p className="generic">{formatMultiplier(multipliers.multiattack)}</p></Col>
            </Row>)
        }

        if (multipliers.echo > 1){
            aatable.push(<Row key={'echo'}>
                <Col className={'buffs'} span={18}><p>Echoes</p></Col>
                <Col className={'ppoints'} span={6}><p className="generic">{formatMultiplier(multipliers.echo)}</p></Col>
            </Row>)
        }

        return(
            <div>
                <h3>Auto Attack Score</h3>
                <Row>
                    <Col className={'base'} span={18}><p>Base AA Score</p></Col>
                    <Col className={'ppoints'} span={6}><p className="generic">{modifiers.baseAA}</p></Col>
                </Row>
                {aatable}
            </div>
        )
    }
}

export class CAAFinalScore extends Character{
    render(){
        return(
            <div>
                <Row>
                    <Col className={'final'} span={18}><p>Final AA Score</p></Col>
                    <Col className={'finalpts'} span={6}><p>{this.props.modifiers.finalAA}</p></Col>
                </Row>
            </div>
        )
    }
}

export class CIndividualOugiScores extends Character{
    render(){
        let formatMultiplier = function(multiplier){
            return `x${multiplier.toFixed(2)}`
        };

        let formatAdditional = function(add){
            return `+${add}`
        };

        let ougitable = [];
        let modifiers = this.props.modifiers;

        let multipliers = modifiers.ougiMultiplier;
        let additionals = modifiers.ougiAddition;

        if (multipliers.normalAtk > 1){
            ougitable.push(<Row key={'na'}>
                <Col className={'buffs'} span={18}><p>Normal ATK Up</p></Col>
                <Col className={'ppoints'} span={6}><p className="generic">{formatMultiplier(multipliers.normalAtk)}</p></Col>
            </Row>)
        }

        if (multipliers.uniqueAtk > 1){
            ougitable.push(<Row key={'ua'}>
                <Col className={'buffs'} span={18}><p>Unique ATK Up</p></Col>
                <Col className={'ppoints'} span={6}><p className="generic">{formatMultiplier(multipliers.uniqueAtk)}</p></Col>
            </Row>)
        }

        if (multipliers.critical > 1){
            ougitable.push(<Row key={'crt'}>
                <Col className={'buffs'} span={18}><p>Critical</p></Col>
                <Col className={'ppoints'} span={6}><p className="generic">{formatMultiplier(multipliers.critical)}</p></Col>
            </Row>)
        }

        if (multipliers.ougiSpecUp > 1){
            ougitable.push(<Row key={'su'}>
                <Col className={'buffs'} span={18}><p>Ougi Spec Up</p></Col>
                <Col className={'ppoints'} span={6}><p className="generic">{formatMultiplier(multipliers.ougiSpecUp)}</p></Col>
            </Row>)
        }

        if (additionals.ougiEcho > 0){
            ougitable.push(<Row key={'echo'}>
                <Col className={'buffs'} span={18}><p>Ougi Echo</p></Col>
                <Col className={'ppoints'} span={6}><p className="ougi">{formatAdditional(additionals.ougiEcho)}</p></Col>
            </Row>)
        }


        return(
            <div>
                <h3>Ougi Score</h3>
                <Row>
                    <Col className={'base'} span={18}><p>Base Ougi Score</p></Col>
                    <Col className={'ppoints'} span={6}><p className="generic">{modifiers.baseOugi}</p></Col>
                </Row>
                {ougitable}
            </div>
        )
    }
}

export class COugiFinalScore extends Character{
    render(){
        return(
            <div>
                <Row>
                    <Col className={'final'} span={18}><p>Final Ougi Score</p></Col>
                    <Col className={'finalpts'} span={6}><p>{round(this.props.modifiers.finalOugi, 2)}</p></Col>
                </Row>
            </div>
        )
    }
}

export class CChargeCalculations extends Character{
    render(){
        let modifiers = this.props.modifiers;

        return(
            <div>
                <Row key={'cg'}>
                    <Col className={'buffs'} span={18}><p>Charge Gain/turn (avg)</p></Col>
                    <Col className={'ppoints'} span={6}><p className="ougi">{(modifiers.cbGain * 100).toFixed(2)}%</p></Col>
                </Row>
                <Row key={'tto'}>
                    <Col className={'buffs'} span={18}><p>Turns to Ougi</p></Col>
                    <Col className={'ppoints'} span={6}><p className="ougi">{round(modifiers.turnsToOugi,1)}</p></Col>
                </Row>
            </div>
        )
    }
}

export class CFinalScore extends Character{
    render(){
        let modifiers = this.props.modifiers;
        return(
            <div>
                <Row>
                    <Col className={'amortized'} span={24}><p>{round(modifiers.finalScore,2)}</p></Col>
                </Row>
            </div>
        )
    }
}

function generateFlawList(item, index){
    return (
        <div key={index}>
            <Row>
                <Col className={'desc'} span={24}>{item.getDisplay()}</Col>
            </Row>
        </div>)
}

function generatePositiveList(item, index){
    return (
        <div key={index}>
            <Row>
                <Col className={'desc'} span={18}>{item.getDisplay()}</Col>
                <Col className={'ppoints'} span={6}>{item.getModifier()}</Col>
            </Row>
        </div>)
}

function generateTeamList(item, index){
    return (
        <div key={index}>
            <Row>
                <Col className={'desc'} span={18}>{item.getTeamDisplay()}</Col>
                <Col className={'ppoints'} span={6}>{item.getModifier()}</Col>
            </Row>
        </div>)
}

