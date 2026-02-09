import "./App.css";
import Header from "./components/Header.jsx";
import Main from "./components/Main.jsx";
import Sidebar from "./components/Sidebar.jsx";

import { useState, useEffect, useCallback, useRef } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useRecipeApi } from "./api/recipe.api";

function App() {
  const [recipes, setRecipes] = useState([]);
  const [currentRecipe, setCurrentRecipe] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 900);

  const prevIsMobile = useRef(isMobile);

  const { isAuthenticated, isLoading } = useAuth0();
  const { fetchRecipes, fetchRecipeById, deleteRecipe } = useRecipeApi();

  /* Handle screen resize */
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 900;
      setIsMobile(mobile);

      if (!prevIsMobile.current && mobile) {
        setSidebarOpen(false);
      }

      prevIsMobile.current = mobile;
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("sidebar-open", isMobile && sidebarOpen);
  }, [isMobile, sidebarOpen]);

  /* Load recipes AFTER login */
  useEffect(() => {
    if (!isAuthenticated || isLoading) return;

    const loadRecipes = async () => {
      try {
        const data = await fetchRecipes();
        setRecipes(data);
      } catch (err) {
        console.error("Failed to load recipes", err);
      }
    };

    loadRecipes();
  }, [isAuthenticated, isLoading, fetchRecipes]);

  function resetAppState() {
    setRecipes([]);
    setCurrentRecipe(null);
  }

  const openRecipe = useCallback(
    async (id) => {
      try {
        const recipe = await fetchRecipeById(id);
        setCurrentRecipe(recipe);

        if (window.innerWidth <= 900) {
          setSidebarOpen(false);
        }
      } catch (err) {
        console.error("Failed to fetch recipe", err);
      }
    },
    [fetchRecipeById],
  );

  function toggleSidebar() {
    setSidebarOpen((prev) => !prev);
  }

  async function handleDeleteRecipe(id) {
    await deleteRecipe(id);

    setRecipes((prev) => prev.filter((r) => r._id !== id));
    if (currentRecipe?._id === id) {
      setCurrentRecipe(null);
    }
  }

  const sidebarClassNames = [
    "sidebar",
    sidebarOpen ? "open" : "collapsed",
    isMobile ? "mobile" : "desktop",
  ].join(" ");

  return (
    <div className="app-layout">
      {isMobile && sidebarOpen && (
        <div className="overlay" onClick={() => setSidebarOpen(false)} />
      )}

      <aside className={sidebarClassNames}>
        <Sidebar
          recipes={recipes}
          activeId={currentRecipe?._id}
          onOpen={openRecipe}
          onToggle={toggleSidebar}
          expanded={sidebarOpen}
          isMobile={isMobile}
          onLogout={resetAppState}
          onDelete={handleDeleteRecipe}
        />
      </aside>

      <div className="app-main">
        <Header
          onMenuToggle={toggleSidebar}
          showMenu={!sidebarOpen || isMobile}
        />

        <Main
          currentRecipe={currentRecipe}
          setCurrentRecipe={setCurrentRecipe}
          setRecipes={setRecipes}
        />
      </div>
    </div>
  );
}

export default App;
