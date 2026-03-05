import { useState, useEffect } from 'react';
import { useAuth } from './features/useAuth';
import Login from './features/Login';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
interface Project { id: string; name: string; color: string; }
interface Column { id: string; title: string; tasks: string[]; }
export default function App() {
 const { state: authState } = useAuth();
 if (!authState.user) {
 return <Login />;
 }
 return <Dashboard />;
}
function Dashboard() {
 const { state: authState, dispatch } = useAuth();
 const [sidebarOpen, setSidebarOpen] = useState(true);
 const [projects, setProjects] = useState<Project[]>([]);
 const [columns, setColumns] = useState<Column[]>([]);
 const [loading, setLoading] = useState(true);
 useEffect(() => {
 async function fetchData() {
 try {
 const [p, co] = await Promise.all([
 fetch('http://localhost:4000/projects'),
 fetch('http://localhost:4000/columns'),
 ]);
 setProjects(await p.json());
 setColumns(await co.json());
 } catch (e) { console.error(e); }
 finally { setLoading(false); }
 }
 fetchData();
 }, []);
 if (loading) return <div style={{padding:'2rem'}}>Chargement...</div>;
 return (
	 <div style={{
		 display: 'flex',
		 flexDirection: 'column',
		 minHeight: '100vh',
		 background: 'linear-gradient(120deg, #f8fafc 0%, #e3eafc 100%)',
	 }}>
		 <Header
			 title="TaskFlow"
			 onMenuClick={() => setSidebarOpen(p => !p)}
			 userName={authState.user?.name}
			 onLogout={() => dispatch({ type: 'LOGOUT' })}
		 />
		 <div style={{
			 display: 'flex',
			 flex: 1,
			 overflow: 'hidden',
			 justifyContent: 'center',
			 alignItems: 'flex-start',
			 padding: '2rem',
			 gap: '2rem',
		 }}>
			 <div style={{
				 minWidth: 220,
				 maxWidth: 260,
				 background: '#fff',
				 borderRadius: '16px',
				 boxShadow: '0 2px 16px rgba(0,0,0,0.07)',
				 padding: '1.5rem 1rem',
				 marginRight: '1rem',
				 height: 'calc(100vh - 80px)',
				 overflowY: 'auto',
			 }}>
				 <Sidebar projects={projects} isOpen={sidebarOpen} />
			 </div>
			 <div style={{
				 flex: 1,
				 background: '#fff',
				 borderRadius: '16px',
				 boxShadow: '0 2px 16px rgba(0,0,0,0.07)',
				 padding: '2rem',
				 minHeight: 'calc(100vh - 80px)',
				 overflowY: 'auto',
				 display: 'flex',
				 gap: '2rem',
			 }}>
				 <MainContent columns={columns} />
			 </div>
		 </div>
	 </div>
 );
}