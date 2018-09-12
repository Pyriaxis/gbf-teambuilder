import React, { Component } from 'react';
import waterChars from './data/water.js';
import { find } from 'lodash';
import {Col, Row} from "antd";

import './character.css';

class Character extends Component {
    constructor(props) {
        super(props);
        this.character = (find(waterChars, {'name': props.name}))
    }
}

export class CGeneral extends Character {
    render(){
        return (
            <div>
                <h1>{this.character.name}</h1>

                <p>{this.character.description}</p>
            </div>
        )
    }
}

export class CStrengths extends Character {
    constructor(props) {
        super(props);
    }

    render(){
        let positives = this.character.strengths.map((item, index)=>{
            return generatePositiveList(item);
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
        let teamBuffs = this.character.team_buffs.map((item, index)=>{
            return generatePositiveList(item);
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
        let debuffs = this.character.debuffs.map((item, index)=>{
           return generatePositiveList(item);
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
        let weaknesses = this.character.weaknesses.map((item, index)=>{
            return generateNegativeList(item);
        });

       return (
           <div>
               <ul>{weaknesses}</ul>
           </div>
       )
    }
}

export class CIndividualScore extends Character{
    constructor(props) {
        super(props);
    }

    render(){
        return(
            <div>
                <h3>Individual Attack Score</h3>
            </div>
        )
    }
}

function generatePositiveList(item){
    return (
        <div>
            <Row>
                <Col className={'desc'} span={18}>{item.getDisplay()}</Col>
                <Col className={'ppoints'} span={6}><p>+{item.getValue()} pts</p></Col>
            </Row>
        </div>)
}

function generateNegativeList(item){
    return (
        <div>
            <Row>
                <Col className={'desc'} span={18}>{item.getDisplay()}</Col>
                <Col className={'npoints'} span={6}><p>-{item.getValue()} pts</p></Col>
            </Row>
        </div>)
}
