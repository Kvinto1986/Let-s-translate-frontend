import React, {Component, Fragment} from 'react'

import * as firebase from 'firebase';
import Select from 'react-select';
import languages from '../../resources/JSON/languages'
import tags from '../../resources/JSON/tags'

import Swal from 'sweetalert2/dist/sweetalert2.js'

import 'sweetalert2/src/sweetalert2.scss'

class EditModal extends Component {

    state = {
        textEditVisibility: false,
        originalLanguageEditVisibility: false,
        translateLanguageEditVisibility: false,
        reviewEditVisibility: false,
        speedEditVisibility: false,
        tagsEditVisibility: false,
        textAreaVisibility: false,
        fileDownloadVisibility: false,
        modalDismiss: '',
        customerEmail: '',
        customerName: '',
        translateID: '',
        textAreaName: "",
        textArea: "",
        textAreaRequired: "required",
        textFileName: "",
        textFileRequired: "required",
        textFileURL: "",
        fileName: '',
        originalLanguage: '',
        translationLanguage: '',
        extraReview: '',
        translationSpeed: '',
        tags: [],
        cost: 0,
        charsCount: 1000,
        wrongCost:false,
        errors: {}
    };

    handleTextEditVisibility = (e, status) => {
        e.preventDefault();
        this.setState({
            [status]: !this.state[status]
        })
    };

    handleInputCharsCount = (e) => {
        this.setState({
            charsCount: Number.parseInt(e.target.value),
        },()=>{this.calculateCost()});

    };

    calculateCost = () => {

        if (this.state.originalLanguage !== '' && this.state.translationLanguage !== '' &&this.state.charsCount>999) {

            const originalLangFactor = Array.from(languages).filter((elem) => {
                return elem.label === this.state.originalLanguage
            })[0].value;

            const translateLangFactor = Array.from(languages).filter((elem) => {
                return elem.label === this.state.translationLanguage
            })[0].value;

            const reviewFactor = (() => {
                if (this.state.extraReview) return 1.1;
                else return 1
            })();

            const speedFactor = (() => {
                if (this.state.translationSpeed) return 1.3;
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


    handleInputFileChange = (e) => {
        this.setState({
            [e.target.name]: e.target.files[0], textAreaVisibility: true, textAreaName: "",
            textArea: "", fileName: this.state.customerEmail + '-' + e.target.files[0].name
        });
    };

    handleChangeTextAreaName = (e) => {
        this.setState({
            fileName: this.state.customerEmail + '-' + e.target.value + '.txt',
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
        },()=>{this.calculateCost()});

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
        },()=>{this.calculateCost()});
    };

    handleChangeTranslateLang = (language) => {
        this.setState({
            translationLanguage: language.label
        },()=>{this.calculateCost()});
    };

    handleChangeExtraReview = () => {
        this.setState({
            extraReview: !this.state.extraReview
        },()=>{this.calculateCost()});
    };

    handleChangeTranslationSpeed = () => {
        this.setState({translationSpeed: !this.state.translationSpeed},()=>{this.calculateCost()});
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
            text: 'The action was successful!!',
            allowOutsideClick: false
        }).then(() => {
            this.setState({
                textEditVisibility: false,
                originalLanguageEditVisibility: false,
                translateLanguageEditVisibility: false,
                reviewEditVisibility: false,
                speedEditVisibility: false,
                tagsEditVisibility: false,
                textAreaVisibility: false,
                fileDownloadVisibility: false,
                modalDismiss: '',
                customerEmail: '',
                customerName: '',
                translateID: '',
                textAreaName: "",
                textArea: "",
                textAreaRequired: "required",
                textFileName: "",
                textFileRequired: "required",
                textFileURL: "",
                fileName: '',
                originalLanguage: '',
                translationLanguage: '',
                extraReview: '',
                translationSpeed: '',
                tags: [],
                errors: {}
            });
            window.location.reload()
        })
    };


