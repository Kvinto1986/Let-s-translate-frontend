import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {loginUser} from '../../actions/userAction';

class LoginTranslator extends Component {

    state = {
        email: '',
        password: '',
        errors: {}
    };

    handleInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    };

    handleSubmit = (e) => {
        e.preventDefault();

        const user = {
            email: this.state.email,
            password: this.state.password,
        };

        this.props.loginUser(user);
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
                    <p className="text-info">Translator</p>
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
                </div>
            </div>
        )
    }
}

LoginTranslator.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps, {loginUser})(LoginTranslator)