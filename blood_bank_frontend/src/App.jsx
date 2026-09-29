import { useState } from "react";

import Login from "./components/login";
import DonorList from "./components/DonorList";
import BloodStock from "./components/BloodStock";
import Hospitals from "./components/Hospitals";
import Camps from "./components/Camps";
import CrossMatch from "./components/CrossMatch";

const TABS = [
  {
    key: "donors",
    label: "Donors",
    icon: "👥",
    component: DonorList,
  },
  {
    key: "stock",
    label: "Blood Stock",
    icon: "🩸",
    component: BloodStock,
  },
  {
    key: "hospitals",
    label: "Hospitals",
    icon: "🏥",
    component: Hospitals,
  },
  {
    key: "camps",
    label: "Camps",
    icon: "⛺",
    component: Camps,
  },
  {
    key: "crossmatch",
    label: "Cross-Match",
    icon: "🔬",
    component: CrossMatch,
  },
];

export default function App() {
  const [user, setUser] = useState(null);
  const [tab, setTab] = useState("donors");

  // Show login page before login
  if (!user) {
    return <Login onLogin={setUser} />;
  }

  const selectedTab = TABS.find(
    (item) => item.key === tab
  );

  const ActiveComponent = selectedTab.component;

  function handleLogout() {
    setUser(null);
    setTab("donors");
  }

  return (
    <div className="app-layout">

      {/* ================= SIDEBAR ================= */}

      <aside className="sidebar">

        <div className="sidebar-brand">

          <div className="brand-icon">
            🩸
          </div>

          <div>
            <h1>Blood Bank</h1>
            <p>Management System</p>
          </div>

        </div>

        <div className="sidebar-line"></div>

        <p className="menu-title">
          MAIN MENU
        </p>

        <nav className="side-navigation">

          {TABS.map((item) => (

            <button
              key={item.key}
              className={
                tab === item.key
                  ? "side-nav-button active"
                  : "side-nav-button"
              }
              onClick={() => setTab(item.key)}
            >

              <span className="nav-icon">
                {item.icon}
              </span>

              <span>
                {item.label}
              </span>

            </button>

          ))}

        </nav>

        <div className="sidebar-bottom">

          <div className="sidebar-heart">
            ❤
          </div>

          <p>
            Save lives. Donate blood.
          </p>

        </div>

      </aside>


      {/* ================= MAIN SECTION ================= */}

      <div className="main-section">

        {/* ================= TOP HEADER ================= */}

        <header className="top-header">

          <div>

            <p className="welcome-text">
              Welcome back, Admin
            </p>

            <h2>
              {selectedTab.label}
            </h2>

          </div>


          <div className="header-right">

            <div className="user-details">

              <div className="user-avatar">

                {user.username
                  ? user.username.charAt(0).toUpperCase()
                  : "A"}

              </div>

              <div>

                <p className="username">
                  {user.username}
                </p>

                <p className="user-role">
                  {user.role}
                </p>

              </div>

            </div>


            <button
              className="logout-button"
              onClick={handleLogout}
            >
              Logout
            </button>

          </div>

        </header>


        {/* ================= PAGE CONTENT ================= */}

        <main className="content-area">

          <ActiveComponent />

        </main>

      </div>

    </div>
  );
}