import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {loginUser} from '../../actions/authAction';

class Confirm extends Component {
    state={
        confirmUserEmail:'',
        confirmUserCreditCard:'',
        redirect:false,
    };
    

    componentDidMount() {
        const userDataString=this.props.location.pathname.split('/')[2];
        if(userDataString) {
            this.setState({
                confirmUserCreditCard: userDataString.substr(0, 16),
                confirmUserEmail: userDataString.substr(16),
            });

        }

        else {
            console.log(userDataString)
        }
    }

    render() {

        console.log(this.state)
        if (this.state.redirect) {
            return (
               <h1>Noooooo</h1>
            )
        }
        else return (
            <h1>{this.state.confirmUserEmail} </h1>
        )
    }
}

Confirm.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps, {loginUser})(Confirm)