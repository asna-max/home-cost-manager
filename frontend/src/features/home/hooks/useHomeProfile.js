import { useState, useEffect } from "react";
import { getHomeProfile, saveHomeProfile } from "../../../services/homeService";
import {
  updateHouseholdName,
  deleteHousehold,
  getHouseholds,
} from "../../../services/householdService";
import { buildFormData } from "../../../services/api/formUtils";
import { validateRooms, validateYear } from "../utils/homeValidation";

export function useHomeProfile(
  selectedHousehold,
  refreshHouseholds,
  setSelectedHousehold,
  navigate,
) {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [preview, setPreview] = useState(null);
  const [originalData, setOriginalData] = useState(null);
  const [errors, setErrors] = useState({
    rooms: "",
    yearBuilt: "",
    heatingYear: "",
    solarYear: "",
  });

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
    house_image_url: null,
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

        const mapped = {
          household_name: data?.household_name || "",
          property_type: data?.property_type || "rent",
          number_of_rooms: data?.number_of_rooms || "",
          city: data?.city || "",
          year_built: data?.year_built || "",
          building_type: data?.building_type || "",
          heating_type: data?.heating_type || "",
          heating_installation_year: data?.heating_installation_year || "",
          floor_heating: data?.floor_heating || false,
          solar_panels: data?.solar_panels || false,
          solar_installation_year: data?.solar_installation_year || "",
          house_image: null,
          house_image_url: data?.house_image_url || null,
        };

        setFormData(mapped);
        setOriginalData(mapped);
        setPreview(mapped.house_image_url);
        setErrors({
          rooms: "",
          yearBuilt: "",
          heatingYear: "",
          solarYear: "",
        });
      } catch (err) {
        console.error("Load profile error:", err);
      }

      setLoading(false);
    };

    fetchProfile();
  }, [selectedHousehold]);

  // =========================
  // CHANGE DETECTION
  // =========================
  const isDirty =
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
  const cancel = () => {
    if (!originalData) return;

    setFormData(originalData);
    setPreview(originalData.house_image_url || null);
    setErrors({
      rooms: "",
      yearBuilt: "",
      heatingYear: "",
      solarYear: "",
    });
  };

  // =========================
  // SAVE
  // =========================
  const save = async () => {
    if (!selectedHousehold) return;

    if (!formData.city || !formData.number_of_rooms) {
      alert("City and Rooms are required");
      return;
    }

    // =========================
    // VALIDATE ROOMS
    // =========================
    const newErrors = {};

    const roomError = validateRooms(formData.number_of_rooms);

    if (roomError) {
      newErrors.rooms = roomError;
    }

    // =========================
    // VALIDATE YEARS
    // =========================
    const yearBuiltError = validateYear(formData.year_built, "Year Built");

    if (yearBuiltError) {
      newErrors.yearBuilt = yearBuiltError;
    }

    const heatingYearError = validateYear(
      formData.heating_installation_year,
      "Heating Install Year",
    );

    if (heatingYearError) {
      newErrors.heatingYear = heatingYearError;
    }

    const solarYearError = validateYear(
      formData.solar_installation_year,
      "Solar Install Year",
    );

    if (solarYearError) {
      newErrors.solarYear = solarYearError;
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({
      rooms: "",
      yearBuilt: "",
      heatingYear: "",
      solarYear: "",
    });

    setSaving(true);

    try {
      // Household Name
      if (formData.household_name) {
        await updateHouseholdName(selectedHousehold, formData.household_name);

        if (refreshHouseholds) {
          await refreshHouseholds();
        }
      }

      // Build FormData
      const form = buildFormData(formData);

      const result = await saveHomeProfile(form, selectedHousehold);

      const updated = {
        ...formData,
        house_image: null,
        house_image_url: result?.house_image_url || preview,
      };

      setFormData(updated);
      setOriginalData(updated);
      setPreview(updated.house_image_url);

      alert("Profile saved!");
    } catch (err) {
      console.error("Save error:", err);
      alert("Save failed");
    }

    setSaving(false);
  };

  // =========================
  // DELETE HOUSEHOLD
  // =========================
  const remove = async () => {
    if (!selectedHousehold) return;

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this household?",
    );

    if (!confirmDelete) return;

    try {
      await deleteHousehold(selectedHousehold);
    } catch {
      // ignore if already deleted
    }

    const updated = await getHouseholds();

    if (refreshHouseholds) {
      await refreshHouseholds();
    }

    if (updated.length > 0) {
      setSelectedHousehold(updated[0].id);
    } else {
      setSelectedHousehold(null);
    }

    navigate("/dashboard");
  };

  // =========================
  // RETURN
  // =========================
  return {
    formData,
    setFormData,
    preview,
    setPreview,
    loading,
    saving,
    isDirty,
    cancel,
    save,
    remove,
    errors,
    setErrors,
  };
}
