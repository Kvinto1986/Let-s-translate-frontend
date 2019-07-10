import React from 'react'
import CurentValue from '../../common/CurentValue'
import classNames from 'classnames'

const PhoneInput = ({phone, handleChange, errors}) => {
    return (
        <div className="form-group">
            <label>Phone <CurentValue value={phone} /></label>
            <input 
            className={classNames('form-control form-control-lg', {
                'is-invalid': errors
            })}
            type="text"
            placeholder="New phone"
            name="phone"
            onChange={(e) => handleChange(e)}
            />
            {errors && (<div className="invalid-feedback">{errors}</div>)}
        </div>
    )
}

export default PhoneInput