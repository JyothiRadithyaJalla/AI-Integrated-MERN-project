import axios from "axios";
import { serverUrl } from "../App";
import { setUserData } from "../redux/userSlice";


const API = import.meta.env.VITE_BACKEND_URL;

// Get logged-in user
export const getCurrentUser = async (dispatch) => {
  try {
    const result = await axios.get(`${serverUrl}/api/user/currentuser`, {
      withCredentials: true
    });

    dispatch(setUserData(result.data));

  } catch (error) {
    console.log(error);
  }
};


// Generate notes
export const generateNotes = async (data) => {
  try {
    const res = await axios.post(
      `${API}/api/notes/generate-notes`,
      data,
      {
        withCredentials: true
      }
    );

    return res.data;

  } catch (error) {
    console.error("Generate notes error:", error.response?.data || error.message);
    throw error;
  }
};



// Download PDF
export const downloadPdf = async (result) => {
  try {
    const response = await axios.post(
      `${serverUrl}/api/pdf/generate-pdf`,
      { result },
      {
        responseType: "blob",
        withCredentials: true
      }
    );

    const blob = new Blob([response.data], {
      type: "application/pdf"
    });

    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "ExamNotesAI.pdf";
    link.click();

    window.URL.revokeObjectURL(url);

  } catch (error) {
    throw new Error("PDF download failed");
  }
};