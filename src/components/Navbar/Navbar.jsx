import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="flex gap-4 justify-center mt-4 text-2xl">
      <Link to={"/"} className="hover:underline">
        Home
      </Link>
      <Link to={"/login"} className="hover:underline">
        Log in
      </Link>
    </div>
  );
};

export default Navbar;
