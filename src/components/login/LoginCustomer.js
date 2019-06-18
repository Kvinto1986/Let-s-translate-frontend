import React from 'react'

const LoginCustomer = props => {
    return (
        <div className="login">
            <div className="container">
                <h2>Login</h2>
                <p className="text-info">Customer</p>
                <form>
                    <div className="form-group">
                        <input
                        type="text"
                        placeholder="Name"
                        name="name"
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
                        <button type="submit" className="btn btn-primary">
                            Register
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default LoginCustomer