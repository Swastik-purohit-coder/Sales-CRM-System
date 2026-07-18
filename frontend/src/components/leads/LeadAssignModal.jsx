import { useEffect, useState } from "react";
import userService from "../../services/userService";
import leadService from "../../services/leadService";

const LeadAssignModal = ({
    open,
    close,
    lead,
    refresh,
}) => {

    const [users, setUsers] = useState([]);
    const [assignedTo, setAssignedTo] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setError("");
        setAssignedTo(lead?.assignedTo?._id || lead?.assignedTo || "");
        loadUsers();
    }, [lead, open]);

    const loadUsers = async () => {
        try {
            const res = await userService.getUsers({ limit: 100 });
            const data = res.data?.data || res.data;
            const allUsers = data.users || data || [];
            // Only list active sales users for lead assignment
            const salesUsers = allUsers.filter(
                (u) => u.role?.toLowerCase() === "sales" && u.isActive
            );
            setUsers(salesUsers);
        } catch (err) {
            console.error("Failed to load users:", err);
        }
    };

    if (!open || !lead) return null;

    const submit = async () => {
        if (!assignedTo) {
            setError("Please select a sales executive.");
            return;
        }
        setLoading(true);
        setError("");

        try {
            await leadService.assignLead(lead._id, assignedTo);
            refresh();
            close();
        } catch (err) {
            console.error(err);
            const errMsg = err.response?.data?.message || err.response?.data?.errors?.[0]?.msg || "Failed to assign lead.";
            setError(errMsg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal">
                <h2>Assign Lead</h2>

                {error && <div className="error" style={{ marginBottom: "15px" }}>{error}</div>}

                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    <label style={{ fontSize: "14px", fontWeight: "600", color: "#374151" }}>
                        Sales Executive
                    </label>
                    <select
                        value={assignedTo}
                        onChange={(e) => setAssignedTo(e.target.value)}
                        style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #d1d5db" }}
                    >
                        <option value="">Select User</option>
                        {users.map((user) => (
                            <option key={user._id} value={user._id}>
                                {user.fullName} ({user.email})
                            </option>
                        ))}
                    </select>
                </div>

                <div className="modal-actions" style={{ marginTop: "15px" }}>
                    <button onClick={submit} disabled={loading}>
                        {loading ? "Assigning..." : "Assign"}
                    </button>
                    <button onClick={close} type="button">
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LeadAssignModal;