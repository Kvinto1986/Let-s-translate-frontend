import React, {Component} from 'react'
import {connect} from 'react-redux'

import {editProfileData} from '../../actions/user/editProfileDataAction'
import {logoutUser} from '../../actions/authAction';

import FormTitle from '../common/FormTitle'
import ButtonSubmit from '../common/ButtonSubmit'
import NameInput from './edit/NameInput'
import EmailInput from './edit/EmailInput'
import PhoneInput from './edit/PhoneInput'
import CreditCardNumberInput from './edit/CreditCardNumberInput'
import NewPassword from './edit/NewPassword'
import CurrentPassword from './edit/CurrentPassword'

class EditUserProfile extends Component {

    state = {
        name: '',
        email: '',
        phone: '',
        creditCard: '',
        password: '',
        passwordCur: '',
        errors: {}
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()

        const data = {
            name: this.state.name,
            email: this.state.email,
            phone: this.state.phone,
            creditCard: this.state.creditCard,
            password: this.state.password,
            passwordCur: this.state.passwordCur
        }

        this.props.editProfileData(data, this.props.auth.user)
        .then((res) => {
            this.props.logoutUser(this.props.history)
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
        console.log(errors);
        
        
        return (
            <div className="container">
                <FormTitle title="Profile edit" />
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
                        <CreditCardNumberInput 
                        creditCard={creditCard}
                        handleChange={this.handleChange}
                        errors={errors.creditCard}
                        />
                    }
                    {(role === "translator" || role === "admin") &&
                        <PhoneInput 
                        phone={phone}
                        handleChange={this.handleChange}
                        errors={errors.phone}
                        />
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