import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchTranslatesByAvailableLanguages} from '../../actions/fetchTranslates'
import hotImg from '../../resources/fire.png'
import yesImg from '../../resources/yes.png'
import noImg from '../../resources/no.png'

class TranslatesBilboard extends Component {

    componentDidMount() {
        const {languages} = this.props.auth.user;
        this.props.fetchTranslatesByAvailableLanguages(languages)
    }

    render() {
        const {translates} = this.props.translatesData;
        const isEmpty = (translates.length === 0) ? true : false
        
        return (
            <div className="col-12 d-flex flex-wrap justify-content-center mt-3">
                <h1 className='text-secondary'>Available translates:</h1>
                <div className="d-flex col-12 justify-content-center align-content-center mt-5">
                <div className="row">
                        <table className="table table">
                            <thead>
                                <tr className="bg-dark text-light">
                                    <th scope="col">#</th>
                                    <th scope="col">Customer</th>
                                    <th scope="col">From</th>
                                    <th scope="col">To</th>
                                    <th scope="col">Fast translate</th>
                                    <th scope="col">Extra review</th>
                                    <th scope="col">Tags</th>
                                    <th scope="col">Cost</th>
                                    <th scope="col">Read more</th>
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
                                                        ? <td ><img src={hotImg} style={{height:'40px'}}  className='ml-3'alt="Hot"/></td>
                                                        : <td ><img src={noImg} style={{height:'20px'}} className='ml-4' alt="No"/></td>
                                                    }
                                                    {translate.extraReview
                                                        ? <td ><img src={noImg} style={{height:'20px'}} alt="No" className='ml-4'/></td>
                                                        : <td><img src={yesImg} style={{height:'20px'}} alt="Yes" className='ml-4'/></td>
                                                    }
                                                    <td><em>{translate.tags.join(', ')}</em></td>
                                                    <td>{translate.cost}$</td>
                                                    <td className='d-flex justify-content-center'>
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
            </div>
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