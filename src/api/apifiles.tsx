import React, { useState, useEffect } from 'react';
import { Layout, Tree, theme, Switch } from 'antd';
import axios from 'axios';
import { MdEditor } from 'md-editor-rt';
import 'md-editor-rt/lib/style.css';


const { Content, Sider } = Layout;

const ApiFiles: React.FC = () => {
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const [showIcon, setShowIcon] = useState<boolean>(false);

    const [tree, setTree] = useState([])

    const [content, setContent] = useState("")
    
    const [editContent, setEditContent] = useState(content)

    const [path, setPath] = useState("")

    function getTree() {
        axios.get("/api/tree").then((res) => {
            setTree(res.data)
        })
    }

    // @ts-ignore
    const select = (selectedKeys: any, e: {
        event: 'select';
        selected: boolean;
        node: any;
        selectedNodes: any;
        nativeEvent: MouseEvent;
    }) => {
        if (e.node.type == "file") {
            axios.get("/api/file/" + e.node.key).then((res) => {
                setContent(res.data)
                setPath(e.node.key)
            })
        }
    }

    const change = (v: string) => {
        setEditContent(v)
    }
    
    // @ts-ignore
    const save = (v: string, h: Promise<string>)=> {
        axios.post("/api/files/write", {
            "path": path,
            "file": editContent,
        }).then((res) => {
            console.log(res)
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
                    onSelect={select}
                />

            </Sider>
            <Content style={{ padding: '30px 30px', display: "flex" }}>
                <MdEditor
                    modelValue={content}
                    style={{ height: "100%" }}
                    onSave={save}
                    onChange={change}
                />;
            </Content>
        </Layout >
    );
};

export default ApiFiles;