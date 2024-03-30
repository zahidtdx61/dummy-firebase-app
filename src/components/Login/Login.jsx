import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { useState } from "react";
import app from "../../config/firebase/firebase.init";

const Login = () => {
  const [user, setUser] = useState(null);

  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();

  const handlePopup = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const { user: loggedInUser } = result;
      console.log(loggedInUser);
      setUser(loggedInUser);
    } catch (err) {
      console.log("Firebase error:", err.message);
    }
  };

  return (
    <div className="w-full mt-16 flex flex-col items-center">
      <button
        onClick={handlePopup}
        className="w-fit px-5 py-2 bg-blue-500 rounded text-white hover:bg-opacity-80"
      >
        Login with Google
      </button>

      {user && (
        <div className="bg-zinc-200 p-6 rounded-lg mt-16 w-fit">
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
