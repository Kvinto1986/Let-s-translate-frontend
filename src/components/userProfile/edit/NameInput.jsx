import React from 'react'
import CurentValue from '../../common/CurentValue'
import classnames from 'classnames'

const NameInput = ({name, handleChange, errors}) => {
    return (
        <div className="form-group">
            <label>Name <CurentValue value={name} /></label>
            <input 
            className={classnames('form-control form-control-lg', {
                'is-invalid': errors
            })}
            type="text"
            placeholder="New name"
            name="name"
            onChange={(e) => handleChange(e)}
            />
            {errors && (<div className="invalid-feedback">{errors}</div>)}
        </div>
    )
}

export default NameInput