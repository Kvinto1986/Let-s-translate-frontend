import React, {Component} from 'react'
import {connect} from 'react-redux';
import {fetchTranslatesByAvailableLanguages} from '../../actions/fetchTranslates'

class TranslatesBilboard extends Component {
    componentDidMount() {
        const {languages} = this.props.auth.user
        this.props.fetchTranslatesByAvailableLanguages(languages)
    }

    render() {
        const {translates} = this.props.translatesData
        const isEmpty = (translates.length === 0) ? true : false

        return (
            <div className="row">
                <div className="col-12">
                    <table className="table table-borderless">
                        <thead>
                            <tr className="table-secondary">
                                <th scope="col">#</th>
                                <th scope="col">Customer</th>
                                <th scope="col">From</th>
                                <th scope="col">To</th>
                                <th scope="col">Format</th>
                                <th scope="col">Difficulty</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                !isEmpty
                                // isEmpty
                                ? (
                                    <tr>
                                        Here in no any available translates
                                    </tr>
                                )
                                : (
                                    // translates.map(translate => {
                                    //     return (
                                    //         <tr key="translate">
                                    //             <th scope="row">2</th>
                                    //             <td>JSON Statham</td>
                                    //             <td>English</td>
                                    //             <td>Russian</td>
                                    //         </tr>
                                    //     )
                                    // })
                                    <tr>
                                        <th scope="row">1</th>
                                        <td>JSON Statham</td>
                                        <td>English</td>
                                        <td>Russian</td>
                                        <td>File</td>
                                        <td>Fast</td>
                                        <td>
                                            <button type="button" className="btn btn-outline-dark btn-sm">
                                                Send message
                                            </button>
                                            <button type="button" className="btn btn-outline-dark btn-sm">
                                                Translate
                                            </button>
                                        </td>

                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
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