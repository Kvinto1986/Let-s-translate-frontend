import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom';
import * as firebase from 'firebase';

import {registerText} from '../../actions/textAction'
import Select from 'react-select';
import languages from '../../resources/JSON/languages'
import tags from '../../resources/JSON/tags'
import config from '../../firebaseConfig'

firebase.initializeApp(config);

class NewText extends Component {
    state = {
        customerEmail: this.props.auth.user.email,
        customerName: this.props.auth.user.name,
        textAreaName: "",
        textArea: "",
        textFileName: "",
        textFileURL: "",
        originalLanguage: '',
        translationLanguage: '',
        addReview: false,
        translationSpeedCheck: false,
        tags: [],
        textAreaVisibility: false,
        fileDownloadVisibility: false,
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

    handleUploadText = (filename) => {
        firebase
            .storage()
            .ref("texts")
            .child(this.state.customerEmail+filename)
            .getDownloadURL()
            .then(url => this.setState({textFileURL: url}));
    };

    handleUploadTextArea = (filename, file) => {
        firebase
            .storage()
            .ref("texts")
            .child(this.state.customerEmail+filename + '.txt')
            .putString(file).then((snapshot) => {
            snapshot.ref.getDownloadURL().then(url => this.setState({textFileURL: url}));
        });
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
        this.setState({tags: tags});
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
            this.handleUploadText(this.state.textFileName.name);
            text.fileName = this.state.customerEmail+this.state.textFileName.name;
            text.fileUrl = this.state.textFileURL;
        }
        if (this.state.textArea.length > 0 && this.state.textAreaName.length>0) {
            this.handleUploadTextArea(this.state.textAreaName, this.state.textArea);
            text.fileName = this.state.customerEmail+this.state.textAreaName;
            text.fileUrl = this.state.textFileURL;
        }

        this.props.registerText(text);
        console.log(this.state)
    };

    render() {
        const {originalLang} = this.state.originalLanguage;
        const {translationLanguage} = this.state.translationLanguage;
        const {tagsSelect} = this.state.tags;
        console.log(this.state);

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
                        />
                    </div>
                    <div className="form-group">
                        <label>Original language</label>
                        <Select
                            value={originalLang}
                            onChange={this.handleChangeOriginLang}
                            options={languages}
                        />
                    </div>

                    <div className="form-group">
                        <label>Translation language</label>
                        <Select
                            value={translationLanguage}
                            onChange={this.handleChangeTranslateLang}
                            options={languages}
                        />
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
                            value={tagsSelect}
                            onChange={this.handleChangeTags}
                            options={tags}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
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