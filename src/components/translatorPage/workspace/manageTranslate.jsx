import React, {Component} from 'react'
import {connect} from 'react-redux'
import { Progress } from 'react-sweet-progress';
import "react-sweet-progress/lib/style.css";
import {saveTranslate} from '../../../actions/translate/saveTranslate'

const tagStyle = {
    borderRadius: '5px',
    backgroundColor: 'lightgray',
    padding: '5px 10px'
}

class ManageTranslate extends Component {

    state = {
        textId: this.props.translateToManage.id,
        customerName: this.props.translateToManage.name,
        customerEmail: this.props.translateToManage.email,
        initialfileName: '',
        textAreaName: "",
        textArea: "",
        textAreaRequired: "required",
        textFileName: "",
        textFileRequired: "required",
        textFileURL: "",
        originalLanguage: this.props.translateToManage.originalLanguage,
        translationLanguage: this.props.translateToManage.translationLanguage,
        textAreaVisibility: false,
        fileDownloadVisibility: false,
        progress: this.props.translateToManage.progress,
        collectionName: this.props.translateToManage.collectionName,
        saveIsSuccess: ''
    }

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

    handleSave = () => {
        const {
            textId,
            customerName,
            customerEmail,
            originalLanguage,
            translationLanguage,
            progress,
            textAreaName,
            textArea,
            collectionName
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
            textName: textAreaName,
            text: textArea,
            collectionName,
            date: Date.now()
        }

        this.props.saveTranslate(translateState)
        this.setState({saveIsSuccess: true})
    }

    handleFinish = (e) => {
        e.preventDefault()

        const finalTranslateState = {}
        this.props.saveTranslate(finalTranslateState)
    }

    render() {
        const {manageStyle, translateToManage, auth} = this.props
        const {saveIsSuccess, progress} = this.state
        let alert

        if (translateToManage) {
            var {originalLanguage, translationLanguage, tags} = translateToManage
        }
        
        if (progress == 100) {
            alert = (
                <div className="alert alert-warning alert-dismissible fade show" role="alert">
                    <strong>Message: </strong>Translate progress was marked as <strong>done</strong>.
                    <hr />
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
                    <hr />
                    <p className="mb-0">You can continue work with that later.</p>
                    <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
            )
        }
        else if (saveIsSuccess === false) {
            alert = (
                <div className="alert alert-danger mt-4" role="alert">
                    <h4 className="alert-heading">Well done!</h4>
                    <p>
                        Aww yeah, you successfully read this important alert message. 
                        This example text is going to run a bit longer so that you can see
                        how spacing within an alert works with this kind of content.
                    </p>
                    <hr />
                    <p className="mb-0">Whenever you need to, be sure to use margin utilities to keep things nice and tidy.</p>
                </div>
            )
        }

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
                                disabled={this.state.fileDownloadVisibility}
                                required={this.state.textFileRequired}
                            />
                        </div>
                        <div className="form-group mt-3">
                            <label className={'mr-3'}>Translated text name</label>
                            <input
                                type="text"
                                placeholder="Text name"
                                name="initialfileName"
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
                            {/* {errors.text && (<div className='text-danger'>{errors.text}</div>)} */}
                        </div>
                        <div className="form-group mt-4">
                            <label>
                                Mark your translate progress here. <br/>
                                <small>That's important for customer!</small>
                            </label>
                            <input
                                type="number"
                                min="0"
                                max="100"
                                value={this.state.progress}
                                className="form-control"
                                onChange={(e) => this.setState({progress: e.target.value})}
                            />
                        </div>
                        <div>
                            {tags.map((tag, index) => {
                                return <span key={tag+index} style={tagStyle} className="mr-1"><em>#{tag}</em></span>
                            })}
                        </div>
                        <div className="form-group d-flex justify-content-end">
                            <div>
                                <button type="button" className="btn btn-sm btn-primary mr-3" onClick={() => this.handleSave()}>
                                    Save
                                </button>
                                <button type="submit" className="btn btn-sm btn-success">
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

});

export default connect(mapStateToProps, {saveTranslate})(ManageTranslate)