import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useContext } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export default function Modal({ isOpen, setIsOpen, userId, refetch }) {
  const { user } = useContext(AuthContext);
  function closeModal() {
    setIsOpen(false);
  }

  const { register, handleSubmit, reset } = useForm();

  const onCancel = () => {
    reset();
    setIsOpen(false);
  };

  const onSubmit = (data) => {
    onCancel();
    console.log(data);
    const { name, email, age, gender, dob, mobile } = data;

    const newUserData = { name, email, age, gender, dob, mobile };

    // update data in db
    fetch(`https://guvi-profile-auth-server.vercel.app/users/${userId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUserData), // Send the updated user data as JSON
    })
      .then((res) => res.json())
      .then((data) => {
        refetch();
        console.log(data);
        toast.success("User data updated successfully");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    {/* form for update */}
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <div className="grid grid-cols-1 gap-6">
                        {/* Name */}
                        <div>
                          <label className="block mb-[5px] font-bold">
                            Your Name
                          </label>
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
                          <label className="block mb-[5px] font-bold">
                            Your Email
                          </label>
                          <input
                            className="w-full p-2 border border-solid border-[#ccc] rounded-lg"
                            type="email"
                            placeholder="email"
                            defaultValue={user?.email}
                            readOnly
                            {...register("email", { required: true })}
                          ></input>
                        </div>

                        {/* age */}
                        <div>
                          <label className="block mb-[5px] font-bold">
                            Your Age
                          </label>
                          <input
                            className="w-full p-2 border border-solid border-[#ccc] rounded-lg"
                            type="number"
                            placeholder="age"
                            {...register("age", { required: true })}
                          ></input>
                        </div>

                        {/* gender */}
                        <div className="form-control">
                          <label className="block mb-[5px] font-bold">
                            Gender
                          </label>
                          <select
                            className="w-full p-2 border border-solid border-[#ccc] rounded-lg"
                            {...register("gender", { required: true })}
                          >
                            <option>Male</option>
                            <option>Female</option>
                            <option>Others</option>
                          </select>
                        </div>

                        {/* Date Of Birth */}
                        <div className="w-full">
                          <label className="block mb-[5px] font-bold">
                            DOB
                          </label>
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
                          <label className="block mb-[5px] font-bold">
                            Your Mobile
                          </label>
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
                          Updated
                        </button>
                      </div>
                    </form>
                  </Dialog.Title>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
