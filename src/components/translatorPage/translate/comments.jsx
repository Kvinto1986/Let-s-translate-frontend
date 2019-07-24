import React, {Component, Fragment} from 'react'
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


    render() {
        const {errors} = this.state;

        const commentsList = this.props.comments.map((elem) => {
            return <Fragment>
                <li key={elem.senderName} className='list-group-item'>
                    <span>{elem.senderName}:</span> <span className='text-info ml-5'>{elem.commentText}</span>
                </li>

            </Fragment>
        })

        return (<div>
                <ul className='list-group'>
                    {commentsList}
                </ul>
                <form className='form' onSubmit={this.handleSubmit}>
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
                    <button className='btn btn-success mt-3'>Send</button>
                </form>
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
    registerComment, getComments
})(Comments)