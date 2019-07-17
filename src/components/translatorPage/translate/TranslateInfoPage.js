import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchTranslateDataByID } from '../../../actions/fetchTranslateByID'
import customerImg from '../../../resources/images/bilboard/f2db5b1fae65676bfd1ecae1dbfdc3a2.jpg'
import {startTranslate} from '../../../actions/translate/startTranslateAction'
import {letsTranslate} from '../../../actions/translate/letsTranslate'
import { log } from 'util';

class TranslateInfoPage extends Component {

    state = {
        messageText: `Hello! My name is ${this.props.auth.user.name}, I'm glad to accept your order`
    }

    componentDidMount() {
        this.props.fetchTranslateDataByID(this.props.match.params.translateId)
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const sendData = {
            senderName: this.props.auth.user.name,
            senderEmail: this.props.auth.user.email,
            recipientName: this.props.selectedTranslate.data.customerData.name,
            recipientEmail: this.props.selectedTranslate.data.customerData.email,
            messageText: this.state.messageText
        }

        this.props.startTranslate(sendData)
    }

    handleInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    translateStartHendler = () => {
        const {translate: text} = this.props.selectedTranslate.data

        const sendData = {
            textId: this.props.match.params.translateId,
            translatorName: this.props.auth.user.name,
            translatorEmail: this.props.auth.user.email,
            customerName: text.name,
            customerEmail: text.email,
            originalLanguage: text.originalLanguage,
            translationLanguage: text.translationLanguage,
            translationSpeed: text.translationSpeed,
            extraReview: text.extraReview,
            tags: text.tags,
            initialfileName: text.fileName,
            initialTextFileUrl: text.fileUrl,
            progress: 0,
            isPaid: false
        }
        
        this.props.letsTranslate(this.props.history, sendData)
    }

    render() {
        const { data } = this.props.selectedTranslate;
        if (Object.keys(data).length > 0) {
            const { translate, customerData } = data;

            return (
                <div className="col-12 mt-5 d-flex justify-content-center align-items-center">
                    <div className="col-4 mt-5">
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
                            <button type="button" className="btn btn-info mt-3" >
                                <a href={translate.fileUrl} className="text-decoration-none text-light" download={translate.fileName}>Download text</a>
                            </button>
                        </div>
                    </div>
                    <div className="col-3 mt-5 ">
                        <img src={customerImg} alt="Customer" width="200px" />
                        <h3>{customerData.name}</h3>
                        <section>
                            <p><b>Email:</b> {customerData.email}</p>
                        </section>
                        <form onSubmit={e => this.handleSubmit(e)}>
                            <div className="form-group">
                                <label>Your message to customer</label>
                                <textarea
                                    name='messageText'
                                    className="form-control"
                                    placeholder="Yor message"
                                    onChange={e => this.handleInputChange(e)}
                                    value={this.state.messageText}
                                />
                            </div>
                            <div className="form-group">
                                <button type="submit" className="btn btn-dark">
                                    Take an order
                                </button>
                            </div>
                        </form>
                        <button type="button" className="btn btn-dark" onClick={() => this.translateStartHendler()}>
                            Bind translate
                        </button>
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
    fetchTranslateDataByID,
    startTranslate,
    letsTranslate
})(TranslateInfoPage)