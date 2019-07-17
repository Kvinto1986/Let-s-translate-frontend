import React, {Component} from 'react'
import {fetchAllMessages} from '../../../actions/messages/fetchMessages'
import {connect} from "react-redux";

class MessageInbox extends Component {

    componentDidMount() {
        this.props.fetchAllMessages({email: this.props.auth.user.email})
    }

    render() {
        return (
            <div className="container"> 
                <h3>Inbox</h3>
                <hr/>
                <section>
                    <table className="table table-borderless table-hover" style={{cursor: "pointer"}}>
                        <tbody>
                            {this.props.messages.map((elem, index) => {
                                return (
                                    <tr key={index} onClick={() => this.props.openMessageDialog(elem)}>
                                        <td>
                                            {elem.recipientEmail}
                                        </td>
                                        <td>
                                            {elem.messageText}
                                        </td>
                                        <td className="d-flex justify-content-end align-items-center">
                                            {
                                                (elem.recipientUnreadedMessagesCount > 0)
                                                ? (
                                                    <span className="badge badge-pill badge-dark">
                                                        New {elem.recipientUnreadedMessagesCount}
                                                    </span>
                                                )
                                                : (
                                                    <span>
                                                        <small><em> Last message at {elem.date}</em></small>
                                                    </span>
                                                )
                                            }
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </section>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
    messages: state.messages,
});

export default connect(mapStateToProps, {
    fetchAllMessages
})(MessageInbox)