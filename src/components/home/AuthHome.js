import React from 'react'

const AuthHome = ({auth}) => {
    console.log(auth.user.role);
    
    return (
        <div>
            Loged in
        </div>
    )
}

export default AuthHome