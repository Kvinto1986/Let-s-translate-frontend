import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom';

import Select from 'react-select';
import languages from '../../resources/JSON/languages'
import tags from '../../resources/JSON/tags'

class NewText extends Component {
    render() {

        return (
            <div className="col-8 mt-5">
                <form>
                    <div className="form-group">
                        <label>Download text</label>
                        <input
                            type="file"
                            className="form-control-file"
                            placeholder="Add file"
                        />

                    </div>
                    <div className="form-group">
                        <label>Copy you text</label>
                        <textarea
                            className="form-control"
                            placeholder="You text"
                        />
                    </div>
                    <div className="form-group">
                        <label>Original language</label>
                        <Select
                            options={languages}
                        />
                    </div>

                    <div className="form-group">
                        <label>Translation language</label>
                        <Select
                            options={languages}
                        />
                    </div>

                    <div className="form-check">
                        <input
                            type="checkbox"
                            className="form-check-input"
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
                        />
                        Ordinary
                    </label>
                    <label className="radio-inline ml-5 ">
                        <input
                            type="radio"
                            className="form-check-input"
                        />
                        Fast
                    </label>
                    </div>
                    <div className="form-group">
                        <label>Tags</label>
                        <Select
                            isMulti
                            joinValues
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

export default connect(mapStateToProps, {})(withRouter(NewText))