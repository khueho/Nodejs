import React from "react";
import "./styles.scss"
import { Layout, Menu } from 'antd';
import { Link, Route, Switch } from 'wouter';
import { Home } from "./page/Home";
import { Category } from "./page/Category";

const { Header, Content } = Layout;

const items = [
  {
    key: "home",
    label: <Link href="/">Home</Link>
  },
  {
    key: "category",
    label: <Link href="/catagory">Category</Link>
  }
]

const Application: React.FC = () => {
    return <Layout className="body-wrapper">
        <Header>
          <Menu theme="dark" mode="horizontal" items={items}>
            {/* <Menu.Item key="home">
              <Link href="/">Home</Link>
            </Menu.Item>
            <Menu.Item key="catagory">
              <Link href="/catagory">Category</Link>
            </Menu.Item> */}
          
          </Menu>
        </Header>
        <Content>
          <Switch>
            <Route path="/" component={Home} />
            <Route path="/catagory" component={Category} />
          </Switch>
        </Content>
      </Layout>;
  };

export default Application;