import React, {Component} from 'react'
import {translateReview} from '../../../actions/review/translateReviewAction.js'
import { connect } from 'react-redux'

class ReviewTranslate extends Component {

    translateReviewHandle = status => {
        this.props.translateReview(this.props.translateToReview, this.props.auth.user.languages, status)
    }

    render() {
        const {translateToReview} = this.props
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
                                    <label>Translate name</label>
                                    <input
                                    className="form-control"
                                    value={
                                        translateToReview.translateTextName
                                        ? translateToReview.translateTextName
                                        : translateToReview.translatedfileName
                                    }
                                    readOnly 
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Translate: </label>
                                    {
                                        translateToReview.translatedfileName
                                        ? (
                                            <button type="button" className="btn btn-primary btn-sm ml-2" >
                                                <a 
                                                href={translateToReview.initialTextFileUrl} 
                                                className="text-decoration-none text-dark" 
                                                download={translateToReview.initialfileName}>
                                                    Download
                                                </a>
                                            </button>
                                        )
                                        : (
                                            <textarea
                                            className="form-control btn-sm"
                                            value={translateToReview.translateText}
                                            readOnly
                                            />
                                        )
                                    }
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="d-flex justify-content-end">
                        <button className="btn btn-dark" type="button" onClick={() => this.translateReviewHandle(false)}>Reject</button>
                        <button className="ml-1 btn btn-success" type="button" onClick={() => this.translateReviewHandle(true)}>Resolve</button>
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