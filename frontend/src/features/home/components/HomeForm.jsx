import ImageUpload from "./ImageUpload";
import { validateRooms, validateYear } from "../utils/homeValidation";

export default function HomeForm({
  formData,
  setFormData,
  preview,
  setPreview,
  errors,
  setErrors,
  isOwner,
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
    <>
      {Object.keys(errors).some((key) => errors[key]) && (
        <div
          className="
      md:col-span-2
      rounded-lg
      border
      border-red-300
      bg-red-50
      px-4
      py-3
      text-red-700
    "
        >
          <p className="font-medium mb-1">Please fix the following errors:</p>

          <ul className="list-disc ml-5 text-sm">
            {Object.entries(errors).map(
              ([key, error]) => error && <li key={key}>{error}</li>,
            )}
          </ul>
        </div>
      )}

      {!isOwner && (
        <div
          className="
      md:col-span-2
      rounded-lg
      border
      border-yellow-300
      bg-yellow-50
      px-4
      py-3
      text-yellow-800
    "
        >
          You are a household member. Only the household owner can edit the home
          profile.
        </div>
      )}
      <fieldset disabled={!isOwner} className={!isOwner ? "opacity-75" : ""}>
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
              maxLength={40}
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
              step="0.5"
              min="0.5"
              max="50"
              value={formData.number_of_rooms}
              onChange={(e) => {
                const value =
                  e.target.value === "" ? "" : e.target.valueAsNumber;
                handleChange("number_of_rooms", value);

                setErrors({
                  ...errors,
                  rooms: validateRooms(value),
                });
              }}
              className={` ${inputClass} ${errors.rooms ? "border-red-500" : ""}`}
            />
          </div>

          {/* CITY */}
          <div>
            <label className={labelClass}>City</label>

            <input
              className={inputClass}
              maxLength={40}
              value={formData.city}
              onChange={(e) => handleChange("city", e.target.value)}
            />
          </div>

          {/* YEAR BUILT */}

          <div>
            <label className={labelClass}>Year Built</label>

            <input
              type="number"
              min="1800"
              max={new Date().getFullYear()}
              className={`${inputClass} ${errors.yearBuilt ? "border-red-500" : ""}`}
              value={formData.year_built}
              onChange={(e) => {
                const value = e.target.valueAsNumber;

                handleChange("year_built", value);

                setErrors({
                  ...errors,
                  yearBuilt: validateYear(value, "Year Built"),
                });
              }}
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
              min="1800"
              max={new Date().getFullYear()}
              className={`${inputClass} ${errors.heatingYear ? "border-red-500" : ""}`}
              value={formData.heating_installation_year}
              onChange={(e) => {
                const value = e.target.valueAsNumber;

                handleChange("heating_installation_year", value);

                setErrors({
                  ...errors,
                  heatingYear: validateYear(value, "Heating Install Year"),
                });
              }}
            />
          </div>

          {/* FLOOR HEATING */}

          <div className="flex items-center gap-2 mt-7">
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

            <label className="text-sm text-gray-700 dark:text-gray-300">
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
              min="1800"
              max={new Date().getFullYear()}
              className={`${inputClass} ${errors.solarYear ? "border-red-500" : ""}`}
              value={formData.solar_installation_year}
              onChange={(e) => {
                const value = e.target.valueAsNumber;

                handleChange("solar_installation_year", value);

                setErrors({
                  ...errors,
                  solarYear: validateYear(value, "Solar Install Year"),
                });
              }}
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
      </fieldset>
    </>
  );
}
