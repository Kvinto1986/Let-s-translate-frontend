import React from 'react'
import classNames from 'classnames'

const NewPassword = ({handleChange, errors}) => {
    return (
        <div className="form-group">
            <label>New password</label>
            <input 
            className={classNames('form-control form-control-lg', {
                'is-invalid': errors
            })}
            type="password"
            placeholder="New password"
            name="password"
            onChange={(e) => handleChange(e)}
            />
            {errors && (<div className="invalid-feedback">{errors}</div>)}
        </div>
    )
}

export default NewPassword