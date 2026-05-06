import BillRow from "./BillRow";

export default function BillsTable({ bills, onDelete, onToggle }) {
  return (
    <div className="table-wrapper">
      <table className="table">
        <thead>
          <tr>
            <th>Type</th>
            <th>From</th>
            <th>To</th>
            <th>Due</th>
            <th>Amount</th>
            <th>Notes</th>
            <th>View</th>
            <th>Status</th>
            <th>Delete</th>
          </tr>
        </thead>

        <tbody>
          {bills.map((bill) => (
            <BillRow
              key={bill.id}
              bill={bill}
              onDelete={onDelete}
              onToggle={onToggle}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}