import React, {Component, Fragment} from 'react'
import {fetchAllMessages} from '../../../actions/messages/fetchMessages'
import {connect} from "react-redux";
import {Link} from 'react-router-dom'

class MessageInbox extends Component {

    componentDidMount() {
        this.props.fetchAllMessages({email: this.props.auth.user.email})
    }

    render() {


        const inboxArr = this.props.messages.map((elem) => {
            return (<tr key={elem.id}>
                <Link to='messages/newMessage'>
                    <td>
                        {elem.recipientEmail}
                    </td>
                    <td>
                        {elem.messageText}
                    </td>
                </Link>
            </tr>
        )
        });

        console.log(inboxArr)
        return (
            <>
                <h3>Inbox</h3>
                <hr/>
                <section>
                    <table className="table table-borderless">
                        <tbody>
                        {inboxArr}
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