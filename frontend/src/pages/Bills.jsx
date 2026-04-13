import { useEffect, useState } from "react";
import { getBills } from "../services/api";

export default function Bills({token}){
    const [bills, setBills] = useState([]);

    useEffect(()=>{
        async function fetchData() {
            const data = await getBills(token, 2); // household 1
            setBills(data);
        }
        fetchData();

    }, [token]);

    return(
        <div>
            <h2>Bills</h2>
            {Array.isArray(bills) && bills.map((bill) =>(
                <div key={bill.id}>
                    {bill.title} - {bill.amount}
                </div>
            ))}
        </div>
    );
}