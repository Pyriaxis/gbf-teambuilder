import React, { Component } from 'react';

import {CGeneral, CStrengths, CTeamBuffs, CDebuffs, CWeaknesses, CIndividualScores, CAAFinalScore} from './character';
import {mcPresets} from './data/mc';

import {Layout, Divider, Menu, Icon, Select, Cascader, Row, Col} from 'antd';

import waterChars from './data/water';
import {find, round} from "lodash";
import {calcCritical, calcEcho, calcMultiattack, calcNormalAtk, calcUniqueAtk} from './data/calculation';

const Option = Select.Option;
const { Content, Sider, Submenu } = Layout;
const { SubMenu } = Menu;

class Dropdown extends Component{
    constructor(props){
        super(props);
        this.index = props.index;
        this.updateSt = props.updateSt;
        this.onChange = this.onChange.bind(this);
    }

    onChange(value){
        console.log(`Updating Dropdown with ${value} at ${this.index}.`);
        this.props.updateSt(this.index, value);
    }

    render() {
        let dropdownImg = {
            width: '50px',
            marginRight: '10px'
        };

        let options = waterChars.map((item,index)=>{
            return <Option key={item.name} value={item.name}><img style={dropdownImg} src={item.picture}/>{item.name}</Option>
        });

        return (<Select
            showSearch
            style={{ width:240, marginBottom: 10}}
            placeholder="Select a character"
            optionFilterProp="children"
            onChange={this.onChange}
            filterOption={true}
        >
            {options}
        </Select>)
    }
}


export class Team extends Component{
    constructor(props){
        super(props);
        this.state = {
            mcArray:[],
            characterArray: [waterChars[0], waterChars[0], waterChars[0], waterChars[0]],
            multipliers: [{},{},{},{}]
        };

        this.onClick = this.onClick.bind(this);
    }

    onClick(index, value){
        let newCharacterArray = [...this.state.characterArray];
        newCharacterArray[index] = this.getCharacter(value);

        let newTeamBuffsArray = [];

        newCharacterArray.forEach((character)=>{
            newTeamBuffsArray = [...newTeamBuffsArray, ...character.team_buffs];
        });

        let multipliers = newCharacterArray.map((item, index)=>{
            let baseAA = 20;
            let normalAtk = calcNormalAtk([...newTeamBuffsArray, ...item.strengths]);
            let uniqueAtk = calcUniqueAtk([...newTeamBuffsArray, ...item.strengths]);
            let critical = calcCritical([...newTeamBuffsArray, ...item.strengths]);
            let multiattack = calcMultiattack([...newTeamBuffsArray, ...item.strengths]);
            let echo = calcEcho([...newTeamBuffsArray, ...item.strengths]);
            let finalAA = round(1.00 * normalAtk * uniqueAtk * critical * multiattack * echo * baseAA, 2);

            return {
                baseAA: baseAA,
                normalAtk: normalAtk,
                uniqueAtk: uniqueAtk,
                critical: critical,
                multiattack: multiattack,
                echo: echo,
                finalAA: finalAA
            }
        });

        this.setState({
            characterArray: newCharacterArray,
            multipliers: multipliers
        });

    }

    getCharacter(name){
        return (find(waterChars, {'name': name}));
    }

