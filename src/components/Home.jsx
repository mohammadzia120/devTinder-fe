import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Home = () => {
  const user = useSelector((store) => store.user);

  return (
    <div className="flex flex-col items-center mt-10">
      <h1
        className="text-4xl font-extrabold text-center mb-6 
  bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 
  bg-clip-text text-transparent drop-shadow-lg"
      >
        Welcome to DevTinder ❤️
      </h1>
      <h4 className="text-2xl  text-center font-bold mb-5">
        Build by developer, for developer
      </h4>

      {!user && (
        <Link to="/login" className="btn btn-primary my-5 px-10">
          Login to continue...
        </Link>
      )}
    </div>
  );
};

export default Home;
