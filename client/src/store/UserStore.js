import {create} from 'zustand';
import axios from 'axios';

const UserStore = create((set)=>({
    User: null,

    // Register
    UserRegisterRequest:async (postBody)=>{
        let res = await axios.post(`/api/register`,postBody);
        return res.data;
    },

    // Login
    UserLoginRequest:async (postBody)=>{
        let res = await axios.post(`/api/login`,postBody,{withCredentials:true});
        if(res.data['status']==="success"){
            set({User:res.data['data']||true});
        }
        return res.data;
    },

    // Logout
    UserLogoutRequest:async ()=>{
        let res = await axios.post(`/api/logout`,{},{withCredentials:true});
        if(res.data['status']==="success"){
            set({User:null});
        }
        return res.data;
    },

    // Login Check
    isLogin:()=>{
        return document.cookie.includes("token=");
    }
}))

export default UserStore;