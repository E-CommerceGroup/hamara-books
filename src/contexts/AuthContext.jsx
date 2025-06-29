import { createContext, useContext, useEffect, useState } from 'react';
import { 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult
} from 'firebase/auth';
import { auth } from '../config/firebase';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const signup = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const loginWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      
      // Configure the provider
      provider.addScope('email');
      provider.addScope('profile');
      
      // Set custom parameters for better UX
      provider.setCustomParameters({
        prompt: 'select_account',
        login_hint: 'user@example.com'
      });

      // Check if we're on mobile or have popup issues
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      const isPopupBlocked = () => {
        try {
          const popup = window.open('', '_blank', 'width=1,height=1');
          if (popup) {
            popup.close();
            return false;
          }
          return true;
        } catch (e) {
          return true;
        }
      };

      // Use redirect for mobile or if popups are blocked
      if (isMobile || isPopupBlocked()) {
        console.log('Using redirect method for Google sign-in');
        return signInWithRedirect(auth, provider);
      } else {
        console.log('Using popup method for Google sign-in');
        return signInWithPopup(auth, provider);
      }
    } catch (error) {
      console.error('Google sign-in error:', error);
      
      // If popup fails, try redirect as fallback
      if (error.code === 'auth/popup-blocked' || error.code === 'auth/popup-closed-by-user') {
        console.log('Popup failed, trying redirect method');
        const provider = new GoogleAuthProvider();
        provider.addScope('email');
        provider.addScope('profile');
        return signInWithRedirect(auth, provider);
      }
      
      throw error;
    }
  };

  const logout = () => {
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    // Handle redirect result for mobile Google sign-in
    getRedirectResult(auth)
      .then((result) => {
        if (result?.user) {
          console.log('Google sign-in successful via redirect:', result.user.email);
        }
      })
      .catch((error) => {
        console.error('Redirect result error:', error);
      });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signup,
    login,
    loginWithGoogle,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};