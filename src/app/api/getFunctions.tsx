import axios from "axios";


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