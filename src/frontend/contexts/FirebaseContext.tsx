/* eslint-disable import/no-duplicates */
import {
  createUserWithEmailAndPassword,
  EmailAuthProvider,
  GoogleAuthProvider,
  onAuthStateChanged,
  onIdTokenChanged,
  reauthenticateWithCredential,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updatePassword,
  User
} from 'firebase/auth';
import { child, get, ref, update } from 'firebase/database';
import { collection, doc, DocumentData, setDoc } from 'firebase/firestore';
import { createContext, ReactNode, useEffect, useReducer, useState } from 'react';
// @types
import { ActionMap, AuthState, AuthUser, FirebaseContextType } from '../types/authentication';
//
import { authInstance, databaseInstance, fireStoreInstance } from './FirebaseInstance';

// ----------------------------------------------------------------------

function initTokenChange() {
  onIdTokenChanged(authInstance, async (user) => {
    if (user) localStorage.setItem('firebaseToken', await user.getIdToken());
  });
}

const initialState: AuthState = {
  isAuthenticated: false,
  isAdmin: false,
  isInitialized: false,
  user: null,
  idToken: ''
};

enum Types {
  Initial = 'INITIALISE'
}

type FirebaseAuthPayload = {
  [Types.Initial]: {
    isAuthenticated: boolean;
    isAdmin: boolean;
    user: AuthUser;
    idToken?: string;
  };
};

type FirebaseActions = ActionMap<FirebaseAuthPayload>[keyof ActionMap<FirebaseAuthPayload>];

const reducer = (state: AuthState, action: FirebaseActions) => {
  if (action.type === 'INITIALISE') {
    const { isAuthenticated, user, isAdmin } = action.payload;
    return {
      ...state,
      isAuthenticated,
      isAdmin,
      isInitialized: true,
      user
    };
  }

  return state;
};

const AuthContext = createContext<FirebaseContextType | null>(null);

function AuthProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<DocumentData | undefined>();
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(
    () =>
      onAuthStateChanged(authInstance, async (user) => {
        // console.log(user, 'redirectUrl');
        if (user) {
          const idToken = await user.getIdToken();
          localStorage.setItem('firebaseToken', idToken);

          initTokenChange();

          // for get role of loggedin user
          const snapshot = await get(child(ref(databaseInstance), `users/${user.uid}/role`));

          get(child(ref(databaseInstance), `users/${user.uid}`))
            .then((snapshot) => {
              if (snapshot.exists()) {
                const objUser = snapshot.val();
                setProfile(objUser);
              } else {
                console.log('No data available');
              }
            })
            .catch((error) => {
              console.error(error);
            });

          // console.log(snapshot.val(), snapshot.val() === 'admin');
          dispatch({
            type: Types.Initial,
            payload: {
              isAuthenticated: true,
              user,
              idToken,
              isAdmin: snapshot.val() === 'admin'
            }
          });
        } else {
          // console.log('Else');
          localStorage.removeItem('firebaseToken');
          dispatch({
            type: Types.Initial,
            payload: { isAuthenticated: false, isAdmin: false, user: null, idToken: '' }
          });
        }
      }),
    [dispatch]
  );

  const login = (email: string, password: string) =>
    signInWithEmailAndPassword(authInstance, email, password);

  const loginWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(authInstance, provider);
  };
  const updateProfile = async (objUser: AuthUser) =>
    update(ref(databaseInstance, `users/${authInstance?.currentUser?.uid || ''}`), {
      ...objUser
    });
  const changePassword = async (currentPassword: string, newPassword: string) => {
    const objCurrentUser = authInstance.currentUser;
    console.log(objCurrentUser);
    const credential = EmailAuthProvider.credential(objCurrentUser?.email || '', currentPassword);

    await reauthenticateWithCredential(objCurrentUser as User, credential);
    await signInWithEmailAndPassword(authInstance, objCurrentUser?.uid || '', currentPassword);
    return updatePassword(objCurrentUser as User, newPassword);
  };

  const register = (
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    userType: string
  ) =>
    createUserWithEmailAndPassword(authInstance, email, password).then(async (res) => {
      const userRef = collection(fireStoreInstance, 'users');
      await setDoc(doc(userRef, res.user?.uid), {
        uid: res.user?.uid,
        email,
        displayName: `${firstName} ${lastName}`,
        userType
      });
    });

  const logout = async () => {
    await signOut(authInstance);
    window.location.reload();
  };

  const resetPassword = async (email: string) => {
    await sendPasswordResetEmail(authInstance, email);
  };

  const auth = { ...state.user };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: 'firebase',
        user: {
          id: auth.uid,
          idToken: state.idToken,
          email: auth.email,
          instagram: auth.instagram || profile?.instagram,
          biography: auth.biography || profile?.biography,
          city: auth.city || profile?.city,
          name: auth.name || profile?.name,
          displayName: auth.displayName || profile?.displayName,
          discord: auth.discord || profile?.discord,
          profileImage: auth.profileImage || profile?.profileImage,
          role: auth.role || profile?.role,
          twitter: auth.twitter || profile?.twitter
        },
        login,
        register,
        loginWithGoogle,
        logout,
        resetPassword,
        updateProfile,
        changePassword
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };

export default AuthProvider;
