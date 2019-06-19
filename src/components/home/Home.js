import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom';
import UnAuthHome from './UnAuthHome'
import AuthHome from './AuthHome'

const Home = props => {
    const {isAuthenticated} = props.auth
    return (isAuthenticated) 
    ? (
        <AuthHome auth={props.auth}/>
    ) 
    : (
        <UnAuthHome />
    ) 
}

const mapStateToProps = state => ({
    auth: state.auth,
});

export default connect(mapStateToProps)(withRouter(Home))