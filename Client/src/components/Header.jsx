import ChefClaudeLogo from "../assets/chef-claude-icon.png";
import { Menu } from "lucide-react";

export default function Header({ onMenuToggle, showMenu }) {
  return (
    <header className="header">
      {showMenu && (
        <button className="header-menu-btn" onClick={onMenuToggle}>
          <Menu size={20} />
        </button>
      )}
      <img src={ChefClaudeLogo} alt="Chef Claude Logo" />
      <h1>Chef Claude</h1>
    </header>
  );
}
