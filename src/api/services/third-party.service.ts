import axios from "axios";
import { getEnv } from "../utils/env.util";

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

export default { fetchGithubContributions };
