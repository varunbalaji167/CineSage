import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import LoaderButton from "../components/LoaderButton";

const Profile = () => {
  const { user, logout } = useAuth();
  const [profile, setProfile] = useState(null);
  const [editName, setEditName] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        setProfile(userSnap.data());
        setEditName(userSnap.data().name || "");
      }
    };

    fetchProfile();
  }, [user]);

  const handleNameUpdate = async () => {
    if (!editName.trim()) return;
    setUpdating(true);
    const userRef = doc(db, "users", user.uid);
    await updateDoc(userRef, { name: editName });
    setProfile((prev) => ({ ...prev, name: editName }));
    setIsEditing(false);
    setUpdating(false);
  };

  if (!profile) {
    return (
      <div
        className="min-h-screen flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: "url('/images/bg.jpg')" }}
      >
        <div className="bg-black/80 p-8 rounded-xl">
          <LoaderButton text="Loading profile..." />
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-cover bg-center text-white"
      style={{ backgroundImage: "url('/images/bg.jpg')" }}
    >
      <div className="bg-black/80 min-h-screen flex items-center justify-center px-4 py-10">
        <div className="max-w-2xl w-full bg-[#1c1c1c] p-8 rounded-2xl shadow-xl">
          <h1 className="text-4xl font-bold mb-6 text-red-500 drop-shadow">Your Profile</h1>

          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-300 mb-1">Name:</label>
            {isEditing ? (
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="flex-1 px-3 py-2 rounded-lg bg-gray-800 text-white border border-gray-600 focus:outline-none"
                />
                {updating ? (
                  <LoaderButton text="Saving..." />
                ) : (
                  <>
                    <button
                      onClick={handleNameUpdate}
                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-all"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => {
                        setIsEditing(false);
                        setEditName(profile.name);
                      }}
                      className="text-gray-400 hover:text-white transition-all"
                    >
                      Cancel
                    </button>
                  </>
                )}
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <p className="text-lg">{profile.name || "Not set"}</p>
                <button
                  onClick={() => setIsEditing(true)}
                  className="text-red-400 hover:underline transition"
                >
                  Edit
                </button>
              </div>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-300 mb-1">Email:</label>
            <p className="text-lg">{profile.email}</p>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-300 mb-1">Joined:</label>
            <p className="text-lg">{profile.createdAt?.toDate?.().toLocaleDateString() || "N/A"}</p>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-300 mb-1">Favorites Count:</label>
            <p className="text-lg">{profile.favorites?.length || 0} movies</p>
          </div>

          <button
            onClick={logout}
            className="w-full bg-red-600 hover:bg-red-700 text-white py-3 mt-6 rounded-xl font-semibold transition-all"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;