import React, {Component} from 'react'
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

class CustomerPage extends Component {

    render() {

        return (
            <div className="registerCustomer">
                <h1>Admin page</h1>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors,
});

export default connect(mapStateToProps, {})(withRouter(CustomerPage))