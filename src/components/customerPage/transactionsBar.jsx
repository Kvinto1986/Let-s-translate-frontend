import React, {Component} from 'react'
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {getCustomersTranslates} from "../../actions/translate/getTranslatesForCustomer";

class OrdersBar extends Component {

    componentDidMount() {
        this.props.getCustomersTranslates({email: this.props.auth.user.email});
    }

    render() {

        const translatesArray = this.props.customerTranslates;
        console.log(translatesArray)


        return (
            <div className='col-12 d-flex flex-wrap justify-content-center'>
                <h1 className='col-12 d-flex flex-wrap justify-content-center'>My orders:</h1>
                <ul className="nav nav-pills mb-3 mt-3" id="pills-tab" role="tablist">
                    <li className="nav-item">
                        <a className="nav-link active" id="pills-home-tab" data-toggle="pill" href="#"
                           role="tab" aria-controls="pills-home" aria-selected="true">In Progress</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" id="pills-profile-tab" data-toggle="pill" href="#"
                           role="tab" aria-controls="pills-profile" aria-selected="false">Completed</a>
                    </li>
                </ul>
                <div className="tab-content col-12" id="pills-tabContent">
                    <div className="tab-pane fade show active" id="pills-home" role="tabpanel"
                         aria-labelledby="pills-home-tab">In Progress
                    </div>
                    <div className="tab-pane fade" id="pills-profile" role="tabpanel"
                         aria-labelledby="pills-profile-tab">Completed
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
    customerTranslates: state.customerTranslates,
});

export default connect(mapStateToProps, {
    getCustomersTranslates
})(withRouter(OrdersBar))