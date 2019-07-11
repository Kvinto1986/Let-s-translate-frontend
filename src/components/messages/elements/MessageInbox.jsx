import React, {Component} from 'react'
import {fetchAllMessages} from '../../../actions/messages/fetchMessages'
import {connect} from "react-redux";

class MessageInbox extends Component {

    componentDidMount() {
        this.props.fetchAllMessages({email: this.props.auth.user.email})
    }

    render() {
        return (
            <>
                <h3>Inbox</h3>
                <hr/>
                <section>
                    <table className="table table-borderless">
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
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </section>
            </>
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