import axios from "axios";
import { courses } from "../Database.js";

// Define API endpoint
// Try using environment variable, fallback to default if not found
let REMOTE_SERVER = "http://kambaz-node-server-app-zi9z.onrender.com";
try {
  // Cannot directly use import.meta.env in Node.js environment
  if (process.env.VITE_REMOTE_SERVER) {
    REMOTE_SERVER = process.env.VITE_REMOTE_SERVER;
  }
} catch (error) {
  console.log("Environment variable VITE_REMOTE_SERVER not found. Using default value.");
}

const COURSES_API = `${REMOTE_SERVER}/api/courses`;

/**
 * Imports course data into the backend database
 */
async function importCoursesToBackend() {
  console.log("Starting course data import to backend...");
  console.log(`Using API endpoint: ${COURSES_API}`);
  console.log(`Preparing to import ${courses.length} courses`);

  // Create axios instance
  const axiosInstance = axios.create({
    withCredentials: true,
    headers: {
      "Content-Type": "application/json"
    }
  });

  let successCount = 0;
  let errorCount = 0;

  // Import each course one by one
  for (const course of courses) {
    try {
      // Check if course already exists (by course ID)
      const checkResponse = await axiosInstance.get(`${COURSES_API}/${course._id}`);
      
      if (checkResponse.data && checkResponse.data._id) {
        console.log(`Course "${course.name}" (${course._id}) already exists. Skipping.`);
        continue;
      }
    } catch (error) {
      // Course does not exist, proceed to import
      if (error.response && error.response.status === 404) {
        console.log(`Course "${course.name}" (${course._id}) not found. Proceeding to import.`);
      } else {
        console.error(`Error checking course "${course.name}":`, error.message);
      }
    }

    // Import course
    try {
      const response = await axiosInstance.post(COURSES_API, course);
      console.log(`Successfully imported course: "${course.name}" (${course._id})`);
      successCount++;
    } catch (error) {
      console.error(`Failed to import course "${course.name}":`, error.message);
      errorCount++;
    }
  }

  console.log("Import process complete");
  console.log(`Successfully imported: ${successCount} courses`);
  console.log(`Failed to import: ${errorCount} courses`);
}

// If this script is run directly, execute the import process
if (require.main === module) {
  importCoursesToBackend()
    .then(() => console.log("Import script finished"))
    .catch(error => console.error("Error occurred during import process:", error));
} else {
  // If imported as a module, export the function
  module.exports = { importCoursesToBackend };
}
