import React, { useState, useEffect } from 'react';
import { Button, Layout, Tree, theme, Switch } from 'antd';
import axios from 'axios';

const { Content, Sider } = Layout;

const ApiFiles: React.FC = () => {
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const [showIcon, setShowIcon] = useState<boolean>(false);


    const [tree, setTree] = useState([])

    function getTree() {
        axios.get("/api/tree").then((res) => {
            setTree(res.data)
        })
    }

    useEffect(() => {
        getTree()
    }, []);


    return (
        <Layout style={{ background: colorBgContainer, height: '100%', padding: '10px 0px' }}>
            <Sider style={{ background: colorBgContainer, overflow: 'auto' }} width={300}>
                <Switch style={{ display: 'none' }} checked={showIcon} onChange={setShowIcon} />

                <Tree
                    showIcon={showIcon}
                    treeData={tree}
                />

            </Sider>
            <Content style={{ padding: '30px 30px', display: "flex" }}>
            </Content>
        </Layout>
    );
};

export default ApiFiles;