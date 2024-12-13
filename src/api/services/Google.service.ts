import axios from "axios";

class GoogleService {
  static async getUserByAccessToken(accessToken: string) {
    try {
      const response = await axios.get(
        "https://www.googleapis.com/oauth2/v2/userinfo",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const userData = response.data;

      if (userData.picture) {
        userData.picture = this.getHighResProfileImage(userData.picture);
      }

      return userData;
    } catch (error) {
      console.error("Error fetching user data:", error);
      throw error;
    }
  }

  static getHighResProfileImage(pictureUrl: string): string {
    return pictureUrl.replace(/s\d+-c/, "s400-c");
  }
}

export default GoogleService;
