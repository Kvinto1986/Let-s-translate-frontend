import React, {Component} from 'react'
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {getCustomersTranslates} from "../../actions/translate/getTranslatesForCustomer";
import {payTranslate} from "../../actions/translate/payTranslate";

import Swal from 'sweetalert2/dist/sweetalert2.js'

import 'sweetalert2/src/sweetalert2.scss'
import 'react-credit-cards/lib/styles.scss'

class OrdersBar extends Component {

    openMessageDialog = (message) => {
        this.props.history.push(`/messages/dialog/${message.translatorEmail}`)
    };

    reset = () => {
        Swal.fire({
            type: 'success',
            title: 'Congratulations!',
            text: 'Your order has been paid!!',
            allowOutsideClick: false
        }).then(() => {
            this.props.getCustomersTranslates({email: this.props.auth.user.email})

        })
    };

    handlePay = (order) => {
        console.log(order)
        Swal.fire({
            title: 'Payment',
            text: "You won't be able to revert this ",
            type: 'info',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Pay order',
            allowOutsideClick: false
        }).then((result) => {
            if (result.value) {
                this.props.payTranslate({id: order.id}, this.reset);
            }

        })
    };

    componentDidMount() {
        this.props.getCustomersTranslates({email: this.props.auth.user.email});
    }

    render() {

        const inProgressArray = this.props.customerTranslates.filter((elem) => {
            return !elem.isPaid
        });

        const inProgressListReady = inProgressArray.filter((elem) => {
            return elem.progress === '100'
        });

        const inProgressListNotReady = inProgressArray.filter((elem) => {
            return elem.progress !== '100'
        });

        const FullList = inProgressListReady.concat(inProgressListNotReady);


        const inProgressList = FullList.map(elem => {

            let color = 'bg-light text-dark';
            if (elem.progress === '100') {
                color = 'bg-info text-light'
            }

            return <tr key={elem.id} className={color}>
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
                    {elem.finalCost} $
                </td>

                <td>
                    <button className='btn btn-warning'
                            onClick={() => this.openMessageDialog(elem)}>Open
                    </button>
                </td>
                {elem.progress === '100' ? (
                    <td>
                        <button className='btn btn-danger'
                                onClick={() => this.handlePay(elem)}>Pay
                        </button>
                    </td>

                ) : <td>
                    <button className='btn btn-danger'
                            disabled={true}>Pay
                    </button>
                </td>}
            </tr>
        });

        const completedList = this.props.customerTranslates.filter((elem) => {
            return elem.isPaid
        }).map(elem => {

            return <tr key={elem.id} className='bg-dark text-light'>
                <td>
                    {elem.translatorName}
                </td>
                <td>
                    {elem.translatorEmail}
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
                    <button className='btn btn-warning text-decoration-none'
                       onClick={() => this.openMessageDialog(elem)}>Open</button>
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
                                    Translator name
                                </th>
                                <th>
                                    Translator email
                                </th>
                                <th>
                                    File name
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
                                    Cost
                                </th>
                                <th>
                                    Chat
                                </th>
                                <th>
                                    Payment
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
                            <tr key={'texts-tr'} className='bg-dark text-light'>
                                <th>
                                    Translator name
                                </th>
                                <th>
                                    Translator email
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
                                    Open chat
                                </th>
                            </tr>
                            {completedList}
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
    customerTranslates: state.customerTranslates,
});

export default connect(mapStateToProps, {
    getCustomersTranslates,
    payTranslate
})(withRouter(OrdersBar))