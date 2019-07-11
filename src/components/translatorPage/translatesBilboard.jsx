import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchTranslatesByAvailableLanguages} from '../../actions/fetchTranslates'
import hotImg from '../../resources/images/bilboard/flame.png'

class TranslatesBilboard extends Component {

    componentDidMount() {
        const {languages} = this.props.auth.user;
        this.props.fetchTranslatesByAvailableLanguages(languages)
    }

    render() {
        const {translates} = this.props.translatesData;
        const isEmpty = (translates.length === 0) ? true : false
        
        return (
            <>
                <h5>Available translates</h5>
                <div className="row">
                    <div className="col-12">
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
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    isEmpty
                                    ? (
                                        <tr>
                                            <td>Here is no any available translates</td>
                                        </tr>
                                    )
                                    : (
                                        translates.map((translate, index) => {
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
                                                        <Link to={`/translates/${translate.id}`}>
                                                            <button type="button" className="btn btn-outline-dark btn-sm">
                                                                Details
                                                            </button>
                                                        </Link>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
    translatesData: state.translatesData
});

export default connect(mapStateToProps, {
    fetchTranslatesByAvailableLanguages
})(TranslatesBilboard)