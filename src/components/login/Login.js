import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {loginUser} from '../../actions/authAction';
import {restoreCustomerPassword} from '../../actions/customerAction';

import Swal from 'sweetalert2/dist/sweetalert2.js'

import 'sweetalert2/src/sweetalert2.scss'

class Login extends Component {

    state = {
        email: '',
        password: '',
        role: '',
        errors: {},
        restoreEmail: '',
        userStatus: false
    };

    handleInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    };

    handleChangeUser = () => {
        this.setState({userStatus: !this.state.userStatus});
    };

    reset = () => {
        Swal.fire({
            type: 'success',
            title: 'Congratulations!',
            text: 'The action was successful!!',
            allowOutsideClick: false
        }).then(() => {this.props.history.push('/')})
    };

    handleRestorePassword = () => {
            this.props.restoreCustomerPassword({email: this.state.restoreEmail},this.reset)
    };

    handleSubmit = (e) => {
        e.preventDefault();

        const user = {
            email: this.state.email,
            password: this.state.password,
        };

        let path = '';

        if (this.state.userStatus) {
            path = 'api/users/login';
        }

        if (!this.state.userStatus) {
            path = 'api/customers/login';
        }

        this.props.loginUser(user, path);
    };


    componentDidMount = () => {
        if (this.props.auth.isAuthenticated) {
            this.props.history.push('/');
        }
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.auth.isAuthenticated) {
            this.props.history.push('/')
        }
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }

    render() {
        const {errors} = this.state;

        return (
            <div className="login">
                <div className="container">
                    <h2>Login</h2>
                    <h5 className="text-info">{this.state.userStatus ? 'Translator' : 'Customer'}</h5>
                    <label className="radio-inline">
                        <input
                            type="radio"
                            checked={!this.state.userStatus}
                            onChange={this.handleChangeUser}
                        />
                        <span className='ml-2'>Customer</span>
                    </label>
                    <label className="radio-inline ml-5 ">
                        <input
                            type="radio"
                            checked={this.state.userStatus}
                            onChange={this.handleChangeUser}
                        />
                        <span className='ml-2'>Translator</span>
                    </label>

                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <input
                                type="email"
                                placeholder="Email"
                                name="email"
                                className="form-control"
                                onChange={this.handleInputChange}
                                value={this.state.email}
                            />
                            {errors.email && (<div className='text-danger'>{errors.email}</div>)}
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                placeholder="Password"
                                name="password"
                                className="form-control"
                                onChange={this.handleInputChange}
                                value={this.state.password}

                            />
                            {errors.password && (<div className='text-danger'>{errors.password}</div>)}
                            {errors.confirmation && (<div className='text-danger'>{errors.confirmation}</div>)}
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn btn-info">
                                Login
                            </button>
                        </div>
                    </form>
                    {!this.state.userStatus ? (<button type="button" className="btn btn-warning" data-toggle="modal"
                                                       data-target="#exampleModalCenter">
                            I've forgot my password
                        </button>
                    ) : null}

                    <div className="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog"
                         aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLongTitle">Enter your email</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <input
                                        type="email"
                                        placeholder="Email"
                                        name="restoreEmail"
                                        className="form-control"
                                        onChange={this.handleInputChange}
                                        value={this.state.restoreEmail}
                                    />
                                    {errors.restoreCustomer && (
                                        <div className='text-danger'>{errors.restoreCustomer}</div>)}
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close
                                    </button>
                                    <button type="button" className="btn btn-warning"
                                            onClick={this.handleRestorePassword}>Restore password
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}

Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps, {loginUser, restoreCustomerPassword})(Login)