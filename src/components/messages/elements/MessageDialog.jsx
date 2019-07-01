import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import {getUniqueDialog} from '../../../actions/messages/getUniqueDialog'
import {registerMessage} from '../../../actions/messages/newMessageRegister'

class MessageDialog extends Component {

    state = {
        messageText: ""
    };

    handleInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    };

    getDialog = () => {
        let recipientEmail = '';
        if (this.props.location.hash) {
            recipientEmail = this.props.match.params.recipientEmail + this.props.location.hash;
        } else recipientEmail = this.props.match.params.recipientEmail;

        const senderEmail = this.props.auth.user.email;
        this.props.getUniqueDialog({recipientEmail, senderEmail})
    };

    componentDidMount() {
        this.getDialog()
    }

    reset = () => {
        this.setState({
            messageText: ""
        });
        window.location.reload()
    };

    handleSubmit = (e) => {
        e.preventDefault();

        const messageData = {
            senderEmail: this.props.auth.user.email,
            senderName: this.props.auth.user.name,
            messageText: this.state.messageText,
        };

        const currentRecipient = this.props.dialogReducer[0];

        if (currentRecipient.senderEmail === this.props.auth.user.email) {
            messageData.recipientEmail = currentRecipient.recipientEmail;
            messageData.recipientName = currentRecipient.recipientName;
        } else {
            messageData.recipientEmail = currentRecipient.senderEmail;
            messageData.recipientName = currentRecipient.senderName;
        }

        this.props.registerMessage(messageData,this.reset)
    };

    render() {

        const dialog = this.props.dialogReducer.map((elem) => {
            return <tr key={elem.id}>
                <td>{elem.senderEmail}</td>
                <td>{elem.messageText}</td>
                <td>{elem.date}</td>
            </tr>
        });

        return (
            <Fragment>
                <table className="table table-borderless">
                    <tbody>
                    <tr key={'header-tr'}>
                        <th>Sender</th>
                        <th>Message</th>
                        <th>Date</th>
                    </tr>
                    {dialog}
                    <tr key={'message=text'} className='mt-5'>
                        <th>{this.props.auth.user.email}</th>
                        <th>
                            <form>
                                <div className="form-group">
                                    <label>Your message</label>
                                    <textarea
                                        name='messageText'
                                        className="form-control"
                                        placeholder="Yor message"
                                        onChange={this.handleInputChange}
                                        value={this.state.messageText}
                                    />
                                </div>
                            </form>
                        </th>
                        <th>
                            <button type="submit" className="btn btn-success mt-5" onClick={this.handleSubmit}>
                                Send
                            </button>
                        </th>

                    </tr>
                    </tbody>
                </table>
            </Fragment>

        )

    }
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    dialogReducer: state.dialogReducer,

});

export default connect(mapStateToProps, {
    getUniqueDialog,
    registerMessage
})(MessageDialog);
