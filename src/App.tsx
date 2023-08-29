import React from 'react';
import './App.css';
import HeaderBar from "./Components/HeaderBar";
import {Navigate, Route, Routes, useParams} from "react-router-dom";
import Feed from "./Pages/Feed";
import Explore from "./Pages/Explore";
import NewPost from "./Pages/NewPost";
import Landing from './Pages/Landing';
import NotFound from './Pages/NotFound';
import 'bootstrap/dist/css/bootstrap.min.css';
import Profile from "./Pages/Profile";

function App() {

    const ProfileComponentWrapper = () => {
        const { username } = useParams();
        // @ts-ignore
        return <Profile username={username} />;
    };

    return (
        <div className="App">
            <HeaderBar/>
            <Routes>
                <Route path="/" element={<Landing/>}/>
                <Route path="/feed" element={<Feed/>}/>
                <Route path="/explore" element={<Explore/>}/>
                <Route path="/post" element={<NewPost/>}/>
                <Route path="/profile/:username" element={<ProfileComponentWrapper/>}/>
                <Route path="/notfound" element={<NotFound/>}/>
                <Route element={<Navigate to="/notfound" />} />
            </Routes>
        </div>
    );
}

export default App;
