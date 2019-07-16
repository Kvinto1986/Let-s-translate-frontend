import React, {Component} from 'react';
import {connect} from 'react-redux'
import {fetchAllMessages} from '../../actions/messages/fetchMessages'
import {Link, Switch, Route, Redirect} from 'react-router-dom'
import MessageInbox from './elements/MessageInbox'
import MessagingHistory from './elements/MessagingHistory'
import MessageDialog from './elements/MessageDialog'

class MessagesPage extends Component {

    openMessageDialog = (message) => {
        this.props.history.push(`/messages/dialog/${message.recipientEmail}`)
    };



    render() {
        if(this.props.location.pathname === '/messages') {
            return <Redirect from="/messages" to="/messages/inbox" />
        }

        const messages = this.props.messages
        const isEmpty = (messages.length === 0) ? true : false
        
        return (
            <Switch>
                <Route 
                exact 
                path="/messages/inbox" 
                render={() => (
                    <MessageInbox 
                    props={this.props} 
                    openMessageDialog={this.openMessageDialog} 
                    messages={messages} 
                    isEmpty={isEmpty}/>
                )}/>
                <Route
                exact 
                path="/messages/dialog/:recipientEmail"
                component={MessageDialog}
                />
                <Route 
                exact
                path="/messages/history/:inboxElementID"
                component={MessagingHistory}/>
            </Switch>
        );
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    messages: state.messages
});

export default connect(mapStateToProps, {
    fetchAllMessages
})(MessagesPage);

