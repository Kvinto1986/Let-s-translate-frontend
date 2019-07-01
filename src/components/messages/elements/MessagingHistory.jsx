import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchMessageHistory} from '../../../actions/messages/fetchMessageHistory'

class MessagingHistory extends Component {

    componentDidMount() { 
        // this.props.fetchMessageHistory(this.props.match.params.inboxElementID)
    }

    render() {
        // const {name} = this.props
        console.log(this.props.messages);
        
        return (
            <>
                <h3>Message details</h3>
                <hr />
                <div className="container">
                    <form>
                        <div className="form-group">
                            <label>Message recipient</label>
                            <input type="text" />
                        </div>
                    </form>
                </div>
            </>
        )
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    messages: state.messages
});

export default connect(mapStateToProps, {fetchMessageHistory})(MessagingHistory)