import React, {Component, Fragment} from 'react'
import Select from 'react-select';
import languages from '../../resources/JSON/languages'
import tags from '../../resources/JSON/tags'

class EditModal extends Component {

    state = {
        textEditVisibility: false,
        originalLanguageEditVisibility: false,
        translateLanguageEditVisibility: false,
        reviewEditVisibility: false,
        speedEditVisibility: false,
        tagsEditVisibility: false,
        fileName:'',
        originalLanguage:'',
        translationLanguage:'',
        review:null,
        speed:null,
        tags:[],
        errors: {}
    };

    handleTextEditVisibility = (e, status) => {
        e.preventDefault();
        this.setState({
            [status]: !this.state[status]
        })
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }

        this.setState({
            fileName: nextProps.editedTranslate.fileName,
            originalLanguage:nextProps.editedTranslate.originalLanguage,
            translationLanguage:nextProps.editedTranslate.translationLanguage,
            review:nextProps.editedTranslate.review,
            speed:nextProps.editedTranslate.speed,
            tags:nextProps.editedTranslate.tags,

        });
    }

    render() {

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
                                    <button className='btn btn-warning ml-5 mr-2'
                                            onClick={(e) => this.handleTextEditVisibility(e, 'textEditVisibility')}
                                            disabled={this.state.textEditVisibility}>Edit
                                    </button>
                                </div>
                                {this.state.textEditVisibility ? (
                                    <div className="form-group">
                                        <div className="form-group">
                                            <label className={'mr-3'}>Download text:</label>
                                            <input
                                                type="file"
                                                placeholder="Text"
                                                name="textFileName"
                                                //onChange={this.handleInputFileChange}
                                                // disabled={this.state.fileDownloadVisibility}
                                                //required={this.state.textFileRequired}
                                            />
                                        </div>
                                        <div className="form-group mt-3">
                                            <label className={'mr-3'}>Text name:</label>
                                            <input
                                                type="text"
                                                placeholder="Text"
                                                name="textAreaName"
                                                // onChange={this.handleChangeTextAreaName}
                                                //  disabled={this.state.textAreaVisibility}
                                                //  value={this.state.textAreaName}
                                                //  required={this.state.textAreaRequired}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Your text</label>
                                            <textarea
                                                name='textArea'
                                                className="form-control"
                                                placeholder="Text"
                                                //onChange={this.handleChangeTextArea}
                                                //  value={this.state.textArea}
                                                // disabled={this.state.textAreaVisibility}
                                                // required={this.state.textAreaRequired}
                                            />
                                        </div>
                                        <button type="button" className="btn btn-success mr-2"
                                                disabled={true}>Save
                                        </button>
                                        <button type="button" className="btn btn-warning"
                                                onClick={(e) => this.handleTextEditVisibility(e, 'textEditVisibility')}>Close
                                        </button>
                                    </div>) : null}


                                <div className="form-group d-inline-flex col-12 justify-content-center">
                                    <label className='font-weight-bolder col-4'>Original language:</label>
                                    <Select
                                        className='col-7'
                                        //onChange={this.handleChangeOriginLang}
                                        isDisabled={!this.state.originalLanguageEditVisibility}
                                        placeholder={this.state.originalLanguage}
                                        options={languages}
                                    />
                                    {editButtonChange('originalLanguageEditVisibility')}

                                </div>
                                <div className="form-group d-inline-flex col-12 justify-content-center">
                                    <label className='font-weight-bolder col-4'>Translation language:</label>
                                    <Select
                                        className='col-7'
                                        //onChange={this.handleChangeOriginLang}
                                        isDisabled={!this.state.translateLanguageEditVisibility}
                                        placeholder={this.state.translationLanguage}
                                        options={languages}
                                    />
                                    {editButtonChange('translateLanguageEditVisibility')}
                                </div>
                                <div className="form-group d-inline-flex col-12 justify-content-center">
                                    <label className='font-weight-bolder col-9'>
                                        Translation with an additional review from the second translator:</label>
                                    <div className="custom-control custom-radio custom-control-inline">
                                        <input type="radio"
                                               className="custom-control-input"
                                               checked={this.state.extraReview}
                                               disabled={!this.state.reviewEditVisibility}/>
                                        <label className="custom-control-label">Yes</label>
                                    </div>
                                    <div className="custom-control custom-radio custom-control-inline">
                                        <input type="radio"
                                               className="custom-control-input"
                                               checked={!this.state.extraReview}
                                               disabled={!this.state.reviewEditVisibility}/>
                                        <label className="custom-control-label">No</label>
                                    </div>
                                    {editButtonChange('reviewEditVisibility')}
                                </div>

                                <div className="form-group d-inline-flex col-12 justify-content-center">
                                    <label className='font-weight-bolder col-4'>
                                        Translation speed:</label>
                                    <div className='col-7'>
                                        <div className="custom-control custom-radio custom-control-inline">
                                            <input type="radio"
                                                   className="custom-control-input"
                                                   checked={this.state.translationSpeed}
                                                   disabled={!this.state.speedEditVisibility}/>
                                            <label className="custom-control-label">Fast</label>
                                        </div>
                                        <div className="custom-control custom-radio custom-control-inline">
                                            <input type="radio"
                                                   className="custom-control-input"
                                                   checked={!this.state.translationSpeed}
                                                   disabled={!this.state.speedEditVisibility}/>
                                            <label className="custom-control-label">Slow</label>
                                        </div>
                                    </div>
                                    {editButtonChange('speedEditVisibility')}

                                </div>

                                <div className="form-group d-inline-flex col-12 justify-content-center">
                                    <label className='font-weight-bolder col-4'>Tags:</label>
                                    <Select
                                        isMulti
                                        joinValues
                                        className='col-7'
                                        //onChange={this.handleChangeOriginLang}
                                        isDisabled={!this.state.tagsEditVisibility}
                                        placeholder={this.state.tags}
                                        options={tags}
                                    />
                                    {editButtonChange('tagsEditVisibility')}
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-success" data-dismiss="modal"
                                    disabled={true}>Submit
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