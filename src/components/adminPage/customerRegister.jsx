import React, {Component} from 'react'
import {registerTranslator} from '../../actions/regTranslatorAction'
import {connect} from 'react-redux'

class CustomerRegister extends Component {
    state = {
        name: "",
        email: "",
        password: '',
        password_confirm: '',
        phone:'',
        errors: {},
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
            errors: {},
        });
    };

    handleSubmit = (e) => {
        e.preventDefault();

        const translator = {
            name: this.state.name,
            email: this.state.email,
            phone:this.state.phone,
            password: this.state.password,
            password_confirm: this.state.password_confirm,
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
        const {errors} = this.state
        return (
            <div className="translatorRegister">
                <h2>Registration</h2>
                <p className="text-info">Translator</p>
                <form onSubmit={e => this.handleSubmit(e)}>
                    <div className="form-group">
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
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            name="password_confirm"
                            className="form-control"
                            onChange={this.handleInputChange}
                            value={this.state.password_confirm}
                        />
                        {errors.password_confirm && (<div className='text-danger'>{errors.password_confirm}</div>)}
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-primary">
                            Register
                        </button>
                    </div>
                </form>
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
})(CustomerRegister)