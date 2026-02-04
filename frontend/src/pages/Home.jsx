import React, { useContext, useState } from 'react';
import AppContext from '../context/AppContext';

const Home = () => {
  const { posts, handleUpdatePost, currentUser } = useContext(AppContext);

  const [editingId, setEditingId] = useState(null);
  const [editMessage, setEditMessage] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const startEdit = (post) => {
    setEditingId(post.id);
    setEditMessage(post.message);
  }

  const cancelEdit = () => {
    setEditingId(null);
    setEditMessage("");
  }

  const saveEdit = () => {
    if (!editingId) return;

    const trimmed = editMessage.trim();
    
    if (trimmed.length < 10 || trimmed.length > 280) {
      alert("El mensaje debe tener entre 10 y 280 caracteres.");
      return;
    }

    setIsSaving(true);

    handleUpdatePost(editingId, trimmed)
      .then(() => cancelEdit())
      .catch(() => alert("No se pudo actualizar el post"))
      .finally(() => setIsSaving(false));
  }

  return (
    <div className="home">
      <h1 className="home__title">Publicaciones</h1>

      <div className="home__container">
        {posts.length > 0 ? (
          posts.map((post) => {
            const isOwner =
              currentUser?.id && String(post.ownerId) === String(currentUser.id);

            const isEditing = String(editingId) === String(post.id);

            return (
              <article className="home__card" key={post.id}>
                <h2 className="home__card-title">Publicación</h2>

                {isEditing ? (
                  <>
                    <textarea
                      className="home__card-message"
                      value={editMessage}
                      onChange={(e) => setEditMessage(e.target.value)}
                      maxLength={280}
                    />

                    <div className="home__card-actions">
                      <button
                        className="home__card-btn"
                        onClick={saveEdit}
                        disabled={isSaving}
                      >
                        {isSaving ? "Guardando..." : "Guardar"}
                      </button>

                      <button
                        className="home__card-btn"
                        onClick={cancelEdit}
                        disabled={isSaving}
                      >
                        Cancelar
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <p className="home__card-message">{post.message}</p>

                    {isOwner && (
                      <button
                        className="home__card-btn"
                        onClick={() => startEdit(post)}
                      >
                        Editar
                      </button>
                    )}
                  </>
                )}

                <hr className="home__card-divider" />

                <footer className="home__card-footer">
                  <span className="home__card-author">
                    Escrito por: {post.owner?.email || "Usuario anónimo"}
                  </span>
                  <time className="home__card-date">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </time>
                </footer>
              </article>
            );
          })
        ) : (
          <p className="home__empty">
            No hay publicaciones disponibles en este momento.
          </p>
        )}
      </div>
    </div>
  );
};

export default Home;