import '../CSS/NotFound.css';
import React from 'react';
import { Link } from 'react-router-dom';
function NotFound() {
    return (
        <>
            <div className="container-404">
                <div className="card-404">
                    <i className="fa fa-blind icon-404" aria-hidden="true"></i>
                    <p className="heading-404">404 Page Not Found!</p>
                    <p className="description-404">This page you are looking for doesn't exist or error occured.</p>
                    <div className="buttonContainer">
                        <Link to={'/'}>
                            <button className="acceptButton">
                                <i className="fa fa-arrow-left" aria-hidden="true"></i> Back
                            </button>
                        </Link>
                    </div>             
                </div>
            </div>
        </>
    )
}

export default NotFound;