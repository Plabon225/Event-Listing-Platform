import React from "react";
import { Link, useNavigate } from "react-router-dom";
import userStore from "../store/UserStore.js";

const AppNavbar = () => {

    const navigate = useNavigate();

    const { isLogin, UserLogoutRequest } = userStore();

    const onLogout = async () => {

        await UserLogoutRequest();

        sessionStorage.clear();
        localStorage.clear();

        navigate("/");
    };


    return (
        <>

            {/* Top Header */}
            <div className="container-fluid text-white p-2 bg-primary">

                <div className="container">

                    <div className="row">

                        <div className="col-md-6">
                            <span>
                                <i className="bi bi-calendar-event"></i>
                                {" "}EventHub
                            </span>
                        </div>

                        <div className="col-md-6">

                            <span className="float-end">

                                <span className="mx-2">
                                    <i className="bi bi-facebook"></i>
                                </span>

                                <span className="mx-2">
                                    <i className="bi bi-instagram"></i>
                                </span>

                                <span>
                                    <i className="bi bi-twitter"></i>
                                </span>

                            </span>

                        </div>

                    </div>

                </div>

            </div>


            {/* Navbar */}
            <nav className="navbar sticky-top shadow-sm bg-white navbar-expand-lg navbar-light py-3">

                <div className="container">

                    {/* Logo */}
                    <Link className="navbar-brand fw-bold" to="/">
                        EventHub
                    </Link>


                    {/* Mobile Menu Button */}
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#nav06"
                        aria-controls="nav06"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >

                        <span className="navbar-toggler-icon"></span>

                    </button>


                    {/* Menu */}
                    <div className="collapse navbar-collapse" id="nav06">

                        <ul className="navbar-nav mt-3 mt-lg-0 mb-3 mb-lg-0 ms-lg-3">

                            <li className="nav-item">

                                <Link
                                    className="btn ms-2 btn-light"
                                    to="/"
                                >
                                    <i className="bi bi-house"></i> Home
                                </Link>

                            </li>


                            <li className="nav-item">

                                <Link
                                    className="btn ms-2 btn-light"
                                    to="/events"
                                >
                                    <i className="bi bi-calendar-event"></i> Events
                                </Link>

                            </li>


                            {
                                isLogin() && (

                                    <li className="nav-item">

                                        <Link
                                            className="btn ms-2 btn-light"
                                            to="/dashboard"
                                        >
                                            <i className="bi bi-person"></i> Dashboard
                                        </Link>

                                    </li>

                                )
                            }

                        </ul>

                    </div>


                    {/* Login / Logout */}
                    <div className="d-lg-flex">

                        {
                            isLogin() ? (

                                <button
                                    onClick={onLogout}
                                    className="btn btn-danger ms-3"
                                >
                                    <i className="bi bi-box-arrow-right"></i>
                                    {" "}Logout
                                </button>

                            ) : (

                                <Link
                                    className="btn btn-primary ms-3"
                                    to="/login"
                                >
                                    <i className="bi bi-box-arrow-in-right"></i>
                                    {" "}Login
                                </Link>

                            )
                        }

                    </div>

                </div>

            </nav>

        </>
    );
};

export default AppNavbar;