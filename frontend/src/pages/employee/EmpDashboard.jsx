import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Typography } from "@mui/material";
import axios from "axios";
import Sidebar from "../../components/SideNavbar";

export default function ViewTransactions() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get("http://localhost:3000/v1/coinnect/transactions");
        setTransactions(response.data);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTransactions();
  }, []);

  // Define table columns
  const columns = [
    { field: "_id", headerName: "ID", width: 220 },
    { field: "amount", headerName: "Amount", width: 130 },
    { field: "date", headerName: "Date", width: 180 },
    { field: "fromAccount", headerName: "From", width: 150 },
    { field: "toAccount", headerName: "To", width: 150 },
  ];

  return (
    <Box sx={{ display: "flex" }}>
      {/* Sidebar on the left */}
      <Sidebar />

      {/* Main content */}
      <Box sx={{ flexGrow: 1, p: 3 }}>
        <Typography variant="h4" gutterBottom>
          All Transactions
        </Typography>
        <Box sx={{ height: 500, width: "100%" }}>
          <DataGrid
            rows={transactions}
            columns={columns}
            loading={loading}
            getRowId={(row) => row._id}
            pageSize={5}
            rowsPerPageOptions={[5, 10, 20]}
            checkboxSelection
          />
        </Box>
      </Box>
    </Box>
  );
}
