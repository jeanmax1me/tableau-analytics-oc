import axios from "axios";


export async function getUserInfo(userId: number): Promise<any> { // Use Promise for potential errors
  try {
    const response = await axios.get(`http://localhost:3000/user/${userId}`);
    const userData = response.data;
    return userData; // Return user data or null for errors
  } catch (error) {
    console.error("Error fetching user information:", error);
    return null; // Indicate error by returning null
  }
}

export async function getUserActivity(userId: number): Promise<any> { // Replace `any` with specific type if known
  try {
    const response = await axios.get(`http://localhost:3000/user/${userId}/activity`);
    const activityData = response.data;
    return activityData;
  } catch (error) {
    console.error("Error fetching user activity:", error);
    return null; // Indicate error by returning null
  }
}

export async function getUserAverageSessions(userId: number): Promise<any> {
  try {
    const response = await axios.get(`http://localhost:3000/user/${userId}/average-sessions`);
    const averageSessionsData = response.data;
    return averageSessionsData; // Return average sessions data or null for errors
  } catch (error) {
    console.error("Error fetching user average sessions:", error);
    return null; // Indicate error by returning null
  }
}

export async function getUserPerformance(userId: number): Promise<any> {
  try {
    const response = await axios.get(`http://localhost:3000/user/${userId}/performance`);
    const performanceData = response.data;
    return performanceData; // Return performance data or null for errors
  } catch (error) {
    console.error("Error fetching user performance:", error);
    return null; // Indicate error by returning null
  }
}

