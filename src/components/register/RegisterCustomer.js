import React, {Component} from 'react'
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import CreditCardInput from 'react-credit-card-input';

import {registerCustomer} from '../../actions/customerAction';

import ButtonSubmit from '../common/ButtonSubmit'

class RegisterCustomer extends Component {
    state = {
        name: "",
        email: "",
        password: '',
        password_confirm: '',
        creditCard:'',
        creditCardDate:'',
        creditCardCVC:'',
        errors: {},
    };

    handleInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    };

    handleChangeCreditCard= (e) => {
        this.setState({
            creditCard: e.target.value
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
            role:'customer',
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password_confirm: this.state.password_confirm,
            creditCard: this.state.creditCard.replace(/\s+/g, '')
        };

        this.props.registerCustomer(customer, this.resetForm);

    };

    handleIsChecked = e => {
        if (e.target.checked) {
            this.setState({
                isChecked: true
            })
        }
        else {
            this.setState({
                isChecked: false
            })
        }
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
        const {errors} = this.state;
        const buttonSubmit = this.state.isChecked
        ? <ButtonSubmit title="Register"  handleSubmit={this.handleSubmit} isDisabled={false}/>
        : <ButtonSubmit title="Register"  handleSubmit={this.handleSubmit} isDisabled={true}/>

        return (
            <div className="registerCustomer mt-3">
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
                            <CreditCardInput
                                cardNumberInputProps={{ value: this.state.creditCard, onChange: this.handleChangeCreditCard }}
                                fieldClassName="input"
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
                        <div className="overflow-auto mt-4 mb-4 border border-info" style={{height: '10vw'}}>
                            <h2 className="p-3">License agreement</h2>
                            <p className="p-3">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                            quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                            fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                                culpa qui officia deserunt mollit anim id est laborum.</p>
                            <p className="p-3">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                                sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                                quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                                fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                                culpa qui officia deserunt mollit anim id est laborum.</p>
                            <p className="p-3">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                                sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                                quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                                fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                                culpa qui officia deserunt mollit anim id est laborum.</p>
                            <p className="p-3">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                                sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                                quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                                fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                                culpa qui officia deserunt mollit anim id est laborum.</p>
                            <p className="p-3">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                                sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                                quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                                fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                                culpa qui officia deserunt mollit anim id est laborum.</p>
                            <p className="p-3">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                                sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                                quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                                fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                                culpa qui officia deserunt mollit anim id est laborum.</p>

                            <p className="p-3">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                                sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                                quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                                fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                                culpa qui officia deserunt mollit anim id est laborum.</p>

                            <p className="p-3">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                                sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                                quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                                fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                                culpa qui officia deserunt mollit anim id est laborum.</p>
                            <div className="form-check form-check-inline">
                                <label className="form-check-label checkingUnit"><h4 className="p-3">I read license</h4></label>
                                <input className="form-check-input ml-3" type="checkbox" onChange={e => this.handleIsChecked(e)}/>
                                </div>
                        </div>
                        {buttonSubmit}
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