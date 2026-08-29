import React from "react";
import {Link} from "react-router-dom";

const EventCard = ({event}) => {
    return (
        <div className="col-md-4 mb-4">
            <div className="card h-100 shadow-sm">

                {event.img && (
                    <img src={event.img} className="card-img-top" alt={event.name} style={{height:"200px",objectFit:"cover"}}/>
                )}

                <div className="card-body">
                    <h5 className="card-title">{event.name}</h5>
                    <p className="card-text mb-1">
                        <i className="bi bi-calendar-event"></i>{" "}
                        {event.date}
                    </p>

                    <p className="card-text mb-1">
                        <i className="bi bi-clock"></i>{" "}
                        {event.time}
                    </p>

                    <p className="card-text">
                        <i className="bi bi-geo-alt"></i>{" "}
                        {event.location}
                    </p>

                    {event.category && (
                        <span className="badge bg-primary">
                            {event.category}
                        </span>
                    )}
                </div>

                <div className="card-footer bg-white border-0">
                    <Link
                        to={`/events/${event._id}`}
                        className="btn btn-primary w-100"
                    >
                        View Details
                    </Link>
                </div>

            </div>
        </div>
    );
};

export default EventCard;