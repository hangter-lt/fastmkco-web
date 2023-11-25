import React, { useState } from 'react';
import { Button, Layout, Menu, theme, Divider } from 'antd';
import MenuItem from 'antd/es/menu/MenuItem';
import Item from 'antd/es/list/Item';


const { Header, Content, Sider } = Layout;

type Item = {
  id?: number
  uri?: string
  method?: string
  key?: string
  label?: string
}
type Items = Item[]
const menuItems: Items = []
var menuItem: Items = []

// const eventSource = new EventSource(`/api/requests`);

const App: React.FC = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const [reqs, setReqs] = useState(menuItems)


  // // 处理事件流
  // eventSource.onopen = function () {
  //   console.log("open")
  // }
  // eventSource.onmessage = function (ev) {

  //   console.log("event")
  //   const item: Item = JSON.parse(ev.data);
  //   setReqs([item].concat(menuItem))
  //   menuItem.unshift(item)
  // };
  // eventSource.onerror = function () {
  //   console.log("error");
  //   eventSource.close();
  // };

  return (
    <Layout style={{ height: '100%' }}>
      <Header style={{ display: 'flex', alignItems: 'center' }}>
        <div className="demo-logo" >
          logo占位符
        </div>
      </Header>
      <Content style={{ padding: '0 50px', height: '100%' }}>
        <Layout style={{ height: '100%', padding: '10px 0px', background: colorBgContainer }}>
          <Sider style={{ background: colorBgContainer, overflow: 'auto' }} width={200}>
            <Menu
              mode="inline"
              defaultSelectedKeys={[]}
              style={{ height: '100%' }}
              selectedKeys={[]}
            >
              {reqs.map((r) => (
                <MenuItem key={r.id} > {r.method}: {r.uri} </MenuItem>
              ))}
            </Menu>
          </Sider>
          <Content style={{ padding: '0 24px' }}>
            <Divider type="vertical" />

          </Content>
        </Layout>
      </Content>
    </Layout>
  );
};

export default App;