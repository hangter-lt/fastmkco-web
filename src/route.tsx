import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import Requests from "./api/requests";
import Frame from "./frame";
import { Empty } from 'antd';

function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={ <Navigate replace to="/api/home" />} />
                <Route path="/mock"  element={<Frame />} >
                    <Route path="home" element={<Home />} />
                    <Route path="requests" element={<Requests />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

const Home = () => <Empty description={false} />;

export default Router;

