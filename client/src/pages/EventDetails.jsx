import React,{useEffect} from "react";
import {Link,useNavigate,useParams} from "react-router-dom";
import EventStore from "../store/EventStore.js";
import UserStore from "../store/UserStore.js";
import AppNavbar from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";

const EventDetails = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const {EventDetails,EventDetailsRequest,SaveEventRequest} = EventStore();
    const {isLogin} = UserStore();

    useEffect(()=>{
        (async()=>{
            await EventDetailsRequest(id);
        })()
    },[id]);

    const onSaveEvent = async()=>{
        if(!isLogin()){
            navigate("/login");
            return;
        }

        let result = await SaveEventRequest(id);

        if(result.status==="success"){
            alert("Event saved successfully");
        }else{
            alert(result.message||"Something went wrong");
        }
    };

    return (
        <>
            <AppNavbar/>

            <div className="container py-5">

                {!EventDetails ? (
                    <div className="text-center py-5">
                        <div className="spinner-border text-primary"></div>
                    </div>
                ) : (
                    <div className="row">

                        <div className="col-md-7 mb-4">

                            {EventDetails.img && (
                                <img
                                    src={EventDetails.img}
                                    className="img-fluid rounded"
                                    alt={EventDetails.name}
                                />
                            )}

                        </div>

                        <div className="col-md-5">

                            <h2>{EventDetails.name}</h2>

                            {EventDetails.category && (
                                <span className="badge bg-primary mb-3">
                                    {EventDetails.category}
                                </span>
                            )}

                            <p>
                                <i className="bi bi-calendar-event"></i>{" "}
                                <strong>Date:</strong> {EventDetails.date}
                            </p>

                            <p>
                                <i className="bi bi-clock"></i>{" "}
                                <strong>Time:</strong> {EventDetails.time}
                            </p>

                            <p>
                                <i className="bi bi-geo-alt"></i>{" "}
                                <strong>Location:</strong> {EventDetails.location}
                            </p>

                            <hr/>

                            <h5>Description</h5>

                            <p>
                                {EventDetails.description}
                            </p>

                            <button
                                onClick={onSaveEvent}
                                className="btn btn-primary me-2"
                            >
                                <i className="bi bi-bookmark"></i>{" "}
                                Save Event
                            </button>

                            <Link
                                to="/events"
                                className="btn btn-outline-secondary"
                            >
                                Back to Events
                            </Link>

                        </div>

                    </div>
                )}

            </div>

            <Footer/>
        </>
    );
};

export default EventDetails;