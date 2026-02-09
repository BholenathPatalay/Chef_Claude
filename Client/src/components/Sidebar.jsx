import { PanelLeftOpen, PanelRightOpen, Trash } from "lucide-react";
import { useAuth0 } from "@auth0/auth0-react";
import ChefClaudeLogo from "../assets/chef-claude-icon.png";

export default function Sidebar({
  recipes = [],
  activeId,
  onOpen,
  onToggle,
  expanded,
  isMobile,
  onLogout,
  onDelete,
}) {
  const { loginWithPopup, logout, user, isAuthenticated, isLoading } =
    useAuth0();

  if (isLoading) {
    return null;
  }

  function handleLogOut() {
    onLogout();

    logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
    });
  }
  return (
    <div className="sidebar-inner">
      {/* Header */}
      <div className="sidebar-header">
        <img src={ChefClaudeLogo} alt="Chef Claude" className="sidebar-logo" />

        {(!isMobile || expanded) && (
          <button
            className="sidebar-btn"
            onClick={onToggle}
            aria-label="Toggle sidebar"
          >
            {expanded ? (
              <PanelRightOpen size={20} />
            ) : (
              <PanelLeftOpen size={20} />
            )}
          </button>
        )}
      </div>

      {/* Scrollable content */}
      <div className="sidebar-scroll">
        {expanded && (
          <>
            <h3 className="sidebar-title">Recent Recipes</h3>

            <ul className="sidebar-list">
              {recipes.length > 0 ? (
                recipes.map((r) => (
                  <li
                    key={r._id}
                    className={`sidebar-item ${
                      r._id === activeId ? "active" : ""
                    }`}
                    onClick={() => onOpen(r._id)}
                  >
                    {r.title}
                    <button
                      className="delete-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        onDelete(r._id);
                      }}
                    >
                      <Trash size={15} />
                    </button>
                  </li>
                ))
              ) : (
                <li
                  className="sidebar-item"
                  style={{ color: "#6b7280", fontStyle: "italic" }}
                >
                  No recent recipes
                </li>
              )}
            </ul>
          </>
        )}
      </div>

      {/* Footer */}
      <div className="sidebar-footer">
        {isAuthenticated ? (
          <>
            <span className="sidebar-user-info">
              {user?.name || user?.nickname || user?.email}
            </span>

            <button className="sidebar-logout-btn" onClick={handleLogOut}>
              Logout
            </button>
          </>
        ) : (
          <button className="sidebar-login-btn" onClick={loginWithPopup}>
            Login
          </button>
        )}
      </div>
    </div>
  );
}
