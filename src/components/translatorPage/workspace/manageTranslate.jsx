import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Progress} from 'react-sweet-progress';
import "react-sweet-progress/lib/style.css";
import {saveTranslate} from '../../../actions/translate/saveTranslate'
import {finishTranslate} from '../../../actions/translate/finishTranslate'
import classnames from 'classnames';

import * as firebase from "firebase";

import {socket} from '../../navigation/Header';

import Swal from 'sweetalert2/dist/sweetalert2.js'

import 'sweetalert2/src/sweetalert2.scss'


const tagStyle = {
    borderRadius: '5px',
    backgroundColor: 'lightgray',
    padding: '5px 10px'
}

class ManageTranslate extends Component {
    state = {
        textId: this.props.translateToManage.textId,
        customerName: this.props.translateToManage.customerName,
        customerEmail: this.props.translateToManage.customerEmail,
        initialfileName: '',
        translateTextName: this.props.translateToManage.translateTextName,
        translateText: this.props.translateToManage.translateText,
        translateTextRequired: "required",
        textFileName: "",
        textFileRequired: "required",
        textFileURL: "",
        originalLanguage: this.props.translateToManage.originalLanguage,
        translationLanguage: this.props.translateToManage.translationLanguage,
        translateTextVisibility: false,
        fileDownloadVisibility: true,
        progress: this.props.translateToManage.progress,
        tags: this.props.translateToManage.tags,
        collectionName: this.props.translateToManage.collectionName,
        saveIsSuccess: '',
        formats: ['doc', 'docx', 'txt', 'pdf', 'jpg', 'jpeg', 'png'],
        format: true,
        errors: {}
    }

    componentDidMount() {
        socket.on("newTranslateStatusAlert", () => {
            this.setState({saveIsSuccess: true})
        })
    }

    componentWillReceiveProps(nextProps) {

        if (nextProps.translateToManage) {
            if (nextProps.translateToManage.textId !== this.state.textId) {
                this.setState(nextProps.translateToManage)
            }
        }

        if (nextProps.translateToManage.progress === '100') {
            this.setState({
                translateTextVisibility: false,
                fileDownloadVisibility: false,
            });
        } else {
            this.setState({
                translateTextVisibility: true,
                fileDownloadVisibility: true,

            });
        }

        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }

    handleInputFileChange = (e) => {
        const format = e.target.files[0].name.split('.').pop();

        const fileSize = e.target.files[0].size;
        if (this.state.formats.includes(format) && fileSize < 50000) {
            this.setState({
                [e.target.name]: e.target.files[0],
                translateTextVisibility: true,
                translateTextName: "",
                format: false,
                translateText: ""
            })
        } else this.setState({format: true})
    }


    handleChangetranslateTextName = (e) => {
        this.setState({
            translateTextName: e.target.value
        });

        if (e.target.value.length === 0) {
            this.setState({
                fileDownloadVisibility: false
            })
        } else {
            this.setState({
                fileDownloadVisibility: true
            });
        }
    };

    handleChangetranslateText = (e) => {
        this.setState({
            translateText: e.target.value
        });

        if (e.target.value.length === 0 && this.state.translateTextName.length === 0) {
            this.setState({
                fileDownloadVisibility: false
            })
        } else {
            this.setState({
                fileDownloadVisibility: true
            });
        }
    };

    saveAlert = () => {
        this.setState({saveIsSuccess: true})
    }

    handleSave = () => {
        const {
            textId,
            customerName,
            customerEmail,
            originalLanguage,
            translationLanguage,
            progress,
            translateTextName,
            translateText,
        } = this.state

        const translateState = {
            textId,
            customerName,
            translatorName: this.props.auth.user.name,
            customerEmail,
            translatorEmail: this.props.auth.user.email,
            originalLanguage,
            translationLanguage,
            progress,
            isReady: false,
            translateTextName,
            translateText,
            date: Date.now()
        }

        this.props.saveTranslate(translateState, this.saveAlert)

    }

    finishTranslateAlert = () => {
        Swal.fire({
            type: 'success',
            title: 'Congratulations!',
            text: 'The action was successful!!'
        }).then(() => {
            window.location.reload();
        })
    }

