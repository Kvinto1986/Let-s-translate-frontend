import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom';
import * as firebase from 'firebase';

import {registerText} from '../../actions/textAction'
import Select from 'react-select';
import languages from '../../resources/JSON/languages'
import tags from '../../resources/JSON/tags'
import config from '../../firebaseConfig'
import Swal from 'sweetalert2/dist/sweetalert2.js'

import 'sweetalert2/src/sweetalert2.scss'

firebase.initializeApp(config);

class NewText extends Component {
    state = {
        customerEmail: this.props.auth.user.email,
        customerName: this.props.auth.user.name,
        textAreaName: "",
        textArea: "",
        textAreaRequired: "required",
        textFileName: "",
        textFileRequired: "required",
        textFileURL: "",
        originalLanguage: '',
        translationLanguage: '',
        addReview: false,
        translationSpeedCheck: false,
        tags: [],
        textAreaVisibility: false,
        fileDownloadVisibility: false,
        cost: 0,
        charsCount: 1000,
        wrongCost:false,
        errors: {}

    };

    handleInputFileChange = (e) => {
        this.setState({
            [e.target.name]: e.target.files[0], textAreaVisibility: true, textAreaName: "",
            textArea: ""
        });
    };

    handleInputCharsCount = (e) => {
        this.setState({
            charsCount: Number.parseInt(e.target.value),
        });
    };

    handleChangeTextAreaName = (e) => {
        this.setState({
            textAreaName: e.target.value
        });

        if (e.target.value.length === 0 && this.state.textArea.length === 0) {
            this.setState({
                fileDownloadVisibility: false
            })
        } else {
            this.setState({
                fileDownloadVisibility: true
            });
        }
    };

    handleChangeTextArea = (e) => {
        this.setState({
            textArea: e.target.value,
            charsCount: e.target.value.length
        });

        if (e.target.value.length === 0 && this.state.textAreaName.length === 0) {
            this.setState({
                fileDownloadVisibility: false
            })
        } else {
            this.setState({
                fileDownloadVisibility: true
            });
        }
    };

    handleChangeOriginLang = (language) => {
        this.setState({
            originalLanguage: language.label
        });
    };

    handleChangeTranslateLang = (language) => {
        this.setState({
            translationLanguage: language.label
        });
    };

    handleChangeAddReview = () => {
        this.setState({
            addReview: !this.state.addReview
        });
    };

    handleChangeTranslationSpeed = () => {
        this.setState({translationSpeedCheck: !this.state.translationSpeedCheck});
    };

    calculateCost = (e) => {
        e.preventDefault();

        if (this.state.originalLanguage !== '' && this.state.translationLanguage !== '' &&this.state.charsCount>999) {

            const originalLangFactor = Array.from(languages).filter((elem) => {
                return elem.label === this.state.originalLanguage
            })[0].value;

            const translateLangFactor = Array.from(languages).filter((elem) => {
                return elem.label === this.state.translationLanguage
            })[0].value;

            const reviewFactor = (() => {
                if (this.state.addReview) return 1.1;
                else return 1
            })();

            const speedFactor = (() => {
                if (this.state.translationSpeedCheck) return 1.3;
                else return 1
            })();

            const charsCount = this.state.charsCount;

            const cost = (originalLangFactor + translateLangFactor / 2) * reviewFactor * speedFactor * charsCount / 1000;

            this.setState({
                cost: cost.toFixed(2),
                wrongCost:false
            });
        }
        else {
            this.setState({
                cost: 0,
                wrongCost:true
            });
        }
    };

    handleChangeTags = (tags) => {
        if (tags === null)
            this.setState({tags: []});

        else
            this.setState({tags: tags});
    };

    resetForm = () => {
        Swal.fire({
            type: 'success',
            title: 'Congratulations!',
            text: 'Your translate was successfully created!',
            allowOutsideClick: false
        }).then((result) => {
            if (result.value) {
                window.location.reload()
            }

        })


    };

    handleSubmit = (e) => {
        e.preventDefault();

        const tagsArr = Array.from(this.state.tags).map((elem) => elem.value);

        const text = {
            name: this.state.customerName,
            charsCount: this.state.charsCount,
            email: this.state.customerEmail,
            originalLanguage: this.state.originalLanguage,
            translationLanguage: this.state.translationLanguage,
            extraReview: this.state.addReview,
            translationSpeed: this.state.translationSpeedCheck,
            cost: this.state.cost,
            tags: tagsArr
        };

        if (this.state.textFileName.name) {
            firebase
                .storage()
                .ref("texts")
                .child(this.state.customerEmail + '-' + this.state.textFileName.name)
                .put(this.state.textFileName).then((snapshot) => {
                snapshot.ref.getDownloadURL().then(url =>
                    this.setState({textFileURL: url})).then(() => {
                    text.fileName = this.state.customerEmail + '-' + this.state.textFileName.name;
                    text.fileUrl = this.state.textFileURL;
                    this.props.registerText(text, this.resetForm);
                })
            });
        }

        if (this.state.textArea.length > 0 && this.state.textAreaName.length > 0) {
            firebase
                .storage()
                .ref("texts")
                .child(this.state.customerEmail + '-' + this.state.textAreaName + '.txt')
                .putString(this.state.textArea).then((snapshot) => {
                snapshot.ref.getDownloadURL().then(url =>
                    this.setState({textFileURL: url})).then(() => {
                    text.fileName = this.state.customerEmail + '-' + this.state.textAreaName + '.txt';
                    text.fileUrl = this.state.textFileURL;
                    this.props.registerText(text, this.resetForm);
                })
            });
        }

    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }

