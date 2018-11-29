import React from "react";
import { Link } from 'react-router-dom';

export default class Home extends React.Component {
  constructor(props) {
    super(props)
    $axios({ // 测试axios
      baseURL: 'https://as-vip.missfresh.cn',
      method: 'get',
      url: '/web20/system/miniStart/?device_id=528ae280-8a5f-11e8-a933-fb1edfe50af4&env=web&platform=web&uuid=528ae280-8a5f-11e8-a933-fb1edfe50af4&access_token=null&version=.0.2&fromSource=zhuye&screen_height=375&screen_width=812',
    }).then(res => {
      console.log(res)
    }).catch(e => {
      console.log(e)
    })
  }
  render() {
    return (
      <div>
        <h1>Login</h1>
        <Link to="/">返回主页</Link>
      </div>
    )
  }
}