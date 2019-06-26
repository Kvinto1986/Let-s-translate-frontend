import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchTranslateDataByID} from '../../../actions/fetchTranslateByID'
import customerImg from '../../../resources/images/bilboard/f2db5b1fae65676bfd1ecae1dbfdc3a2.jpg'
import Select from "react-select";
import languages from "../../../resources/JSON/languages";
import tags from "../../../resources/JSON/tags";

const style={
    marginTop: '350px',
    marginBottom: '100px'
};

const btnSmStyle = {
    marginTop: '15px'
};

class TranslateInfoPage extends Component {

    componentDidMount() {
        this.props.fetchTranslateDataByID(this.props.match.params.translateId)
    }

    render() {
        const {data} = this.props.selectedTranslate;
        if (Object.keys(data).length > 0) {
            const {translate, customerData} = data;
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
                            <img src={customerImg} alt="Customer" width="200px"/>
                            <h3>{customerData.name}</h3>
                            <section>
                                <p><b>Email:</b> {customerData.email}</p>
                            </section>
                            <form>
                                <div className="form-group mt-3">
                                    <label className={'mr-3'}>Massage topic:</label>
                                    <input
                                        type="text"
                                        placeholder="Text"
                                        name="textAreaName"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Your text</label>
                                    <textarea
                                        name='textArea'
                                        className="form-control"
                                        placeholder="Text"
                                    />
                                </div>
                                <div className="form-group">
                                <button type="submit" className="btn btn-primary">Submit</button>
                                </div>
                                <div className="form-group">
                                <button type="button" className="btn btn-dark">
                                    Take an order
                                </button>
                                </div>
                            </form>
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