import React, { useState, useEffect } from 'react';
import { Button, Layout, Tree, theme, Switch } from 'antd';
import axios from 'axios';
import { MdEditor } from 'md-editor-rt';
import 'md-editor-rt/lib/style.css';


const { Content, Sider } = Layout;

// const vditor = new Vditor("md", {mode:"sv"})

const ApiFiles: React.FC = () => {
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const [showIcon, setShowIcon] = useState<boolean>(false);

    const [tree, setTree] = useState([])

    const [content, setContent] = useState("")

    function getTree() {
        axios.get("/api/tree").then((res) => {
            setTree(res.data)
        })
    }

    function a(selectedKeys: any, e: {
        event: 'select';
        selected: boolean;
        node: any;
        selectedNodes: any;
        nativeEvent: MouseEvent;
    }) {
        if (e.node.type == "file") {
            axios.get("/api/file/" + e.node.key).then((res) => {
                setContent(res.data)
            })
        }
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
                    onSelect={a}
                />

            </Sider>
            <Content style={{ padding: '30px 30px', display: "flex" }}>
                <MdEditor modelValue={content} style={{ height: "100%" }} />;
            </Content>
        </Layout >
    );
};

export default ApiFiles;