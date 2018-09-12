import React, { Component } from 'react';

import {CGeneral, CStrengths, CTeamBuffs, CDebuffs, CWeaknesses, CIndividualScore} from './character';

import { Divider } from 'antd';
import { Row, Col } from 'antd';

export class Team extends Component{
    constructor(props){
        super(props);
        this.state = {
            characterArray: ['Romeo', 'Yuel (Wet)', 'Izmir', 'Romeo'],
            teamBuffs: [],
            defDown: [],
            baseSurvival: [],
            atkDown: [],
        }
    }

    render(){

        let cGeneral = this.state.characterArray.map((item, index)=>{
            return <Col style={{ "minWidth": '250px'}} span={4}><CGeneral name ={item} /></Col>
        });

        let cStrengths = this.state.characterArray.map((item, index)=>{
            return <Col style={{ "minWidth": '250px'}} span={4}><CStrengths name ={item} /></Col>
        });

        let cWeaknesses = this.state.characterArray.map((item, index)=>{
            return <Col style={{ "minWidth": '250px'}} span={4}><CWeaknesses name ={item} /></Col>
        });

        let cDebuffs = this.state.characterArray.map((item,index)=>{
            return <Col style={{ "minWidth": '250px'}} span={4}><CDebuffs name ={item} /></Col>
        });

        let cTeamBuffs = this.state.characterArray.map((item,index)=>{
            return <Col style={{ "minWidth": '250px'}} span={4}><CTeamBuffs name ={item} /></Col>
        });

        let cIndividualScore = this.state.characterArray.map((item,index)=>{
            return <Col style={{ "minWidth": '250px'}} span={4}><CIndividualScore name ={item} /></Col>
        });

        return (
        <div>
            <p>Team Layout</p>
            <Row gutter={8} style={{"flexWrap": "nowrap"}} type="flex" justify="center">
                {cGeneral}
            </Row>

            <Divider>Strengths</Divider>
            <Row gutter={8} style={{"flexWrap": "nowrap"}} type="flex" justify="center">
                {cStrengths}
            </Row>

            <Divider>Weaknesses</Divider>
            <Row gutter={8} style={{"flexWrap": "nowrap"}} type="flex" justify="center">
                {cWeaknesses}
            </Row>

            <Divider>Debuffs</Divider>
            <Row gutter={8} style={{"flexWrap": "nowrap"}} type="flex" justify="center">
                {cDebuffs}
            </Row>

            <Divider>Team Buffs</Divider>
            <Row gutter={8} style={{"flexWrap": "nowrap"}} type="flex" justify="center">
                {cTeamBuffs}
            </Row>

            <Divider>Final Attack Score</Divider>
            <Row gutter={8} style={{"flexWrap": "nowrap"}} type="flex" justify="center">
                {cIndividualScore}
            </Row>
        </div>);
    }
}