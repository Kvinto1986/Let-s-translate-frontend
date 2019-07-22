import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {confirmationCustomer} from '../../actions/customerAction';

class Confirm extends Component {
    state = {
        redirect: '',
    };

    handleChangeRedirectTrue = () => {
        this.setState({redirect:true})
    };

    handleChangeRedirectFalse = () => {
        this.setState({redirect:false})
    };

    reset = () => {
        this.setState({redirect:''})
    };



    componentDidMount() {
        const hash = this.props.location.pathname.replace('/confirm/','');
        console.log(hash)
        this.props.confirmationCustomer({hash: hash},this.handleChangeRedirectTrue,this.handleChangeRedirectFalse)
    }

    render() {

        console.log(this.state)
        if (this.state.redirect===true) {

            return (
                <div className='col-12 row mt-5 d-flex flex-wrap justify-content-center text-info'>
                    <h1>Congratulations, your profile has been verified!</h1>
                </div>
            )
        } else if (this.state.redirect===false) {
            this.props.history.push('/');
            return (
                <h1>Customer not found</h1>
            )
        }
        else return null
    }
}

Confirm.propTypes = {
    errors: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    errors: state.errors
});

export default connect(mapStateToProps, {confirmationCustomer})(Confirm)