import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Save, ShieldCheck, Camera, Star, Clock, MapPin } from "lucide-react";
import {
  getVendorProfile,
  updateVendorProfile,
} from "../../services/authService";
import { useAuth } from "../../context/AuthContext";

export const VendorProfile = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [ownerName, setOwnerName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [storeName, setStoreName] = useState("");
  const [storeDescription, setStoreDescription] = useState("");
  const [storeAddress, setStoreAddress] = useState("");
  const [storeCategory, setStoreCategory] = useState("");
  const [storeImage, setStoreImage] = useState("");
 const { user, updateUser } = useAuth();
const storeOpen = user?.storeOpen ?? true;

  useEffect(() => {
  const loadProfile = async () => {
    try {
      const data = await getVendorProfile();
      const vendor = data.vendor;

      setOwnerName(vendor.name || "");
      setEmail(vendor.email || "");
      setPhone(vendor.phone || "");
      setStoreName(vendor.storeName || "");
      setStoreDescription(vendor.storeDescription || "");
      setStoreAddress(vendor.storeAddress || "");
      setStoreCategory(vendor.storeCategory || "");
      setStoreImage(vendor.storeImage || "");

      updateUser({
        storeOpen: vendor.storeOpen,
        storeName: vendor.storeName,
      });

    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  loadProfile();
}, []);

  const handleSave = async () => {
    try {
      setSaving(true);
      await updateVendorProfile({
        name: ownerName,
        phone,
        storeName,
        storeDescription,
        storeAddress,
        storeCategory,
        storeImage,
        storeOpen,
      });
      toast.success("Profile updated successfully");
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setSaving(false);
    }
  };

  const toggleStore = async () => {
  const newStatus = !storeOpen;

  try {
    await updateVendorProfile({ storeOpen: newStatus });

    updateUser({ storeOpen: newStatus }); // 🔥 same global update

    toast.success(newStatus ? "Store is now OPEN" : "Store is now CLOSED");
  } catch {
    toast.error("Failed to update store status");
  }
};

  if (loading) return <div className="p-6 text-gray-500">Loading profile...</div>;

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Store Profile</h2>
        <p className="text-gray-500 text-sm">
          Manage how your store appears to customers on Swadeshi Mart.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* ── Left Column: Form ── */}
        <div className="lg:col-span-2 space-y-6">

          {/* General Information */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-orange-50">
            <h3 className="font-bold text-gray-800 mb-6 flex items-center gap-2">
              <span className="w-1 h-6 bg-[#FF9F3F] rounded-full" />
              General Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Store Name</label>
                <input
                  type="text"
                  value={storeName}
                  onChange={(e) => setStoreName(e.target.value)}
                  placeholder="Store Name"
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#FF9F3F] focus:border-transparent outline-none transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Owner Name</label>
                <input
                  type="text"
                  value={ownerName}
                  onChange={(e) => setOwnerName(e.target.value)}
                  placeholder="Owner Name"
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#FF9F3F] focus:border-transparent outline-none transition-all"
                />
              </div>

              <div className="col-span-1 md:col-span-2 space-y-2">
                <label className="text-sm font-medium text-gray-700">Store Description</label>
                <textarea
                  rows={3}
                  value={storeDescription}
                  onChange={(e) => setStoreDescription(e.target.value)}
                  placeholder="Store Description"
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#FF9F3F] focus:border-transparent outline-none transition-all resize-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Email Address</label>
                <input
                  type="email"
                  value={email}
                  readOnly
                  className="w-full px-4 py-2.5 bg-gray-100 border border-gray-200 rounded-xl outline-none cursor-not-allowed text-gray-500"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Phone Number</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Phone"
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#FF9F3F] focus:border-transparent outline-none transition-all"
                />
              </div>
            </div>
          </div>

          {/* Location & Store Image */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-orange-50">
            <h3 className="font-bold text-gray-800 mb-6 flex items-center gap-2">
              <span className="w-1 h-6 bg-[#4CAF50] rounded-full" />
              Location & Store Image
            </h3>

            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Store Address</label>
                <textarea
                  rows={2}
                  value={storeAddress}
                  onChange={(e) => setStoreAddress(e.target.value)}
                  placeholder="Store Address"
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#FF9F3F] focus:border-transparent outline-none transition-all resize-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Store Image URL</label>
                <div className="relative">
                  <Camera className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="text"
                    value={storeImage}
                    onChange={(e) => setStoreImage(e.target.value)}
                    placeholder="https://..."
                    className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#FF9F3F] focus:border-transparent outline-none transition-all"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end">
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-2 bg-[#FF9F3F] hover:bg-orange-500 disabled:opacity-60 text-white px-8 py-3 rounded-xl font-bold transition-all shadow-lg shadow-orange-200 active:scale-95"
            >
              <Save size={20} />
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>

        {/* ── Right Column: Preview + Store Status ── */}
        <div className="lg:col-span-1">
          <div className="sticky top-6 space-y-6">

            {/* Customer Preview */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-orange-50">
              <h3 className="font-bold text-gray-800 mb-1">Customer Preview</h3>
              <p className="text-xs text-gray-500 mb-4">
                This is how your store card looks in the customer app.
              </p>

              <div className="border border-gray-100 rounded-2xl overflow-hidden shadow-lg bg-white">
                {/* Banner image */}
                <div className="h-40 bg-orange-50 relative">
                  {storeImage ? (
                    <img
                      src={storeImage}
                      alt="Store banner"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = "none";
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Camera size={32} className="text-orange-300" />
                    </div>
                  )}
                  {/* Open/Closed badge — live-reflects toggle */}
                  <div
                    className={`absolute top-3 right-3 backdrop-blur-sm px-2 py-1 rounded-lg text-xs font-bold shadow-sm flex items-center gap-1 bg-white/90 ${
                      storeOpen ? "text-green-600" : "text-red-500"
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        storeOpen ? "bg-green-500 animate-pulse" : "bg-red-400"
                      }`}
                    />
                    {storeOpen ? "OPEN" : "CLOSED"}
                  </div>
                </div>

                {/* Card body */}
                <div className="p-4">
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="font-bold text-gray-900 text-lg truncate">
                      {storeName || "Your Store Name"}
                    </h4>
                    <div className="flex-shrink-0 bg-green-600 text-white text-xs font-bold px-1.5 py-0.5 rounded flex items-center gap-1 ml-2">
                      4.8 <Star size={10} fill="currentColor" />
                    </div>
                  </div>
                  <p className="text-gray-500 text-sm mb-3 line-clamp-1">
                    {storeCategory || storeDescription || "Category · Description"}
                  </p>

                  <div className="flex items-center gap-3 text-xs font-medium text-gray-500 border-t border-gray-100 pt-3">
                    <div className="flex items-center gap-1">
                      <Clock size={14} className="text-[#FF9F3F]" />
                      <span>25–30 min</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin size={14} className="text-[#FF9F3F]" />
                      <span>2.5 km</span>
                    </div>
                    <div className="flex items-center gap-1 text-green-600">
                      <ShieldCheck size={14} />
                      <span>Verified</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Store Status Toggle */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-orange-50">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold text-gray-800">Store Status</h3>
                <span
                  className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                    storeOpen
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 text-gray-500"
                  }`}
                >
                  {storeOpen ? "Open" : "Closed"}
                </span>
              </div>
              <p className="text-xs text-gray-500 mb-5">
                Toggle your store's live availability. Customers won't be able to order when closed.
              </p>

              <div className="flex items-center justify-between bg-gray-50 px-4 py-3.5 rounded-xl border border-gray-100">
                <span className="text-sm font-medium text-gray-700">
                  {storeOpen
                    ? "Accepting orders"
                    : "Not accepting orders"}
                </span>
                <button
                  onClick={toggleStore}
                  aria-label="Toggle store open/closed"
                  className={`relative w-12 h-6 rounded-full transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF9F3F] ${
                    storeOpen ? "bg-green-500" : "bg-gray-300"
                  }`}
                >
                  <span
                    className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-300 ${
                      storeOpen ? "translate-x-6" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};