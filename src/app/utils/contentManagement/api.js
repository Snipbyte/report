import axios from "axios";

/**
 * Create a new section.
 * @param {Object} data 
 * @returns {Promise<Object>} 
 */
export const createSection = async (data) => {
  try {
    const response = await axios.post("/api/admin/management/create", data);
    return response.data;
  } catch (error) {
    console.error("Error creating section:", error);
    throw error;
  }
};

/**
 * Update an existing section.
 * @param {Object} data
 * @returns {Promise<Object>}
 */
export const updateSection = async (data) => {
  try {
    const response = await axios.patch("/api/admin/management/edit", data);
    return response.data;
  } catch (error) {
    console.error("Error updating section:", error);
    throw error;
  }
};

/**
 * Fetch all sections for a specific page type.
 * @param {string} type - Page type to fetch sections for.
 * @returns {Promise<Object>} - Response containing sections.
 */
export const getSections = async (type) => {
  try {
    const response = await axios.post("/api/admin/management/get", { type });
    return response.data;
  } catch (error) {
    console.error("Error fetching sections:", error);
    throw error;
  }
};
