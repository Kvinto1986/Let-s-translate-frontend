import React, {Component} from 'react'
import {connect} from 'react-redux';
import Select from 'react-select';
import {withRouter} from 'react-router-dom';
import {
    getTextCustomers,
    registrationCollection,
    deleteTexts,
    getAllCollections,
    updateText
} from "../../actions/textAction";
import EditModal from './editTranslateModal'

class Dashboard extends Component {

    state = {
        collectionsListVisibility: false,
        checkedTexts: [],
        textActionsVisibility: true,
        textActionCreateCollectionVisibility: false,
        textActionAddCollectionVisibility: false,
        selectedCollection: '',
        newCollectionName: '',
        editedTranslate: {},
        errors: {}
    };

    handleChangeEditedTranslate = (e, elem) => {
        e.preventDefault();
        this.setState({editedTranslate: elem});
        console.log(elem)

    };

    textActionCreateCollection = () => {
        this.setState({
            textActionCreateCollectionVisibility: !this.state.textActionCreateCollectionVisibility,
            textActionAddCollectionVisibility: false
        })
    };
    textActionAddCollection = () => {
        this.setState({
            textActionAddCollectionVisibility: !this.state.textActionAddCollectionVisibility,
            textActionCreateCollectionVisibility: false
        })
    };

    handleChangeNewCollection = (e) => {
        this.setState({newCollectionName: e.target.value})
    };

    handleCheckText = (e) => {
        if (!e.target.checked) {
            const index = this.state.checkedTexts.indexOf(e.target.name);
            this.state.checkedTexts.splice(index, 1);
            if (this.state.checkedTexts.length === 0) {
                this.setState({
                    textActionsVisibility: true,
                    textActionCreateCollectionVisibility: false,
                    textActionAddCollectionVisibility: false,
                })
            }
        } else {
            this.state.checkedTexts.push(e.target.name);
            if (this.state.checkedTexts.length > 0) {
                this.setState({textActionsVisibility: false})
            }
        }

    };

    handleChangeCollection = (collection) => {
        this.setState({
            newCollectionName: collection.label
        });
    };

    reset = () => {
        this.setState({
            collectionsListVisibility: false,
            checkedTexts: [],
            textActionsVisibility: true,
            textActionCreateCollectionVisibility: false,
            textActionAddCollectionVisibility: false,
            selectedCollection: this.props.collections[0],
            newCollectionName: '',
            errors: {}
        });
        this.props.getTextCustomers({email: this.props.auth.user.email, collectionName: this.state.selectedCollection});
        this.props.getAllCollections({email: this.props.auth.user.email})

    };

    handleCreateCollection = (e) => {
        e.preventDefault();

        const newCollection = {
            newCollectionName: this.state.newCollectionName,
            textsList: this.state.checkedTexts
        };
        this.props.registrationCollection(newCollection, this.reset)
    };

    handleDeleteTexts = (e) => {
        e.preventDefault();

        const deletedTextsList = {
            textsList: this.state.checkedTexts
        };
        this.props.deleteTexts(deletedTextsList, this.reset)
    };

    handleGetCustomerCollection = (e) => {
        e.preventDefault();
        this.setState({
            selectedCollection: e.target.name
        });

        this.props.getTextCustomers({email: this.props.auth.user.email, collectionName: e.target.name});
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }

    componentDidMount() {
        this.props.getTextCustomers({email: this.props.auth.user.email, collectionName: this.state.selectedCollection});
        this.props.getAllCollections({email: this.props.auth.user.email})
    }

    render() {
        const collectionSelectList = this.props.collections.filter((elem) => {
            return elem !== ''
        }).map(elem => {
            return {
                value: elem,
                label: elem
            }
        });


        const collectionList = this.props.collections.map((elem) => {
            if (elem === '') {
                return <button
                    key={elem + 'button'}
                    className="btn list-group-item ml-5"
                    name=''
                    onClick={this.handleGetCustomerCollection}>
                    Texts without collection
                </button>
            } else {
                return <button
                    key={elem + 'button'}
                    className="btn list-group-item ml-5"
                    name={elem}
                    onClick={this.handleGetCustomerCollection}>
                    {elem}
                </button>
            }
        });

        const textsList = this.props.textsCustomer.map((elem) => {

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
                    <button type="button" className="btn btn-success" data-toggle="modal"
                            data-target="#exampleModalCenter" onClick={(e) => {
                        this.handleChangeEditedTranslate(e, elem)
                    }}>
                        Edit
                    </button>
                </td>
            </tr>
        });

        const {errors} = this.state;

        return (

            <div className="col-12 row d-flex flex-wrap justify-content-center">
                <h3>Actions:</h3>
                <div className="d-flex col-12 justify-content-center align-content-center mr-5">
                    <button
                        className='btn btn-success mr-3'
                        disabled={this.state.textActionsVisibility}
                        onClick={this.textActionCreateCollection}>
                        Create new collection
                    </button>
                    <button
                        className='btn btn-warning mr-3'
                        disabled={this.state.textActionsVisibility}
                        onClick={this.textActionAddCollection}>
                        Add to collection
                    </button>
                    <button
                        className='btn btn-danger mr-3'
                        disabled={this.state.textActionsVisibility}
                        onClick={this.handleDeleteTexts}>
                        Delete
                    </button>
                </div>
                <div className="d-inline-flex col-12 justify-content-center align-content-center mt-3">
                    {collectionList}
                </div>
                <div className="d-inline-flex col-12 justify-content-center align-content-center mt-3">
                    {this.state.textActionCreateCollectionVisibility && (
                        <form onSubmit={this.handleCreateCollection}>
                            <label className='m-3 mr-2'>Collection name</label>
                            <input
                                type='text'
                                className='m-5 ml-2 col-4'
                                value={this.state.collectionName}
                                onChange={this.handleChangeNewCollection}
                            />
                            <button className='btn btn-success m-5' type='submit'>Create</button>

                        </form>

                    )}
                    {this.state.textActionAddCollectionVisibility && (
                        <form className="d-inline-flex col-12 justify-content-center"
                              onSubmit={this.handleCreateCollection}>
                            <label className='m-3 mr-2 mt-5'>Select collection</label>
                            <Select
                                className='col-4 mt-5'
                                onChange={this.handleChangeCollection}
                                options={collectionSelectList}
                            />
                            <button className='btn btn-success m-5' type='submit'>Add to collection</button>
                        </form>
                    )}
                </div>
                {errors.collectionName && (
                    <div
                        className='d-inline-flex col-12 justify-content-center text-danger'>{errors.collectionName}</div>)}
                {this.state.collectionsListVisibility && (
                    <div className="d-inline-flex col-12 justify-content-center mt-3">
                        {collectionList}
                    </div>
                )}


                <h1 className='mt-5'>{this.state.selectedCollection === '' ? ('Texts without collection:') : this.state.selectedCollection}</h1>
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

                <EditModal
                    editedTranslate={this.state.editedTranslate}
                    updateText={this.props.updateText}
                    customerEmail={this.props.auth.user.email}
                    customerName={this.props.auth.user.name}
                    errors={this.props.errors}
                    getTextCustomers={this.props.getTextCustomers}
                    getAllCollections={this.props.getAllCollections}
                    collectionName={this.state.selectedCollection}
                    email={this.props.auth.user.email}
                />
            </div>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors,
    textsCustomer: state.textsCustomer,
    collections: state.collections,
});

export default connect(mapStateToProps, {
    getTextCustomers,
    registrationCollection,
    deleteTexts,
    getAllCollections,
    updateText
})(withRouter(Dashboard))