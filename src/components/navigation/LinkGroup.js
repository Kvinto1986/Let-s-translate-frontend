import React, {Component} from 'react'
import {NavLink} from 'react-router-dom'
import { socket } from "./Header";

class LinkGroup extends Component {
    state = {
        links: []
    };
    

    componentDidMount() {
        
        const role = this.props.role;

        const adminLinks = [
            {title: 'Register translators', route: '/registerTranslator'}
        ];

        const customerLinks = [
            {title: 'New text for translation', route: '/texts'},
            {title: 'Translates collections', route: '/dashboard'},
            {title: 'Orders status', route: '/transactions'},
        ];

        const translatorLinks = [
            {title: 'Translates', route: '/translates'},
            {title: 'Workspace', route: '/workSpace'},
            {title: 'Reviews', route: '/translates-review'},
        ];

        switch (role) {
            case 'admin':
                this.setState({
                    links: adminLinks
                });
                break;
            case 'customer':
                this.setState({
                    links: customerLinks
                });
                break;
            case 'translator':
                this.setState({
                    links: translatorLinks
                });
                break;
            default:
                break;
        }
    }

    render() {

        const links = this.state.links;

        if (this.state.links.length === 0) {
            return null
        }

        return (

            <ul className="navbar-nav mr-auto navUserLinks col-6 d-flex justify-content-around ml-5 ">
                {links.map(linkUnit => {
                    return (
                        <li className="nav-item" key={linkUnit.title}>
                            <NavLink to={linkUnit.route} className="nav-link h5" activeClassName="active">
                                {linkUnit.title}
                            </NavLink>  
                        </li> 
                    )
                })}
            </ul>
        )
    }
}

export default LinkGroup