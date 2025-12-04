import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Home = () => {
  const user = useSelector((store) => store.user);

  return (
    <div className="flex flex-col items-center mt-10">
      <h1 className="text-3xl font-bold mb-5">Welcome to DevTinder</h1>

      {!user && (
        <Link to="/login" className="btn btn-primary">
          Login to continue
        </Link>
      )}
    </div>
  );
};

export default Home;
