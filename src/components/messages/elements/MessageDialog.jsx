import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { getUniqueDialog } from '../../../actions/messages/getUniqueDialog'
import { registerMessage } from '../../../actions/messages/newMessageRegister'
import { fetchAllUnreadMessages } from '../../../actions/messages/fetchAllUnreadMessages'
import { findUserByEmail } from '../../../actions/user/findUserByEmail'
import recipientImg from '../../../resources/images/bilboard/f2db5b1fae65676bfd1ecae1dbfdc3a2.jpg'
import { socket } from '../../navigation/Header'
import { DominoSpinner } from 'react-spinners-kit'

class MessageDialog extends Component {

    state = {
        messageText: "",
        senderEmail: "",
        recipientEmail: "",
        liveTimeMessages: [],
        typing: false,
        loading: true
    };

    handleInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    };

    componentDidMount() {
        let recipientEmail = '';
        const {user} = this.props.auth

        if (this.props.location.hash) {
            recipientEmail = this.props.match.params.recipientEmail + this.props.location.hash;
        }
        else recipientEmail = this.props.match.params.recipientEmail;

        const senderEmail = this.props.auth.user.email;

        this.setState({
            senderEmail: senderEmail,
            recipientEmail: recipientEmail,
        })

        this.props.findUserByEmail({recipientEmail})
        this.props.getUniqueDialog({recipientEmail, senderEmail, user: this.props.auth.user})

        socket.on('spawnMessage', data => {
            if (user.email === data.senderEmail || user.email === data.recipientEmail) {
                this.setState({liveTimeMessages: [...this.state.liveTimeMessages, data]})
            }
        })

        socket.on('typing', typerEmail => {
            if (user.email === senderEmail && typerEmail === recipientEmail) {
                this.setState({typing: 'Someone'})
            } 
        })

        socket.on('stopTyping', typerEmail => {
            if (user.email === senderEmail && typerEmail === recipientEmail && this.state.typing) {
                setTimeout(() => this.setState({typing: false}), 1000)
            }
        })

        socket.on('unreadMessageCountDiscard', user => {
            this.props.fetchAllUnreadMessages({user})
        })
    }

    reset = () => {
        this.setState({
            messageText: ""
        });
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

        this.props.registerMessage(messageData, this.reset)
    };

    handleKeyPressing(e) {
        socket.emit('typingEcho', this.props.auth.user.email)
    }

    render() {
        const { recipientEmail } = this.state
        const { user } = this.props.auth

        if (this.state.messageText === "") {
            socket.emit('stopTypingEcho', user.email)
        }

        const {chatMemberData} = this.props
        
        return (
            <Fragment>
                <div style={{padding:"10px 25px"}}>
                    <div className="row">
                        <div className="col-2" style={{backgroundColor:"#f1f2f6"}}>
                            <div className="d-flex flex-column align-items-center" style={{position: 'sticky', top: '110px'}}>
                                {
                                    (Object.keys(chatMemberData).length === 0)
                                    ? (
                                        <Fragment>
                                            <div className="d-flex justify-content-center align-items-center mt-5">
                                                <div className="spinner-border text-dark" role="status">
                                                    <span className="sr-only"></span>
                                                </div>
                                            </div>
                                        </Fragment>
                                    )
                                    : (
                                        <Fragment>
                                            <h4>Chat</h4>
                                            <img src={recipientImg} alt="Customer" width="200px" className="mt-3" style={{borderRadius:"50%"}} />
                                            <h4>{chatMemberData.name}</h4>
                                            <small>({chatMemberData.role})</small>
                                            <section className="mt-1">
                                                <p>Email: <small>{chatMemberData.email}</small></p>
                                            </section>
                                        </Fragment>
                                    )
                                }
                            </div>
                        </div>
                        <div className="col-10">
                            {
                                this.props.dialogReducer.map((message) => {
                                    
                                    let msgClasses, msgStyles
                                    if (message.senderEmail === recipientEmail) {
                                        msgClasses = "d-flex flex-column align-items-start"
                                        msgStyles = {
                                            display: "block",
                                            minWidth: "155px",
                                            padding: "10px",
                                            backgroundColor: "lightgray",
                                            borderRadius: "5px"
                                        }
                                    }
                                    else {
                                        msgClasses = "d-flex flex-column align-items-end"
                                        msgStyles = {
                                            display: "block",
                                            minWidth: "155px",
                                            padding: "10px",
                                            backgroundColor: "lightgreen",
                                            borderRadius: "5px"
                                        }
                                    }
                                    return (
                                        <div key={message.id} className={msgClasses}>
                                            <div className="d-flex flex-column align-items-start">
                                                <span style={msgStyles}>{message.messageText}</span>
                                                <p><em><small>{message.date}</small></em></p>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                            {
                                ((this.state.liveTimeMessages.length > 0) && (
                                    this.state.liveTimeMessages.map(msg => {
                                        let msgClasses, msgStyles
                                    if (msg.senderEmail === recipientEmail) {
                                        msgClasses = "d-flex flex-column align-items-start"
                                        msgStyles = {
                                            display: "block",
                                            minWidth: "155px",
                                            padding: "10px",
                                            backgroundColor: "lightgray",
                                            borderRadius: "5px"
                                        }
                                    }
                                    else {
                                        msgClasses = "d-flex flex-column align-items-end"
                                        msgStyles = {
                                            display: "block",
                                            minWidth: "155px",
                                            padding: "10px",
                                            backgroundColor: "lightgreen",
                                            borderRadius: "5px"
                                        }
                                    }
                                    return (
                                        <div key={msg.id} className={msgClasses}>
                                            <div className="d-flex flex-column align-items-start">
                                                <span style={msgStyles}>{msg.messageText}</span>
                                                <p><em><small>{msg.date}</small></em></p>
                                            </div>
                                        </div>
                                    )
                                    })
                                ))
                            }
                            {
                                (this.state.typing && (
                                    <div className="d-flex align-items-center">
                                        <span className="mr-1"><small><em>{this.state.typing} is typing ... </em></small></span>
                                        <DominoSpinner 
                                            size={45}
                                            color="#686769"
                                            loading={this.state.loading}
                                        />
                                    </div>
                                ))
                            }
                            {
                                (this.props.dialogReducer.length === 0) && (
                                    <div className="d-flex justify-content-center align-items-center">
                                        <div className="spinner-border text-dark" role="status">
                                            <span className="sr-only"></span>
                                        </div>
                                    </div>
                                )
                            }
                            <form onSubmit={this.handleSubmit} className="mt-5 mb-3" id="autoscrollflag">
                                <div className="d-flex justify-content-center">
                                    <div className="form-group" style={{ width: "75%" }}>
                                        <textarea
                                            name='messageText'
                                            className="form-control"
                                            placeholder="Type a message"
                                            onChange={this.handleInputChange}
                                            value={this.state.messageText}
                                            rows="1"
                                            onKeyPress={e => this.handleKeyPressing(e)}
                                            onChange={e => this.setState({messageText: e.target.value})}
                                        />
                                    </div>
                                    <div className="ml-3">
                                        <button className="btn btn-default btn-sm" type="submit">
                                            <h5>Send</h5>
                                        </button>
                                    </div>
                                    
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </Fragment>

        )

    }
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    dialogReducer: state.dialogReducer,
    chatMemberData: state.chatMemberData
});

export default connect(mapStateToProps, {
    getUniqueDialog,
    registerMessage,
    fetchAllUnreadMessages,
    findUserByEmail
})(MessageDialog);
