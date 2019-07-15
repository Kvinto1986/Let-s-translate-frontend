import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {loginUser} from '../../actions/authAction';

class Login extends Component {

    state = {
        email: '',
        password: '',
        role:'',
        errors: {},
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

    handleSubmit = (e) => {
        e.preventDefault();

        const user = {
            email: this.state.email,
            password: this.state.password,
        };

        let path='';

        if(this.state.userStatus){
            path='api/users/login';
        }

        if(!this.state.userStatus){
            path='api/customers/login';
        }

        this.props.loginUser(user,path);
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
        const {errors}=this.state;

        return (
            <div className="login">
                <div className="container">
                    <h2>Login</h2>
                    <h5 className="text-info">{this.state.userStatus?'Translator':'Customer'}</h5>
                    <label className="radio-inline">
                        <input
                            type="radio"
                            checked={!this.state.userStatus}
                            onChange={this.handleChangeUser}
                        />
                        Customer
                    </label>
                    <label className="radio-inline ml-5 ">
                        <input
                            type="radio"
                            checked={this.state.userStatus}
                            onChange={this.handleChangeUser}
                        />
                        Translator
                    </label>

                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <input
                                type="email"
                                placeholder="Email"
                                name="email"
                                className="form-control"
                                onChange={ this.handleInputChange }
                                value={ this.state.email }
                            />
                            {errors.email && (<div className='text-danger'>{errors.email}</div>)}
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                placeholder="Password"
                                name="password"
                                className="form-control"
                                onChange={ this.handleInputChange }
                                value={ this.state.password }

                            />
                            {errors.password && (<div className='text-danger'>{errors.password}</div>)}
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn btn-primary">
                                Login
                            </button>
                        </div>
                    </form>
                    <button className="btn btn-outline-warning text-dark">
                        I've forgot my password
                    </button>
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

export default connect(mapStateToProps, {loginUser})(Login)