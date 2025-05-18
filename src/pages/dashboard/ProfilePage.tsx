// pages/ProfilePage.tsx
import { useState } from 'react';
import Modal from '../../components/Modal';

const ProfilePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    bio: 'Frontend developer at XYZ',
  });

  const [formData, setFormData] = useState(profile);

  const handleSave = () => {
    setProfile(formData);
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-gray-800">My Profile</h2>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md transition"
          >
            Edit Profile
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold">Name</h3>
            <p className="text-gray-700">{profile.name}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Email</h3>
            <p className="text-gray-700">{profile.email}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Bio</h3>
            <p className="text-gray-700">{profile.bio}</p>
          </div>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h3 className="text-xl font-bold mb-4">Edit Profile</h3>
        <div className="space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium">Name</label>
            <input
              type="text"
              className="w-full border rounded-md px-3 py-2"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium">Email</label>
            <input
              type="email"
              className="w-full border rounded-md px-3 py-2"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium">Bio</label>
            <textarea
              className="w-full border rounded-md px-3 py-2"
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
            />
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
