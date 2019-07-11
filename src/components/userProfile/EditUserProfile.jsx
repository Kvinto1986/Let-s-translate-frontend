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

class EditUserProfile extends Component {
    render() {
        return (
            <div>
                Edit profile form ...
            </div>
        )
    }
}

export default EditUserProfile