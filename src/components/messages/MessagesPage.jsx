import React, {Component} from 'react';
import {connect} from 'react-redux'
import {fetchAllMessages} from '../../actions/messages/fetchMessages'
import {Link, Switch, Route, Redirect} from 'react-router-dom'
import MessageInbox from './elements/MessageInbox'
import MessageCreate from './elements/MessageCreate'

class MessagesPage extends Component {
    componentDidMount() {
        // this.props.history.push('/messages')
        const {role, name, email} = this.props.auth.user
        this.props.fetchAllMessages({role, name, email})
    }

    render() {
        if(this.props.location.pathname === '/messages') {
            return <Redirect from="/messages" to="/messages/inbox" />
        }

        const messages = this.props.messages
        const isEmpty = (messages.length === 0) ? true : false
        const {role, name, email} = this.props.auth.user
        
        return (
            <div className="row">
                <div className="col-2 bg-dark">
                    <div className="d-flex flex-column align-items-center">
                        <h3 className="text-light">Messages</h3>
                        <ul>
                            <li>
                                <Link to="/messages/inbox">
                                    Inbox (3)
                                </Link>
                            </li>
                            <li>
                                <Link to="/messages/newMessage">
                                    Write new message
                                </Link>
                            </li>
                        </ul>
                        <hr />
                        <p>Sort</p>
                        <ul>
                            <li>Customers </li>
                            <li>System</li>
                        </ul>
                    </div>
                </div>
                <div className="col-10 bg-light">
                    <Switch>
                        <Route exact path="/messages/inbox" render={(props) => <MessageInbox props={this.props} messages={messages} isEmpty={isEmpty}/>}/>
                        <Route exact path="/messages/newMessage" render={(props) => <MessageCreate props={this.props} role={role} name={name} email={email} />}/>
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

