import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom'

const UserProfile = props => {
    const {isAuthenticated, user} = props.auth
    const {role, name, email, phone, languages, date, texts} = user
    const profileContent = isAuthenticated 
    ? (
        <div className="row">
            <div className="col-3 d-flex flex-column align-items-center">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Anonymous_emblem.svg/1200px-Anonymous_emblem.svg.png" alt="userAvatar" width="200px"/>
                <h3>{name}</h3>
            </div>
            <div className="col-8">
                <section>
                    <h5>Email</h5>
                    <span>{email}</span>
                </section>
                {(role === 'translator') && (
                    <section>
                        <h5>Languages</h5>
                        <span>
                            {languages.join(', ')}
                        </span>
                    </section>
                )}
                {(role === 'admin' || role === 'translator' ) && (
                    <section>
                        <h5>Phone</h5>
                        <span>{phone}</span>
                    </section>
                )}
                {(role === 'customer') && (
                    <section>
                        <h5>Active translates count</h5>
                        <span>{texts.length}</span>
                    </section>
                )}
                <section>
                    <h5>Register date</h5>
                    <span>{date}</span>
                </section>
            </div>
            <div className="col-1">
                <Link to="/profile/edit">
                    <button className="btn btn-outline-gray">
                        <em>Edit</em>
                    </button>
                </Link>
            </div>
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