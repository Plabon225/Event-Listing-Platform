import React from "react";
import {BrowserRouter,Routes,Route} from "react-router-dom";

import Home from "./pages/home.jsx";
import Events from "./pages/events.jsx";
import EventDetails from "./pages/EventDetails.jsx";
import Login from "./pages/login.jsx";
import Register from "./pages/register.jsx";
import Dashboard from "./pages/dashboard.jsx";

import ProtectedRoute from "./components/ProtectedRoute.jsx";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>

                <Route path="/" element={<Home/>}/>

                <Route path="/events" element={<Events/>}/>

                <Route path="/events/:id" element={<EventDetails/>}/>

                <Route path="/login" element={<Login/>}/>

                <Route path="/register" element={<Register/>}/>

                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Dashboard/>
                        </ProtectedRoute>
                    }
                />

            </Routes>
        </BrowserRouter>
    );
};

export default App;