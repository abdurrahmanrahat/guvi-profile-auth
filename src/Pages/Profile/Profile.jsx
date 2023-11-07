import { useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../provider/AuthProvider";
import toast from "react-hot-toast";
// import GetUserData from "../../hooks/getUserData";
import Loading from "../../components/Loading/Loading";
import { useQuery } from "react-query";
import axios from "axios";

const Profile = () => {
  const { user, logOut } = useContext(AuthContext);
  // const [backedUser, refetch, isLoading] = GetUserData();
  // const { name, email, age, gender, dob, mobile } = backedUser;
  const {
    data: backedUser,
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await axios(
        `http://localhost:5000/users?email=${user?.email}`
      );
      return res.data;
    },
  });

  // console.log(backedUser);

  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    const { name, email, age, gender, dob, mobile } = data;

    const newUser = { name, email, age, gender, dob, mobile };

    // Send new user to database store
    fetch("http://localhost:5000/users", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newUser),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          refetch();
          toast.success("User data saved successfully");
        }
      });
  };

  // user logout
  const handleLogout = () => {
    logOut()
      .then(() => {
        toast.success("User logout successfully");
      })
      .catch((err) => toast.error(err.message));
  };

  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <div className="p-2 md:p-8 md:mx-32 md:mt-20">
      <div className="flex justify-evenly">
        <h2 className="text-2xl md:text-4xl font-semibold underline">
          User Profile
        </h2>
        <button
          onClick={handleLogout}
          className=" bg-[#1575a7] py-2 px-3 text-[18px] text-white font-[500] rounded-lg"
        >
          Logout
        </button>
      </div>

      {/* dynamic div */}
      <div className="mt-8">
        {backedUser?.age ? (
          <>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold mb-4">{backedUser.name}</h2>
              <div className="flex flex-wrap mb-2">
                <div className="w-1/2">
                  <p>
                    <span className="font-semibold">Email:</span>{" "}
                    {backedUser.email}
                  </p>
                </div>
                <div className="w-1/2">
                  <p>
                    <span className="font-semibold">Age:</span> {backedUser.age}
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap mb-2">
                <div className="w-1/2">
                  <p>
                    <span className="font-semibold">Gender:</span>{" "}
                    {backedUser.gender}
                  </p>
                </div>
                <div className="w-1/2">
                  <p>
                    <span className="font-semibold">Date of Birth:</span>{" "}
                    {backedUser.dob}
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap mb-2">
                <div className="w-1/2">
                  <p>
                    <span className="font-semibold">Mobile:</span>{" "}
                    {backedUser.mobile}
                  </p>
                </div>
                <div className="w-1/2">
                  <button className=" bg-[#1575a7] py-[6px] px-2 text-[15px] text-white font-[500] rounded-lg">
                    Update
                  </button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="p-4 md:p-[2px]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <div>
                <label className="block mb-[5px] font-bold">Your Name</label>
                <input
                  className="w-full p-2 border border-solid border-[#ccc] rounded-lg"
                  type="text"
                  placeholder="name"
                  defaultValue={user?.displayName}
                  {...register("name", { required: true })}
                ></input>
              </div>

              {/* email */}
              <div>
                <label className="block mb-[5px] font-bold">Your Email</label>
                <input
                  className="w-full p-2 border border-solid border-[#ccc] rounded-lg"
                  type="email"
                  placeholder="email"
                  defaultValue={user?.email}
                  {...register("email", { required: true })}
                ></input>
              </div>

              {/* age */}
              <div>
                <label className="block mb-[5px] font-bold">Your Age</label>
                <input
                  className="w-full p-2 border border-solid border-[#ccc] rounded-lg"
                  type="number"
                  placeholder="age"
                  {...register("age", { required: true })}
                ></input>
              </div>

              {/* gender */}
              <div className="form-control">
                <label className="block mb-[5px] font-bold">Gender</label>
                <select
                  className="w-full p-2 border border-solid border-[#ccc] rounded-lg"
                  {...register("gender", { required: true })}
                >
                  {/* <option disabled selected>
                  Pick one
                </option> */}
                  <option>Male</option>
                  <option>Female</option>
                  <option>Others</option>
                </select>
              </div>

              {/* Date Of Birth */}
              <div className="w-full">
                <label className="block mb-[5px] font-bold">DOB</label>
                <input
                  type="date"
                  name="dob"
                  placeholder="-/-/-"
                  className="w-full p-2 border border-solid border-[#ccc] rounded-lg"
                  {...register("dob", { required: true })}
                />
              </div>

              {/* mobile */}
              <div>
                <label className="block mb-[5px] font-bold">Your Mobile</label>
                <input
                  className="w-full p-2 border border-solid border-[#ccc] rounded-lg"
                  type="number"
                  placeholder="number"
                  {...register("mobile", { required: true })}
                ></input>
              </div>
            </div>

            <div className="flex items-center justify-center mt-10">
              <button
                type="submit"
                className="w-[60%] bg-[#1575a7] py-2 text-[18px] text-white font-[500] rounded-lg"
              >
                Saved
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Profile;
