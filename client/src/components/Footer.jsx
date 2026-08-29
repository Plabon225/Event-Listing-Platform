import React from "react";

const Footer = () => {
    return (
        <footer className="bg-dark text-white mt-5">
            <div className="container py-4">
                <div className="row">

                    <div className="col-md-6">
                        <h5>EventHub</h5>
                        <p className="mb-0">
                            Find and save your favorite local events.
                        </p>
                    </div>

                    <div className="col-md-6 text-md-end mt-3 mt-md-0">
                        <i className="bi bi-facebook mx-2"></i>
                        <i className="bi bi-instagram mx-2"></i>
                        <i className="bi bi-twitter mx-2"></i>
                    </div>

                </div>

                <hr />

                <div className="text-center">
                    <small>© 2026 EventHub. All Rights Reserved.</small>
                </div>
            </div>
        </footer>
    );
};

export default Footer;