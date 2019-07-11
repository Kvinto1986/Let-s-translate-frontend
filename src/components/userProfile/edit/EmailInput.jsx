import React from 'react'
import CurentValue from '../../common/CurentValue'
import classNames from 'classnames'

const EmailInput = ({email, handleChange, errors}) => {
    return (
        <div className="form-group">
            <label>Email <CurentValue value={email} /></label>
            <input 
            className={classNames('form-control form-control-lg', {
                'is-invalid': errors
            })}
            type="text"
            placeholder="New email"
            name="email"
            onChange={(e) => handleChange(e)}
            />
            {errors && (<div className="invalid-feedback">{errors}</div>)}
        </div>
    )
}

export default EmailInput