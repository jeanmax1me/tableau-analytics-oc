/**
 * @interface Session
 * @description Interface representing a session object used for data formatting.
 */
interface Session {
    /**
     * @property data - An object containing an array of session objects with value and kind properties.
     */
    data: {
      data: { value: number; kind: number }[]; // Array of session objects
    };
  }
  
  export class DataFormatter {
    /**
     * @method formatActivityData
     * @description Formats activity data from a session object.
     * @param {Session} session - The session object containing activity data.
     * @returns {object} - A formatted object with day, weight (Poids in French), and calories.
     */
    static formatActivityData(session: { day: string; kilogram: number; calories: number }): { day: string; Poids: number; Calories: number } {
      return {
        day: this.formatDateFromSession(session.day),
        Poids: session.kilogram,
        Calories: session.calories,
      };
    }
  
    /**
     * @method formatDateFromSession
     * @description Extracts the date portion from a session object's day string assuming YYYY-MM-DD format.
     * @param {string} dayString - The day string in YYYY-MM-DD format.
     * @returns {string} - The extracted date portion.
     */
    static formatDateFromSession(dayString: string): string {
      return dayString.substr(9); // Extract date portion assuming YYYY-MM-DD format
    }
  
    /**
     * @method formatCalorieCount
     * @description Formats a calorie count value for display.
     * @param {number} count - The calorie count value.
     * @returns {string} - The formatted calorie count string.
     */
    static formatCalorieCount(count: number): string {
      if (count.toString().length < 4) return count.toString();
  
      return count.toLocaleString("en-US", { minimumFractionDigits: 0 });
    }
  
    /**
     * @method formatPerformanceData
     * @description Formats performance data from a session object.
     * @param {Session} session - The session object containing performance data.
     * @returns {object[]} - An array of formatted objects with value and kind (translated to French).
     */
    static formatPerformanceData(session: Session): { value: number; kind: string }[] {
      const kindMap: { [key: number]: string } = {
        1: "Cardio",
        2: "Energie",
        3: "Endurance",
        4: "Force",
        5: "Vitesse",
        6: "Intensité",
      };
  
      const desiredOrder: string[] = ['Intensité', 'Vitesse', 'Force', 'Endurance', 'Energie', 'Cardio'];
  
      const newData = session.data.data.map(({ value, kind }) => ({
        value,
        kind: kindMap[kind],
      }));
  
      return desiredOrder.map((kind) => newData.filter((obj) => obj.kind === kind)[0]);
    }
  
    /**
     * @method formatKpiData
     * @description Formats KPI (Key Performance Indicator) data from user data.
     * @param {any} userData - The user data object.
     * @returns {object} - An object containing formatted score and remaining values.
     */
    static formatKpiData(userData: any): { score: number; remaining: number } {
      const scores = userData?.data?.todayScore || userData?.data?.score;
      const score = scores * 100; // Format score
      const remaining = 100 - score;
      return { score, remaining };
    }
  }
  