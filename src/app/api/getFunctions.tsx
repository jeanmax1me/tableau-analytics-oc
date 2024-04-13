import axios from "axios";

// Interface for User Data (optional, for type safety)
interface UserData {
  // Define user data properties (e.g., name, age, etc.)
}

export async function getUserInfo(userId: number): Promise<UserData | null> { // Use Promise for potential errors
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


