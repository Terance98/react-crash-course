import axios from "axios";

/**
 * This class abstract the cancellable request logic for axios
 * This class can further be enhanced to support POST,PUT,DELETE API calls as well
 * It can also be modified to support access token and headers setup
 * It can also support optional timeout parameter to send timeout errors. This too can be different for GET,POST,DELETE etc.
 * This wrapper class can be used across the entire codebase to handle API calls
 */
export class AxiosCancelableRequest {
  static cancellationErrorMessage = "Request canceled by the user!";
  constructor() {
    this.cancelTokenSource = axios.CancelToken.source();
  }

  async makeRequest(apiUrl) {
    try {
      const response = await axios.get(apiUrl, {
        cancelToken: this.cancelTokenSource.token,
      });
      console.log("Request Success: API Response:", response.data);
      return response.data;
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log("Request Canceled:", error.message);
      } else {
        console.error("Request Failed: Error:", error.message);
      }
      throw error; // Re-throw the error to allow handling it externally if needed
    }
  }

  cancelRequest() {
    this.cancelTokenSource.cancel(
      AxiosCancelableRequest.cancellationErrorMessage
    );
  }
}
