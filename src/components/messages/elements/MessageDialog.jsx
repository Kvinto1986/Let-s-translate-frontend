import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getUniqueDialog} from '../../../actions/messages/getUniqueDialog'

class MessageDialog extends Component {
    componentDidMount() {
        const recipientEmail = this.props.match.params.recipientEmail
        console.log(recipientEmail);
        
        const senderEmail = this.props.auth.user.email
        this.props.getUniqueDialog({recipientEmail, senderEmail})
    }

    render() {
        return (
            <div>Msgs</div>
        )
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth,
});

export default connect(mapStateToProps, {
    getUniqueDialog
})(MessageDialog);
