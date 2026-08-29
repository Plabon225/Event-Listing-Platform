import React,{useState} from "react";
import {Link,useNavigate} from "react-router-dom";
import UserStore from "../store/UserStore.js";
import AppNavbar from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";

const Login = () => {
    const navigate = useNavigate();
    const {UserLoginRequest} = UserStore();

    const [formData,setFormData] = useState({
        email:"",
        password:""
    });

    const [loading,setLoading] = useState(false);

    const onChange = (e)=>{
        setFormData({
            ...formData,
            [e.target.name]:e.target.value
        });
    };

    const onSubmit = async(e)=>{
        e.preventDefault();
        setLoading(true);

        let result = await UserLoginRequest(formData);

        setLoading(false);

        if(result.status==="success"){
            navigate("/dashboard");
        }else{
            alert(result.message||"Login failed");
        }
    };

    return (
        <>
            <AppNavbar/>

            <div className="container py-5">
                <div className="row justify-content-center">
                    <div className="col-md-5">

                        <div className="card shadow-sm">
                            <div className="card-body p-4">

                                <h3 className="text-center mb-4">
                                    Login
                                </h3>

                                <form onSubmit={onSubmit}>

                                    <div className="mb-3">
                                        <label className="form-label">
                                            Email
                                        </label>

                                        <input type="email" name="email" className="form-control" value={formData.email} onChange={onChange} required/>
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label">
                                            Password
                                        </label>

                                        <input type="password" name="password" className="form-control" value={formData.password} onChange={onChange} required/>
                                    </div>

                                    <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                                        {loading ? "Logging in..." : "Login"}
                                    </button>

                                </form>

                                <p className="text-center mt-3 mb-0">
                                    Don't have an account?{" "}
                                    <Link to="/register">
                                        Register
                                    </Link>
                                </p>

                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <Footer/>
        </>
    );
};

export default Login;