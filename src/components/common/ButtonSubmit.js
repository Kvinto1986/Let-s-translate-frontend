import React from 'react'

const ButtonSubmit = ({title, handleSubmit, isDisabled}) => {
    if(isDisabled) {
        return (
            <div className="form-group">
                <button type="submit" className="btn btn-dark" onClick={handleSubmit} disabled>
                    {title}
                </button>
            </div>
        )
    }
    else {
        return (
            <div className="form-group">
                <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
                    {title}
                </button>
            </div>
        )
    }
}

export default ButtonSubmit