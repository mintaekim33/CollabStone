import { Link } from "react-router-dom";

function Auth() {
  return (
    <div className="flex justify-center items-center p-40 outline m-40">
      <Link className="bg-red-100" to="/signup">
        sign up
      </Link>
      <Link className="bg-green-100" to="/login">
        log in
      </Link>
    </div>
  );
}

export default Auth;
