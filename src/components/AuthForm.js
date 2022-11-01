import { React } from "react";
import { useState } from "react";
import { authService } from "./../fbase";
import PropTypes from "prop-types";

const AuthForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState("");
  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      let data;
      if (newAccount) {
        data = await authService.createUserWithEmailAndPassword(
          email,
          password,
          true
        );
      } else {
        data = await await authService.signInWithEmailAndPassword(
          email,
          password,
          true
        );
      }
    } catch (error) {
      setError(error.message);
    }
  };
  const toggleAccount = () => setNewAccount((prev) => !prev);
  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input type="submit" value={newAccount ? "Create Account" : "Log In"} />
      </form>
      <button onClick={toggleAccount}>
        {newAccount ? "Sign In" : "Create Account"}
      </button>
    </>
  );
};

export default AuthForm;
