import React, {Component} from 'react'
import {translateReview} from '../../../actions/review/translateReviewAction.js'
import { connect } from 'react-redux'
import Swal from 'sweetalert2/dist/sweetalert2.js'

import 'sweetalert2/src/sweetalert2.scss'

class ReviewTranslate extends Component {

    state = {
        reviewFeedback: '',
        submitIsDisabled:true   
    }

    handleTextArea=(e)=>{
        this.setState({reviewFeedback: e.target.value})
        if(e.target.value===''){
            this.setState({submitIsDisabled: true})
        }
        else this.setState({submitIsDisabled: false})
    }

    translateReviewHandle = status => {
        const reviewMessageData = {
            senderEmail: this.props.auth.user.email,
            recipientEmail: this.props.translateToReview.translatorEmail,
            senderName: this.props.auth.user.name,
            recipientName: this.props.translateToReview.translatorName,
            messageText: this.state.reviewFeedback
        }

        Swal.fire({
            type: 'success',
            title: 'Congratulations!',
            text: 'The action was successful!!',
            allowOutsideClick: false
        }).then(() => {
            window.location.reload()
        })

        this.props.translateReview(this.props.translateToReview, this.props.auth.user.languages, status, reviewMessageData)
    }

    render() {
        const {translateToReview} = this.props
        const {reviewFeedback} = this.state


        return (
            <section className="col-xl-6 col-12">
                <div className="container">
                    <div>
                        <div className="d-flex justify-constent-center">
                            <p>
                                <small>Source </small>
                                <em> {translateToReview.originalLanguage} </em>
                            </p> 
                            <p className="ml-2">
                                <small>Target </small>
                                <em> {translateToReview.translationLanguage} </em>
                            </p>
                        </div>
                        <div>
                            <form className="ml-3">
                                <div className="form-group">
                                    <label>Translator name</label>
                                    <input
                                    className="form-control"
                                    value={translateToReview.translatorName}
                                    readOnly
                                    />
                                </div>
                                <div className="form-group">
                                    {
                                        translateToReview.translatedfileName
                                        ? (
                                            <>
                                                <div>
                                                    <label><small>Initial text download: </small></label>
                                                    <button type="button" className="btn btn-light btn-sm ml-2" >
                                                        <a 
                                                            href={translateToReview.initialTextFileUrl} 
                                                            className="text-decoration-none text-dark" 
                                                            download={translateToReview.initialfileName}>
                                                                Download
                                                        </a>
                                                    </button>
                                                </div>
                                                <div>
                                                    <label>Translate: </label>
                                                    <textarea
                                                    className="form-control"
                                                    value={translateToReview.translateText}
                                                    readOnly
                                                    />
                                                </div>
                                            </>
                                        )
                                        : null
                                    }
                                </div>
                                <div className="form-group">
                                    <label>Your feedback</label>
                                    <textarea 
                                    row="5"
                                    placeholder="Feedback"
                                    className="form-control btn-sm"
                                    name="reviewFeedback"
                                    onChange={this.handleTextArea}
                                    />
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="d-flex justify-content-end">
                        <button className="btn btn-dark" type="button" onClick={() => this.translateReviewHandle(false)} disabled={this.state.submitIsDisabled}>Reject</button>
                        <button className="ml-1 btn btn-success" type="button" onClick={() => this.translateReviewHandle(true)} disabled={this.state.submitIsDisabled}>Resolve</button>
                    </div>
                </div>
            </section>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
});

export default connect(mapStateToProps, {
    translateReview
})(ReviewTranslate)