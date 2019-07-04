import React, {Component} from 'react'
import { connect } from 'react-redux'
import { fetchTranslatesForCurrentTrarslator } from '../../actions/translate/fetchTranslatesForCurrentTrarslator'
import hotImg from '../../resources/images/bilboard/flame.png'

const unActiveManage = {
    border: '1px dashed gray', minHeight: '200px', padding: '10px'
}

const activeManage = {
    border: '1px solid lightgray', minHeight: '200px', padding: '10px'
}

class TranslatorWorkspace extends Component {

    state = {
        translateToManage: null
    }

    componentDidMount() {
        const {email} = this.props.auth.user
        this.props.fetchTranslatesForCurrentTrarslator({translatorEmail: email})
    }

    manageButtonHendler = (e, translateData) => {
        this.setState({
            translateToManage: translateData
        })
    }

    render() {
        const {bindedTranslates} = this.props
        const {translateToManage} = this.state
        const translatesIsEmpty = (bindedTranslates.length === 0) ? true : false
        const translateToManageIsEmpty = (!translateToManage) ? true : false
        const manageStyle = (!translateToManage) ? unActiveManage : activeManage

        return (
            <div className="row">
                <section className="col-xl-6 col-12">
                    <div className="container">
                        {
                            translateToManageIsEmpty
                            ? (
                                <>
                                    <h4>Manage section</h4>
                                    <div style={manageStyle}>
                                        Select any translate to manage
                                    </div>
                                </>
                            )
                            : (
                                <>
                                    <h4>Manage section</h4>
                                    <div style={manageStyle}>
                                        <form>
                                            <div className="form-group">
                                                <h5 className="text-info">Create translate</h5>
                                            </div>
                                            <div className="form-group">
                                                <label>Translator</label>
                                                <input type="text" className="form-control"/> 
                                            </div>
                                            <div className="form-group">
                                                <label>Gf</label>
                                            </div>
                                            <div className="form-group">
                                                
                                            </div>
                                        </form>
                                        <form>
                                            <div className="form-group">
                                                <h5 className="text-info">Edit translate</h5>
                                            </div>
                                            <div className="form-group">
                                                <label>Translate file</label>
                                                <input 
                                                type="file"
                                                placeholder="Text"
                                                name="textFileName"
                                                /> 
                                            </div>
                                            <div className="form-group">
                                                <label>Gf</label>
                                            </div>
                                            <div className="form-group">
                                                
                                            </div>
                                        </form>
                                    </div>
                                </>
                            )
                        }
                    </div>
                </section>
                <section className="col-xl-6 col-12">
                    <div className="container">
                        <h5>Translates in progress</h5>
                        <table className="table table-borderless">
                            <thead>
                                <tr className="table-secondary">
                                    <th scope="col">#</th>
                                    <th scope="col">Customer</th>
                                    <th scope="col">From</th>
                                    <th scope="col">To</th>
                                    <th scope="col">Deadline</th>
                                    <th scope="col">Review</th>
                                    <th scope="col">Tags</th>
                                    <th scope="col"></th>
                                    <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    translatesIsEmpty
                                    ? (
                                        <tr>
                                            <td>Here is no any binded translates</td>
                                        </tr>
                                    )
                                    : (
                                        bindedTranslates.map((translate, index) => {
                                            return (
                                                <tr key={translate.name + index}>
                                                    <th scope="row">{index+1}</th>
                                                    <td>{translate.name}</td>
                                                    <td>{translate.originalLanguage}</td>
                                                    <td>{translate.translationLanguage}</td>
                                                    {translate.translationSpeed
                                                        ? <td><img src={hotImg} alt="Hot"/></td>
                                                        : <td>Not urgent</td>
                                                    }
                                                    {translate.extraReview
                                                        ? <td>+</td>
                                                        : <td>-</td>
                                                    }
                                                    <td><em>{translate.tags.join(', ')}</em></td>
                                                    <td>
                                                        <button 
                                                        type="button" 
                                                        className="btn btn-outline-dark btn-sm"
                                                        onClick={(e) => this.manageButtonHendler(e, translate)}
                                                        >
                                                            Manage
                                                        </button>
                                                    </td>
                                                    <td>
                                                        <div>
                                                            <button type="button" className="btn btn-outline-dark btn-sm" >
                                                                <a href={translate.fileUrl} className="text-decoration-none text-dark" download={translate.fileName}>Download</a>
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                </section>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
    bindedTranslates: state.bindedTranslates
});

export default connect(mapStateToProps, {
    fetchTranslatesForCurrentTrarslator
})(TranslatorWorkspace)
