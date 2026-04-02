import { NavLink } from 'react-router-dom';
import styles from './Sidebar.module.css';
import { memo } from 'react';

interface Project {
  id: string;
  name: string;
  color: string;
}

interface SidebarProps {
  projects: Project[];
  isOpen: boolean;
  onRenameProject?: (project: Project) => void;
  onDeleteProject?: (id: string) => void;
}

function Sidebar({
  projects,
  isOpen,
  onRenameProject,
  onDeleteProject,
}: SidebarProps) {
  console.log('Sidebar re-render');
  return (
    <aside className={`${styles.sidebar} ${isOpen ? styles.open : styles.closed}`}>
      <h2 className={styles.title}>Mes Projets</h2>
      <div className={styles.badge}>{projects.length}</div>

      <ul className={styles.list}>
        {projects.map(p => (
          <li key={p.id}>
            <div className={styles.row}>
              <NavLink
                to={`/projects/${p.id}`}
                className={({ isActive }) =>
                  `${styles.item} ${isActive ? styles.active : ''}`
                }
              >
                <span className={styles.dot} style={{ background: p.color }} />
                {p.name}
                </NavLink>


              {(onRenameProject || onDeleteProject) && (
                <div className={styles.actions}>
                  {onRenameProject && (
                    <button
                      type="button"
                      className={styles.actionBtn}
                      onClick={() => onRenameProject(p)}
                      aria-label={`Renommer ${p.name}`}
                      title="Renommer"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25z" fill="#1B8C3E"/>
                        <path d="M20.71 7.04a1 1 0 0 0 0-1.41l-2.34-2.34a1 1 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" fill="#1B8C3E"/>
                      </svg>
                    </button>
                  )}
                  {onDeleteProject && (
                    <button
                      type="button"
                      className={styles.actionBtn}
                      onClick={() => onDeleteProject(p.id)}
                      aria-label={`Supprimer ${p.name}`}
                      title="Supprimer"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6 7h12v13a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V7z" stroke="#d32f2f" strokeWidth="1" fill="none" />
                        <path d="M9 3h6v2H9z" fill="#d32f2f" />
                      </svg>
                    </button>
                  )}
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default memo(Sidebar);