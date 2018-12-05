import React from "react";
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';
//
import '@/app.css';
import { Layout, Menu, Icon, Breadcrumb, Dropdown } from 'antd';
import { unfoldAction } from '@/store/action';
import Routes from './routes';
import RoutesConfig from './routes/config';
import { debug } from "util";

const SubMenu = Menu.SubMenu;
const { Header, Sider, Content } = Layout;

class LayoutComponent extends React.Component {
  constructor(props) {
    super(props)
  }

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
    // 用户下拉菜单
    const menu = (
      <Menu>
        <Menu.Item>
          <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">修改密码</a>
        </Menu.Item>
        <Menu.Item>
          <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">基本信息</a>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item>
          <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">退出登录</a>
        </Menu.Item>
      </Menu>
    );
    // 面包屑数据start
    const menus = RoutesConfig.menus;
    const breadcrumbNameMap = {}
    menus.map(menu => {
      breadcrumbNameMap[menu.key] = menu
      let next = (menu) => {
        if (menu.subs) {
          menu.subs.map(sub => {
            breadcrumbNameMap[sub.key] = sub
            next(sub)
          })
        }
      }
      next(menu)
    })
    let { pathname } = window.location
    const pathSnippets = pathname.split('/').filter(i => i);
    const extraBreadcrumbItems = pathSnippets.map((_, index) => {
      if (index == 0 || _ == "home") return
      const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
      return (
        <Breadcrumb.Item key={breadcrumbNameMap[url].key} disable={breadcrumbNameMap[url].disable || null}>
          <Link to={breadcrumbNameMap[url].key}>
            {breadcrumbNameMap[url].title}
          </Link>
        </Breadcrumb.Item>
      );
    });

    // 判断如果是3级分类或更高的时候显示2级分类
    let defaultSelectedKeys
    if (pathSnippets[pathSnippets.length - 1] != 'home') { // 如果当前路由不是home
      let currentBreadcrumbItems = extraBreadcrumbItems[extraBreadcrumbItems.length - 1]
      if (currentBreadcrumbItems.props.disable) {
        let newpathSnippets = pathSnippets.toString()
        newpathSnippets = newpathSnippets.split(',').splice(0, 2).join('/')
        defaultSelectedKeys = '/' + newpathSnippets
      } else {
        defaultSelectedKeys = pathname
      }
    } else { // 如果在home路由
      defaultSelectedKeys = pathname
    }

    //
    const breadcrumbItems = [(
      <Breadcrumb.Item key="/app/home">
        <Link to="/app/home">Home</Link>
      </Breadcrumb.Item>
    )].concat(extraBreadcrumbItems);
    // 面包屑数据end
    return (
      <Layout id="components-layout-demo-custom-trigger">
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
        >
          <div className="logo" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={[defaultSelectedKeys]} defaultOpenKeys={[pathSnippets[1]]}>
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
            <Breadcrumb>
              {breadcrumbItems}
            </Breadcrumb>
            <Dropdown overlay={menu} placement="bottomRight">
              <a className="ant-dropdown-link" href="#">
                苏小小 <Icon type="down" />
              </a>
            </Dropdown>
          </Header>
          <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
            <Routes />
          </Content>
        </Layout>
      </Layout>
    )
  }

}

const mapStateToProps = state => ({
  collapsed: state.collapsed
})

const mapDispatchToProps = dispatch => ({
  onUnfoldToggle: () => dispatch(unfoldAction({   //传个测试数据试试看传参
    a: 12,
    b: '5'
  }))
})

const App = connect(
  mapStateToProps,
  mapDispatchToProps
)(LayoutComponent)

export default App