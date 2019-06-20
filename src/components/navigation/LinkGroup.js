import React, {Component} from 'react'
import {NavLink} from 'react-router-dom'

class LinkGroup extends Component {
    state = {
        links: []
    }

    render() {
        const role = this.props.role

        const adminLinks = [
            {title: 'Register translators', route: '/registerTranslator'},
            {title: 'Edit tarifs', route: '/editTarifs'},
        ]
    
        const customerLinks = [
            {title: 'Dashboard', route: '/dashboard'},
            {title: 'New Texts', route: '/texts'},
            {title: 'My Transactions', route: '/transactions'},
            {title: 'Messages', route: '/messages'}
        ]
    
        const translatorLinks = [
            {title: 'Translates', route: '/translates'},
            {title: 'Workspace', route: '/workSpace'},
        ]
    
        let links
    
        switch (role) {
            case 'admin':
                this.setState({
                    links: adminLinks
                })
                break;
            case 'customer':
                this.setState({
                    links: customerLinks
                })
                break;
            case 'translator':
                this.setState({
                    links: translatorLinks
                })
                break;
            default:
                break;
        }

        if (this.state.links.length === 0) {
            return null
        }

        return (
            <ul className="navbar-nav mr-auto navUserLinks">
                {links.map(linkUnit => {
                    return (
                        <li className="nav-item" key={linkUnit.title}>
                            <NavLink to={linkUnit.route} className="nav-link" activeClassName="active">
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