    componentDidMount = () => {
    };

    render() {

        const {errors} = this.state;

        return (

            <div className="col-12 mt-2 mb-5 d-flex justify-content-center">
                <form onSubmit={this.handleSubmit}>
                    <ul className="nav nav-tabs d-flex justify-content-center" id="myTab" role="tablist">
                        <li className="nav-item ">
                            <a className="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab"
                               aria-controls="home" aria-selected="true"><h6>Download document</h6></a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab"
                               aria-controls="profile" aria-selected="false"><h6>Create translate text</h6></a>
                        </li>
                    </ul>
                    <div className="tab-content" id="myTabContent">
                        <div className="tab-pane fade show active" id="home" role="tabpanel"
                             aria-labelledby="home-tab">
                            <div className="form-group mt-4">
                                <label className={'mr-3'}>Download text:</label>
                                <input
                                    type="file"
                                    placeholder="Text"
                                    name="textFileName"
                                    onChange={this.handleInputFileChange}
                                    disabled={this.state.fileDownloadVisibility}
                                    required={this.state.textFileRequired}
                                />
                            </div>
                            <div className="form-group mb-3">
                                <label className={'mr-3'}>Characters</label>
                                <input
                                    min={1000}
                                    type="number"
                                    placeholder="Chars count (min 1000)"
                                    name="charsCount"
                                    className="form-control"
                                    value={this.state.charsCount}
                                    onChange={this.handleInputCharsCount}
                                    disabled={this.state.fileDownloadVisibility}
                                    required={this.state.textFileRequired}
                                />
                            </div>
                        </div>
                        <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                            <div className="form-group mt-4">
                                <label className={'mr-3'}>Text name:</label>
                                <input
                                    type="text"
                                    placeholder="Text"
                                    name="textAreaName"
                                    className="form-control"
                                    onChange={this.handleChangeTextAreaName}
                                    disabled={this.state.textAreaVisibility}
                                    value={this.state.textAreaName}
                                    required={this.state.textAreaRequired}
                                />
                            </div>
                            <div className="form-group">
                                <label>Your text</label>
                                <textarea
                                    name='textArea'
                                    className="form-control"
                                    placeholder="Text"
                                    onChange={this.handleChangeTextArea}
                                    value={this.state.textArea}
                                    disabled={this.state.textAreaVisibility}
                                    required={this.state.textAreaRequired}
                                />
                                {errors.text && (<div className='text-danger'>{errors.text}</div>)}
                            </div>
                            <div className="form-group mb-3">
                                <label className={'mr-3'}>Characters</label>
                                <input
                                    min={1000}
                                    type="number"
                                    placeholder="Chars count (min 1000)"
                                    name="charsCount"
                                    value={this.state.charsCount}
                                    onChange={this.handleInputCharsCount}
                                    disabled={true}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Original language</label>
                        <Select
                            onChange={this.handleChangeOriginLang}
                            options={languages}
                        />
                        {errors.originalLanguage && (<div className='text-danger'>{errors.originalLanguage}</div>)}
                    </div>

                    <div className="form-group">
                        <label>Translation language</label>
                        <Select
                            onChange={this.handleChangeTranslateLang}
                            options={languages}
                        />
                        {errors.translationLanguage && (
                            <div className='text-danger'>{errors.translationLanguage}</div>)}
                    </div>

                    <div className="form-check d-flex align-items-center">
                        <input
                            type="checkbox"
                            className="form-check-input mb-1"
                            checked={this.state.addReview}
                            onChange={this.handleChangeAddReview}
                        />
                        <small>
                            Translation with an additional review (+10% to the cost)
                        </small>
                    </div>
                    <div>
                        <p className="form-check-label mt-3">
                            Translation speed
                        </p>
                        <div className="form-check mt-3">
                            <label className="radio-inline">
                                <input
                                    type="radio"
                                    className="form-check-input"
                                    checked={!this.state.translationSpeedCheck}
                                    onChange={this.handleChangeTranslationSpeed}
                                />
                                <small>Ordinary</small>
                            </label>
                            <label className="radio-inline ml-5 ">
                                <input
                                    type="radio"
                                    className="form-check-input"
                                    checked={this.state.translationSpeedCheck}
                                    onChange={this.handleChangeTranslationSpeed}
                                />
                                <small>Fast (+50% less translation time, + 30% to the cost)</small>
                            </label>
                        </div>
                    </div>
                    <div className="form-group">
                        <button type="button" className="btn btn-dark btn-sm mt-3" onClick={this.calculateCost}>Calculate
                            the cost of translation
                        </button>
                        <h5 className='mt-3 text-primary'>Cost: {!this.state.wrongCost?(<span className='text-primary'>{this.state.cost} $</span>):
                            (<span className='text-danger'>No countries selected or characters less than 1000</span>)}</h5>
                        {errors.cost && (<div className='text-danger'>{errors.cost}</div>)}
                    </div>
                    <div className="form-group">
                        <label>Tags</label>
                        <Select
                            isMulti
                            joinValues
                            onChange={this.handleChangeTags}
                            options={tags}
                        />
                        {errors.tags && (<div className='text-danger'>{errors.tags}</div>)}
                    </div>
                    <button type="submit" className="btn btn-primary ">Create new translate text</button>
                </form>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors,
});

export default connect(mapStateToProps, {registerText})(withRouter(NewText))