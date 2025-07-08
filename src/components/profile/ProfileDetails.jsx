"use client";

import { useState, useEffect, useRef } from "react";
import { Check, Info, Star, X } from "lucide-react";
import Image from "next/image";
import profilePhoto from "@/assets/images/testuser.png";
import questionCircle from "@/assets/images/question_circle.svg";
import { updateProfile } from "@/services/profileApi";

const ProfileDetails = ({ initialData, user }) => {
  console.log(initialData);
  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    phoneNumber: "",
    experience: "",
    profilePicture: null,
    taxId: ""
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const fileInputRef = useRef(null);
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    if (initialData) {
      setProfileData({
        firstName: initialData.firstName || initialData?.user?.firstName || "",
        lastName: initialData.lastName || initialData?.user?.lastName || "",
        email: initialData.email || initialData?.user?.email || "",
        address: initialData.address || initialData?.user?.address || "",
        phoneNumber:
          initialData.phoneNumber || initialData?.user?.phoneNumber || "",
        experience: initialData.experience?.toString() || "",
        profilePicture:
          initialData.profilePicture ||
          initialData?.user?.profilePicture ||
          null,
        taxId: initialData.taxId || initialData?.user?.taxId || "",
      });

      if (initialData?.profilePicture) {
        setPreviewUrl(initialData?.profilePicture);
      }
    }
  }, [initialData]);

  const handleInputChange = (field, value) => {
    setProfileData((prev) => ({
      ...prev,
      [field]: value,
    }));

    if (error) setError("");
    if (successMessage) setSuccessMessage("");
  };

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        setError("Zəhmət olmasa şəkil faylı seçin (JPG, PNG, GIF)");
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        setError("Şəkil faylı 5MB-dan kiçik olmalıdır");
        return;
      }

      setSelectedFile(file);

      const url = URL.createObjectURL(file);
      setPreviewUrl(url);

      setError("");
    }
  };

  const handleEditProfilePicture = () => {
    fileInputRef.current?.click();
  };

  const handleDeleteProfilePicture = async () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setProfileData((prev) => ({
      ...prev,
      profilePicture: null,
    }));

    await updateProfile({
      profilePicture: null,
    });
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setError("");
      setSuccessMessage("");

      const updateData = {
        firstName: profileData.firstName,
        lastName: profileData.lastName,
        email: profileData.email,
        address: profileData.address,
        phoneNumber: profileData.phoneNumber,
        profilePicture: selectedFile || profileData.profilePicture,
        taxId: profileData.taxId,
      };

      await updateProfile(updateData);
      setSuccessMessage("Profil uğurla yeniləndi!");

      setSelectedFile(null);

      scrollContainerRef.current?.scrollTo({ top: 0, behavior: "smooth" });

      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err) {
      setError(err.message);
      scrollContainerRef.current?.scrollTo({ top: 0, behavior: "smooth" });
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    if (initialData) {
      setProfileData({
        firstName: initialData.firstName || "",
        lastName: initialData.lastName || "",
        email: initialData.email || "",
        address: initialData.address || "",
        phoneNumber: initialData?.phoneNumber || "",
        experience: initialData.experience?.toString() || "",
        profilePicture: initialData?.profilePicture || null,
        taxId: initialData?.taxId || initialData?.user?.taxId || "",
      });

      setSelectedFile(null);
      setPreviewUrl(initialData?.profilePicture || null);
    }
    setError("");
    setSuccessMessage("");
  };

  useEffect(() => {
    return () => {
      if (previewUrl && previewUrl.startsWith("blob:")) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  return (
    <div
      ref={scrollContainerRef}
      className="p-[32px] mt-[80px] overflow-y-auto h-[calc(100vh-80px)]"
    >
      <div className="flex items-center justify-between">
        <h3 className="text-[20px] font-[700] text-[#1E293B]">Profil</h3>
        <div className="flex items-center gap-[8px]">
          <button className="shrink-0 w-[40px] h-[40px] rounded-full flex items-center justify-center cursor-pointer border-1 border-[#CBD5E1] relative group">
            <Info size={16} color="#475569" />

            <div className="absolute top-[-15px] right-[150%] w-[300px] p-[12px] bg-[#101827] rounded-[16px] pointer-events-none transition group-hover:opacity-100 opacity-0">
              <h4 className="font-bold text-[14px] text-white mb-[8px]">
                Profil Məlumatları
              </h4>
              <p className="text-[12px] text-white">
                Burada şəxsi məlumatlarınızı yeniləyə bilərsiniz.
              </p>

              <div className="absolute top-[50%] translate-y-[-50%] right-[-4px] w-[16px] h-[16px] bg-[#101827] rotate-45"></div>
            </div>
          </button>

          <div className="flex items-center gap-[8px] bg-[#F37321] rounded-full px-[16px] py-[10px] text-white font-[700] text-[14px]">
            {user?.role || "User"}
            <Star size={20} color="#FFFFFF" />
          </div>
        </div>
      </div>

      <div className="w-full h-[1px] bg-[#E2E8F0] my-[24px]"></div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      )}

      {successMessage && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-green-600 text-sm">{successMessage}</p>
        </div>
      )}

      <div className="max-w-[800px]">
        <div className="w-full flex justify-between mb-[24px] items-center">
          <label
            htmlFor="name"
            className="font-[700] text-[16px] text-[#1E293B]"
          >
            Ad
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={profileData.firstName}
            onChange={(e) => handleInputChange("firstName", e.target.value)}
            className="md:w-[520px] w-full border-1 border-[#CBD5E1] rounded-full p-[12px] text-[16px] font-[500] text-[#475569]"
          />
        </div>

        {user?.role !== "Company" && (
          <div className="w-full flex justify-between mb-[24px] items-center">
            <label
              htmlFor="surname"
              className="font-[700] text-[16px] text-[#1E293B]"
            >
              Soyad
            </label>
            <input
              type="text"
              name="surname"
              id="surname"
              value={profileData.lastName}
              onChange={(e) => handleInputChange("lastName", e.target.value)}
              className="md:w-[520px] w-full border-1 border-[#CBD5E1] rounded-full p-[12px] text-[16px] font-[500] text-[#475569]"
            />
          </div>
        )}

        {user?.role === "Company" && (
          <div className="w-full flex justify-between mb-[24px] items-center">
            <label
              htmlFor="taxId"
              className="font-[700] text-[16px] text-[#1E293B]"
            >
              VÖEN
            </label>
            <input
              type="text"
              name="taxId"
              id="taxId"
              value={profileData.taxId}
              onChange={(e) => handleInputChange("taxId", e.target.value)}
              className="md:w-[520px] w-full border-1 border-[#CBD5E1] rounded-full p-[12px] text-[16px] font-[500] text-[#475569]"
            />
          </div>
        )}

        <div className="w-full flex justify-between mb-[24px] items-center">
          <label
            htmlFor="email"
            className="font-[700] text-[16px] text-[#1E293B]"
          >
            Elektron poçt
          </label>
          <input
            type="text"
            name="email"
            id="email"
            value={profileData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            className="md:w-[520px] w-full border-1 border-[#CBD5E1] rounded-full p-[12px] text-[16px] font-[500] text-[#475569] disabled:opacity-70"
            readOnly
            disabled
          />
        </div>

        <div className="w-full flex justify-between mb-[24px] items-center">
          <label
            htmlFor="address"
            className="font-[700] text-[16px] text-[#1E293B]"
          >
            {user?.role === 'Company' ? 'Ofis' : 'Yaşayış'} ünvanı
          </label>
          <input
            type="text"
            name="address"
            id="address"
            value={profileData.address}
            onChange={(e) => handleInputChange("address", e.target.value)}
            className="md:w-[520px] w-full border-1 border-[#CBD5E1] rounded-full p-[12px] text-[16px] font-[500] text-[#475569]"
          />
        </div>

        <div className="w-full h-[1px] bg-[#E2E8F0] my-[24px]"></div>

        <div className="w-full flex justify-between items-center">
          <label
            htmlFor="phone"
            className="font-[700] text-[16px] text-[#1E293B]"
          >
            Mobil nömrə
          </label>
          <input
            type="text"
            name="phone"
            id="phone"
            value={profileData.phoneNumber}
            onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
            className="md:w-[520px] w-full border-1 border-[#CBD5E1] rounded-full p-[12px] text-[16px] font-[500] text-[#475569]"
          />
        </div>

        <div className="w-full h-[1px] bg-[#E2E8F0] my-[24px]"></div>

        <div className="w-full flex justify-between items-center">
          <p className="font-[700] text-[16px] text-[#1E293B]">Profil</p>

          <div className="md:w-[520px] w-full flex items-center gap-[16px]">
            <Image
              src={previewUrl || profileData?.profilePicture || profilePhoto}
              width={64}
              height={64}
              alt="photo"
              className="rounded-full object-cover w-[64px] h-[64px]"
            />

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
            />

            <button
              onClick={handleEditProfilePicture}
              className="bg-[#101827] px-[16px] py-[10px] border-1 border-[#101827] text-[#F0EEEE] text-[14px] font-[700] rounded-full transition hover:text-[#101827] hover:bg-transparent cursor-pointer"
            >
              Dəyişdir
            </button>
            <button
              onClick={handleDeleteProfilePicture}
              className="bg-[#F37321] px-[16px] py-[10px] border-1 border-[#F37321] text-[#F0EEEE] text-[14px] font-[700] rounded-full transition hover:text-[#F37321] hover:bg-transparent cursor-pointer"
            >
              Sil
            </button>
          </div>
        </div>

        <div className="w-full h-[1px] bg-[#E2E8F0] my-[24px]"></div>

        <div className="w-full flex justify-between items-center">
          <p className="font-[700] text-[16px] text-[#1E293B]">Plan</p>

          <div className="md:w-[520px] w-full bg-[#101827] rounded-full p-[12px] text-[#F0EEEE] text-[16px] font-[500]">
            {user?.role === "User"
              ? "Standart Plan"
              : user?.role === "Company"
              ? "Şirkət Planı"
              : "İşçi Planı"}
          </div>
        </div>

        <div className="w-full h-[1px] bg-[#E2E8F0] my-[24px]"></div>

        {user?.role !== "Company" && (
          <div className="w-full flex justify-between items-start">
            <p className="font-[700] text-[16px] text-[#1E293B] flex items-center gap-[8px]">
              Haqqımda
              <Image src={questionCircle} height={16} width={16} alt="info" />
            </p>

            <div className="md:w-[520px] w-full border-1 border-[#CBD5E1] rounded-[24px] relative overflow-hidden">
              <textarea
                name="experience"
                id="experience"
                value={profileData.experience}
                onChange={(e) =>
                  handleInputChange("experience", e.target.value)
                }
                className="p-[12px] pb-[50px] w-full outline-none min-h-[200px] text-[16px] text-[#475569]"
              />
              <p className="absolute p-[10px] bg-white bottom-0 left-0 text-[#94A3B8] text-[12px] font-[500] z-[100]">
                {200 - (profileData.experience?.length || 0)} characters
                remaining
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="w-full h-[1px] bg-[#E2E8F0] my-[24px]"></div>

      <div className="flex justify-end gap-[8px]">
        <button
          onClick={handleCancel}
          disabled={saving}
          className="px-[16px] py-[10px] border-1 border-[#CBD5E1] rounded-full flex justify-center items-center gap-[8px] text-[#475569] text-[14px] font-bold cursor-pointer disabled:opacity-50"
        >
          İmtina
          <X size={20} color="#475569" />
        </button>
        <button
          onClick={handleSave}
          disabled={saving}
          className="px-[16px] py-[10px] bg-[#F37321] border-1 border-[#F37321] transition hover:bg-transparent hover:text-[#F37321] rounded-full flex justify-center items-center gap-[8px] text-white text-[14px] font-bold cursor-pointer group disabled:opacity-50"
        >
          {saving ? "Saxlanır..." : "Saxla"}
          {saving ? (
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin group-hover:border-[#F37321] group-hover:border-t-transparent transition"></div>
          ) : (
            <Check
              size={20}
              color="#ffffff"
              className="group-hover:stroke-[#F37321] transition"
            />
          )}
        </button>
      </div>
    </div>
  );
};

export default ProfileDetails;
