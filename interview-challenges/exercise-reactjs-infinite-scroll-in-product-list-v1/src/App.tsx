import { useCallback, useEffect, useRef, useState } from 'react';
import './App.css';
import type { Comment } from './types/types';
import { getAllCommentsWithLimitAndSkip } from './services/commentService';

type FetchStatus = 'idle' | 'success' | 'loading' | 'error';

function App() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [state, setState] = useState<FetchStatus>("idle");
  const [hasMore, setHasMore] = useState<boolean>(true);
  const loader = useRef<HTMLDivElement>(null);

  const loadFirstComments = useCallback(async () => {
    try {
      setState("loading");
      const commentsResponse = await getAllCommentsWithLimitAndSkip(15, 0);

      if (commentsResponse && commentsResponse.comments) {
        const initialComments = commentsResponse.comments;
        setComments(initialComments);
        setState("success");

        if (initialComments.length >= commentsResponse.total) {
          setHasMore(false);
        }
      } else {
        throw new Error(`Error fetching comments`);
      }
    } catch (error) {
      setState("error");
      console.error("Unexpected error fetching comments", error);
    }
  }, []);

  const loadNextComments = useCallback(async () => {
    if (state === 'loading' || !hasMore) {
      return;
    }

    try {
      setState("loading");
      const skip = comments.length; // Derivado del estado actual
      const moreCommentsResponse = await getAllCommentsWithLimitAndSkip(15, skip);

      if (moreCommentsResponse && moreCommentsResponse.comments.length > 0) {
        setComments((prevComments) => {
          const newComments = [...prevComments, ...moreCommentsResponse.comments];
          
          if (newComments.length >= moreCommentsResponse.total) {
            setHasMore(false);
          }
          
          
          return newComments;
        });
        
        setState("success");
      } else {
        setHasMore(false); // No llegaron más comentarios
        setState("success");
      }
    } catch (error) {
      setState("error");
      console.error("Error fetching next comments", error);
    }
  }, [state, hasMore, comments]); // Dependencias correctas

  // Carga inicial
  useEffect(() => {
    loadFirstComments();
  }, [loadFirstComments]);

  // Observer para infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const firstEntry = entries[0];
        if (firstEntry.isIntersecting && hasMore && state !== 'loading') {
          loadNextComments();
        }
      },
      { threshold: 1.0 }
    );

    const currentLoader = loader.current;
    if (currentLoader) {
      observer.observe(currentLoader);
    }

    return () => {
      if (currentLoader) {
        observer.unobserve(currentLoader);
      }
    };
  }, [hasMore, loadNextComments, state]);

  return (
    <div className="app-container">
      <h1>Lista de comentarios</h1>
      <div className='comment-list'>
        {comments.map((comment) => (
          <div className="comment-card" key={comment.id}>
            <strong className="comment-author">{comment.user.fullName}</strong>
            <p className="comment-body">{comment.body}</p>
          </div>
        ))}
      </div>

      <div ref={loader} className="loader-element"></div>

      {state === "loading" && <p className="status-text">Cargando más comentarios...</p>}
      {!hasMore && <p className="status-text">¡Has llegado al final de los comentarios!</p>}
      {state === "error" && <p className="status-text error-text">Hubo un error al cargar.</p>}
    </div>
  );
}

export default App;