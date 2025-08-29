import React, { useState, useEffect, useRef } from "react";
import { auth, db } from "../firebase";
import { updateProfile } from "firebase/auth";
import {
  getStorage,
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { doc, updateDoc, setDoc, getDoc } from "firebase/firestore";

const Profile = () => {
  const user = auth.currentUser;
  const [displayName, setDisplayName] = useState(user?.displayName || "");
  const [photoURL, setPhotoURL] = useState(user?.photoURL || "");
  const [newPhoto, setNewPhoto] = useState(null);
  const [toast, setToast] = useState("");

  const fileInputRef = useRef();

  useEffect(() => {
    if (toast) {
      const t = setTimeout(() => setToast(""), 3000);
      return () => clearTimeout(t);
    }
  }, [toast]);

  const handlePhotoChange = (e) => {
    const file = e.target.files?.[0];
    if (file) setNewPhoto(file);
  };

  const handleProfileUpdate = async () => {
    try {
      if (!user) {
        setToast("User not logged in.");
        return;
      }

      const updatedFields = {};
      let newPhotoURL = photoURL;

      // If name changed
      if (displayName && displayName !== user.displayName) {
        updatedFields.displayName = displayName;
      }

      // If new photo selected
      if (newPhoto) {
        const storage = getStorage();
        const imgRef = storageRef(storage, `profilePics/${user.uid}`);
        await uploadBytes(imgRef, newPhoto);
        newPhotoURL = await getDownloadURL(imgRef);
        updatedFields.photoURL = newPhotoURL;
      }

      // Update Firebase Auth profile
      if (Object.keys(updatedFields).length) {
        await updateProfile(user, updatedFields);
      }

      // Update local UI
      setPhotoURL(newPhotoURL);
      setNewPhoto(null);

      // Update Firestore user document
      const userDocRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(userDocRef);

      if (docSnap.exists()) {
        await updateDoc(userDocRef, {
          name: displayName,
          photoURL: newPhotoURL,
        });
      } else {
        await setDoc(userDocRef, {
          uid: user.uid,
          name: displayName,
          email: user.email,
          photoURL: newPhotoURL,
        });
      }

      setToast("Profile updated successfully!");
    } catch (err) {
      console.error("Profile update error:", err);
      setToast("Error updating profile.");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow mt-8">
      <h2 className="text-2xl font-bold mb-4">Your Profile</h2>

      {toast && (
        <div className="mb-4 p-2 bg-green-500 text-white rounded text-center">
          {toast}
        </div>
      )}

      <div className="flex flex-col items-center mb-4">
        <img
          src={photoURL || "/default-avatar.png"}
          alt="Profile"
          className="w-24 h-24 rounded-full mb-2 object-cover"
        />
        <button
          onClick={() => fileInputRef.current.click()}
          className="text-blue-600 underline"
        >
          Change Photo
        </button>
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          className="hidden"
          onClick={(e) => (e.target.value = null)}
          onChange={handlePhotoChange}
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1">Full Name</label>
        <input
          type="text"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1">Email</label>
        <input
          type="email"
          value={user.email}
          disabled
          className="w-full p-2 bg-gray-100 rounded"
        />
      </div>

      <button
        onClick={handleProfileUpdate}
        className="w-full bg-gradient-to-r from-orange-400 to-pink-500 text-white py-2 rounded-lg"
      >
        Save Changes
      </button>
    </div>
  );
};

export default Profile;
