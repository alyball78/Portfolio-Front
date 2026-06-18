import React from 'react'
import { Link } from 'react-router-dom'
function ProjectCard({project}) {

    return (
    <div>
          <img src={project.image_url} alt="image du projet" />
            <h1>{project.title}</h1>
          <p>{project.description}</p>
            <p>{project.tech_stack}</p>
            <a href={project.github_url}>lien github</a>
            <a href={project.demo_url}>démonstration</a>
<Link to={"/projects/"+project.id}>plus de détails</Link>
</div>
  )
}

export default ProjectCard