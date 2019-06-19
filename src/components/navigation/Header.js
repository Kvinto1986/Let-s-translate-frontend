import React from 'react'
import {Link} from 'react-router-dom'

const Header = () => {
    return (
        <header>
            <nav className={"navbar navbar-expand-lg navbar-dark bg-dark"}>
                <Link className="navbar-brand" to="/">
                    <h1>L T R</h1>
                </Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar1" aria-controls="navbar1" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbar1">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item dropdown dropleft">
                            <a className="nav-link dropdown-toggle" href="" id="navbarDropdown1" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">LogIn</a>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdown1">
                                <Link className="dropdown-item" to="/loginCustomer">Customer</Link>
                                <Link className="dropdown-item" to="/loginTranslator">Translator</Link>
                            </div>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
    )
};

export default Header