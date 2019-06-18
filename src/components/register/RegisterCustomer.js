import React, {Component} from 'react'

class RegisterCustomer extends Component {
    state = {
        name: "",
        email: "",
        password: '',
        password_confirm: '',
        creditCard:'',
        errors: {},
    };

    handleInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    };

    render() {
        return (
            <div className="registerCustomer">
                <div className="container">
                    <h2>Registration</h2>
                    <p className="text-info">Customer</p>
                    <form>
                        <div className="form-group">
                            <input
                                type="email"
                                placeholder="Email"
                                name="email"
                                className="form-control"
                                onChange={this.handleInputChange}
                                value={this.state.email}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="text"
                                placeholder="Name"
                                name="name"
                                className="form-control"
                                onChange={this.handleInputChange}
                                value={this.state.name}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="text"
                                placeholder="Credit card number"
                                name="cardNumber"
                                className="form-control"
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                placeholder="Password"
                                name="password"
                                className="form-control"
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                placeholder="Confirm Password"
                                name="password_confirm"
                                className="form-control"
                            />
                        </div>
                        <div className="form-group">
                            <div className="form-check form-check-inline">
                                <label className="form-check-label checkingUnit">I read license</label>
                                <input className="form-check-input" type="checkbox"/>
                            </div>
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn btn-primary">
                                Register
                            </button>
                        </div>
                        <div className="form-group">
                        <span className="text-primary">
                            Forget the password
                        </span>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default RegisterCustomer