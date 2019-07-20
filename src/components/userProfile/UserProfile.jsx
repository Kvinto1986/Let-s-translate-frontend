import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom'

const UserProfile = props => {
    const {isAuthenticated, user} = props.auth
    const {role, name, email, phone, languages, date, texts} = user
    const profileContent = isAuthenticated
        ? (
            <div className="col-12 d-flex flex-column align-items-center">
                <div className="col-3 d-flex flex-column align-items-center">
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Anonymous_emblem.svg/1200px-Anonymous_emblem.svg.png"
                        alt="userAvatar" width="300px"/>
                    <h1 className='mt-3 text-info'>{name}</h1>
                </div>
                <div className="col-8">
                    <section>
                        <h3 className='mt-3 text-primary'>Email:</h3>
                        <span className='mb-3'>{email}</span>
                    </section>
                    {(role === 'translator') && (
                        <section>
                            <h3 className='mt-3 text-primary'>Languages</h3>
                            <span>
                            {languages.join(', ')}
                        </span>
                        </section>
                    )}
                    {(role === 'admin' || role === 'translator') && (
                        <section>
                            <h3 className='mt-3 text-primary'>Phone</h3>
                            <span>{phone}</span>
                        </section>
                    )}
                    <section>
                        <h3 className='mt-3 text-primary'>Register date</h3>
                        <span>{date}</span>
                    </section>
                </div>
                <Link to="/profile/edit" style={{color: 'black',border:'2px solid black', padding:'15px',
                    textDecoration:'none',backgroundColor:'gold',marginTop:'5%'}}>
                    <h5>Edit profile</h5>
                </Link>
            </div>
        )
        : (
            <div>
                <div>
                    <img src="" alt="user"/>
                </div>
            </div>
        )

    return (
        <div className="container">
            {profileContent}
        </div>
    )
}

const mapStateToProps = state => ({
    auth: state.auth,
});

export default connect(mapStateToProps)(UserProfile)