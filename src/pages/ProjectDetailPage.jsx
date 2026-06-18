import { useState, useEffect } from 'react';
import { useFetch } from '../hooks/useFetch'
import { useParams } from 'react-router-dom';
function ProjectDetailPage() {
  const {id} = useParams();
  const { apiFetch } = useFetch();
const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const data = await apiFetch('/projects/' + id);
        setProject(data);
      console.log(data)
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, []);
  if (loading) return <p>"Chargement en cours"</p>;
  if (error) return <p>{"Erreur en cours : " + error}</p>;
return (
    <div>
    <img src={project.image_url} alt="image du projet" />
    <h1>{project.title}</h1>
    <p>{project.description}</p>
    <p>{project.tech_stack}</p>
    <a href={project.github_url}>lien github</a>
    <a href={project.demo_url}>démonstration</a>
  </div>
  )
}

export default ProjectDetailPage