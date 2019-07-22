import React, {Component} from 'react'
import { connect } from 'react-redux'
import { fetchTranslatesForCurrentTrarslator } from '../../actions/translate/fetchTranslatesForCurrentTrarslator'
import hotImg from '../../resources/images/bilboard/flame.png'
import ManageTranslate from './workspace/manageTranslate'

const unActiveManage = {
    minHeight: '200px', padding: '10px'
}

const activeManage = {
    minHeight: '200px', padding: '10px'
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
            <div className="col-12">
                <div className="row mt-3">
                    <section className="col-xl-6 col-12">
                        <div className="container">
                            {
                                translateToManageIsEmpty
                                ? (
                                    <>
                                        <h4>Manage section</h4>
                                        <div style={manageStyle}>
                                            Select any translate to manage it
                                        </div>
                                    </>
                                )
                                : (
                                    <ManageTranslate 
                                    manageStyle={manageStyle}
                                    translateToManage={translateToManage}
                                    auth={this.props.auth}
                                    />
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
                                                    <tr key={translate.textId}>
                                                        <th scope="row">{index+1}</th>
                                                        <td>{translate.customerName}</td>
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
                                                                    <a href={translate.initialTextFileUrl} className="text-decoration-none text-dark" download={translate.initialfileName}>Download</a>
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
