import React, {Component} from 'react'
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

import {registerCustomer} from '../../actions/customerAction';

class RegisterCustomer extends Component {
    state = {
        name: "",
        email: "",
        password: '',
        password_confirm: '',
        creditCard:'',
        errors: {},
    };

    handleInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    };

    resetForm = () => {
        this.setState({
            name: "",
            email: "",
            password: '',
            password_confirm: '',
            creditCard:'',
            errors: {},
        });
    };

    handleSubmit = (e) => {
        e.preventDefault();

        const customer = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password_confirm: this.state.password_confirm,
            creditCard:this.state.creditCard
        };

        this.props.registerCustomer(customer, this.resetForm);

    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }

    componentDidMount = () => {};

    render() {
        const {errors}=this.state;

        return (
            <div className="registerCustomer">
                <div className="container">
                    <h2>Registration</h2>
                    <p className="text-info">Customer</p>
                    <form>
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
                                type="text"
                                placeholder="Name"
                                name="name"
                                className="form-control"
                                onChange={this.handleInputChange}
                                value={this.state.name}
                            />
                            {errors.name && (<div className='text-danger'>{errors.name}</div>)}
                        </div>
                        <div className="form-group">
                            <input
                                type="text"
                                placeholder="Credit card number"
                                name="creditCard"
                                className="form-control"
                                onChange={this.handleInputChange}
                                value={this.state.creditCard}
                            />
                            {errors.creditCard && (<div className='text-danger'>{errors.creditCard}</div>)}
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
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                placeholder="Confirm Password"
                                name="password_confirm"
                                className="form-control"
                                onChange={this.handleInputChange}
                                value={this.state.password_confirm}
                            />
                            {errors.password_confirm && (<div className='text-danger'>{errors.password_confirm}</div>)}
                        </div>
                        <div className="form-group">
                            <div className="form-check form-check-inline">
                                <label className="form-check-label checkingUnit">I read license</label>
                                <input className="form-check-input" type="checkbox"/>
                            </div>
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn btn-primary" onClick={this.handleSubmit}>
                                Register
                            </button>
                        </div>
                        <div className="form-group">
                        <span className="text-primary">
                            Forget the password
                        </span>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors,
});

export default connect(mapStateToProps, {
    registerCustomer
})(withRouter(RegisterCustomer))