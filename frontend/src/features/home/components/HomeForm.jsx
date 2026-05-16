import ImageUpload from "./ImageUpload";

export default function HomeForm({
  formData,
  setFormData,
  preview,
  setPreview,
}) {
  // =========================
  // HANDLE CHANGE
  // =========================

  const handleChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  // =========================
  // STYLES
  // =========================

  const inputClass = `
    w-full
    border
    border-gray-300
    dark:border-gray-700
    bg-white
    dark:bg-gray-800
    text-gray-800
    dark:text-white
    rounded-lg
    px-3
    py-2
    text-sm
    focus:ring-2
    focus:ring-blue-500
    focus:outline-none
    transition
  `;

  const labelClass = `
    text-sm
    font-medium
    text-gray-600
    dark:text-gray-300
    mb-1
    block
  `;

  return (
    <div
      className="
        grid
        grid-cols-1
        md:grid-cols-2
        gap-5
      "
    >
      {/* HOUSE NAME */}

      <div className="md:col-span-2">
        <label className={labelClass}>House Name</label>

        <input
          className={inputClass}
          value={formData.household_name}
          onChange={(e) => handleChange("household_name", e.target.value)}
        />
      </div>

      {/* PROPERTY TYPE */}

      <div>
        <label className={labelClass}>Property Type</label>

        <select
          className={inputClass}
          value={formData.property_type}
          onChange={(e) => handleChange("property_type", e.target.value)}
        >
          <option value="rent">Rent</option>

          <option value="owner">Owner</option>
        </select>
      </div>

      {/* ROOMS */}

      <div>
        <label className={labelClass}>Rooms</label>

        <input
          type="number"
          className={inputClass}
          value={formData.number_of_rooms}
          onChange={(e) =>
            handleChange("number_of_rooms", e.target.valueAsNumber)
          }
        />
      </div>

      {/* CITY */}

      <div>
        <label className={labelClass}>City</label>

        <input
          className={inputClass}
          value={formData.city}
          onChange={(e) => handleChange("city", e.target.value)}
        />
      </div>

      {/* YEAR BUILT */}

      <div>
        <label className={labelClass}>Year Built</label>

        <input
          type="number"
          className={inputClass}
          value={formData.year_built}
          onChange={(e) => handleChange("year_built", e.target.valueAsNumber)}
        />
      </div>

      {/* BUILDING TYPE */}

      <div>
        <label className={labelClass}>Building Type</label>

        <select
          className={inputClass}
          value={formData.building_type}
          onChange={(e) => handleChange("building_type", e.target.value)}
        >
          <option value="">Select</option>

          <option value="brick">Brick</option>

          <option value="wood">Wood</option>

          <option value="concrete">Concrete</option>

          <option value="mixed">Mixed</option>
        </select>
      </div>

      {/* HEATING TYPE */}

      <div>
        <label className={labelClass}>Heating Type</label>

        <select
          className={inputClass}
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
      </div>

      {/* HEATING INSTALL YEAR */}

      <div>
        <label className={labelClass}>Heating Install Year</label>

        <input
          type="number"
          className={inputClass}
          value={formData.heating_installation_year}
          onChange={(e) =>
            handleChange("heating_installation_year", e.target.valueAsNumber)
          }
        />
      </div>

      {/* FLOOR HEATING */}

      <div
        className="
          flex
          items-center
          gap-2
          mt-7
        "
      >
        <input
          type="checkbox"
          className="
            w-4
            h-4
            rounded
            border-gray-300
            dark:border-gray-600
            text-blue-500
            focus:ring-blue-500
            dark:bg-gray-800
          "
          checked={formData.floor_heating}
          onChange={(e) => handleChange("floor_heating", e.target.checked)}
        />

        <label
          className="
            text-sm
            text-gray-700
            dark:text-gray-300
          "
        >
          Floor Heating
        </label>
      </div>

      {/* SOLAR PANELS */}

      <div
        className="
          flex
          items-center
          gap-2
          mt-7
        "
      >
        <input
          type="checkbox"
          className="
            w-4
            h-4
            rounded
            border-gray-300
            dark:border-gray-600
            text-blue-500
            focus:ring-blue-500
            dark:bg-gray-800
          "
          checked={formData.solar_panels}
          onChange={(e) => handleChange("solar_panels", e.target.checked)}
        />

        <label
          className="
            text-sm
            text-gray-700
            dark:text-gray-300
          "
        >
          Solar Panels
        </label>
      </div>

      {/* SOLAR INSTALL YEAR */}

      <div className="md:col-span-2">
        <label className={labelClass}>Solar Install Year</label>

        <input
          type="number"
          className={inputClass}
          value={formData.solar_installation_year}
          onChange={(e) =>
            handleChange("solar_installation_year", e.target.valueAsNumber)
          }
        />
      </div>

      {/* IMAGE */}

      <div className="md:col-span-2">
        <ImageUpload
          preview={preview}
          setPreview={setPreview}
          formData={formData}
          setFormData={setFormData}
        />
      </div>
    </div>
  );
}
