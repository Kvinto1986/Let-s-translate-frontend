import React from 'react'
import LinkGroup from '../navigation/LinkGroup';
import {Link} from 'react-router-dom'

// TODO: Make it reusable for any solution
const Alert = ({data, message, type}) => {
    if (data) {
        return (
            <div className="alert alert-info alert-dismissible fade show" role="alert">
                <span>
                    Available a new text from 
                    <strong> {data.languages[0]} </strong> 
                    to <strong>{data.languages[1]} </strong> 
                    by <strong>{data.customerName}</strong>
                </span>
                <hr />
                <p className="mb-0">Click <Link to={`/translates/:${data.textId}`}>here</Link> to see text details.</p>
                <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
        )
    }
    else {
        return null
    }
}

export default Alert