import React, {Component} from 'react'

class ReviewTranslate extends Component {
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
                                    <label>Translate</label>
                                    {
                                        translateToReview.translatedfileName
                                        ? (
                                            <button type="button" className="btn btn-primary" >
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
                                            className="form-control"
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
                        <button className="btn btn-dark" type="button">Reject</button>
                        <button className="ml-1 btn btn-success" type="button">Resolve</button>
                    </div>
                </div>
            </section>
        )
    }
}

export default ReviewTranslate