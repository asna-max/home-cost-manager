import ImageUpload from "./ImageUpload";

export default function HomeForm({
  formData,
  setFormData,
  preview,
  setPreview,
}) {
  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  return (
    <div className="form-grid">
      <label>House Name:</label>
      <input
        value={formData.household_name}
        onChange={(e) => handleChange("household_name", e.target.value)}
      />

      <label>Property Type:</label>
      <select
        value={formData.property_type}
        onChange={(e) => handleChange("property_type", e.target.value)}
      >
        <option value="rent">Rent</option>
        <option value="owner">Owner</option>
      </select>

      <label>Rooms:</label>
      <input
        type="number"
        value={formData.number_of_rooms}
        onChange={(e) => handleChange("number_of_rooms", e.target.value)}
      />

      <label>Year Built:</label>
      <input
        type="number"
        value={formData.year_built}
        onChange={(e) => handleChange("year_built", e.target.value)}
      />

      <label>City:</label>
      <input
        value={formData.city}
        onChange={(e) => handleChange("city", e.target.value)}
      />

      <label>Building Type:</label>
      <select
        value={formData.building_type}
        onChange={(e) => handleChange("building_type", e.target.value)}
      >
        <option value="">Select</option>
        <option value="brick">Brick</option>
        <option value="wood">Wood</option>
        <option value="concrete">Concrete</option>
        <option value="mixed">Mixed</option>
      </select>

      <label>Heating Type:</label>
      <select
        value={formData.heating_type}
        onChange={(e) => handleChange("heating_type", e.target.value)}
      >
        <option value="">Select</option>
        <option value="gas">Gas</option>
        <option value="oil">Oil</option>
        <option value="electric">Electric</option>
        <option value="heat_pump">Heat Pump</option>
        <option value="wood">Wood</option>
      </select>

      <label>Heating Install Year:</label>
      <input
        type="number"
        value={formData.heating_installation_year}
        onChange={(e) =>
          handleChange("heating_installation_year", e.target.value)
        }
      />

      <label>Floor Heating:</label>
      <input
        type="checkbox"
        checked={formData.floor_heating}
        onChange={(e) => handleChange("floor_heating", e.target.checked)}
      />

      <label>Solar Panels:</label>
      <input
        type="checkbox"
        checked={formData.solar_panels}
        onChange={(e) => handleChange("solar_panels", e.target.checked)}
      />

      <label>Solar Year:</label>
      <input
        type="number"
        value={formData.solar_installation_year}
        onChange={(e) =>
          handleChange("solar_installation_year", e.target.value)
        }
      />

      <ImageUpload
        preview={preview}
        setPreview={setPreview}
        formData={formData}
        setFormData={setFormData}
      />
    </div>
  );
}