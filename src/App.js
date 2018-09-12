import React, { Component } from 'react';
import logo from './img/gbf_2.png';
import './App.css';
import {CGeneral, CStrengths, CTeamBuffs, CDebuffs, CWeaknesses, CIndividualScore} from './character';

import { Layout, Menu, Breadcrumb, Icon, Divider } from 'antd';
import { Row, Col } from 'antd';

const { SubMenu } = Menu;
const { Header, Content, Footer, Sider} = Layout;

class App extends Component {
  render() {
    return (
      <Layout>
          <Header className="header">
              <div className="logo">
                  <img src={logo} className={'logo-image'} alt="logo" />
                  <span className={'header-text'}>TEAM BUILDER</span>
              </div>
              <Menu
                  theme="dark"
                  mode="horizontal"
                  defaultSelectedKeys={['2']}
                  style={{ lineHeight: '64px' }}
              >
                  <Menu.Item className={'fire'} key="1">Fire</Menu.Item>
                  <Menu.Item key="2">Water</Menu.Item>
                  <Menu.Item className={'earth'} key="3">Earth</Menu.Item>
                  <Menu.Item className={'wind'} key="4">Wind</Menu.Item>
                  <Menu.Item className={'light'} key="5">Light</Menu.Item>
                  <Menu.Item className={'dark'} key="6">Dark</Menu.Item>
              </Menu>
          </Header>
          <Content style={{ padding: '32px 50px 0px 50px' }}>
              <Layout style={{padding: '24px 0 0 0', background: '#fff' }}>
                  <Content style={{ "overflowX": "auto", padding: '0px 24px', minHeight: 280 }}>
                      <p>Team Layout</p>
                      <Row gutter={8} style={{"flexWrap": "nowrap"}} type="flex" justify="center">
                          <Col style={{ "minWidth": '250px'}} span={4}><CGeneral name ={'Romeo'} /></Col>
                          <Col style={{ "minWidth": '250px'}} span={4}><CGeneral name ={'Yuel (Wet)'} /></Col>
                          <Col style={{ "minWidth": '250px'}} span={4}><CGeneral name ={'Izmir'} /></Col>
                          <Col style={{ "minWidth": '250px'}} span={4}><CGeneral name ={'Romeo'} /></Col>
                      </Row>

                      <Divider>Strengths</Divider>
                      <Row gutter={8} style={{"flexWrap": "nowrap"}} type="flex" justify="center">
                          <Col style={{ "minWidth": '250px'}} span={4}><CStrengths name ={'Romeo'} /></Col>
                          <Col style={{ "minWidth": '250px'}} span={4}><CStrengths name ={'Yuel (Wet)'} /></Col>
                          <Col style={{ "minWidth": '250px'}} span={4}><CStrengths name ={'Izmir'} /></Col>
                          <Col style={{ "minWidth": '250px'}} span={4}><CStrengths name ={'Romeo'} /></Col>
                      </Row>

                      <Divider>Weaknesses</Divider>
                      <Row gutter={8} style={{"flexWrap": "nowrap"}} type="flex" justify="center">
                          <Col style={{ "minWidth": '250px'}} span={4}><CWeaknesses name ={'Romeo'} /></Col>
                          <Col style={{ "minWidth": '250px'}} span={4}><CWeaknesses name ={'Yuel (Wet)'} /></Col>
                          <Col style={{ "minWidth": '250px'}} span={4}><CWeaknesses name ={'Izmir'} /></Col>
                          <Col style={{ "minWidth": '250px'}} span={4}><CWeaknesses name ={'Romeo'} /></Col>
                      </Row>

                      <Divider>Debuffs</Divider>
                      <Row gutter={8} style={{"flexWrap": "nowrap"}} type="flex" justify="center">
                          <Col style={{ "minWidth": '250px'}} span={4}><CDebuffs name ={'Romeo'} /></Col>
                          <Col style={{ "minWidth": '250px'}} span={4}><CDebuffs name ={'Yuel (Wet)'} /></Col>
                          <Col style={{ "minWidth": '250px'}} span={4}><CDebuffs name ={'Izmir'} /></Col>
                          <Col style={{ "minWidth": '250px'}} span={4}><CDebuffs name ={'Romeo'} /></Col>
                      </Row>

                      <Divider>Team Buffs</Divider>
                      <Row gutter={8} style={{"flexWrap": "nowrap"}} type="flex" justify="center">
                          <Col style={{ "minWidth": '250px'}} span={4}><CTeamBuffs name ={'Romeo'} /></Col>
                          <Col style={{ "minWidth": '250px'}} span={4}><CTeamBuffs name ={'Yuel (Wet)'} /></Col>
                          <Col style={{ "minWidth": '250px'}} span={4}><CTeamBuffs name ={'Izmir'} /></Col>
                          <Col style={{ "minWidth": '250px'}} span={4}><CTeamBuffs name ={'Romeo'} /></Col>
                      </Row>

                      <Divider>Final Attack Score</Divider>
                      <Row gutter={8} style={{"flexWrap": "nowrap"}} type="flex" justify="center">
                          <Col style={{ "minWidth": '250px'}} span={4}><CIndividualScore name ={'Romeo'} /></Col>
                          <Col style={{ "minWidth": '250px'}} span={4}><CIndividualScore name ={'Yuel (Wet)'} /></Col>
                          <Col style={{ "minWidth": '250px'}} span={4}><CIndividualScore name ={'Izmir'} /></Col>
                          <Col style={{ "minWidth": '250px'}} span={4}><CIndividualScore name ={'Romeo'} /></Col>
                      </Row>

                  </Content>
                  <Sider width={300} style={{ background: '#fff' }}>
                      <Menu
                          mode="inline"
                          defaultSelectedKeys={['1']}
                          defaultOpenKeys={['sub1']}
                          style={{ height: '100%' }}
                      >
                          <SubMenu key="sub1" title={<span><Icon type="user" />subnav 1</span>}>
                              <Menu.Item key="1">option1</Menu.Item>
                              <Menu.Item key="2">option2</Menu.Item>
                              <Menu.Item key="3">option3</Menu.Item>
                              <Menu.Item key="4">option4</Menu.Item>
                          </SubMenu>
                          <SubMenu key="sub2" title={<span><Icon type="laptop" />subnav 2</span>}>
                              <Menu.Item key="5">option5</Menu.Item>
                              <Menu.Item key="6">option6</Menu.Item>
                              <Menu.Item key="7">option7</Menu.Item>
                              <Menu.Item key="8">option8</Menu.Item>
                          </SubMenu>
                          <SubMenu key="sub3" title={<span><Icon type="notification" />subnav 3</span>}>
                              <Menu.Item key="9">option9</Menu.Item>
                              <Menu.Item key="10">option10</Menu.Item>
                              <Menu.Item key="11">option11</Menu.Item>
                              <Menu.Item key="12">option12</Menu.Item>
                          </SubMenu>
                      </Menu>
                  </Sider>
              </Layout>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
               The Grind Never Stops
          </Footer>
      </Layout>
    );
  }
}

//<div className="App">
//    <header className="App-header">
//        <img src={logo} className="App-logo" alt="logo" />
//        <h1 className="App-title">Welcome to React</h1>
//    </header>
//    <p className="App-intro">
//        To get started, edit <code>src/App.js</code> and save to reload.
//    </p>
//    <Button type="primary">Button</Button>
//    <Character name={'Izmir'}/>
//</div>

export default App;
