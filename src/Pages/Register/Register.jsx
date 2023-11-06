import { useForm } from "react-hook-form";
import FormImg from "../../assets/login-image.png";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import toast from "react-hot-toast";

const Register = () => {
  const { createUser, updateUserProfile } = useContext(AuthContext);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    const name = data.name;
    const email = data.email;
    const password = data.password;
    const confirmPassword = data.confirmPassword;

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    // create user
    createUser(email, password)
      .then((result) => {
        const loggedUser = result.user;
        console.log(loggedUser);
        toast.success("User Register Successfully");

        // Update Profile
        updateUserProfile(name)
          .then(() => {
            navigate("/profile");
          })
          .catch((err) => {
            toast.error(err.message);
          });
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  return (
    <div className="md:flex items-center gap-4 my-8 md:my-0 lg:p-12">
      {/* image */}
      <div className="md:w-1/2 p-8 md:p-0">
        <img src={FormImg} alt="" className="md:w-[420px]" />
      </div>
      {/* form fields */}
      <div className="md:w-1/2 mx-auto w-full p-4 md:p-8">
        <div className="flex items-center justify-center mb-6">
          <h2 className="text-[48px] items-center font-[700]">Register User</h2>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="p-3 md:p-[2px]">
          <div className="flex flex-col gap-y-3">
            {/* Name */}
            <div>
              <label className="block mb-[5px] font-bold">Your Name</label>
              <input
                className="w-full p-2 border border-solid border-[#ccc] rounded-lg"
                type="text"
                placeholder="name"
                {...register("name", { required: true })}
              ></input>
              {errors.name?.type === "required" &&
                toast.error("Provide your name")}
            </div>

            {/* Email */}
            <div>
              <label className="block mb-[5px] font-bold">Your Email</label>
              <input
                className="w-full p-2 border border-solid border-[#ccc] rounded-lg"
                type="email"
                placeholder="email"
                {...register("email", { required: true })}
              ></input>
              {errors.email?.type === "required" &&
                toast.error("Provide your email")}
            </div>

            {/* password */}
            <div className="">
              <label className="block mb-[5px] font-bold">Password</label>
              <input
                className="w-full p-2 border border-solid border-[#ccc] rounded-lg"
                type="password"
                placeholder="Enter Password"
                {...register("password", { required: true })}
              ></input>
              {errors.password?.type === "required" &&
                toast.error("Provide your password")}
            </div>

            {/* confirm password */}
            <div className="">
              <label className="block mb-[5px] font-bold">
                Confirm Password
              </label>
              <input
                className="w-full p-2 border border-solid border-[#ccc] rounded-lg"
                type="password"
                placeholder="Confirm Password"
                {...register("confirmPassword", { required: true })}
              ></input>
              {errors.confirmPassword?.type === "required" &&
                toast.error("Provide your password again")}
            </div>
          </div>

          <div className="flex items-center justify-center mt-4">
            <button
              type="submit"
              className="w-[70%] bg-[#1575a7] py-2 text-[18px] text-white font-[500] rounded-lg"
            >
              Register
            </button>
          </div>
        </form>

        <div className="flex items-center justify-center mt-4">
          <span className="text-[18px] md:text-[16px] lg:text-[18px]">
            Already have an account?{" "}
            <Link to="/login">
              <span className="text-[#f78719] text-[18px] md:text-[16px] lg:text-[18px] underline cursor-pointer font-[700]">
                Login
              </span>
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Register;
