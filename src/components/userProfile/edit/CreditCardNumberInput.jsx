import React from 'react';
import CurentValue from '../../common/CurentValue'
import classNames from 'classnames'

const CreditCardNumberInput = ({creditCard, handleChange, errors}) => {
    return (
        <div className="form-group">
            <label>Credit card number <CurentValue value={creditCard} /></label>
            <input 
            className={classNames('form-control form-control-lg', {
                'is-invalid': errors
            })}
            type="text"
            placeholder="New credit card number"
            name="creditCard"
            onChange={(e) => handleChange(e)}
            />
            {errors && (<div className="invalid-feedback">{errors}</div>)}
        </div>
    )
}

export default CreditCardNumberInput
