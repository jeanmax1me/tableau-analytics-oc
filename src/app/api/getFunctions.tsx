import axios from "axios";

/**
 * Fetches user information from an API endpoint.
 * 
 * @param {number} userId - The ID of the user to fetch information for.
 * @returns {Promise<any>} - A promise that resolves to the user information object on success, or null on error.
 */
export async function getUserInfo(userId: number): Promise<any> {
  try {
    const response = await axios.get(`http://localhost:3000/user/${userId}`);
    const userData = response.data;
    return userData;
  } catch (error) {
    console.error("Error fetching user information:", error);
    return null;
  }
}

/**
 * Fetches user activity data from an API endpoint.
 * 
 * @param {number} userId - The ID of the user to fetch activity data for.
 * @returns {Promise<any>} - A promise that resolves to the user activity data object on success, or null on error.
 */
export async function getUserActivity(userId: number): Promise<any> {
  try {
    const response = await axios.get(`http://localhost:3000/user/${userId}/activity`);
    const activityData = response.data;
    return activityData;
  } catch (error) {
    console.error("Error fetching user activity:", error);
    return null;
  }
}

/**
 * Fetches user average sessions data from an API endpoint.
 * 
 * @param {number} userId - The ID of the user to fetch average sessions data for.
 * @returns {Promise<any>} - A promise that resolves to the user average sessions data object on success, or null on error.
 */
export async function getUserAverageSessions(userId: number): Promise<any> {
  try {
    const response = await axios.get(`http://localhost:3000/user/${userId}/average-sessions`);
    const averageSessionsData = response.data;
    return averageSessionsData;
  } catch (error) {
    console.error("Error fetching user average sessions:", error);
    return null;
  }
}

/**
 * Fetches user performance data from an API endpoint.
 * 
 * @param {number} userId - The ID of the user to fetch performance data for.
 * @returns {Promise<any>} - A promise that resolves to the user performance data object on success, or null on error.
 */
export async function getUserPerformance(userId: number): Promise<any> {
  try {
    const response = await axios.get(`http://localhost:3000/user/${userId}/performance`);
    const performanceData = response.data;
    return performanceData;
  } catch (error) {
    console.error("Error fetching user performance:", error);
    return null;
  }
}

/**
 * Fetches the user's glucides count (carbohydrates) from an API endpoint.
 * 
 * @param {number} userId - The ID of the user to fetch glucides count data for.
 * @returns {Promise<number>} - A promise that resolves to the user's glucides count on success, or throws an error.
 */
export const fetchGlucidesCount = async (userId: number): Promise<number> => {
  try {
    const response = await fetch(`http://localhost:3000/user/${userId}`);
    const data = await response.json();
    if (response.ok) {
      return data.data.keyData.carbohydrateCount;
    } else {
      throw new Error("Error fetching glucide count data");
    }
  } catch (error) {
    throw new Error("Error fetching glucide count data:" + error);
  }
};

/**
 * Fetches the user's proteines count (proteins) from an API endpoint.
 * 
 * @param {number} userId - The ID of the user to fetch proteines count data for.
 * @returns {Promise<number>} - A promise that resolves to the user's proteines count on success, or throws an error.
 */
export const fetchProteinesCount = async (userId: number): Promise<number> => {
  try {
    const response = await fetch(`http://localhost:3000/user/${userId}`);
    const data = await response.json();
    if (response.ok) {
      return data.data.keyData.proteinCount;
    } else {
      throw new Error("Error fetching proteine count data");
    }
  } catch (error) {
    throw new Error("Error fetching proteine count data:" + error);
  }
};

/**
 * Fetches the user's calories count from an API endpoint.
 * 
 * @param {number} userId - The ID of the user to fetch calories count data for.
 * @returns {Promise<number>} - A promise that resolves to the user's calories count on success, or throws an error.
 */
export const fetchCaloriesCount = async (userId: number): Promise<number> => {
  try {
    const response = await fetch(`http://localhost:3000/user/${userId}`);
    const data = await response.json();
    if (response.ok) {
      return data.data.keyData.calorieCount;
    } else {
      throw new Error("Error fetching calorie count data");
    }
  } catch (error) {
    throw new Error("Error fetching calorie count data:" + error);
  }
};

/**
 * Fetches the user's lipides count (fats) from an API endpoint.
 * 
 * @param {number} userId - The ID of the user to fetch lipides count data for.
 * @returns {Promise<number>} - A promise that resolves to the user's lipides count on success, or throws an error.
 */
export const fetchLipidesCount = async (userId: number): Promise<number> => {
  try {
    const response = await fetch(`http://localhost:3000/user/${userId}`);
    const data = await response.json();
    if (response.ok) {
      return data.data.keyData.lipidCount;
    } else {
      throw new Error("Error fetching lipide count data");
    }
  } catch (error) {
    throw new Error("Error fetching lipide count data:" + error);
  }
};
