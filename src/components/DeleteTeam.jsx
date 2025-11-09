import axios from "axios";
import React, { useState } from "react";
import { BASE_URL } from "../BASE_URL";
import { Dialog, Pane } from "evergreen-ui";

const DeleteTeam = ({ userId }) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const token = localStorage.getItem("token");
  const [isShown, setIsShown] = useState(false);

  const deleteTeam = async () => {
    setIsLoading(true);
    try {
      const response = await axios.delete(`${BASE_URL}/api/users/${userId}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      setData(response.data);
      window.location.reload();
    } catch (error) {
      setError(error.response?.data?.message || "Failed to delete team");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <Pane>
        <Dialog
          isShown={isShown}
          title="Delete Team"
          intent="danger"
          isConfirmLoading={isLoading}
          onCloseComplete={() => setIsShown(false)}
          confirmLabel="Delete"
          cancelLabel="Cancel"
          onConfirm={deleteTeam}
        >
          <p className="text-gray-700 text-sm leading-relaxed">
            Are you sure you want to permanently delete this team? <br />
            This action <span className="text-red-600 font-semibold">cannot be undone.</span>
          </p>
        </Dialog>

        <button
          onClick={() => setIsShown(true)}
          className="bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 
                     rounded-md text-sm font-medium shadow-md hover:shadow-lg 
                     focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-200"
        >
          Delete
        </button>
      </Pane>

      {data?.message && (
        <p className="text-green-500 font-medium text-xs mt-2">{data.message}</p>
      )}
      {error && <p className="text-red-400 font-medium text-xs mt-1">{error}</p>}
    </div>
  );
};

export default DeleteTeam;
