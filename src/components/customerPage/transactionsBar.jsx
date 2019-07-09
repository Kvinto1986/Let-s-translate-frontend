import React, {Component} from 'react'
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {getCustomersTranslates} from "../../actions/translate/getTranslatesForCustomer";
import NewText from './newText'
class OrdersBar extends Component {

    state = {
        editedTranslate: {}
    };

    handleChangeEditedTranslate = (e,elem) => {
        e.preventDefault();
        this.setState({editedTranslate:elem})
    };

    openMessageDialog = (message) => {
        this.props.history.push(`/messages/dialog/${message.translatorEmail}`)
    };

    componentDidMount() {
        this.props.getCustomersTranslates({email: this.props.auth.user.email});
    }

    render() {

        const inProgressList = this.props.customerTranslates.filter((elem) => {
            return elem.progress !== '100'
        }).map(elem => {

            return <tr key={elem.id}>
                <td>
                    <button type="button" className="btn btn-success" data-toggle="modal"
                            data-target="#exampleModalCenter" onClick={(e)=>{this.handleChangeEditedTranslate(e,elem)}}>
                        Edit
                    </button>
                </td>
                <td>
                    {elem.translatorName}
                </td>
                <td>
                    {elem.translatorEmail}
                </td>
                <td>
                    {elem.initialfileName}
                </td>
                <td>
                    <a className='btn btn-info text-decoration-none' href={elem.initialTextFileUrl}>Download</a>
                </td>
                <td>
                    {elem.originalLanguage}
                </td>
                <td>
                    {elem.translationLanguage}
                </td>
                <td>
                    {elem.extraReview ? ('Yes') : 'No'}
                </td>
                <td>
                    {elem.translationSpeed ? ('Fast') : 'Ordinary'}
                </td>
                <td>
                    {elem.tags.join(', ')}
                </td>
                <td>
                    {elem.progress} %
                </td>

                <td>
                    <a className='btn btn-warning text-decoration-none'
                       onClick={() => this.openMessageDialog(elem)}>Open</a>
                </td>
            </tr>
        });

        const completedList = this.props.customerTranslates.filter((elem) => {
            return elem.progress === '100'
        }).map(elem => {

            return <tr key={elem.id} className='bg-info'>
                <td>
                    {elem.translatorName}
                </td>
                <td>
                    {elem.translatorEmail}
                </td>
                <td>
                    {elem.translatedfileName}
                </td>
                <td>
                    <a className='btn btn-success text-decoration-none' href={elem.translatedTextFileUrl}>Download</a>
                </td>
                <td>
                    {elem.originalLanguage}
                </td>
                <td>
                    {elem.translationLanguage}
                </td>
                <td>
                    {elem.finalCost} $
                </td>
                <td>
                    {elem.progress} %
                </td>
                <td>
                    <a className='btn btn-warning text-decoration-none'
                       onClick={() => this.openMessageDialog(elem)}>Open</a>
                </td>
            </tr>
        })


        return (
            <div className='col-12 d-flex flex-wrap justify-content-center'>
                <h1 className='col-12 d-flex flex-wrap justify-content-center'>My orders:</h1>
                <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                    <li className="nav-item">
                        <a className="nav-link active" id="pills-home-tab" data-toggle="pill" href="#pills-home"
                           role="tab" aria-controls="pills-home" aria-selected="true">In progress</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" id="pills-profile-tab" data-toggle="pill" href="#pills-profile"
                           role="tab" aria-controls="pills-profile" aria-selected="false">Completed</a>
                    </li>
                </ul>
                <div className="tab-content col-12" id="pills-tabContent">
                    <div className="tab-pane fade show active" id="pills-home" role="tabpanel"
                         aria-labelledby="pills-home-tab">
                        <table className='table'>
                            <tbody>
                            <tr key={'texts-tr'}>
                                <th>
                                    Edit translate
                                </th>
                                <th>
                                    Translator name
                                </th>
                                <th>
                                    Translator email
                                </th>
                                <th>
                                    File name
                                </th>
                                <th>
                                    Download file link
                                </th>
                                <th>
                                    Original language
                                </th>
                                <th>
                                    Translation language
                                </th>
                                <th>
                                    Extra review
                                </th>
                                <th>
                                    Translation speed
                                </th>
                                <th>
                                    Tags
                                </th>
                                <th>
                                    Translation progress
                                </th>
                                <th>
                                    Open chat
                                </th>
                            </tr>
                            {inProgressList}
                            </tbody>
                        </table>
                    </div>
                    <div className="tab-pane fade" id="pills-profile" role="tabpanel"
                         aria-labelledby="pills-profile-tab">
                        <table className='table'>
                            <tbody>
                            <tr key={'texts-tr'}>
                                <th>
                                    Translator name
                                </th>
                                <th>
                                    Translator email
                                </th>
                                <th>
                                    File name
                                </th>
                                <th>
                                    Download file link
                                </th>
                                <th>
                                    Original language
                                </th>
                                <th>
                                    Translation language
                                </th>
                                <th>
                                    Cost
                                </th>
                                <th>
                                    Translation progress
                                </th>
                                <th>
                                    Open chat
                                </th>
                            </tr>
                            {completedList}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="modal fade bd-example-modal-lg" id="exampleModalCenter" tabIndex="-1" role="dialog"
                     aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered modal-dialog modal-lg" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLongTitle">Translate</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <NewText />
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
    customerTranslates: state.customerTranslates,
});

export default connect(mapStateToProps, {
    getCustomersTranslates
})(withRouter(OrdersBar))