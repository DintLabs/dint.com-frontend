/* eslint-disable import/no-duplicates */
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  onIdTokenChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut
} from 'firebase/auth';
import { collection, doc, DocumentData, getDoc, setDoc } from 'firebase/firestore';
import { createContext, ReactNode, useEffect, useReducer, useState } from 'react';
// @types
import { ActionMap, AuthState, AuthUser, FirebaseContextType } from '../types/authentication';
//
import { authInstance, fireStoreInstance } from './FirebaseInstance';

// ----------------------------------------------------------------------

const ADMIN_EMAILS = ['admin@dint.com'];

function initTokenChange() {
  onIdTokenChanged(authInstance, async (user) => {
    if (user) localStorage.setItem('firebaseToken', await user.getIdToken());
  });
}

const initialState: AuthState = {
  isAuthenticated: false,
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
    user: AuthUser;
    idToken?: string;
  };
};

type FirebaseActions = ActionMap<FirebaseAuthPayload>[keyof ActionMap<FirebaseAuthPayload>];

const reducer = (state: AuthState, action: FirebaseActions) => {
  if (action.type === 'INITIALISE') {
    const { isAuthenticated, user } = action.payload;
    return {
      ...state,
      isAuthenticated,
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
        if (user) {
          const idToken = await user.getIdToken();
          localStorage.setItem('firebaseToken', idToken);

          initTokenChange();

          getDoc(doc(fireStoreInstance, 'users', user.uid))
            .then((docRef) => {
              if (docRef.exists()) {
                const userData = docRef.data();
                setProfile(userData);
              }
            })
            .catch((error) => {
              console.error(error);
            });

          dispatch({
            type: Types.Initial,
            payload: { isAuthenticated: true, user, idToken }
          });
        } else {
          localStorage.removeItem('firebaseToken');
          dispatch({
            type: Types.Initial,
            payload: { isAuthenticated: false, user: null, idToken: '' }
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
          photoURL: auth.photoURL || profile?.photoURL,
          coverImageURL: auth.coverImageURL || profile?.coverImageURL,
          userType: profile ? profile?.userType : 'GUEST',
          displayName: auth.displayName || profile?.displayName,
          fristName: auth.firstName || profile?.firstName,
          lastName: auth.firstName || profile?.lastName,
          role: ADMIN_EMAILS.includes(auth.email) ? 'admin' : 'user',
          mobileNo: auth.mobileNo || profile?.mobileNo || '',
          country: profile?.country || '',
          address: profile?.address || '',
          state: profile?.state || '',
          city: profile?.city || '',
          zipCode: profile?.zipCode || '',
          about: profile?.about || '',
          isPublic: profile?.isPublic || false
        },
        login,
        register,
        loginWithGoogle,
        logout,
        resetPassword,
        updateProfile: () => {}
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };

export default AuthProvider;
