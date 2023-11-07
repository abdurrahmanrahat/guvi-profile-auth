import { useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../provider/AuthProvider";
import toast from "react-hot-toast";
import GetUserData from "../../hooks/getUserData";

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [backedUser, refetch, isLoading] = GetUserData();
  console.log(backedUser);

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
          toast.success("User data saved successfully");
        }
      });
  };

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="p-2 md:p-8 md:mx-32 md:mt-20">
      <div className="flex justify-evenly">
        <h2 className="text-2xl md:text-4xl font-semibold underline">
          User Profile
        </h2>
        <button className=" bg-[#1575a7] py-2 px-3 text-[18px] text-white font-[500] rounded-lg">
          Logout
        </button>
      </div>
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
    </div>
  );
};

export default Profile;
