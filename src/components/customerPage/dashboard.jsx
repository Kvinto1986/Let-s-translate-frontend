import React, {Component} from 'react'
import {connect} from 'react-redux';
import {withRouter, Link} from 'react-router-dom';
import {getTextCustomers} from "../../actions/textAction";

class Dashboard extends Component {

    state = {
        collectionsListVisibility: false,
        checkedTexts: [],
        textActionsVisibility: true,
        textActionCreateCollectionVisibility: false,
    };

    handleCollectionsList = () => {
        this.setState({collectionsListVisibility: !this.state.collectionsListVisibility})
    };

    textActionCreateCollection = () => {
        this.setState({textActionCreateCollectionVisibility: !this.state.textActionCreateCollectionVisibility})
    };

    handleCheckText = (e) => {
        if (!e.target.checked) {
            const index = this.state.checkedTexts.indexOf(e.target.name);
            this.state.checkedTexts.splice(index, 1);
            if (this.state.checkedTexts.length === 0) {
                this.setState({textActionsVisibility: true})
            }
        } else {
            this.state.checkedTexts.push(e.target.name);
            if (this.state.checkedTexts.length > 0) {
                this.setState({textActionsVisibility: false})
            }
        }

    };

    componentDidMount() {
        this.props.getTextCustomers({email: this.props.auth.user.email})
    }

    render() {
        const collectionList = this.props.textsCustomer.map((elem) => {
            if (elem.collectionName) {
                return <Link to='/messages' key={elem.id}
                             className="list-group-item list-group-item-warning text-decoration-none ml-5">
                    {elem.collectionName}</Link>
            }
        });

        const textsList = this.props.textsCustomer.map((elem) => {

            if (elem.collectionName === '') {
                return <tr key={elem.id}>
                    <td>
                        <input
                            onChange={this.handleCheckText}
                            name={elem.id}
                            type={'checkbox'}
                        />

                    </td>
                    <td>
                        {elem.name}
                    </td>
                    <td>
                        {elem.email}
                    </td>
                    <td>
                        {elem.fileName}
                    </td>
                    <td>
                        <a className='btn btn-info text-decoration-none' href={elem.fileUrl}>Download</a>
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
                        {elem.date}
                    </td>
                    <td>
                        <a className='btn btn-warning text-decoration-none' href={'/messages'}>Edit</a>
                    </td>
                </tr>
            }
        });


        return (

            <div className="col-12 d-flex flex-wrap justify-content-center">
                <h3>Actions:</h3>
                <div className="d-flex col-12 justify-content-center mt-3">
                    <div className="d-flex justify-content-center align-content-center mr-5">
                        <button className='btn btn-info mr-3' onClick={this.handleCollectionsList}>Show all
                            collections
                        </button>
                        <button className='btn btn-success mr-3' disabled={this.state.textActionsVisibility}
                                onClick={this.textActionCreateCollection}>Create new
                            collection
                        </button>
                        <button className='btn btn-warning mr-3' disabled={this.state.textActionsVisibility}>Add to
                            collection
                        </button>
                        <button className='btn btn-danger mr-3' disabled={this.state.textActionsVisibility}>Delete
                        </button>
                    </div>
                </div>
                {this.state.textActionCreateCollectionVisibility && (
                    <div className="d-inline-flex col-12 justify-content-center mt-3">
                        <form className="border border-primary">
                            <label className='m-5 mr-2'>Collection name</label>
                            <input
                                type='text'
                                className='m-5 ml-2'
                            />
                            <button className='btn btn-success m-5'>Create</button>
                        </form>
                    </div>)}

                {this.state.collectionsListVisibility && (
                    <div className="d-inline-flex col-12 justify-content-center mt-3">
                        {collectionList}
                    </div>)}


                <h1 className='mt-5'>Collection free texts:</h1>
                <div className="d-flex flex-wrap col-12 justify-content-center mt-3">
                    <table className='table'>
                        <tbody>
                        <tr key={'texts-tr'}>
                            <th>
                                Select
                            </th>
                            <th>
                                Customer name
                            </th>
                            <th>
                                Customer email
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
                                Create date
                            </th>
                            <th>
                                Action
                            </th>
                        </tr>
                        {textsList}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
    textsCustomer: state.textsCustomer
});

export default connect(mapStateToProps, {getTextCustomers})(withRouter(Dashboard))