import { PageIntro } from "@/components/portfolio/projects/PageIntro";
import { ProjectPane } from "@/components/portfolio/projects/ProjectPane";
import { projects } from "@/lib/data/projects";

export default function ProjectsPage() {
  return (
    <>
      <PageIntro />
      {projects.map((project) => (
        <ProjectPane key={project.slug} project={project} />
      ))}
    </>
  );
}
