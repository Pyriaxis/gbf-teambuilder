import React, { Component } from 'react';
import waterChars from './data/water.js';
import { find } from 'lodash';
import {Col, Row} from "antd";

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
                <img src={this.props.character.picture}/>
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
            return generatePositiveList(item, index);
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
        return(
            <div>
                <h3>Individual Attack Score</h3>
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

