// google-auth.controller.ts
import { googleAuthToken } from "@/services/google-auth.service"; // Adjust path as necessary
import { loginWithGoogle } from "@/utils/getUserToken";
import { Controller, Route, Tags, Get, Queries } from "tsoa";

@Route("google-auth/token")
@Tags("Google Auth")
export class googleAuthCallback extends Controller {
  private GoogleAuthToken: googleAuthToken;

  constructor() {
    super();
    this.GoogleAuthToken = new googleAuthToken();
  }

  @Get()
  async getTokenGoogle(@Queries() query: { code: string; state: string }) {
    try {
      const code = query.code;
      console.log("Received code:", code);

      const res = await this.GoogleAuthToken.getTokenFromCognito(code);
      return res;
    } catch (error) {}
  }
  @Get("link")
  async getLink() {
    try {
      return await loginWithGoogle();
    } catch (error) {}
  }
}
