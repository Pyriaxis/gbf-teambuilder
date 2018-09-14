import React, { Component } from 'react';
import logo from './img/gbf_2.png';
import './App.css';
import {Team} from './team';

import { Layout, Menu } from 'antd';
const { Header, Content, Footer} = Layout;

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
              <Team/>
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
