import React, { useState, useEffect } from "react";
import { getEvidence, uploadEvidence } from "../../services/legalService";

function EvidenceVault() {
  const [evidenceList, setEvidenceList] = useState([]);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvidence = async () => {
      try {
        const res = await getEvidence();
        setEvidenceList(res.evidences);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchEvidence();
  }, []);

  const handleUpload = async () => {
    if (!file) return;
    try {
      await uploadEvidence(file);
      alert("Evidence uploaded successfully!");
      setFile(null);
    } catch (err) {
      console.error(err);
      alert("Failed to upload evidence.");
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h2 className="text-lg font-semibold text-purple-600 mb-4">Evidence Vault</h2>

      <div className="mb-4">
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          className="border rounded p-2 w-full"
        />
        <button
          onClick={handleUpload}
          className="mt-2 bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
        >
          Upload
        </button>
      </div>

      {loading ? (
        <div className="text-gray-500">Loading evidence...</div>
      ) : (
        <ul className="list-disc list-inside text-gray-700">
          {evidenceList.map((e) => (
            <li key={e.id}>
              <a href={e.file_url} target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:underline">
                {e.filename}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default EvidenceVault;