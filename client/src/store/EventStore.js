import {create} from 'zustand';
import axios from 'axios';

const EventStore = create((set)=>({
    EventList:null,

    // All Events
    EventListRequest:async ()=>{
        set({EventList:null})
        let res = await axios.get(`/api/events`);
        if(res.data['status']==="success"){
            set({EventList:res.data['data']});
        }
    },

    // Single Event
    EventDetails:null,
    EventDetailsRequest:async (id)=>{
        set({EventDetails:null})
        let res = await axios.get(`/api/events/${id}`);
        if(res.data['status']==="success"){
            set({EventDetails:res.data['data']});
        }
    },

    // Create Event
    CreateEventRequest:async (postBody)=>{
        let res = await axios.post(`/api/events`,postBody,{withCredentials:true});
        return res.data;
    },

    // Update Event
    UpdateEventRequest:async (id,postBody)=>{
        let res = await axios.put(`/api/events/${id}`,postBody,{withCredentials:true});
        return res.data;
    },

    // Delete Event
    DeleteEventRequest:async (id)=>{
        let res = await axios.delete(`/api/events/${id}`,{withCredentials:true});
        return res.data;
    },

    // Save Event
    SaveEventRequest:async (id)=>{
        let res = await axios.post(`/api/events/${id}/save`,{},{withCredentials:true});
        return res.data;
    }
}))

export default EventStore;