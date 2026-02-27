import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import './index.css';

interface Project { id: string; name: string; color: string }
interface Column { id: string; title: string; tasks: string[] }

export default function App() {
	const [sidebarOpen, setSidebarOpen] = useState(true);
	const [projects, setProjects] = useState<Project[]>([]);
	const [columns, setColumns] = useState<Column[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		async function fetchData() {
			try {
				const [projRes, colRes] = await Promise.all([
					fetch('http://localhost:4000/projects'),
					fetch('http://localhost:4000/columns')
				]);

				if (!projRes.ok || !colRes.ok) {
					console.error('HTTP error', projRes.status, colRes.status);
				}

				const projData = await projRes.json();
				const colData = await colRes.json();

				console.log('useEffect déclenché');
				console.log('Projects:', projData);
				console.log('Columns:', colData);

				setProjects(projData);
				setColumns(colData);
			} catch (error) {
				console.error('Erreur lors du fetch :', error);
			} finally {
				setLoading(false);
			}
		}
		fetchData();
	}, []); 

	if (loading) return <div style={{ padding: '2rem' }}>Chargement...</div>;

	return (
		<div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
			<Header title="TaskFlow" onMenuClick={() => setSidebarOpen(s => !s)} />
			<div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
				<Sidebar projects={projects} isOpen={sidebarOpen} />
				<MainContent columns={columns} />
			</div>
		</div>
	);
}
