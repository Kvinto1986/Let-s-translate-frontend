import React, {Component} from 'react';
import {connect} from 'react-redux'
import {fetchAllMessages} from '../../actions/messages/fetchMessages'

const readed = {
    opacity: '0.5'
}

class MessagesPage extends Component {
    componentDidMount() {
        const role = this.props.auth.user.role
        const name = this.props.auth.user.name
        this.props.fetchAllMessages({role, name})
    }

    render() {
        const {messages} = this.props.messages
        const isEmpty = (messages.length === 0) ? true : false
        return (
            <div className="row">
                <div className="col-2 bg-dark">
                    <div className="d-flex flex-column align-items-center">
                        <h3 className="text-light">Messages</h3>
                        <ul>
                            <li>Inbox (3)</li>
                            <li>New message</li>
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
                    <h3>Inbox</h3>
                    <hr/>
                    <section>
                        <table className="table table-borderless">
                            <tbody>
                                {
                                    // isEmpty
                                    !isEmpty
                                    ? (
                                        <tr>
                                            <td>Here is no any messages</td>
                                        </tr>
                                    )
                                    : (
                                        // messages.map(message => {
                                        //     return (
                                        //         <tr>
                                        //             <td>
                                        //                 <input type="checkbox" />
                                        //             </td>
                                        //             <td><b>John</b></td>
                                        //             <td>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet soluta nostrum consectetur commodi ...</td>
                                        //             <td>5:03 am</td>
                                        //         </tr>
                                        //     )
                                        // })
                                        <>
                                            <tr>
                                                <td>
                                                    <input type="checkbox" />
                                                </td>
                                                <td><b>John</b></td>
                                                <td>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet soluta nostrum consectetur commodi ...</td>
                                                <td>5:03 am</td>
                                            </tr>
                                            <tr style={readed}>
                                                <td>
                                                    <input type="checkbox" />
                                                </td>
                                                <td><b>System</b></td>
                                                <td>A new translations!</td>
                                                <td>23 Jul</td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <input type="checkbox" />
                                                </td>
                                                <td><b>Bob</b></td>
                                                <td>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet soluta nostrum consectetur commodi ...</td>
                                                <td>4 Oct 2018</td>
                                        </tr>
                                        </>
                                    )
                                }
                            </tbody>
                        </table>
                    </section>
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

