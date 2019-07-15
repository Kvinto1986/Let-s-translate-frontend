import React from 'react'
import {Link} from 'react-router-dom'

// TODO: Make it reusable for any solution
const Alert = ({data, type}) => {
    if (data) {

        if (type === 'newTextAlert') {
            return (
                <div className="container">
                    <div className="alert alert-info alert-dismissible fade show" role="alert">
                        <span>
                            <b><em>System: </em></b>
                            Available a new text from 
                            <strong> {data.languages[0]} </strong> 
                            to <strong>{data.languages[1]} </strong> 
                            by <strong>{data.customerName}</strong>
                        </span>
                        <hr />
                        <p className="mb-0">Click <Link to={`/translates/${data.textId}`}>here</Link> to see text details.</p>
                        <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                </div>
            )
        }
        else if (type === 'newTranslateStatus') {
            return (
                <div className="container">
                    <div className="alert alert-info alert-dismissible fade show" role="alert">
                        <span>
                            <b><em>System: </em></b>
                            Translate progress changes in text <Link to={`/translates/${data.textId}`}>#{data.textId}</Link> from {data.progressOld} to {data.progressNew} % of compleat
                        </span>
                        <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                </div>
            )
        }
    }

    else {
        return null
    }
}

export default Alert