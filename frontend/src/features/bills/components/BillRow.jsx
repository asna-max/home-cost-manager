import { API_BASE } from "../../../services/api/apiClient";
import { FaEye, FaTrash, FaCheck, FaTimes } from "react-icons/fa";

export default function BillRow({ bill, onDelete, onToggle }) {
  return (
    <tr>
      <td>{bill.bill_type}</td>
      <td>{bill.period_from}</td>
      <td>{bill.period_to}</td>
      <td>{bill.due_date}</td>
      <td>{bill.amount}</td>
      <td className="notes-cell">{bill.notes}</td>

      <td>
        {bill.file ? (
          <a href={`${API_BASE}${bill.file}`} target="_blank" rel="noreferrer">
            <FaEye />
          </a>
        ) : (
          "-"
        )}
      </td>

      <td>
        <button
          className={`status-btn ${
            bill.is_paid ? "status-paid" : "status-unpaid"
          }`}
          onClick={() => onToggle(bill)}
        >
          {bill.is_paid ? <FaCheck /> : <FaTimes />}
        </button>
      </td>

      <td>
        <button onClick={() => onDelete(bill.id)}>
          <FaTrash />
        </button>
      </td>
    </tr>
  );
}
