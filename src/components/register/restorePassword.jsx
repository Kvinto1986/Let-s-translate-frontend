import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import Swal from 'sweetalert2/dist/sweetalert2.js'

import 'sweetalert2/src/sweetalert2.scss'

import {newCustomerPassword,editPassword} from '../../actions/customerAction';

class NewPassword extends Component {
    state = {
        redirect: '',
        user:{},
        password: '',
        password_confirm: '',
        errors:{}
    };



    handleInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    };

    handleChangeRedirectTrue = (user) => {
        console.log(user)
        this.setState({redirect:true,user:user})
    };

    reset = () => {
        Swal.fire({
            type: 'success',
            title: 'Congratulations!',
            text: 'Your password has been changed successfully!',
            allowOutsideClick: false
        }).then((result) => {
            if (result.value) {
                this.props.history.push('/login');
            }
        })

    };

    handleChangeRedirectFalse = () => {
        this.setState({redirect:false})
    };

    handleSubmit = (e) => {
        e.preventDefault();

        const user = {
            id: this.state.user.id,
            password: this.state.password,
            password_confirm: this.state.password_confirm
        };

        this.props.editPassword(user,this.reset)
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }

    componentDidMount() {
        const password = this.props.location.pathname.replace('/newPassword/','');
        console.log(password)
        this.props.newCustomerPassword({password: password},this.handleChangeRedirectTrue,this.handleChangeRedirectFalse)
    }

    render() {
        const {errors} = this.state;
        if (this.state.redirect===true) {

            return (
                <div className='col-12 row mt-5 d-flex flex-wrap justify-content-center'>
                    <h1 className='text-info'>Please, you can change your password.</h1>
                    <form className='col-8 row mt-5 d-flex flex-wrap justify-content-center'>
                        <div className="form-group">
                            <label>Email: </label>
                            <input
                                type="email"
                                name="email"
                                className="form-control"
                                value={this.state.user.email}
                                disabled={true}
                            />
                        </div>

                        <div className="form-group ml-5">
                            <label>Name: </label>
                            <input
                                type="text"
                                name="name"
                                className="form-control"
                                value={this.state.user.name}
                                disabled={true}
                            />
                        </div>

                        <div className="form-group col-8">
                            <label>New password: </label>
                            <input
                                type="password"
                                placeholder="Password"
                                name="password"
                                className="form-control"
                                onChange={this.handleInputChange}
                                value={this.state.password}
                            />
                        </div>

                        <div className="form-group col-8">
                            <label>Confirm new password: </label>
                            <input
                                type="password"
                                placeholder="Confirm Password"
                                name="password_confirm"
                                className="form-control"
                                onChange={this.handleInputChange}
                                value={this.state.password_confirm}
                            />
                            {errors.password && (<div className='text-danger'>{errors.password}</div>)}
                        </div>
                        <button className='btn btn-info col-7' onClick={this.handleSubmit}>Change password</button>
                    </form>
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

const mapStateToProps = (state) => ({
    errors: state.errors
});

export default connect(mapStateToProps, {newCustomerPassword,editPassword})(NewPassword)