import React,{useEffect,useState} from "react";
import {useSearchParams} from "react-router-dom";
import EventStore from "../store/EventStore.js";
import EventCard from "../components/EventCard.jsx";
import AppNavbar from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";

const Events = () => {
    const {EventList,EventListRequest} = EventStore();
    const [searchParams,setSearchParams] = useSearchParams();
    const [category,setCategory] = useState(searchParams.get("category")||"");
    const [location,setLocation] = useState("");

    useEffect(()=>{
        (async()=>{
            await EventListRequest();
        })()
    },[]);

    const categories = ["Music","Sports","Technology","Workshop","Business","Festival"];

    const filteredEvents = EventList?.filter((event)=>{
        const categoryMatch = category==="" || event.category===category;
        const locationMatch = location==="" || event.location?.toLowerCase().includes(location.toLowerCase());
        return categoryMatch && locationMatch;
    });

    const onCategoryChange = (value)=>{
        setCategory(value);
        if(value){
            setSearchParams({category:value});
        }else{
            setSearchParams({});
        }
    };

    return (
        <>
            <AppNavbar/>

            <div className="container py-5">

                <h2 className="mb-4">All Events</h2>

                {/* Filter */}
                <div className="card shadow-sm mb-4">
                    <div className="card-body">

                        <div className="row">

                            <div className="col-md-6 mb-3">
                                <label className="form-label">Category</label>
                                <select
                                    className="form-select"
                                    value={category}
                                    onChange={(e)=>onCategoryChange(e.target.value)}
                                >
                                    <option value="">All Categories</option>

                                    {
                                        categories.map((item,index)=>(
                                            <option key={index} value={item}>
                                                {item}
                                            </option>
                                        ))
                                    }

                                </select>
                            </div>

                            <div className="col-md-6 mb-3">
                                <label className="form-label">Location</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Search by location"
                                    value={location}
                                    onChange={(e)=>setLocation(e.target.value)}
                                />
                            </div>

                        </div>

                    </div>
                </div>

                {/* Events */}
                <div className="row">

                    {
                        !EventList ? (
                            <div className="text-center py-5">
                                <div className="spinner-border text-primary"></div>
                            </div>
                        ) : filteredEvents?.length>0 ? (
                            filteredEvents.map((event)=>(
                                <EventCard
                                    event={event}
                                    key={event._id}
                                />
                            ))
                        ) : (
                            <div className="text-center py-5">
                                <h5>No events found</h5>
                            </div>
                        )
                    }

                </div>

            </div>

            <Footer/>
        </>
    );
};

export default Events;