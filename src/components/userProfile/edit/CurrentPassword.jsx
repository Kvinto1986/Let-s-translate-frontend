import React from 'react';

import classNames from 'classnames'

const CurrentPassword = ({handleChange, errors}) => {
    return (
        <div className="form-group">
            <label>Current password <span className="text-danger">*</span></label>
            <input
            className={classNames('form-control form-control-lg', {
                'is-invalid': errors
            })}
            type="passwordCur"
            placeholder="Current password"
            name="passwordCur"
            onChange={(e) => handleChange(e)}
            />
            {errors && (<div className="invalid-feedback">{errors}</div>)}
        </div>
    )
}

export default CurrentPassword
