import React from 'react'
import AdminPanel from '../admin/AdminPanel'
import DashBoard from '../customer/DashBoard'
import TranslatorPanel from '../translator/TranslatorPanel'

const AuthHome = ({auth}) => {
    let homeComponent

    switch (auth.user.role) {
        case 'admin':
            homeComponent = <AdminPanel />
            break;
        case 'customer':
            homeComponent = <DashBoard />
            break;
        case 'translator':
            homeComponent = <TranslatorPanel />
            break;
        default:
            break;
    }
    
    return (
        homeComponent
    )
}

export default AuthHome