import { Link } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";

const Navbar = () => {
  const { logout } = useAuthStore();

  return (
    <div className="navbar flex top-0 left-0 right-0 justify-between bg-[#ba68c8] fixed backdrop-filter z-50">
        <Link className="btn btn-ghost text-xl text-white font-mono" to={"/"}>Blog App</Link>

        <div>
          <Link to="/create-blog">
            <button className="btn rounded-full bg-inherit btn-secondary">
              Create Blog
            </button>
          </Link>
          <Link to="/my-blogs">
            <button className="btn rounded-full bg-inherit btn-secondary">
              My Blogs
            </button>
          </Link>
          <button
            onClick={logout}
            className="btn rounded-full bg-inherit btn-secondary"
          >
            logout
          </button>
        </div>
    </div>
  );
};

export default Navbar;
