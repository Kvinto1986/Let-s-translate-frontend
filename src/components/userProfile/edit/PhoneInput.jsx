import React from 'react'
import CurentValue from '../../common/CurentValue'
import classNames from 'classnames'
import ReactPhoneInput from 'react-phone-input-2'

import 'react-phone-input-2/dist/style.css'

const PhoneInput = ({phone, handleChange, errors}) => {
    return (
        <div className="form-group">
            <label>Phone <CurentValue value={phone} /></label>
            <ReactPhoneInput
            className={classNames('form-control form-control-lg', {
                'is-invalid': errors
            })}
            type="text"
            placeholder="New phone"
            name="phone"
            onChange={handleChange}
            />
            {errors && (<div className="invalid-feedback">{errors}</div>)}
        </div>
    )
}

export default PhoneInput