    handleSubmit = (e) => {
        e.preventDefault();

        console.log(this.props.updateText);

        const tagsArr = Array.from(this.state.tags).map((elem) => elem.value);

        const text = {
            translateID: this.state.translateID,
            originalLanguage: this.state.originalLanguage,
            translationLanguage: this.state.translationLanguage,
            extraReview: this.state.extraReview,
            translationSpeed: this.state.translationSpeed,
            charsCount: this.state.charsCount,
            cost:this.state.cost,
            tags: tagsArr
        };

        if (this.state.textFileName.name) {
            firebase
                .storage()
                .ref("texts")
                .child(this.state.fileName)
                .put(this.state.textFileName).then((snapshot) => {
                snapshot.ref.getDownloadURL().then(url =>
                    this.setState({textFileURL: url})).then(() => {
                    text.fileName = this.state.fileName;
                    text.fileUrl = this.state.textFileURL;
                    this.props.updateText(text, this.resetForm);
                })
            });
        } else if (this.state.textArea.length > 0 && this.state.textAreaName.length > 0) {

            firebase
                .storage()
                .ref("texts")
                .child(this.state.fileName)
                .putString(this.state.textArea).then((snapshot) => {
                snapshot.ref.getDownloadURL().then(url =>
                    this.setState({textFileURL: url})).then(() => {
                    text.fileName = this.state.fileName;
                    text.fileUrl = this.state.textFileURL;
                    this.props.updateText(text, this.resetForm);
                })
            });
        } else {
            this.props.updateText(text, this.resetForm);
        }

    };


    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }

        const getTags = () => {

            let tags = [];
            if (nextProps.editedTranslate.tags !== undefined) {
                tags = nextProps.editedTranslate.tags.map((elem) => {
                    return {
                        label: elem,
                        value: elem
                    }
                });
            }
            return tags
        };

        this.setState({
            translateID: nextProps.editedTranslate.id,
            fileName: nextProps.editedTranslate.fileName,
            originalLanguage: nextProps.editedTranslate.originalLanguage,
            translationLanguage: nextProps.editedTranslate.translationLanguage,
            extraReview: nextProps.editedTranslate.extraReview,
            translationSpeed: nextProps.editedTranslate.translationSpeed,
            tags: getTags(),
            customerEmail: nextProps.editedTranslate.email,
            customerName: nextProps.editedTranslate.name,
            cost: nextProps.editedTranslate.cost,
            charsCount: nextProps.editedTranslate.charsCount,
        });
    }

    render() {

        const {errors} = this.state;

        const editButtonChange = (status) => {
            if (this.state[status]) {
                return <Fragment>
                    <button className='btn btn-success ml-5 mr-2'
                            onClick={(e) => this.handleTextEditVisibility(e, status)}>
                        Save
                    </button>
                </Fragment>
            } else return <Fragment>
                <button className='btn btn-warning ml-5 mr-2'
                        onClick={(e) => this.handleTextEditVisibility(e, status)}>
                    Edit
                </button>
            </Fragment>
        };

        return (
            <div className="modal fade bd-example-modal-lg" id="exampleModalCenter" tabIndex="-1" role="dialog"
                 aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-dialog modal-lg" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLongTitle">Edit translate</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body d-inline-flex col-12 justify-content-center">
                            <form>
                                <div className="form-group d-inline-flex col-12 justify-content-center">

                                    <label className='font-weight-bolder col-4'>Text: </label>
                                    <span className='col-7'>{this.state.fileName}</span>
                                    {editButtonChange('textEditVisibility')}
                                </div>
                                {this.state.textEditVisibility ? (
                                    <div className="form-group">
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
                                    </div>
                                        ) : null}

                                <div className="form-group d-inline-flex col-12 justify-content-center">

                                    <label className='font-weight-bolder col-4'>Original language:</label>
                                    <Select
                                        className='col-7'
                                        onChange={this.handleChangeOriginLang}
                                        isDisabled={!this.state.originalLanguageEditVisibility}
                                        placeholder={this.state.originalLanguage}
                                        options={languages}
                                    />
                                    {editButtonChange('originalLanguageEditVisibility')}

                                </div>
                                {errors.originalLanguage && (
                                    <div className='text-danger'>{errors.originalLanguage}</div>)}
                                <div className="form-group d-inline-flex col-12 justify-content-center">
                                    <label className='font-weight-bolder col-4'>Translation language:</label>
                                    <Select
                                        className='col-7'
                                        onChange={this.handleChangeTranslateLang}
                                        isDisabled={!this.state.translateLanguageEditVisibility}
                                        placeholder={this.state.translationLanguage}
                                        options={languages}
                                    />
                                    {editButtonChange('translateLanguageEditVisibility')}
                                </div>
                                {errors.translationLanguage && (
                                    <div className='text-danger'>{errors.translationLanguage}</div>)}
                                <div className="form-group d-inline-flex col-12 justify-content-center">
                                    <label className='font-weight-bolder col-9'>
                                        Translation with an additional review from the second translator:</label>

                                    <input type="radio"
                                           className="ml-2"
                                           checked={this.state.extraReview}
                                           disabled={!this.state.reviewEditVisibility}
                                           onChange={this.handleChangeExtraReview}
                                    />
                                    <label className="ml-3">Yes</label>


                                    <input type="radio"
                                           className="ml-2"
                                           checked={!this.state.extraReview}
                                           disabled={!this.state.reviewEditVisibility}
                                           onChange={this.handleChangeExtraReview}
                                    />
                                    <label className="ml-3">No</label>

                                    {editButtonChange('reviewEditVisibility')}
                                </div>

                                <div className="form-group d-inline-flex col-12 justify-content-center">
                                    <label className='font-weight-bolder col-4'>
                                        Translation speed:</label>
                                    <div className='col-7'>
                                        <input type="radio"
                                               className="ml-2"
                                               checked={this.state.translationSpeed}
                                               disabled={!this.state.speedEditVisibility}
                                               onChange={this.handleChangeTranslationSpeed}
                                        />
                                        <label className="ml-3">Fast</label>

                                        <input type="radio"
                                               className="ml-2"
                                               checked={!this.state.translationSpeed}
                                               disabled={!this.state.speedEditVisibility}
                                               onChange={this.handleChangeTranslationSpeed}
                                        />
                                        <label className="ml-3">Slow</label>

                                    </div>
                                    {editButtonChange('speedEditVisibility')}

                                </div>

                                <div className="form-group d-inline-flex col-12 justify-content-center">
                                    <label className='font-weight-bolder col-4'>Tags:</label>
                                    <Select
                                        isMulti
                                        joinValues
                                        className='col-7'
                                        onChange={this.handleChangeTags}
                                        isDisabled={!this.state.tagsEditVisibility}
                                        value={this.state.tags}
                                        options={tags}
                                    />
                                    {editButtonChange('tagsEditVisibility')}
                                </div>
                                {errors.tags && (<div className='text-danger'>{errors.tags}</div>)}
                                <div className="form-group">
                                    <label className='font-weight-bolder col-4'>Cost: {!this.state.wrongCost?(<span className='text-primary'>{this.state.cost} $</span>):
                                        (<span className='text-danger'>No countries selected or characters less than 1000</span>)}</label>
                                    {errors.cost && (<div className='text-danger'>{errors.cost}</div>)}
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-success" onClick={this.handleSubmit}>Submit
                            </button>
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default EditModal
