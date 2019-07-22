import React, {Component} from 'react'
import {registerTranslator} from '../../actions/regTranslatorAction'
import {connect} from 'react-redux'
import Select from 'react-select'
import languages from '../../resources/JSON/langForForm'

class TranslatorRegister extends Component {
    state = {
        name: "",
        email: "",
        password: '',
        password_confirm: '',
        phone:'',
        languages: [],
        errors: {},
    };

    handleChangeLang = (e) => {
        this.setState({
            languages: e
        });
    };

    handleInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    };

    resetForm = () => {
        this.setState({
            name: "",
            email: "",
            password: '',
            password_confirm: '',
            phone:'',
            languages: [],
            errors: {},
        });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        
        const langArr=Array.from(this.state.languages).map((elem)=>elem.value);

        const translator = {
            name: this.state.name,
            email: this.state.email,
            phone:this.state.phone,
            password: this.state.password,
            password_confirm: this.state.password_confirm,
            languages: langArr,
            role: 'translator'
        };    

        this.props.registerTranslator(translator, this.resetForm);
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }

    componentDidMount = () => {};

    render() {
        const {errors} = this.state;
        return (
            <div className="translatorRegister col-12 mt-5">
                <div className="container">
                    <div className="d-flex flex-column justify-content-center align-items-center">
                        <h3 className='col-12 text-center mt-3 mb-3'>New translator register</h3>
                        <form onSubmit={e => this.handleSubmit(e)} className='col-lg-8 col-12'>
                            <div className="form-group">
                                <label>Name</label>
                                <input
                                    type="text"
                                    placeholder="Name"
                                    name="name"
                                    className="form-control"
                                    onChange={this.handleInputChange}
                                    value={this.state.name}
                                />
                                {errors.name && (<div className='text-danger'>{errors.name}</div>)}
                            </div>
                            <div className="form-group">
                                <label>Email</label>
                                <input
                                    type="email"
                                    placeholder="Email"
                                    name="email"
                                    className="form-control"
                                    onChange={this.handleInputChange}
                                    value={this.state.email}
                                />
                                {errors.email && (<div className='text-danger'>{errors.email}</div>)}
                            </div>
                            <div className="form-group">
                                <label>Phone number</label>
                                <input
                                    type="text"
                                    placeholder="Phone number"
                                    name="phone"
                                    className="form-control"
                                    onChange={this.handleInputChange}
                                    value={this.state.phone}
                                />
                                {errors.phone && (<div className='text-danger'>{errors.phone}</div>)}
                                
                            </div>
                            <div className="form-group">
                                <label>Password</label>
                                <input
                                    type="password"
                                    placeholder="Password"
                                    name="password"
                                    className="form-control"
                                    onChange={this.handleInputChange}
                                    value={this.state.password}
                                />
                                {errors.password && (<div className='text-danger'>{errors.password}</div>)}
                            </div>
                            <div className="form-group">
                                <label>Confirm password</label>
                                <input
                                    type="password"
                                    placeholder="Confirm password"
                                    name="password_confirm"
                                    className="form-control"
                                    onChange={this.handleInputChange}
                                    value={this.state.password_confirm}
                                />
                                {errors.password_confirm && (<div className='text-danger'>{errors.password_confirm}</div>)}
                            </div>
                            <div className="form-group">
                                <label>Select translation languages</label>
                                <Select
                                    isMulti
                                    joinValues
                                    onChange={this.handleChangeLang}
                                    options={languages}
                                />
                                {errors.languages && (<div className='text-danger'>{errors.languages}</div>)}
                            </div>
                            <div className="form-group">
                                <button type="submit" className="btn btn-primary">
                                    Register
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors,
});

export default connect(mapStateToProps, {
    registerTranslator
})(TranslatorRegister)