import React from "react";
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';
//
import '@/app.css';
import { Layout, Menu, Icon } from 'antd';
import { unfoldAction } from '@/store/action';
import Routes from './routes';
import RoutesConfig from './routes/config';

const SubMenu = Menu.SubMenu;
const { Header, Sider, Content } = Layout;

const mapStateToProps = state => ({
  collapsed: state.collapsed
})

const mapDispatchToProps = dispatch => ({
  onUnfoldToggle: () => dispatch(unfoldAction({
    a: 12,
    b: '5'
  }))
})

class LayoutComponent extends React.Component {

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
    return (
      <Layout id="components-layout-demo-custom-trigger">
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
        >
          <div className="logo" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            {
              RoutesConfig.menus.map(item => {
                if (item.subs) {
                  return (
                    <SubMenu
                      key={item.key}
                      title={<span><Icon type={item.icon} /><span>{item.title}</span></span>}
                    >
                      {
                        item.subs.map(sub => {
                          return (
                            <Menu.Item key={sub.key}>
                              <Link to={sub.key}>{sub.title}</Link>
                            </Menu.Item>
                          )
                        })
                      }
                    </SubMenu>
                  )
                }
                return (
                  <Menu.Item key={item.key}>
                    <Link to={item.key}>
                      <Icon type={item.icon} />
                      <span>{item.title}</span>
                    </Link>
                  </Menu.Item>
                )
              })
            }
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }}>
            <Icon
              className="trigger"
              type={collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={onUnfoldToggle}
            />
          </Header>
          <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
            <Routes />
          </Content>
        </Layout>
      </Layout>
    )
  }

}

const App = connect(
  mapStateToProps,
  mapDispatchToProps
)(LayoutComponent)

export default App