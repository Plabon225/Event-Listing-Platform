import React,{useEffect,useState} from "react";
import EventStore from "../store/EventStore.js";
import AppNavbar from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";

const Dashboard = () => {
    const {
        EventList,
        EventListRequest,
        CreateEventRequest,
        UpdateEventRequest,
        DeleteEventRequest
    } = EventStore();

    const [editId,setEditId] = useState(null);
    const [loading,setLoading] = useState(false);

    const [formData,setFormData] = useState({
        name:"",
        date:"",
        time:"",
        location:"",
        category:"",
        description:"",
        img:""
    });

    useEffect(()=>{
        (async()=>{
            await EventListRequest();
        })()
    },[]);

    const onChange = (e)=>{
        setFormData({
            ...formData,
            [e.target.name]:e.target.value
        });
    };

    const onSubmit = async(e)=>{
        e.preventDefault();
        setLoading(true);

        let result;

        if(editId){
            result = await UpdateEventRequest(editId,formData);
        }else{
            result = await CreateEventRequest(formData);
        }

        setLoading(false);

        if(result.status==="success"){
            alert(editId ? "Event updated successfully" : "Event created successfully");

            setFormData({
                name:"",
                date:"",
                time:"",
                location:"",
                category:"",
                description:"",
                img:""
            });

            setEditId(null);
            await EventListRequest();
        }else{
            alert(result.message||"Something went wrong");
        }
    };

    const onEdit = (event)=>{
        setEditId(event._id);

        setFormData({
            name:event.name||"",
            date:event.date||"",
            time:event.time||"",
            location:event.location||"",
            category:event.category||"",
            description:event.description||"",
            img:event.img||""
        });

        window.scrollTo({
            top:0,
            behavior:"smooth"
        });
    };

    const onDelete = async(id)=>{
        if(!window.confirm("Are you sure you want to delete this event?")){
            return;
        }

        let result = await DeleteEventRequest(id);

        if(result.status==="success"){
            alert("Event deleted successfully");
            await EventListRequest();
        }else{
            alert(result.message||"Delete failed");
        }
    };

    const onCancel = ()=>{
        setEditId(null);

        setFormData({
            name:"",
            date:"",
            time:"",
            location:"",
            category:"",
            description:"",
            img:""
        });
    };

    return (
        <>
            <AppNavbar/>

            <div className="container py-5">

                <h2 className="mb-4">User Dashboard</h2>

                {/* Create / Update Event */}
                <div className="card shadow-sm mb-5">
                    <div className="card-body">

                        <h4 className="mb-4">
                            {editId ? "Update Event" : "Create Event"}
                        </h4>

                        <form onSubmit={onSubmit}>

                            <div className="row">

                                <div className="col-md-6 mb-3">
                                    <label className="form-label">
                                        Event Name
                                    </label>

                                    <input type="text" name="name" className="form-control" value={formData.name} onChange={onChange} required/>
                                </div>

                                <div className="col-md-6 mb-3">
                                    <label className="form-label">
                                        Category
                                    </label>

                                    <select name="category" className="form-select" value={formData.category} onChange={onChange} required>
                                        <option value="">
                                            Select Category
                                        </option>
                                        <option value="Music">Music</option>
                                        <option value="Sports">Sports</option>
                                        <option value="Technology">Technology</option>
                                        <option value="Workshop">Workshop</option>
                                        <option value="Business">Business</option>
                                        <option value="Festival">Festival</option>
                                    </select>
                                </div>

                                <div className="col-md-4 mb-3">
                                    <label className="form-label">
                                        Date
                                    </label>

                                    <input type="date" name="date" className="form-control" value={formData.date} onChange={onChange} required/>
                                </div>

                                <div className="col-md-4 mb-3">
                                    <label className="form-label">
                                        Time
                                    </label>

                                    <input type="time" name="time" className="form-control" value={formData.time} onChange={onChange} required/>
                                </div>

                                <div className="col-md-4 mb-3">
                                    <label className="form-label">
                                        Location
                                    </label>

                                    <input type="text" name="location" className="form-control" value={formData.location} onChange={onChange} required/>
                                </div>

                                <div className="col-md-12 mb-3">
                                    <label className="form-label">
                                        Image URL
                                    </label>

                                    <input type="text" name="img" className="form-control" value={formData.img} onChange={onChange}/>
                                </div>

                                <div className="col-md-12 mb-3">
                                    <label className="form-label">
                                        Description
                                    </label>

                                    <textarea name="description" className="form-control" rows="4" value={formData.description} onChange={onChange} required></textarea>
                                </div>

                            </div>

                            <button type="submit" className="btn btn-primary me-2" disabled={loading}>
                                {loading
                                    ? "Please wait..."
                                    : editId
                                        ? "Update Event"
                                        : "Create Event"
                                }
                            </button>

                            {editId && (
                                <button type="button" className="btn btn-secondary" onClick={onCancel}>
                                    Cancel
                                </button>
                            )}

                        </form>

                    </div>
                </div>

                {/* My Events */}
                <h4 className="mb-4">My Events</h4>

                <div className="row">

                    {!EventList ? (
                        <div className="text-center py-5">
                            <div className="spinner-border text-primary"></div>
                        </div>
                    ) : EventList.length > 0 ? (

                        EventList.map((event)=>(
                            <div
                                className="col-md-6 col-lg-4 mb-4"
                                key={event._id}
                            >
                                <div className="card h-100 shadow-sm">

                                    {event.img && (
                                        <img
                                            src={event.img}
                                            className="card-img-top"
                                            alt={event.name}
                                            style={{
                                                height:"180px",
                                                objectFit:"cover"
                                            }}
                                        />
                                    )}

                                    <div className="card-body">

                                        <h5 className="card-title">
                                            {event.name}
                                        </h5>

                                        <p className="mb-1">
                                            <i className="bi bi-calendar-event"></i>{" "}
                                            {event.date}
                                        </p>

                                        <p className="mb-1">
                                            <i className="bi bi-clock"></i>{" "}
                                            {event.time}
                                        </p>

                                        <p className="mb-2">
                                            <i className="bi bi-geo-alt"></i>{" "}
                                            {event.location}
                                        </p>

                                        <span className="badge bg-primary">
                                            {event.category}
                                        </span>

                                    </div>

                                    <div className="card-footer bg-white">

                                        <button onClick={()=>onEdit(event)} className="btn btn-warning btn-sm me-2">
                                            <i className="bi bi-pencil"></i>{" "}
                                            Edit
                                        </button>

                                        <button onClick={()=>onDelete(event._id)} className="btn btn-danger btn-sm">
                                            <i className="bi bi-trash"></i>{" "}
                                            Delete
                                        </button>

                                    </div>

                                </div>
                            </div>
                        ))

                    ) : (

                        <div className="text-center py-5">
                            <h5>No events found</h5>
                        </div>

                    )}

                </div>

            </div>

            <Footer/>
        </>
    );
};

export default Dashboard;