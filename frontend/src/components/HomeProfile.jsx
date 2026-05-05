import { useState, useEffect } from "react";
import { getHomeProfile, saveHomeProfile } from "../services/homeService";
import {
  updateHouseholdName,
  deleteHousehold,
  getHouseholds,
} from "../services/householdService";
import { useNavigate } from "react-router-dom";
import { buildFormData } from "../services/api/formUtils";

export default function HomeProfile({
  selectedHousehold,
  refreshHouseholds,
  isOwner,
  setSelectedHousehold,
}) {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [preview, setPreview] = useState(null);
  const [originalData, setOriginalData] = useState(null);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    household_name: "",
    property_type: "rent",
    number_of_rooms: "",
    city: "",
    year_built: "",
    building_type: "",
    heating_type: "",
    heating_installation_year: "",
    floor_heating: false,
    solar_panels: false,
    solar_installation_year: "",
    house_image: null,
  });

  // =========================
  // LOAD PROFILE
  // =========================
  useEffect(() => {
    if (!selectedHousehold) return;

    const fetchProfile = async () => {
      setLoading(true);

      try {
        const data = await getHomeProfile(selectedHousehold);

        if (!data) return;

        const mappedData = {
          household_name: data.household_name || "",
          property_type: data.property_type || "rent",
          number_of_rooms: data.number_of_rooms || "",
          city: data.city || "",
          year_built: data.year_built || "",
          building_type: data.building_type || "",
          heating_type: data.heating_type || "",
          heating_installation_year: data.heating_installation_year || "",
          floor_heating: data.floor_heating || false,
          solar_panels: data.solar_panels || false,
          solar_installation_year: data.solar_installation_year || "",
          house_image: null,
          house_image_url: data.house_image_url || null,
        };

        setFormData(mappedData);
        setOriginalData(mappedData);
        setPreview(mappedData.house_image_url);
      } catch (err) {
        console.error("Load error:", err);
      }

      setLoading(false);
    };

    fetchProfile();
  }, [selectedHousehold]);

  // =========================
  // DELETE HOUSEHOLD
  // =========================
  const handleDelete = async () => {
    if (!selectedHousehold) return;

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this households?",
    );

    if (!confirmDelete) return;

    try {
      await deleteHousehold(selectedHousehold);
    } catch {
      // ignore (already deleted)
    }

    const updated = await getHouseholds();
    await refreshHouseholds();

    if (updated.length > 0) {
      setSelectedHousehold(updated[0].id);
    } else {
      setSelectedHousehold(null);
    }

    navigate("/dashboard");
  };

  // =========================
  // CHANGE DETECTION
  // =========================
  const isDirty =
    formData &&
    originalData &&
    (JSON.stringify({
      ...formData,
      house_image: null,
    }) !==
      JSON.stringify({
        ...originalData,
        house_image: null,
      }) ||
      formData.house_image !== null);

  // =========================
  // CANCEL
  // =========================
  const handleCancel = () => {
    if (!originalData) return;

    setFormData(originalData);
    setPreview(originalData.house_image_url || null);
  };

  // =========================
  // SAVE
  // =========================
  const handleSave = async () => {
    if (!selectedHousehold) {
      alert("Select household first");
      return;
    }

    if (!formData.city || !formData.number_of_rooms) {
      alert("City and Rooms are required");
      return;
    }

    setSaving(true);

    try {
      // Household Name speichern
      if (formData.household_name) {
        await updateHouseholdName(selectedHousehold, formData.household_name);
        if (refreshHouseholds) {
          await refreshHouseholds();
        }
      }

      // Form DATA
      const form = buildFormData(formData);
      const result = await saveHomeProfile(form, selectedHousehold);

      const updatedData = {
        ...formData,
        house_image: null,
        house_image_url: result?.house_image_url || preview,
      };

      setFormData(updatedData);
      setOriginalData(updatedData);
      setPreview(updatedData.house_image_url);

      alert("Profile saved!");
    } catch (err) {
      console.error("Save error:", err.response?.data || err);
      alert("Save failed");
    }

    setSaving(false);
  };

  if (!selectedHousehold) return <div>Select household</div>;
  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <div className="form-grid">
        {/* HOUSE NAME */}
        <label>House Name:</label>
        <input
          type="text"
          value={formData.household_name}
          onChange={(e) =>
            setFormData({
              ...formData,
              household_name: e.target.value,
            })
          }
        />

        {/* PROPERTY */}
        <label>Property Type:</label>
        <select
          value={formData.property_type}
          onChange={(e) =>
            setFormData({ ...formData, property_type: e.target.value })
          }
        >
          <option value="rent">Rent</option>
          <option value="owner">Owner</option>
        </select>

        {/* ROOMS */}
        <label>Rooms:</label>
        <input
          type="number"
          value={formData.number_of_rooms}
          onChange={(e) =>
            setFormData({
              ...formData,
              number_of_rooms: e.target.value,
            })
          }
        />

        {/* YEAR BUILT */}
        <label>Year Built:</label>
        <input
          type="number"
          value={formData.year_built}
          onChange={(e) =>
            setFormData({ ...formData, year_built: e.target.value })
          }
        />

        {/* CITY */}
        <label>City:</label>
        <input
          value={formData.city}
          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
        />

        {/* BUILDING */}
        <label>Building Type:</label>
        <select
          value={formData.building_type}
          onChange={(e) =>
            setFormData({
              ...formData,
              building_type: e.target.value,
            })
          }
        >
          <option value="">Select</option>
          <option value="brick">Brick</option>
          <option value="wood">Wood</option>
          <option value="concrete">Concrete</option>
          <option value="mixed">Mixed</option>
        </select>

        {/* HEATING */}
        <label>Heating Type:</label>
        <select
          value={formData.heating_type}
          onChange={(e) =>
            setFormData({
              ...formData,
              heating_type: e.target.value,
            })
          }
        >
          <option value="">Select</option>
          <option value="gas">Gas</option>
          <option value="oil">Oil</option>
          <option value="electric">Electric</option>
          <option value="heat_pump">Heat Pump</option>
          <option value="wood">Wood</option>
        </select>

        {/* YEAR BUILT */}
        <label>Year Built Heating installation year:</label>
        <input
          type="number"
          value={formData.heating_installation_year}
          onChange={(e) =>
            setFormData({
              ...formData,
              heating_installation_year: e.target.value,
            })
          }
        />

        {/* FLOOR */}
        <label>Floor Heating:</label>
        <input
          type="checkbox"
          checked={formData.floor_heating}
          onChange={(e) =>
            setFormData({
              ...formData,
              floor_heating: e.target.checked,
            })
          }
        />

        {/* SOLAR */}
        <label>Solar Panels:</label>
        <input
          type="checkbox"
          checked={formData.solar_panels}
          onChange={(e) =>
            setFormData({
              ...formData,
              solar_panels: e.target.checked,
            })
          }
        />

        {/* SOLAR YEAR */}
        <label>Solar Installation Year:</label>
        <input
          type="number"
          value={formData.solar_installation_year}
          onChange={(e) =>
            setFormData({
              ...formData,
              solar_installation_year: e.target.value,
            })
          }
        />

        {/* IMAGE */}
        <label>Image:</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files[0];

            if (!file) return;

            setFormData({
              ...formData,
              house_image: file,
            });
            setPreview(URL.createObjectURL(file));
          }}
        />
        {/* PREVIEW */}
        <div className="image-preview-container">
          {preview ? (
            <img src={preview} alt="House" />
          ) : (
            <div className="placeholder">No Image</div>
          )}
        </div>
      </div>

      <div className="form-actions">
        <div className="left-actions">
          {isOwner ? (
            <button className="delete-btn" onClick={handleDelete}>
              Delete
            </button>
          ) : (
            <div className="delete-placeholder" />
          )}
        </div>

        <div className="right-actions">
          <button
            className="cancel-btn"
            onClick={handleCancel}
            disabled={!isDirty}
          >
            Cancel
          </button>
          <button
            className="confirm-btn"
            onClick={handleSave}
            disabled={!isDirty || saving}
          >
            {saving ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}
