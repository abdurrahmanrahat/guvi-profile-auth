import { useForm } from "react-hook-form";
import FormImg from "../../assets/login-image.png";
import { Link } from "react-router-dom";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="md:flex items-center gap-4 my-8 md:my-0 lg:p-12">
      {/* image */}
      <div className="md:w-1/2 p-8 md:p-0">
        <img src={FormImg} alt="" className="md:w-[420px]" />
      </div>
      {/* form fields */}
      <div className="md:w-1/2 mx-auto w-full p-4 md:p-8">
        <form onSubmit={handleSubmit(onSubmit)} className="p-3 md:p-[2px]">
          <div className="flex items-center justify-center mb-6">
            <h2 className="text-[48px] items-center font-[700]">Login</h2>
          </div>

          <div className="flex flex-col gap-y-4">
            {/* Email */}
            <div>
              <label className="block mb-[5px] font-bold">Your Email</label>
              <input
                className="w-full p-2 border border-solid border-[#ccc] rounded-lg"
                type="email"
                placeholder="email"
                {...register("email", { required: true })}
              ></input>
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
            </div>
          </div>

          <div className="flex items-center justify-center mt-4">
            <button
              type="submit"
              className="w-[70%] bg-[#1575a7] py-2 text-[18px] text-white font-[500] rounded-lg"
            >
              Login
            </button>
          </div>

          <div className="flex items-center justify-center mt-4">
            <span className="text-[18px] md:text-[16px] lg:text-[18px]">
              Already have an account?{" "}
              <Link to="/">
                <span className="text-[#f78719] text-[18px] md:text-[16px] lg:text-[18px] underline cursor-pointer font-[700]">
                  Register Now
                </span>
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
