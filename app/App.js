import React from "react";
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
//
import '@/app.css'
import { Layout, Menu, Icon, } from 'antd';

const { Header, Sider, Content } = Layout;

const mapStateToProps = state => ({
  collapsed: state.collapsed
})

const mapDispatchToProps = dispatch => ({
  onUnfoldToggle: () => dispatch(unfoldAction)
})

// Action Creator
const unfoldAction = { type: 'toggle' }


class SiderDemo extends React.Component {

  // 声明需要使用的Context属性
  static contextTypes = {
    store: PropTypes.object
  }

  static propTypes = {
    collapsed: PropTypes.bool.isRequired,
    onUnfoldToggle: PropTypes.func.isRequired
  }

  render() {
    const { collapsed, onUnfoldToggle } = this.props
    const { store } = this.context;
    const state = store.getState();
    console.log(this.props)
    console.log(state)
    return (
      <Layout id="components-layout-demo-custom-trigger">
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
        >
          <div className="logo" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            <Menu.Item key="1">
              <Icon type="user" />
              <span>nav 1</span>
            </Menu.Item>
            <Menu.Item key="2">
              <Icon type="video-camera" />
              <span>nav 2</span>
            </Menu.Item>
            <Menu.Item key="3">
              <Icon type="upload" />
              <span>nav 3</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }}>
            <Icon
              className="trigger"
              type={true ? 'menu-unfold' : 'menu-fold'}
              onClick={onUnfoldToggle}
            />
          </Header>
          <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
            Content
            </Content>
        </Layout>
      </Layout>
    )
  }

}

const App = connect(
  mapStateToProps,
  mapDispatchToProps
)(SiderDemo)

export default App