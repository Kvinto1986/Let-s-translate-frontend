import React, {Component} from 'react'
import {connect} from 'react-redux'
import {registerComment, getComments} from '../../../actions/commenAction'

class Comments extends Component {

    state = {
        messageText: '',
        errors: {}
    }

    componentDidMount() {
        this.props.getComments({textId: this.props.selectedTranslate.data.translate.id})
    }

    reset = () => {
        this.props.getComments({textId: this.props.selectedTranslate.data.translate.id})

        this.setState({
            messageText: ''
        })
    }


    handleSubmit = (e) => {
        e.preventDefault()
        const comment = {
            userId: this.props.auth.user.id,
            userRole: this.props.auth.user.role,
            textId: this.props.selectedTranslate.data.translate.id,
            senderEmail: this.props.auth.user.email,
            senderName: this.props.auth.user.name,
            messageText: this.state.messageText,
        }

        this.props.registerComment(comment, this.reset)
    }

    handleInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }

    insertName = (name) => {
        if(this.state.messageText.indexOf(name + ',') !== 0) {
            this.setState({
                messageText: `${name}, ${this.state.messageText}`
            })
        }
    }

    render() {
        const {errors} = this.state;

        return (
            <div className="col-12">
                <div className="container">
                    <h3 className="mt-5">Comments</h3>
                    <hr />
                    <ul className="list-unstyled">
                        {
                            this.props.comments.map((elem, индекс) => {
                                return (
                                    <li key={elem.senderName + индекс} className="d-flex mb-3">
                                        <div className="media-body">
                                            <h5 className="mt-0 d-flex align-items-center">
                                                <b>{elem.senderName}</b>
                                                <span className="text-secondary answerLink mt-0 mb-0 ml-2" onClick={() => this.insertName(elem.senderName)}>
                                                    <small><em>Answer</em></small>
                                                </span>
                                            </h5>
                                            <span>- {elem.commentText}</span>
                                        </div>
                                        <div className="media-body d-flex justify-content-end">
                                            <small><em>{elem.date}</em></small>
                                        </div>
                                    </li>
                                )
                            })
                        }
                    </ul>    
                    <form className='form mb-5' onSubmit={this.handleSubmit}>
                        <div className='form-group'>
                            <textarea
                                name='messageText'
                                className="form-control mt-5"
                                placeholder="Your comment..."
                                onChange={this.handleInputChange}
                                value={this.state.messageText}
                            />
                        </div>
                        {errors.messageText && (<div className='text-danger'>{errors.messageText}</div>)}
                        <div>
                            <button className='btn btn-success mt-3'>Send</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }


}

const mapStateToProps = state => ({
    auth: state.auth,
    selectedTranslate: state.selectedTranslate,
    errors: state.errors,
    comments: state.comments
});

export default connect(mapStateToProps, {
    registerComment, 
    getComments
})(Comments)