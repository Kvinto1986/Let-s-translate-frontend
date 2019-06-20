import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom';
import {Link} from 'react-router-dom'

const Home = props => {
    return (
        <div className='landing'>
            <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
                <ol className="carousel-indicators">
                    <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                </ol>
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img className="d-block w-100" src="public/images/carousel/dogi.jpeg" alt="First slide" />
                        <div className="carousel-caption d-none d-md-block">
                            <h5>Best of ever translators!</h5>
                            <p>Our transloators make translates so fast!</p>
                        </div>
                    </div>
                    <div className="carousel-item">
                        <img className="d-block w-100" src="../public/images/carousel/dogi.jpeg" alt="Second slide" />
                        <div className="carousel-caption d-none d-md-block">
                            <h5>Best of ever translators!</h5>
                            <p>Our transloators make translates so fast!</p>
                        </div>
                    </div>
                    <div className="carousel-item">
                        <img className="d-block w-100" src=".../public/images/carousel/dogi.jpeg" alt="Third slide" />
                        <div className="carousel-caption d-none d-md-block">
                            <h5>Best of ever translators!</h5>
                            <p>Our transloators make translates so fast!</p>
                        </div>
                    </div>
                </div>
                <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="sr-only">Previous</span>
                </a>
                <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="sr-only">Next</span>
                </a>
            </div>
            <div className="text-warning">
                TODO: Tarifs
            </div>
            <div className="bottomSide">
                <Link to="/registerCustomer">Click here to register as customer</Link>
            </div>
        </div>
    )
}


export default connect()(withRouter(Home))