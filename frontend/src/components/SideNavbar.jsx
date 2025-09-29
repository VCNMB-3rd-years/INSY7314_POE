import { Drawer, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import ListAltIcon from "@mui/icons-material/ListAlt";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";

export default function SideNavbar() {
  const navigate = useNavigate();

  const menuItems = [
    { text: "Dashboard", icon: <DashboardIcon />, path: "/empDashboard" },
    { text: "All Transactions", icon: <ListAltIcon />, path: "/viewTransactions" },
    { text: "Verify Transaction", icon: <AccountBalanceIcon />, path: "/verifyTransaction" },
    { text: "Logout", icon: <LogoutIcon />, path: "/login" },
  ];

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      sx={{
        width: 220,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 220,
          boxSizing: "border-box",
          backgroundColor: "#2b2b40",
          color: "#f0f0f5",
        },
      }}
    >
      <List>
        {menuItems.map((item) => (
          <ListItem
            button
            key={item.text}
            onClick={() => navigate(item.path)}
            sx={{
              "&:hover": {
                backgroundColor: "#646cff33",
              },
            }}
          >
            <ListItemIcon sx={{ color: "#646cff" }}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}
