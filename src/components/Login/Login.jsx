import {
  GithubAuthProvider,
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { useEffect, useState } from "react";
import app from "../../config/firebase/firebase.init";
import {
  addToLocalStorage,
  getFromLocalStorage,
  removeFromLocalStorage,
} from "../../utils/localStorage";

const Login = () => {
  const [user, setUser] = useState(null);

  const auth = getAuth(app);
  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();

  const handleGoogleLogIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const { user: loggedInUser } = result;
      setUser(loggedInUser);
      addToLocalStorage("user-data", loggedInUser);
    } catch (err) {
      console.log("Firebase error:", err.message);
    }
  };

  const handleLogOut = async () => {
    try {
      const result = await signOut(auth);
      console.log("handleLogout ->", result);
      setUser(null);
      removeFromLocalStorage("user-data");
    } catch (err) {
      console.log("Firebase error:", err.message);
    }
  };

  const handleGithubLogIn = async () => {
    try {
      const result = await signInWithPopup(auth, githubProvider);
      const { user: loggedInUser } = result;
      setUser(loggedInUser);
      addToLocalStorage("user-data", loggedInUser);
    } catch (error) {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GithubAuthProvider.credentialFromError(error);
      console.log("Github error:", errorCode, errorMessage, email, credential);
    }
  };

  useEffect(() => {
    const localUser = getFromLocalStorage("user-data");
    setUser(localUser);
  }, []);

  return (
    <div className="w-full mt-8 flex flex-col items-center">
      {user ? (
        <button
          onClick={handleLogOut}
          className="w-fit mb-4 px-5 py-2 bg-blue-500 rounded text-white hover:bg-opacity-80"
        >
          Logout
        </button>
      ) : (
        <div className="flex justify-center w-fit gap-x-6">
          <button
            onClick={handleGoogleLogIn}
            className="w-fit mb-8 px-5 py-2 bg-blue-500 rounded text-white hover:bg-opacity-80"
          >
            Login with Google
          </button>

          <button
            onClick={handleGithubLogIn}
            className="w-fit mb-8 px-5 py-2 bg-blue-500 rounded text-white hover:bg-opacity-80"
          >
            Login with Github
          </button>
        </div>
      )}

      {user && (
        <div className="bg-zinc-200 p-6 rounded-lg w-fit">
          <div className="w-[50px] h-[50px] rounded-full overflow-hidden mb-4">
            <img
              src={user.photoURL}
              className="h-full w-full object-cover object-center"
            />
          </div>
          <p className="text-sm text-slate-600">
            <span className="font-semibold text-base text-black">Name:</span>{" "}
            {user.displayName}
          </p>

          <p className="text-sm text-slate-600">
            <span className="font-semibold text-base text-black">Email:</span>{" "}
            {user.email}
          </p>
        </div>
      )}
    </div>
  );
};

export default Login;
