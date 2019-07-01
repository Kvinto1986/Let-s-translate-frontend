import React, {Component} from 'react';
import {connect} from 'react-redux'
import {fetchAllMessages} from '../../actions/messages/fetchMessages'
import {Link, Switch, Route, Redirect} from 'react-router-dom'
import MessageInbox from './elements/MessageInbox'
import MessagingHistory from './elements/MessagingHistory'
import MessageDialog from './elements/MessageDialog'

class MessagesPage extends Component {
    componentDidMount() {
        const {role, name, email} = this.props.auth.user
        this.props.fetchAllMessages({role, name, email})
    }

    openMessageDialog = (message) => {
        this.props.history.push(`/messages/dialog/${message.recipientEmail}`)   
    }

    render() {
        if(this.props.location.pathname === '/messages') {
            return <Redirect from="/messages" to="/messages/inbox" />
        }

        const messages = this.props.messages
        const isEmpty = (messages.length === 0) ? true : false
        
        return (
            <div className="row">
                <div className="col-2 bg-dark">
                    <div className="d-flex flex-column align-items-center">
                        <h3 className="text-light">Messages</h3>
                        <ul>
                            <li>
                                <Link to="/messages/inbox">
                                    Inbox ({messages.length})
                                </Link>
                            </li>
                        </ul>
                        <hr />
                    </div>
                </div>
                <div className="col-10 bg-light">
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
                </div>
            </div>
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

