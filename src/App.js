// import logo from './logo.svg';
import './App.css';
import React, { useState } from "react";
import LoginSignin from './components/loginSignin/loginSignin';
import MainLayout from './components/pages/mainLayout';
import Header from './components/pages/header';
import Sidebar from './components/pages/sidebar';

function App() {
  const [page, setPage] = useState("main");
  const [authAction, setAuthAction] = useState("login");

  const goToAuth = (action) => {
    setAuthAction(action);
    setPage("auth");
  };

  const goToMain = () => setPage("main");

  // Données temporaires pour tester la sidebar (à remplacer plus tard par ton vrai state)
  const mockConversations = [
    {
      id: "conv-1",
      title: "Ajout du bouton d’import de fichiers",
      date: "Aujourd’hui",
      isActive: true
    },
    {
      id: "conv-2",
      title: "Génération d’images pour le logo",
      date: "Aujourd’hui",
      isActive: false
    },
    {
      id: "conv-3",
      title: "Explication sur useEffect vs useMemo",
      date: "Hier",
      isActive: false
    },
  ];

  return (
    <div>
      {page === "main" && (
        <>
          <Header
            onLogin={() => goToAuth("Login")}
            onSignUp={() => goToAuth("Sign Up")}
          />
          <div style={{ display: "flex" }}>
            {/* Sidebar corrigée : props complètes et cohérentes */}
            <Sidebar
              activePage="chat"
              onNewConversation={() => console.log("Nouvelle conversation")}
              onSearch={(query) => console.log("Recherche dans conversations :", query)}
              conversations={mockConversations}
              onSelectConversation={(id) => {
                console.log("Conversation sélectionnée :", id);
                // Plus tard : mettre à jour l'état de la conversation active
              }}
              // optionnel : si tu veux activer le bouton "Voir toutes"
              // onViewAllConversations={() => console.log("Voir toutes les conversations")}
            />

            <MainLayout />
          </div>
        </>
      )}

      {page === "auth" && (
        <LoginSignin
          initialAction={authAction}
          onBack={goToMain}
        />
      )}
    </div>
  );
}

export default App;