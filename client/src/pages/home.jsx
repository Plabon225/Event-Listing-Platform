import React,{useEffect} from "react";
import {Link} from "react-router-dom";
import EventStore from "../store/EventStore.js";
import EventCard from "../components/EventCard.jsx";
import AppNavbar from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";

const Home = () => {

    const {EventList,EventListRequest} = EventStore();

    useEffect(()=>{
        (async()=>{
            await EventListRequest();
        })()
    },[]);

    const categories = ["Music","Sports","Technology","Workshop","Business","Festival"];

    return (
        <>
            <AppNavbar/>

            {/* Banner */}
            <div className="bg-primary text-white py-5">
                <div className="container py-5">
                    <div className="row align-items-center">
                        <div className="col-md-8">
                            <h1 className="display-5 fw-bold">
                                Discover Local Events
                            </h1>
                            <p className="lead">Find exciting events happening around you.</p>
                            <Link to="/events" className="btn btn-light">
                                Explore Events
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Categories */}
            <div className="container py-5">
                <h2 className="mb-4">Categories</h2>

                <div className="row">
                    {
                        categories.map((category,index)=>(
                            <div className="col-6 col-md-2 mb-3" key={index}>
                                <Link
                                    to={`/events?category=${category}`}
                                    className="btn btn-outline-primary w-100"
                                >
                                    {category}
                                </Link>
                            </div>
                        ))
                    }
                </div>
            </div>

            {/* Upcoming Events */}
            <div className="container pb-5">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h2 className="mb-0">Upcoming Events</h2>
                    <Link to="/events" className="btn btn-primary">
                        View All
                    </Link>
                </div>

                <div className="row">
                    {
                        EventList ? (
                            EventList.slice(0,6).map((event)=>(
                                <EventCard event={event} key={event._id}/>
                            ))
                        ) : (
                            <div className="text-center py-5">
                                <div className="spinner-border text-primary"></div>
                            </div>
                        )
                    }
                </div>
            </div>

            <Footer/>
        </>
    );
};

export default Home;