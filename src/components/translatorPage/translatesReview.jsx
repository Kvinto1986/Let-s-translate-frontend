import React, {Component} from 'react'
import { connect } from 'react-redux'
import {fetchTranslatesToReview} from '../../actions/translate/fetchTranslatesToReview'

class TranslatesReview extends Component {

    componentDidMount() {
        const languages = this.props.auth.user.languages
        this.props.fetchTranslatesToReview(languages)
    }

    render() {
        const {reviewTranslateList: translates} = this.props
        return (
            <div className="row">
                <section className="col-xl-6 col-12">
                    <h5>Translates review</h5>
                    <table className="table table-hover table-responsive">
                        <thead>
                            <tr className="table-secondary">
                                <th scope="col">Translator</th>
                                <th scope="col">Customer</th>
                                <th scope="col">Translate name</th>
                                <th scope="col">Source</th>
                                <th scope="col">Target</th>
                                <th scope="col">Finish date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                translates.length < 0
                                ? (
                                    <tr>
                                        <td>Here is no any translates to review</td>
                                    </tr>
                                )
                                : (
                                    translates.map((translate, index) => {
                                        return (
                                            <tr key={translate.textId}>
                                                <td>{translate.translatorName}</td>
                                                <td>{translate.customerName}</td>
                                                {translate.translateTextName
                                                    ? <td>{translate.translateTextName}</td>
                                                    : <td>{translate.translatedfileName}</td>
                                                }
                                                <td>{translate.originalLanguage}</td>
                                                <td>{translate.translationLanguage}</td>
                                                <td>{Date(translate.date).toLocaleString().slice(0,10)}</td>
                                            </tr>
                                        )
                                    })
                                )
                            }
                        </tbody>
                    </table>
                </section>
                <section className="col-xl-6 col-12">
                    lol
                </section>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
    reviewTranslateList: state.reviewTranslateList
});

export default connect(mapStateToProps, {
    fetchTranslatesToReview
})(TranslatesReview)