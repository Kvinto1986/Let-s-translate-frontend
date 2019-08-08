import React, {Component} from 'react'
import {connect} from 'react-redux'

import {editProfileData} from '../../actions/user/editProfileDataAction'
import {logoutUser} from '../../actions/authAction'

import FormTitle from '../common/FormTitle'
import ButtonSubmit from '../common/ButtonSubmit'
import NameInput from './edit/NameInput'
import EmailInput from './edit/EmailInput'
import PhoneInput from './edit/PhoneInput'
import CreditCardNumberInput from './edit/CreditCardNumberInput'
import NewPassword from './edit/NewPassword'
import CurrentPassword from './edit/CurrentPassword'

import Swal from 'sweetalert2/dist/sweetalert2.js'

import 'sweetalert2/src/sweetalert2.scss'
import ReactPhoneInput from "react-phone-input-2";
import CurentValue from "../common/CurentValue";
import CreditCardInput from "react-credit-card-input";

class EditUserProfile extends Component {

    state = {
        name: '',
        email: '',
        phone: '',
        creditCard: '',
        password: '',
        passwordCur: '',
        errors: {}
    };


    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handlePhoneChange = (number) => {
        this.setState({phone: number})
    };

    handleChangeCreditCard= (e) => {
        this.setState({
            creditCard: e.target.value
        })
    };


    handleSubmit = (e) => {
        e.preventDefault()

        const data = {
            nameOld: this.props.auth.user.name,
            emailOld: this.props.auth.user.email,
            name: this.state.name,
            email: this.state.email,
            phone: this.state.phone,
            creditCard: this.state.creditCard,
            password: this.state.password,
            passwordCur: this.state.passwordCur
        }

        this.props.editProfileData(data, this.props.auth.user)
            .then((res) => {
                Swal.fire({
                    type: 'success',
                    title: 'Congratulations!',
                    text: 'The action was successful!!',
                    allowOutsideClick: false
                }).then(() => {
                    this.props.logoutUser(this.props.history)
                })
            })
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }

    render() {
        const {role, name, email, phone, creditCard} = this.props.auth.user
        const {errors} = this.state

        if (role === "translator" || role === "customer") {
            return (

                <div className="container mt-3">
                    <FormTitle title="Profile edit"/>
                    <form className="ml-3 d-flex flex-column justify-content-center">
                        <NameInput
                            name={name}
                            handleChange={this.handleChange}
                            errors={errors.name}
                        />
                        <EmailInput
                            email={email}
                            handleChange={this.handleChange}
                            errors={errors.email}
                        />
                        {(role === "customer") &&
                        <div className="form-group">
                            <label>Credit card number <CurentValue value={creditCard} /></label>
                            <div className="form-group">
                            <CreditCardInput
                                cardNumberInputProps={{ value: this.state.creditCard, onChange: this.handleChangeCreditCard }}
                                fieldClassName="input"
                            />
                            </div>

                            {errors.creditCard && (<div className='text-danger'>{errors.creditCard}</div>)}
                        </div>
                        }
                        {(role === "translator") &&
                        <div className="form-group">
                            <label>Phone <CurentValue value={phone} /></label>
                        <ReactPhoneInput
                            type="text"
                            placeholder="Phone number"
                            name="phone"
                            className="form-control"
                            value={this.state.phone}
                            onChange={this.handlePhoneChange}

                        />
                        {errors.phone && (<div className='text-danger'>{errors.phone}</div>)}
                        </div>
                        }
                        <NewPassword
                            handleChange={this.handleChange}
                            errors={errors.password}
                        />
                        <CurrentPassword
                            handleChange={this.handleChange}
                            errors={errors.password_cur}
                        />
                        {errors.common && (<p className="text-danger">{errors.common}</p>)}
                        <ButtonSubmit
                            title="Submit"
                            handleSubmit={this.handleSubmit}
                        />
                    </form>
                </div>
            )
        } else return (
            <h1 className='col-12 text-danger text-center mt-5'>You can't change the administrator data!</h1>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors,
});

export default connect(mapStateToProps, {
    editProfileData,
    logoutUser
})(EditUserProfile)