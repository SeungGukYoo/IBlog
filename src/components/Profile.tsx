import React from 'react';
import { Link } from 'react-router-dom';

function Profile() {
  return (
    <div className="profile__box">
      <div className="flex__box-lg">
        <div className="profile__image"></div>
        <div>
          <div className="profile__email">test@eamil.com</div>
          <div className="profile__name">김유저</div>
        </div>
      </div>
      <Link className="profile__logout" to="/">
        logout
      </Link>
    </div>
  );
}

export default Profile;
