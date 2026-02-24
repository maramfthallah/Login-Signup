// components/pages/sidebar.jsx
import React from 'react';
import './sidebar.css';

export default function Sidebar({
  activePage,
  onNewConversation,
  onSearch,
  conversations = [],          // ← À passer depuis le parent : [{ id, title, date, isActive }]
  onSelectConversation,        // ← callback quand on clique sur une conv
}) {
  return (
    <aside className="sidebar">
      {/* Header avec logo */}
      <div className="sidebar-header">
        <span className="logo-icon">✦</span>
        <span className="logo-text">AskPro</span>
      </div>

      {/* Recherche - déplacée avant le bouton nouvelle conversation */}
      <div className="search-bar">
        <span className="material-symbols-rounded search-icon">search</span>
        <input
          type="text"
          placeholder="Rechercher dans les conversations"
          className="search-input"
          onChange={(e) => onSearch?.(e.target.value)}
        />
      </div>

      {/* Bouton Nouvelle conversation – maintenant en dessous de la recherche */}
      <button className="new-chat-btn" onClick={onNewConversation}>
        <span className="material-symbols-rounded">add</span>
        Nouvelle conversation
      </button>

      {/* Navigation principale */}
      <nav className="sidebar-nav">
        <button className={`nav-item ${activePage === 'chat' ? 'active' : ''}`}>
          <span className="material-symbols-rounded">chat</span>
          <span>Chat</span>
        </button>
        <button className="nav-item">
          <span className="material-symbols-rounded">mic</span>
          <span>Voix</span>
        </button>
        <button className="nav-item">
          <span className="material-symbols-rounded">image</span>
          <span>Imagine</span>
        </button>
        <button className="nav-item">
          <span className="material-symbols-rounded">folder</span>
          <span>Projets</span>
        </button>
      </nav>

      {/* Section Historique – style plus proche de Grok/ChatGPT */}
      <div className="history-section">
        <h3>Conversations</h3>

        <div className="history-list">
          {conversations.length === 0 ? (
            <div className="no-history">Aucune conversation récente</div>
          ) : (
            conversations.map((conv) => (
              <button
                key={conv.id}
                className={`history-item ${conv.isActive ? 'active' : ''}`}
                onClick={() => onSelectConversation?.(conv.id)}
                title={conv.title} // tooltip avec titre complet
              >
                <div className="history-content">
                  <span className="history-title">
                    {conv.title || 'Conversation sans titre'}
                  </span>
                  <span className="history-date">{conv.date || 'Inconnu'}</span>
                </div>
              </button>
            ))
          )}
        </div>

        {conversations.length > 6 && (
          <button className="view-all">
            Voir toutes les conversations
            <span className="material-symbols-rounded">chevron_right</span>
          </button>
        )}
      </div>
    </aside>
  );
}