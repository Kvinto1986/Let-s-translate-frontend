import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchTranslateDataByID} from '../../../actions/fetchTranslateByID'
import customerImg from '../../../resources/images/bilboard/f2db5b1fae65676bfd1ecae1dbfdc3a2.jpg'

const style={
    marginTop: '350px',
    marginBottom: '100px'
}

const btnSmStyle = {
    marginTop: '15px'
}

class TranslateInfoPage extends Component {
    componentDidMount() {
        this.props.fetchTranslateDataByID(this.props.match.params.translateId)
    }

    render() {
        const {data} = this.props.selectedTranslate
        if (Object.keys(data).length > 0) {
            const {translate, customerData} = data
            return (
                <div className="row">
                    <div className="col-9">
                        <div className="container">
                            <h3>Translate information</h3>
                            <section>
                                <h5>Translate themes</h5>
                                <span>{translate.tags.join(', ')}</span>
                            </section>
                            <section>
                                <h5>Customer name</h5>
                                <span>{translate.name}</span>
                            </section>
                            <section>
                                <h5>Languages</h5>
                                <span>{translate.originalLanguage} - {translate.translationLanguage}</span>
                            </section>
                            <section>
                                <h5>Extra review</h5>
                                <span>{translate.extraReview ? 'Yes' : 'No'} </span>
                            </section>
                            <section>
                                <h5>Deadline </h5>
                                <span>{translate.translationSpeed ? 'Hot' : 'Not so hot'} </span>
                            </section>
                            <section>
                                <h5>Published at</h5>
                                <span>{translate.date} </span>
                            </section>
                            <div>
                                <button type="button" className="btn btn-dark" onClick={e => e.preventDefault()}>
                                    <a href={translate.fileUrl} download={translate.fileName}>Donwload</a>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="col-3 d-flex flex-column align-items-center">
                        <div className="d-flex flex-column align-items-center">
                            <img src={customerImg} alt="Customer" width="200px"/>
                            <h3>{customerData.name}</h3>
                            <section>
                                <p><b>Email:</b> {customerData.email}</p>
                            </section>
                            <form className="d-flex flex-column align-items-end">
                                <textarea className="form-control" placeholder="Send message" ></textarea>
                                <button type="submit" className="btn btn-outline-dark btn-sm" style={btnSmStyle}>
                                    Send
                                </button>
                            </form>
                        </div>
                        <div style={style}>
                            <Link to="/profile/edit">
                                <button type="button" className="btn btn-outline-dark">
                                    Translate
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            )
        }
        else {
            return null
        }
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
    selectedTranslate: state.selectedTranslate
});

export default connect(mapStateToProps, {
    fetchTranslateDataByID
})(TranslateInfoPage)