    import React, {useState, useEffect} from 'React' 
import {useFetch} from '../hooks/useFetch'
  import ProjectCard from '../components/ProjectCard'

function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { apiFetch } = useFetch();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await apiFetch('/projects');
        setProjects(data);
      console.log(data)
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);
  if (loading) return <p>"Chargement en cours"</p>;
  if (error) return <p>{"Erreur en cours : " + error}</p>;

  
  return (
    <div>
      <h1>Mes projets</h1>
{
projects.map((project) => (<ProjectCard key = {project.id} project = {project} />)
)

}
</div>
  )
}

export default ProjectsPage