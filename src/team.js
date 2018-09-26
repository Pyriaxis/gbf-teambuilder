import React, { Component } from 'react';

import {
    CGeneral,
    CStrengths,
    CTeamBuffs,
    CDebuffs,
    CWeaknesses,
    CIndividualAAScores, CAAFinalScore,
    CIndividualOugiScores, COugiFinalScore,
    CChargeCalculations, CFinalScore } from './character';
import {mcPresets, generateMcFromTemplate} from './data/mc';
import {Layout, Divider, Menu, Icon, Select, Cascader, Row, Col} from 'antd';
import waterChars from './data/water';
import {find, round} from "lodash";
import {
    calcCritical,
    calcEcho,
    calcMultiattack,
    calcNormalAtk, calcOugiEcho,
    calcOugiSpecUp,
    calcUniqueAtk
} from './data/calculation';

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
        let char = this.getCharacter(value);
        this.props.updateSt(this.index, char);
    }

    getCharacter(name){
        return (find(waterChars, {'name': name}));
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

class McSelector extends Component{
    constructor(props){
        super(props);
        this.updateSt = props.updateSt;
        this.onChange = this.onChange.bind(this);
    }

    onChange(value){
        if (!value || value.length == 0) return;

        console.log(`Updating Dropdown with ${value} at MC Position.`);
        let char = generateMcFromTemplate(value);
        this.props.updateSt(0, char); //DJ always 0 index.
    }

    render(){
        function filter(inputValue, path) {
            return (path.some(option => {
                    return (option.label).toLowerCase().indexOf(inputValue.toLowerCase()) > -1
                }
            ));
        }

        return (<Cascader
            options={mcPresets}
            style={{ width:240, marginBottom: 10}}
            placeholder="Customize the MC"
            onChange = {this.onChange}
            showSearch={{filter}}
        />)
    }
}


export class Team extends Component{
    constructor(props){
        super(props);

        let baseModifierTemplate = {
            baseAA: 0,
            finalAA: 0,
            aaMultiplier: {
                normalAtk: 1,
                uniqueAtk: 1,
                critical: 1,
                multiattack: 1,
                echo: 1,
            },
            baseOugi: 0,
            ougiMultiplier: {
                normalAtk: 1,
                uniqueAtk: 1,
                critical: 1,
                ougiSpecUp: 1
            },
            ougiAddition:{
                ougiEcho: 0,
            },
            finalOugi: 0,
            cbGain: 0.1,
        };

        this.state = {
            mcArray:[],
            characterArray: [waterChars[0], waterChars[0], waterChars[0], waterChars[0]],
            modifiers: [baseModifierTemplate,baseModifierTemplate,baseModifierTemplate,baseModifierTemplate]
        };

        this.onClick = this.onClick.bind(this);
    }

    onClick(index, char){
        let newCharacterArray = [...this.state.characterArray];
        newCharacterArray[index] = char;

        let newTeamBuffsArray = [];

        newCharacterArray.forEach((character)=>{
            newTeamBuffsArray = [...newTeamBuffsArray, ...character.team_buffs];
        });

        let modifiers = newCharacterArray.map((item, index)=>{
            let baseAA = 10;
            let baseOugi = 45;

            let normalAtk = calcNormalAtk([...newTeamBuffsArray, ...item.strengths]);
            let uniqueAtk = calcUniqueAtk([...newTeamBuffsArray, ...item.strengths]);
            let critical = calcCritical([...newTeamBuffsArray, ...item.strengths]);
            let multiattack = calcMultiattack([...newTeamBuffsArray, ...item.strengths]);
            let echo = calcEcho([...newTeamBuffsArray, ...item.strengths]);
            let finalAA = round(1.00 * normalAtk * uniqueAtk * critical * multiattack * echo * baseAA, 2);
            let ougiSpecUp = calcOugiSpecUp([...newTeamBuffsArray, ...item.strengths]);
            let ougiEcho = calcOugiEcho([...newTeamBuffsArray, ...item.strengths]);
            let finalOugi = round(1.00 * normalAtk * uniqueAtk * critical * ougiSpecUp * baseOugi, 2) + ougiEcho;

            return {
                baseAA: baseAA,
                finalAA: finalAA,
                aaMultiplier: {
                    normalAtk: normalAtk,
                    uniqueAtk: uniqueAtk,
                    critical: critical,
                    multiattack: multiattack,
                    echo: echo,
                },
                baseOugi: 45,
                ougiMultiplier: {
                    normalAtk: normalAtk,
                    uniqueAtk: uniqueAtk,
                    critical: critical,
                    ougiSpecUp: ougiSpecUp
                },
                ougiAddition:{
                    ougiEcho: ougiEcho,
                },
                finalOugi: finalOugi,
                cbGain: 0.13,
            }
        });

        console.log(modifiers);

        this.setState({
            characterArray: newCharacterArray,
            modifiers: modifiers
        });

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

        let cIndividualAAScore = this.state.characterArray.map((item,index)=>{
            return <Col key={index} style={{ "minWidth": '250px'}} span={4}><CIndividualAAScores character={item} modifiers={this.state.modifiers[index]}/></Col>
        });

        let cAAFinalScore = this.state.characterArray.map((item,index)=>{
            return <Col key={index} style={{ "minWidth": '250px'}} span={4}><CAAFinalScore character={item} modifiers={this.state.modifiers[index]}/></Col>
        });

        let cIndividualOugiScore = this.state.characterArray.map((item,index)=>{
            return <Col key={index} style={{ "minWidth": '250px'}} span={4}><CIndividualOugiScores character={item} modifiers={this.state.modifiers[index]}/></Col>
        });

        let cOugiFinalScore = this.state.characterArray.map((item,index)=>{
            return <Col key={index} style={{ "minWidth": '250px'}} span={4}><COugiFinalScore character={item} modifiers={this.state.modifiers[index]}/></Col>
        });

        let cChargeCalculations = this.state.characterArray.map((item,index)=>{
            return <Col key={index} style={{ "minWidth": '250px'}} span={4}><CChargeCalculations character={item} modifiers={this.state.modifiers[index]}/></Col>
        });

        let cFinalScore = this.state.characterArray.map((item,index)=>{
            return <Col key={index} style={{ "minWidth": '250px'}} span={4}><CFinalScore character={item} modifiers={this.state.modifiers[index]}/></Col>
        });

        let baseTeamAttackScore = 0;
        for (let i = 0; i < 4; i++){
            baseTeamAttackScore += this.state.modifiers[i].finalAA || 0;
        }

        baseTeamAttackScore = round(baseTeamAttackScore, 2);

        return (
        <Layout style={{padding: '24px 0 0 0', background: '#fff' }}>
            <Content style={{ "overflowX": "auto", padding: '0px 24px', minHeight: 280 }}>
                <p>Team Layout</p>
                <Row gutter={8} style={rowStyle} type="flex">
                    <Col style={{ "minWidth": '250px'}} span={4}>
                        <McSelector updateSt={this.onClick}/>
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

                <Divider style={{"minWidth": "1000px"}}>Debuffs</Divider>
                <Row gutter={8} style={rowStyle} type="flex">
                    {cDebuffs}
                </Row>

                <Divider style={{"minWidth": "1000px"}}>Team Buffs</Divider>
                <Row gutter={8} style={rowStyle} type="flex">
                    {cTeamBuffs}
                </Row>
                <Divider style={{"minWidth": "1000px"}}>Unaccounted Flaws</Divider>
                <Row gutter={8} style={rowStyle} type="flex">
                    {cWeaknesses}
                </Row>
                <Divider style={{"minWidth": "1000px"}}>Final Attack Score</Divider>
                <Row gutter={8} style={rowStyle} type="flex">
                    {cIndividualAAScore}
                </Row>
                <Row gutter={8} style={rowStyle} type="flex">
                    {cAAFinalScore}
                </Row>
                <Row gutter={8} style={rowStyle} type="flex">
                    {cIndividualOugiScore}
                </Row>
                <Row gutter={8} style={rowStyle} type="flex">
                    {cOugiFinalScore}
                </Row>
                <Row gutter={8} style={rowStyle} type="flex">
                    {cChargeCalculations}
                </Row>
                <Row gutter={8} style={rowStyle} type="flex">
                    {cFinalScore}
                </Row>
            </Content>
            <Sider width={300} style={{ borderLeft: 'solid 1px #ccc',background: '#fff' }}>
                <div style={{ marginLeft: '10px' }}>
                    <h1>Team Scoring</h1>
                    <Row>
                        <Col span={18}>Team Base Attack Score</Col>
                        <Col span={6}>{baseTeamAttackScore}</Col>
                    </Row>
                </div>
            </Sider>
        </Layout>)
    }
}