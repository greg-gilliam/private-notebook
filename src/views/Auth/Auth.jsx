import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import UserForm from '../../components/UserForm/UserForm';
import { useState } from 'react';
import { useUser } from '../../context/UserContext';
import { signInUser, signUpUser } from '../../services/users';

import styles from './Auth.css';

// TODO: Implement sign up & sign
// Use isSigningUp to determine whether to sign up or sign in a user
// If signing in: set the user ({id, email}) and redirect to /notes
// If signing up: redirect to /confirm-email
// Use the corresponding functions from `/services/users` for both cases

export default function Auth({ isSigningUp = false }) {
  const history = useHistory();
  const { setUser } = useUser();

  const handleSubmit = async (email, password) => {
    try {
      if (isSigningUp) {
        signUpUser(email, password);
        history.replace('/confirm-email');
      } else {
        const user = await signInUser(email, password);
        setUser({ id: user.id, email });
        history.replace('/notes');
      }
    } catch (error) {
      throw error;
    }
  };

  return (
    <section className={styles.authForm}>
      <h2>{isSigningUp ? 'Welcome!' : 'Welcome back!'}</h2>
      <br />

      <UserForm
        onSubmit={handleSubmit}
        label={isSigningUp ? 'Sign Up' : 'Sign In'}
      />

      {isSigningUp ? (
        <p>
          Already have an account? <Link to="/login">Sign In</Link>
        </p>
      ) : (
        <p>
          Need an account? <Link to="/register">Sign Up</Link>
        </p>
      )}
    </section>
  );
}
