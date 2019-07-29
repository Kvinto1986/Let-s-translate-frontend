import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom'

const UserProfile = props => {
    const {isAuthenticated, user} = props.auth
    const {role, name, email, phone, languages, date, texts} = user
    const profileContent = isAuthenticated
        ? (
            <div className="col-12 d-flex flex-column align-items-center mt-5">
                <div className="col-3 d-flex flex-column align-items-center">
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Anonymous_emblem.svg/1200px-Anonymous_emblem.svg.png"
                        alt="userAvatar" width="200px"
                    />
                    <h1 className='mt-3 text-center text-secondary'>{name}</h1>
                </div>
                <div className="col-sm-8 col-12 d-flex flex-column align-items-center">
                    <section className="d-flex flex-column align-items-center">
                        <h4 className='mt-3'>Email:</h4>
                        <span className='mb-3'>{email}</span>
                    </section>
                    {(role === 'translator') && (
                        <section className="d-flex flex-column align-items-center">
                            <h3 className='mt-3'>Languages</h3>
                            <span>
                                {languages.join(', ')}
                            </span>
                        </section>
                    )}
                    {(role === 'admin' || role === 'translator') && (
                        <section className="d-flex flex-column align-items-center">
                            <h3 className='mt-3'>Phone</h3>
                            <span>{phone}</span>
                        </section>
                    )}
                    <section className="d-flex flex-column align-items-center">
                        <h3 className='mt-3'>Register date</h3>
                        <span>{date}</span>
                    </section>
                </div>
                <Link to="/profile/edit" style={{color: 'black',border:'2px solid black',
                    textDecoration:'none',backgroundColor:'whitesmoke',marginTop:'5%', padding: "5px 15px"}}>
                    <span>Edit profile</span>
                </Link>
            </div>
        )
        : (
            <div>
                Loading ...
            </div>
        );

    return (
        <div className="container mt-3">
            {profileContent}
        </div>
    )
}

const mapStateToProps = state => ({
    auth: state.auth,
});

export default connect(mapStateToProps)(UserProfile)