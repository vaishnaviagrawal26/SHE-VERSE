import React, { useEffect, useState } from "react";
import { getProfile, updateProfile, setTriggerPhrase } from "../../services/profileService";

function Profile() {
  const [profile, setProfile] = useState({ full_name: "", email: "", phone: "" });
  const [triggerPhrase, setTrigger] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchProfile = async () => {
    setLoading(true);
    try {
      const res = await getProfile();
      setProfile(res);
      setTrigger(res.trigger_phrase || "");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleUpdate = async () => {
    try {
      await updateProfile(profile);
      alert("Profile updated successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to update profile");
    }
  };

  const handleSetTrigger = async () => {
    try {
      await setTriggerPhrase(triggerPhrase);
      alert("Trigger phrase updated!");
    } catch (err) {
      console.error(err);
      alert("Failed to set trigger phrase");
    }
  };

  if (loading) return <div className="text-gray-500 text-center">Loading profile...</div>;

  return (
    <div className="p-4 bg-white rounded-lg shadow max-w-md mx-auto">
      <h2 className="text-lg font-semibold text-purple-600 mb-4">My Profile</h2>

      <div className="mb-3">
        <label className="block text-gray-700 mb-1">Full Name</label>
        <input
          value={profile.full_name}
          onChange={(e) => setProfile({ ...profile, full_name: e.target.value })}
          className="border rounded p-2 w-full"
        />
      </div>

      <div className="mb-3">
        <label className="block text-gray-700 mb-1">Email</label>
        <input value={profile.email} disabled className="border rounded p-2 w-full bg-gray-100" />
      </div>

      <div className="mb-3">
        <label className="block text-gray-700 mb-1">Phone</label>
        <input
          value={profile.phone}
          onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
          className="border rounded p-2 w-full"
        />
      </div>

      <button
        onClick={handleUpdate}
        className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 mb-4"
      >
        Update Profile
      </button>

      <div className="mt-4">
        <label className="block text-gray-700 mb-1">Trigger Phrase</label>
        <input
          value={triggerPhrase}
          onChange={(e) => setTrigger(e.target.value)}
          className="border rounded p-2 w-full"
          placeholder="e.g., 'help me now'"
        />
        <button
          onClick={handleSetTrigger}
          className="mt-2 bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
        >
          Set Trigger Phrase
        </button>
      </div>
    </div>
  );
}

export default Profile;