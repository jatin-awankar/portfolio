import { FocusedPane } from "@/components/portfolio/FocusedPane";
import { Pane } from "@/components/portfolio/Pane";
import { StatsStrip } from "@/components/portfolio/StatsStrip";
import { TerminalPane } from "@/components/portfolio/TerminalPane";
import { CapabilitiesPane } from "@/components/portfolio/home/CapabilitiesPane";
import { ContactPane } from "@/components/portfolio/home/ContactPane";
import { HomePane } from "@/components/portfolio/home/HomePane";
import { OpenSourcePane } from "@/components/portfolio/home/OpenSourcePane";
import { ProjectsPane } from "@/components/portfolio/home/ProjectsPane";

export default function Home() {
  return (
    <>
      <FocusedPane title="~/home/hero.tsx">
        <HomePane />
      </FocusedPane>

      <StatsStrip />

      <Pane title="~/home/projects.tsx">
        <ProjectsPane />
      </Pane>

      <div className="grid gap-6 lg:grid-cols-2">
        <Pane title="~/home/capabilities.tsx">
          <CapabilitiesPane />
        </Pane>
        <Pane title="~/home/open-source.tsx">
          <OpenSourcePane />
        </Pane>
      </div>

      <TerminalPane title="jatin@portfolio: ~/contact">
        <ContactPane />
      </TerminalPane>
    </>
  );
}
