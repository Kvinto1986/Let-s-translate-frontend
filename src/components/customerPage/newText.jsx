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
        errors: {}
    };

    handleInputFileChange = (e) => {
        this.setState({
            [e.target.name]: e.target.files[0], textAreaVisibility: true, textAreaName: "",
            textArea: ""
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
            textArea: e.target.value
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
            email: this.state.customerEmail,
            originalLanguage: this.state.originalLanguage,
            translationLanguage: this.state.translationLanguage,
            extraReview: this.state.addReview,
            translationSpeed: this.state.translationSpeedCheck,
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
            <div className="col-8 mt-5">
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
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
                    <div className="form-group mt-3">
                        <label className={'mr-3'}>Text name:</label>
                        <input
                            type="text"
                            placeholder="Text"
                            name="textAreaName"
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

                    <div className="form-check">
                        <input
                            type="checkbox"
                            className="form-check-input"
                            checked={this.state.addReview}
                            onChange={this.handleChangeAddReview}
                        />

                        <label className="form-check-label">
                            Translation with an additional review from the second translator
                        </label>
                    </div>
                    <div className="form-check mt-3">
                        <label className="form-check-label">
                            Translation speed
                        </label>
                    </div>
                    <div className="form-check mt-3">
                        <label className="radio-inline">
                            <input
                                type="radio"
                                className="form-check-input"
                                checked={!this.state.translationSpeedCheck}
                                onChange={this.handleChangeTranslationSpeed}

                            />
                            Ordinary
                        </label>
                        <label className="radio-inline ml-5 ">
                            <input
                                type="radio"
                                className="form-check-input"
                                checked={this.state.translationSpeedCheck}
                                onChange={this.handleChangeTranslationSpeed}
                            />
                            Fast
                        </label>
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
                    <button type="submit" className="btn btn-primary">Create new translate text</button>
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