    handleFinish = (e) => {
        e.preventDefault()

        const {
            textId,
            progress,
            tags,
            translateTextName,
            translateText,
            textFileName,
            textFileURL,
            collectionName
        } = this.state

        const {
            extraReview,
            isReviewed,
            translationSpeed
        } = this.props.translateToManage

        const finalTranslateState = {
            textId,
            isReady: true,
            extraReview,
            isReviewed,
            tags,
            progress,
            collectionName,
            translatedfileName: textFileName.name,
            translatedTextFileUrl: textFileURL,
            translateTextName,
            translateText,
            translationSpeed,
            finalCost: null,
            date: Date.now()
        }

        if (this.state.textFileName.name) {
            firebase
                .storage()
                .ref("translates")
                .child(this.state.customerEmail + '-' + this.state.textFileName.name)
                .put(this.state.textFileName).then((snapshot) => {
                snapshot.ref.getDownloadURL().then(url =>
                    this.setState({textFileURL: url})).then(() => {
                    finalTranslateState.translatedfileName = this.state.customerEmail + '-' + this.state.textFileName.name;
                    finalTranslateState.translatedTextFileUrl = this.state.textFileURL;
                    this.props.finishTranslate(finalTranslateState, this.finishTranslateAlert);
                })
            });
        } else if (this.state.translateTextName.length > 0 && this.state.translateText.length > 0) {
            firebase
                .storage()
                .ref("translates")
                .child(this.state.customerEmail + '-' + this.state.translateTextName + '.txt')
                .putString(this.state.translateText).then((snapshot) => {
                snapshot.ref.getDownloadURL().then(url =>
                    this.setState({textFileURL: url})).then(() => {
                    finalTranslateState.translatedfileName = this.state.customerEmail + '-' + this.state.translateTextName + '.txt';
                    finalTranslateState.translatedTextFileUrl = this.state.textFileURL;
                    this.props.finishTranslate(finalTranslateState, this.finishTranslateAlert);
                })
            });
        }

    }

