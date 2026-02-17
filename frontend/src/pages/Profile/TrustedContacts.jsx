import React, { useEffect, useState } from "react";
import { getTrustedContacts, addTrustedContact, removeTrustedContact } from "../../services/trustedContactsService";

function TrustedContacts() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [layer, setLayer] = useState(1);

  const fetchContacts = async () => {
    setLoading(true);
    try {
      const res = await getTrustedContacts();
      setContacts(res.contacts);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const handleAdd = async () => {
    if (!name || !phone) return alert("Please fill name and phone");
    try {
      await addTrustedContact({ name, phone, layer });
      setName("");
      setPhone("");
      setLayer(1);
      fetchContacts();
    } catch (err) {
      console.error(err);
      alert("Failed to add contact");
    }
  };

  const handleRemove = async (id) => {
    if (!window.confirm("Are you sure you want to remove this contact?")) return;
    try {
      await removeTrustedContact(id);
      fetchContacts();
    } catch (err) {
      console.error(err);
      alert("Failed to remove contact");
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h2 className="text-lg font-semibold text-purple-600 mb-4">Trusted Contacts</h2>

      {/* Add Contact Form */}
      <div className="mb-4">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          className="border rounded p-2 mr-2"
        />
        <input
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Phone"
          className="border rounded p-2 mr-2"
        />
        <select value={layer} onChange={(e) => setLayer(parseInt(e.target.value))} className="border rounded p-2 mr-2">
          <option value={1}>Primary</option>
          <option value={2}>Secondary</option>
          <option value={3}>Tertiary</option>
        </select>
        <button onClick={handleAdd} className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600">
          Add
        </button>
      </div>

      {/* Contacts List */}
      {loading ? (
        <div className="text-gray-500">Loading contacts...</div>
      ) : contacts.length === 0 ? (
        <div className="text-gray-500">No trusted contacts added yet.</div>
      ) : (
        <ul className="text-gray-700">
          {contacts.map((c) => (
            <li key={c.id} className="flex justify-between items-center mb-2 border-b py-1">
              <span>{c.name} ({c.phone}) - Layer {c.layer}</span>
              <button onClick={() => handleRemove(c.id)} className="text-red-500 hover:underline">
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TrustedContacts;