    render(){
        let rowStyle = {"flexWrap": "nowrap", "margin": 'auto', "maxWidth": '1000px'};

        let cGeneral = this.state.characterArray.map((item, index)=>{
            return <Col key={index} style={{ "minWidth": '250px'}} span={4}><CGeneral character={item} /></Col>
        });

        let cStrengths = this.state.characterArray.map((item, index)=>{
            return <Col key={index} style={{ "minWidth": '250px'}} span={4}><CStrengths character={item} /></Col>
        });

        let cWeaknesses = this.state.characterArray.map((item, index)=>{
            return <Col key={index} style={{ "minWidth": '250px'}} span={4}><CWeaknesses character={item} /></Col>
        });

        let cDebuffs = this.state.characterArray.map((item,index)=>{
            return <Col key={index} style={{ "minWidth": '250px'}} span={4}><CDebuffs character={item} /></Col>
        });

        let cTeamBuffs = this.state.characterArray.map((item,index)=>{
            return <Col key={index} style={{ "minWidth": '250px'}} span={4}><CTeamBuffs character={item} /></Col>
        });

        let cIndividualScore = this.state.characterArray.map((item,index)=>{
            return <Col key={index} style={{ "minWidth": '250px'}} span={4}><CIndividualScores character={item} multipliers={this.state.multipliers[index]}/></Col>
        });

        let cAAFinalScore = this.state.characterArray.map((item,index)=>{
            return <Col key={index} style={{ "minWidth": '250px'}} span={4}><CAAFinalScore character={item} multipliers={this.state.multipliers[index]}/></Col>
        });

        let baseTeamAttackScore = 0;
        for (let i = 0; i < 4; i++){
            baseTeamAttackScore += this.state.multipliers[i].finalAA || 0;
        }

        function filter(inputValue, path) {
            return (path.some(option => {
                return (option.label).toLowerCase().indexOf(inputValue.toLowerCase()) > -1
            }
            ));
        }

        return (
        <Layout style={{padding: '24px 0 0 0', background: '#fff' }}>
            <Content style={{ "overflowX": "auto", padding: '0px 24px', minHeight: 280 }}>
                <p>Team Layout</p>
                <Row gutter={8} style={rowStyle} type="flex">
                    <Col style={{ "minWidth": '250px'}} span={4}>
                        <Cascader
                            options={mcPresets}
                            style={{ width:240, marginBottom: 10}}
                            placeholder="Customize the MC"
                            showSearch={{filter}}
                        />
                    </Col>
                    <Col style={{ "minWidth": '250px'}} span={4}>
                        <Dropdown index={1} updateSt={this.onClick}/>
                    </Col>
                    <Col style={{ "minWidth": '250px'}} span={4}>
                        <Dropdown index={2} updateSt={this.onClick}/>
                    </Col>
                    <Col style={{ "minWidth": '250px'}} span={4}>
                        <Dropdown index={3} updateSt={this.onClick}/>
                    </Col>
                </Row>

                <Row gutter={8} style={rowStyle} type="flex">
                    {cGeneral}
                </Row>

                <Divider style={{"minWidth": "1000px"}}>Strengths</Divider>
                <Row gutter={8} style={rowStyle} type="flex">
                    {cStrengths}
                </Row>

                <Divider style={{"minWidth": "1000px"}}>Weaknesses</Divider>
                <Row gutter={8} style={rowStyle} type="flex">
                    {cWeaknesses}
                </Row>

                <Divider style={{"minWidth": "1000px"}}>Debuffs</Divider>
                <Row gutter={8} style={rowStyle} type="flex">
                    {cDebuffs}
                </Row>

                <Divider style={{"minWidth": "1000px"}}>Team Buffs</Divider>
                <Row gutter={8} style={rowStyle} type="flex">
                    {cTeamBuffs}
                </Row>

                <Divider style={{"minWidth": "1000px"}}>Final Attack Score</Divider>
                <Row gutter={8} style={rowStyle} type="flex">
                    {cIndividualScore}
                </Row>
                <Row gutter={8} style={rowStyle} type="flex">
                    {cAAFinalScore}
                </Row>
            </Content>
            <Sider width={300} style={{ borderLeft: 'solid 1px #ccc',background: '#fff' }}>
                <div style={{ marginLeft: '10px' }}>
                    <h1>Team Scoring</h1>
                    <Row>
                        <Col span={18}>Base Attack Score</Col>
                        <Col span={6}>{baseTeamAttackScore}</Col>
                    </Row>
                </div>
            </Sider>
        </Layout>)
    }
}