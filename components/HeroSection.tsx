import { Cake, File, House, Image, Phone } from "lucide-react";
import { useRouter } from "next/navigation";

const HeroSection = () => {
  const router = useRouter();
  const handleClick = () => {
    router.push("/capsules");
  };
  return (
    <>
      <div className="flex flex-col items-center mt-6 lg:mt-20">
        <h1 className="text-4xl sm:text-6xl lg:text-7xl text-center tracking-wide font-semibold">
          Create a <span className="text-[#14b8a6] ">capsule</span> for you or
          your loved ones to create a sense of{" "}
          <span className="text-[#14b8a6] ">security</span>
        </h1>
        <p className="mt-10 text-lg text-center text-slate-700 max-w-4xl">
          Store your capsule securely using{" "}
          <span className="text-violet-500 font-semibold">Pinata</span>,
          accessible anytime.
        </p>
        <div className="flex justify-center my-10" onClick={handleClick}>
          <a
            href="#"
            className="bg-[#14b8a6] py-3 px-4 mx-3 rounded-md text-white font-semibold"
          >
            Create Today
          </a>
        </div>
      </div>
      <div className="flex items-center justify-center bg-white">
        <div className="bg-white font-semibold text-center rounded-3xl border shadow-md p-10 max-w-s">
          <div>
            <img
              className="mb-3 w-32 h-32 rounded-full shadow-lg mx-auto"
              src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
              alt="product designer"
            />
            <div className="flex flex-col w-full items-center space-y-1">
              <div>
                <h1 className="text-lg text-gray-700">Full Name</h1>
              </div>
              <div className="items-center flex space-x-2">
                <Cake color="gray" height={20} width={20} />
                <h3 className="text-sm text-gray-400 ">11/14/2024</h3>
              </div>
              <div className="items-center flex space-x-2">
                <Phone color="gray" height={20} width={20} />
                <h3 className="text-sm text-gray-400 ">292-294-2924</h3>
              </div>
              <div className="flex space-x-2 content-center items-center text-wrap place-content">
                <House color="gray" height={20} width={20} />
                <p className="text-sm text-gray-400">1234, Your Address</p>
              </div>
              <div className="flex space-x-2 content-center items-center text-wrap place-content">
                <p className="text-sm text-gray-400">
                  Primary Language: Spanish
                </p>
              </div>
            </div>
          </div>
          <div className="pt-8">
            <h1 className="text-gray-700">Documents</h1>
          </div>
          <div className="flex items-center space-x-2">
            <div className="h-[40px] border w-full content-center rounded-md flex items-center space-x-2 p-3 mt-2 text-sm">
              <File color="#4a5568" />
              <h1 className="text-gray-700">Past Medical History</h1>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="h-[40px] border w-full content-center rounded-md flex items-center space-x-2 p-3 mt-2 text-sm">
              <File color="#4a5568" />
              <h1 className="text-gray-700">Insurance Card</h1>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="h-[40px] border w-full content-center rounded-md flex items-center space-x-2 p-3 mt-2 text-sm">
              <File color="#4a5568" />
              <h1 className="text-gray-700">Primary Physician</h1>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="h-[40px] border w-full content-center rounded-md flex items-center space-x-2 p-3 mt-2 text-sm">
              <Image color="#4a5568" />
              <h1 className="text-gray-700">Current Medication</h1>
            </div>
          </div>
          <button className=" bg-[#14b8a6] px-8 py-2 mt-8 rounded-xl text-gray-100 font-semibold tracking-wide">
            Emergency Contacts
          </button>
        </div>
      </div>
    </>
  );
};

export default HeroSection;
