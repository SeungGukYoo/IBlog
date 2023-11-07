import AuthContext from 'context/AuthContext';
import { signOut } from 'firebase/auth';
import { useContext } from 'react';
import { toast } from 'react-toastify';

function Profile() {
  const { user, auth } = useContext(AuthContext);

  const onSignOut = async () => {
    try {
      if (!auth) return;
      await signOut(auth);
      toast.success('안전하게 로그아웃이 되었습니다 👋', {
        autoClose: 1300,
      });
    } catch (error) {
      console.error(error);
      toast.error('예기치 못한 오류로 인해 잠시후에 다시 시도해 주시기 바랍니다.❌', {
        autoClose: 2000,
      });
    }
  };
  return (
    <div className="profile__box">
      <div className="flex__box-lg">
        <div className="profile__image"></div>
        <div>
          <div className="profile__email">{user?.email}</div>
          <div className="profile__name">{user?.displayName || '익명의 사용자'}</div>
        </div>
      </div>
      <div role="presentation" className="profile__logout" onClick={onSignOut}>
        Logout
      </div>
    </div>
  );
}

export default Profile;
