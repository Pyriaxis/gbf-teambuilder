import React, { Component } from 'react';

import {CGeneral, CStrengths, CTeamBuffs, CDebuffs, CWeaknesses, CIndividualScores} from './character';

import { Layout, Divider } from 'antd';
import { Row, Col } from 'antd';
import { Select } from 'antd';

import waterChars from './data/water';
import {find} from "lodash";

const Option = Select.Option;
const { Content } = Layout;

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
            filterOption={(input, option) => option.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0}
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
        };

        this.onClick = this.onClick.bind(this);
    }

    onClick(index, value){
        let newCharacterArray = [...this.state.characterArray];
        let newTeamBuffsArray

        newCharacterArray[index] = this.getCharacter(value);


        this.setState({
            characterArray: newCharacterArray
        }, ()=>{return this.state.characterArray});

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
            return <Col key={index} style={{ "minWidth": '250px'}} span={4}><CIndividualScores character={item} team={this.state.characterArray}/></Col>
        });

        return (
        <Content style={{ "overflowX": "auto", padding: '0px 24px', minHeight: 280 }}>
            <p>Team Layout</p>
            <Row gutter={8} style={rowStyle} type="flex">
                <Col style={{ "minWidth": '250px'}} span={4}>
                    <Dropdown index={0} updateSt={this.onClick} />
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
        </Content>);
    }
}