    render() {
        const {manageStyle} = this.props
        const {originalLanguage, translationLanguage, fileDownloadVisibility, translateText, translateTextName, saveIsSuccess, tags, progress, errors} = this.state
        let alert
        if (progress == 100) {
            alert = (
                <div className="alert alert-warning alert-dismissible fade show" role="alert">
                    <strong>Message: </strong>Translate progress was marked as <strong>done</strong>.
                    <hr/>
                    <p className="mb-0">load translate as file, you can</p>
                    <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
            )
        }

        if (saveIsSuccess === true) {
            alert = (
                <div className="alert alert-primary mt-4 alert-dismissible fade show" role="alert">
                    <h4 className="alert-heading">Well done!</h4>
                    <p>
                        Your translate successfully saved.
                    </p>
                    <hr/>
                    <p className="mb-0">You can continue work with that later.</p>
                    <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
            )
        } else if (saveIsSuccess === false) {
            alert = (
                <div className="alert alert-danger mt-4" role="alert">
                    <h4 className="alert-heading">Well done!</h4>
                    <p>
                        Aww yeah, you successfully read this important alert message.
                        This example text is going to run a bit longer so that you can see
                        how spacing within an alert works with this kind of content.
                    </p>
                    <hr/>
                    <p className="mb-0">Whenever you need to, be sure to use margin utilities to keep things nice and
                        tidy.</p>
                </div>
            )
        }

        if (this.state.errors.translateManage) {
            alert = (
                <div className="alert alert-danger mt-4" role="alert">
                    <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    <h4 className="alert-heading">Manage error!</h4>
                    <p>
                        Here is {this.state.errors.translateManage}
                    </p>
                </div>
            )
        }

        // if (progress < 100) {
        //     fileIsDisabled = true
        // }
        // else {
        //     fileIsDisabled = false
        // }
        // console.log(progress > 99, translateText === null, translateTextName == false);


        let fileIsDisabled = !(progress > 99 && translateText === null && translateTextName == false)
            ? true
            : false

        console.log(fileDownloadVisibility, fileIsDisabled);


        return (
            <>
                <h4>Manage section</h4>
                <div style={manageStyle}>
                    <form onSubmit={e => this.handleFinish(e)}>
                        <div className="form-group">
                            <h5 className="text-primary">Create translate</h5>
                        </div>
                        <Progress
                            percent={this.state.progress}
                            strokeWidth={3}
                            style={{position: 'absolute', top: '0', right: '30px'}}
                            type="circle"
                            width={85}
                            theme={{
                                default: {
                                    symbol: this.state.progress + '%',
                                    trailColor: 'lightblue',
                                    color: 'lightblue'
                                },
                            }}
                        />
                        {alert}
                        <div className="row">
                            <div className="col-sm-6 col-12">
                                <div className="form-group">
                                    <label>Customer name</label>
                                    <input
                                        type="text"
                                        value={this.state.customerName}
                                        name="customerName"
                                        className="form-control"
                                        disabled
                                        readOnly
                                    />
                                </div>
                            </div>
                            <div className="col-sm-6 col-12">
                                <div className="form-group">
                                    <label>Customer email</label>
                                    <input
                                        type="text"
                                        value={this.state.customerEmail}
                                        name="customerName"
                                        className="form-control"
                                        disabled
                                        readOnly
                                    />
                                </div>
                            </div>
                        </div>
                        <p>Translate from <b>{originalLanguage}</b> to <b>{translationLanguage}</b></p>
                        <div className="form-group">
                            <label className={'mr-3'}>Put ready file</label>
                            <input
                                type="file"
                                name="textFileName"
                                onChange={this.handleInputFileChange}
                                disabled={fileIsDisabled && fileDownloadVisibility}
                                required={this.state.textFileRequired}
                                className={classnames({
                                    'is-invalid': errors.translateManage
                                })}
                            />
                            {this.state.format && (<div className='text-danger'>Invalid file format</div>)}
                        </div>
                        <div className="form-group mt-3">
                            <label className={'mr-3'}>Translated text name</label>
                            <input
                                type="text"
                                placeholder="Text name"
                                name="initialfileName"
                                className={classnames('form-control', {
                                    'is-invalid': errors.translateManage
                                })}
                                onChange={this.handleChangetranslateTextName}
                                disabled={this.state.translateTextVisibility}
                                value={translateTextName || ''}
                                required={this.state.translateTextRequired}
                            />
                        </div>
                        <div className="form-group">
                            <label>Your text</label>
                            <textarea
                                name='translateText'
                                className={classnames('form-control', {
                                    'is-invalid': errors.translateManage
                                })}
                                placeholder="Text"
                                onChange={this.handleChangetranslateText}
                                value={translateText || ''}
                                disabled={this.state.translateTextVisibility}
                                required={this.state.translateTextRequired}
                            />
                        </div>
                        <div className="form-group mt-4">
                            <label>
                                Mark your translate progress here bellow. <br/>
                                <small>That's important for customer!</small>
                            </label>
                            <input
                                type="number"
                                min="0"
                                max="100"
                                value={this.state.progress}
                                className={classnames('form-control', {
                                    'is-invalid': errors.progress
                                })}
                                onChange={(e) => this.setState({progress: e.target.value})}
                            />
                            {errors.progress && (<div className="invalid-feedback">{errors.progress}</div>)}
                        </div>
                        <div>
                            {tags.map((tag, index) => {
                                return <span key={tag + index} style={tagStyle} className="mr-1"><em>#{tag}</em></span>
                            })}
                        </div>
                        <div className="form-group d-flex justify-content-end">
                            <div>
                                <button type="button" className="btn btn-sm btn-primary mr-3"
                                        onClick={() => this.handleSave()}>
                                    Save
                                </button>
                                <button
                                    type="submit"
                                    className="btn btn-sm btn-success"
                                    disabled={(progress == 100&&!this.state.format) ? false : true}
                                >
                                    Finish
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </>
        )
    }
}

const mapStateToProps = state => ({
    errors: state.errors
});

export default connect(mapStateToProps, {
    saveTranslate,
    finishTranslate
})(ManageTranslate)