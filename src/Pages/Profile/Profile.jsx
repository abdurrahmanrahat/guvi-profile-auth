import { useForm } from "react-hook-form";

const Profile = () => {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {};

  return (
    <div>
      <div>
        <h2>User Profile</h2>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="p-3 md:p-[2px]">
        <div className="">
          {/* Name */}
          <div>
            <label className="block mb-[5px] font-bold">Your Name</label>
            <input
              className="w-full p-2 border border-solid border-[#ccc] rounded-lg"
              type="text"
              placeholder="name"
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

        <div className="flex items-center justify-center mt-4">
          <button
            type="submit"
            className="w-[70%] bg-[#1575a7] py-2 text-[18px] text-white font-[500] rounded-lg"
          >
            Saved
          </button>
        </div>
      </form>
    </div>
  );
};

export default Profile;
