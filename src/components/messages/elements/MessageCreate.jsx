import React, {Component} from 'react'

class MessageCreate extends Component {
    render() {
        const {name} = this.props
        return (
            <>
                <h3>New message</h3>
                <hr />
                <div className="container">
                    <form>
                        <div className="form-group">
                            <label>Message recipient</label>
                            <input type="text" />
                        </div>
                        <div className="form-group">
                            
                        </div>
                        <div className="form-group">
                            
                        </div>
                    </form>
                </div>
            </>
        )
    }
}

export default MessageCreate