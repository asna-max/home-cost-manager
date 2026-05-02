import { useState, useEffect } from "react";
import { getHomeProfile, saveHomeProfile } from "../services/homeService";
import { updateHouseholdName } from "../services/householdService";

export default function HomeProfile({ selectedHousehold, refreshHouseholds }) {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

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

        setFormData({
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
        });
      } catch (err) {
        console.error("Load error:", err);
      }

      setLoading(false);
    };

    fetchProfile();
  }, [selectedHousehold]);

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
        await refreshHouseholds();
      }

      // Profile sauber bauen (OHNE household_name)
      const profileData = {
        property_type: formData.property_type,
        number_of_rooms: parseInt(formData.number_of_rooms),
        city: formData.city,
        year_built: formData.year_built || null,
        building_type: formData.building_type,
        heating_type: formData.heating_type,
        heating_installation_year: formData.heating_installation_year || null,
        floor_heating: formData.floor_heating,
        solar_panels: formData.solar_panels,
        solar_installation_year: formData.solar_installation_year || null,
        house_image: formData.house_image,
      };

      await saveHomeProfile(profileData, selectedHousehold);

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
          onChange={(e) =>
            setFormData({
              ...formData,
              house_image: e.target.files[0],
            })
          }
        />
      </div>

      <div className="form-actions">
        <button className="cancel-btn">Cancel</button>

        <button className="confirm-btn" onClick={handleSave} disabled={saving}>
          {saving ? "Saving..." : "Save"}
        </button>
      </div>
    </div>
  );
}
