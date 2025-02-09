import cloudinary from "@/config/cloudinary.config";
import axios from "axios";
import { getEnv } from "../utils/env.util";
import { UploadApiResponse } from "cloudinary";

/**
 * Fetches the contribution calendar from GitHub for the given username
 * @param {string} username The GitHub username
 * @returns {Promise<{ totalContributions: number, weeks: { contributionDays: { date: string, contributionCount: number, color: string }[] }[] }>} The contribution calendar
 * @throws {Error} If there is an error fetching the contributions
 */
async function fetchGithubContributions(username: string) {
  const GITHUB_TOKEN = getEnv("GITHUB_PERSONAL_ACCESS_TOKEN");
  const GITHUB_GRAPHQL_URL = "https://api.github.com/graphql";

  const query = `
    query($username: String!) {
      user(login: $username) {
        contributionsCollection {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                date
                contributionCount
                color
              }
            }
          }
        }
      }
    }
  `;

  const variables = { username };

  try {
    const response = await axios.post(
      GITHUB_GRAPHQL_URL,
      { query, variables },
      { headers: { Authorization: `Bearer ${GITHUB_TOKEN}` } }
    );

    const contributions =
      response.data.data.user.contributionsCollection.contributionCalendar;

    return contributions;
  } catch (error) {
    console.error("Error fetching GitHub contributions:", error);
    throw error;
  }
}

/**
 * Uploads a file to Cloudinary and returns the result. If a file with the same
 * name already exists, it will be overwritten.
 * @param {any} file The file to upload
 * @param {string} folderPath The folder path to upload the file to
 * @returns {Promise<UploadApiResponse | undefined>} The result of the upload
 * @throws {Error} If there is an error uploading the file
 */
async function uploadFileToCloudinary(
  file: any,
  folderPath: string
): Promise<UploadApiResponse | undefined> {
  const fileName = file.originalname.split(".")[0]; // Get filename without extension
  const publicId = `profilepad_dev/${folderPath}/${fileName}`; // Unique Cloudinary ID

  // **Delete existing file with the same name (if it exists)**
  try {
    await cloudinary.uploader.destroy(publicId);
    console.log(`Deleted existing file: ${publicId}`);
  } catch (deleteError) {
    console.warn(`No existing file to delete: ${publicId}`);
  }

  try {
    // **Upload new file with the same public ID**
    return await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          public_id: publicId, // Use the same ID so it overwrites if needed
          folder: `profilepad_dev/${folderPath}`,
          overwrite: true, // Ensure it overwrites
        },
        (error, result) => {
          if (error) {
            return reject(error);
          }
          resolve(result);
        }
      );

      uploadStream.write(file.buffer);
      uploadStream.end();
    });
  } catch (error) {
    console.error("Error uploading file to Cloudinary:", error);
    throw error;
  }
}

export default { fetchGithubContributions, uploadFileToCloudinary };
