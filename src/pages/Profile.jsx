import { useState, useEffect } from "react";
import {
  MdMailOutline,
  MdOutlineCall,
  MdOutlineLocationOn,
  MdOutlineEdit,
  MdAdd,
} from "react-icons/md";

const Profile = () => {
  const [editingName, setEditingName] = useState(false);
  const [editingPersonal, setEditingPersonal] = useState(false);
  const [editingExperience, setEditingExperience] = useState(false);
  const [editingJobPreferences, setEditingJobPreferences] = useState(false);
  const [editingSkills, setEditingSkills] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");

  const [jobPreferences, setJobPreferences] = useState([]);
  const [newPreference, setNewPreference] = useState("");

  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState("");

  const [experienceList, setExperienceList] = useState([]);
  const [newExp, setNewExp] = useState({
    role: "",
    company: "",
    years: "",
  });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const storedProfile = JSON.parse(localStorage.getItem("profile"));
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (storedProfile && storedProfile.name) {
      setName(storedProfile.name || "");
      setEmail(storedProfile.email || "");
      setPhone(storedProfile.phone || "");
      setLocation(storedProfile.location || "");
      setSkills(storedProfile.skills || []);
      setJobPreferences(storedProfile.jobPreferences || []);
      setExperienceList(storedProfile.experienceList || []);
    } else if (storedUser) {
      setName(storedUser.name || "");
      setEmail(storedUser.email || "");
      setPhone(storedUser.phone || "");
    }

    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (!isLoaded) return;

    const profileData = {
      name,
      email,
      phone,
      location,
      skills,
      jobPreferences,
      experienceList,
    };

    localStorage.setItem("profile", JSON.stringify(profileData));
  }, [
    isLoaded,
    name,
    email,
    phone,
    location,
    skills,
    jobPreferences,
    experienceList,
  ]);

  const handleAddSkill = () => {
    if (newSkill.trim()) {
      setSkills((prev) => [...prev, newSkill]);
      setNewSkill("");
    }
  };

  const handleDeleteSkill = (index) => {
    setSkills((prev) => prev.filter((_, i) => i !== index));
  };

  const handleAddPreference = () => {
    if (newPreference.trim()) {
      setJobPreferences((prev) => [...prev, newPreference]);
      setNewPreference("");
    }
  };

  const handleDeletePreference = (index) => {
    setJobPreferences((prev) => prev.filter((_, i) => i !== index));
  };

  const handleAddExperience = () => {
    if (newExp.role && newExp.company) {
      setExperienceList((prev) => [...prev, newExp]);
      setNewExp({ role: "", company: "", years: "" });
    }
  };

  const handleDeleteExperience = (index) => {
    setExperienceList((prev) => prev.filter((_, i) => i !== index));
  };
  return (
    <div className="px-8 py-6 max-w-6xl mx-auto">
      {/* HEADER */}
      <div className="flex items-center gap-5 mb-10 bg-white shadow-sm rounded-xl p-5">
        <div className="w-16 h-16 rounded-full bg-black text-white flex items-center justify-center text-xl font-semibold">
          {name?.charAt(0)?.toUpperCase()}
        </div>

        <div className="flex items-center gap-3">
          {editingName ? (
            <>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border-b outline-none text-lg"
              />
              <button
                onClick={() => setEditingName(false)}
                className="text-sm text-blue-600"
              >
                Save
              </button>
            </>
          ) : (
            <>
              <h2 className="text-2xl font-semibold">{name}</h2>
              <MdOutlineEdit
                onClick={() => setEditingName(true)}
                className="cursor-pointer text-gray-400 hover:text-black"
              />
            </>
          )}
        </div>
      </div>

      {/* GRID LAYOUT */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* PERSONAL DETAILS */}
        <div className="bg-white shadow-sm rounded-xl p-5">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-lg">Personal Details</h3>
            {editingPersonal ? (
              <button
                onClick={() => setEditingPersonal(false)}
                className="text-sm text-blue-600"
              >
                Save
              </button>
            ) : (
              <MdOutlineEdit
                onClick={() => setEditingPersonal(true)}
                className="cursor-pointer text-gray-400 hover:text-black"
              />
            )}
          </div>

          <div className="space-y-4 text-sm">
            <div className="flex items-center gap-3">
              <MdMailOutline className="text-gray-400" />
              {editingPersonal ? (
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border-b outline-none w-full"
                />
              ) : (
                <span>{email}</span>
              )}
            </div>

            <div className="flex items-center gap-3">
              <MdOutlineCall className="text-gray-400" />
              {editingPersonal ? (
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="border-b outline-none w-full"
                />
              ) : (
                <span>{phone || "Add phone"}</span>
              )}
            </div>

            <div className="flex items-center gap-3">
              <MdOutlineLocationOn className="text-gray-400" />
              {editingPersonal ? (
                <input
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="border-b outline-none w-full"
                />
              ) : (
                <span>{location || "Add location"}</span>
              )}
            </div>
          </div>
        </div>

        {/* EXPERIENCE */}
        <div className="bg-white shadow-sm rounded-xl p-5">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-lg">Experience</h3>
            {editingExperience ? (
              <button
                onClick={() => setEditingExperience(false)}
                className="text-sm text-blue-600"
              >
                Save
              </button>
            ) : (
              <MdOutlineEdit
                onClick={() => setEditingExperience(true)}
                className="cursor-pointer text-gray-400 hover:text-black"
              />
            )}
          </div>

          <div className="space-y-4">
            {experienceList.map((exp, index) => (
              <div
                key={index}
                className="border rounded-lg p-3 flex justify-between"
              >
                <div>
                  <p className="font-medium">{exp.role}</p>
                  <p className="text-sm text-gray-500">{exp.company}</p>
                  <p className="text-xs text-gray-400">{exp.years} yrs</p>
                </div>

                {editingExperience && (
                  <button
                    onClick={() => handleDeleteExperience(index)}
                    className="text-red-500"
                  >
                    ×
                  </button>
                )}
              </div>
            ))}
          </div>

          {editingExperience && (
            <div className="mt-4 space-y-2">
              <input
                placeholder="Role"
                value={newExp.role}
                onChange={(e) => setNewExp({ ...newExp, role: e.target.value })}
                className="w-full border-b outline-none"
              />

              <input
                placeholder="Company"
                value={newExp.company}
                onChange={(e) =>
                  setNewExp({ ...newExp, company: e.target.value })
                }
                className="w-full border-b outline-none"
              />

              <input
                placeholder="Years"
                value={newExp.years}
                onChange={(e) =>
                  setNewExp({ ...newExp, years: e.target.value })
                }
                className="w-full border-b outline-none"
              />

              <button
                onClick={handleAddExperience}
                className="text-blue-600 text-sm"
              >
                + Add Experience
              </button>
            </div>
          )}
        </div>
      </div>

      {/* JOB PREFERENCES */}
      <div className="bg-white shadow-sm rounded-xl p-5 mt-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold text-lg">Job Preferences</h3>
          {editingJobPreferences ? (
            <button
              onClick={() => setEditingJobPreferences(false)}
              className="text-sm text-blue-600"
            >
              Save
            </button>
          ) : (
            <MdOutlineEdit
              onClick={() => setEditingJobPreferences(true)}
              className="cursor-pointer text-gray-400 hover:text-black"
            />
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          {jobPreferences.map((pref, index) => (
            <span
              key={index}
              // className="bg-gray-100 px-3 py-1 rounded-full text-sm flex items-center gap-2"
              className="bg-black text-white px-3 py-1 rounded-full text-sm flex items-center gap-2"

            >
              {pref}
              {editingJobPreferences && (
                <button
                  onClick={() => handleDeletePreference(index)}
                  className="text-red-500"
                >
                  ×
                </button>
              )}
            </span>
          ))}
        </div>

        {editingJobPreferences && (
          <div className="flex gap-2 mt-3">
            <input
              value={newPreference}
              onChange={(e) => setNewPreference(e.target.value)}
              className="border-b outline-none"
            />
            <button onClick={handleAddPreference} className="text-blue-600">
              +
            </button>
          </div>
        )}
      </div>

      {/* SKILLS */}
      <div className="bg-white shadow-sm rounded-xl p-5 mt-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold text-lg">Skills</h3>
          {editingSkills ? (
            <button
              onClick={() => setEditingSkills(false)}
              className="text-sm text-blue-600"
            >
              Save
            </button>
          ) : (
            <MdOutlineEdit
              onClick={() => setEditingSkills(true)}
              className="cursor-pointer text-gray-400 hover:text-black"
            />
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          {skills.map((skill, index) => (
            <span
              key={index}
              className="bg-black text-white px-3 py-1 rounded-full text-sm flex items-center gap-2"
            >
              {skill}
              {editingSkills && (
                <button
                  onClick={() => handleDeleteSkill(index)}
                  className="text-white"
                >
                  ×
                </button>
              )}
            </span>
          ))}
        </div>

        {editingSkills && (
          <div className="flex gap-2 mt-3">
            <input
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              className="border-b outline-none"
            />
            <button onClick={handleAddSkill} className="text-blue-600">
              +
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
