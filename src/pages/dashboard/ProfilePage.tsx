// pages/ProfilePage.tsx
import { useState } from "react";
import Modal from "../../components/Modal";
import { useAuth } from "../../context/AuthProvider";
import { useUpdateProfileMutation, useUploadImageMutation } from "../../hook/profile.hook";
import { useCloudinaryUpload } from "../../hook/useCloudinary";

const ProfilePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useAuth();
  const updateProfileMutation = useUpdateProfileMutation()
  const uploadImageProfileMutation = useUploadImageMutation()
  const { uploadFile, uploading, uploadError } = useCloudinaryUpload();
  //   const [profile, setProfile] = useState({
  //     name: 'John Doe',
  //     email: 'john@example.com',
  //     bio: 'Frontend developer at XYZ',
  //   });

  const [formData, setFormData] = useState({
    ...user,
    blockchainAddress: user?.blockchainAddress || "",
    createdAt: user?.createdAt || "",
    firstname: user?.firstname || "",
    gender: user?.gender || "",
    identitySubmission: user?.identitySubmission || [],
    _id: user?._id || "",
  });

  const handleSave = async () => {
    // setProfile(formData);
    // setIsModalOpen(false);

    updateProfileMutation.mutateAsync({
        fullname: `${formData.firstname} ${formData.lastname}`,
    }).then(()=>setIsModalOpen(false))

  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const imageUrl = await uploadFile(file);
    
    if (imageUrl) {
        uploadImageProfileMutation.mutate({
            image: imageUrl,
        })
      setFormData((prev) => ({ ...prev, avatar: imageUrl }));
    }
  };

  console.log(user?.image)

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-lg">
      <div className="flex items-center mb-6 space-x-4">
        
          <div className="w-full">
            <h2 className="text-3xl font-bold text-gray-800">My Profile</h2>

            <div className="flex items-center justify-between mt-4">
            {user?.image ? (
            <img
              src={user.image}
              alt="User Avatar"
              className="w-20 h-20 rounded-full object-cover border"
            />
          ):  <img
            src="https://via.placeholder.com/150"
          alt="User "
          className="w-20 h-20 rounded-full object-cover border"
        />}
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md transition mt-2"
            >
              Edit Profile
            </button>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold">Name</h3>
            <p className="text-gray-700">
              {user?.firstname} {user?.lastname}
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Email</h3>
            <p className="text-gray-700">{user?.email}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Role</h3>
            <p className="text-gray-700">{user?.userType}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Gender</h3>
            <p className="text-gray-700">{user?.gender}</p>
          </div>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h3 className="text-xl font-bold mb-4">Edit Profile</h3>
        <div className="space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium">First Name</label>
            <input
              type="text"
              className="w-full border border-gray-300 px-4 py-2 rounded-lg mt-1 shadow-sm bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#9b87f5] transition"
              value={formData.firstname}
              onChange={(e) =>
                setFormData({ ...formData, firstname: e.target.value })
              }
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium">Last Name</label>
            <input
              type="text"
              className="w-full border border-gray-300 px-4 py-2 rounded-lg mt-1 shadow-sm bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#9b87f5] transition"
              value={formData.lastname}
              onChange={(e) =>
                setFormData({ ...formData, lastname: e.target.value })
              }
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium">Email</label>
            <input
              type="email"
              className="w-full border border-gray-300 px-4 py-2 rounded-lg mt-1 shadow-sm bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#9b87f5] transition"
              value={formData?.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>
          <div>
            <label
              htmlFor="gender"
              className="block text-sm font-medium text-gray-700"
            >
              Gender
            </label>
            <select
              id="gender"
              name="gender"
              required
              defaultValue=""
              className="w-full border border-gray-300 px-4 py-2 rounded-lg mt-1 shadow-sm bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#9b87f5] transition"
            >
              <option value="" disabled>
                Select your gender
              </option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="non-binary">Non-binary</option>
              <option value="prefer-not-to-say">Prefer not to say</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">Profile Image</label>
            {formData.image && (
              <img
                src={formData.image}
                alt="Avatar"
                className="w-20 h-20 rounded-full mb-2 object-cover"
              />
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="block w-full text-sm text-gray-600
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-purple-50 file:text-purple-700
                hover:file:bg-purple-100
                cursor-pointer"
            />
            {uploading || uploadImageProfileMutation.isPending && <p className="text-sm text-gray-500 mt-1">Uploading image...</p>}
            {uploadError && <p className="text-red-600 text-sm mt-1">{uploadError}</p>}
          </div>
        </div>


        <div className="mt-6 flex justify-end space-x-4">
          <button
            onClick={() => setIsModalOpen(false)}
            className="px-4 py-2 rounded-md border border-gray-300 text-gray-600 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 rounded-md bg-purple-600 text-white hover:bg-purple-700"
          >
            Save
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default ProfilePage;
