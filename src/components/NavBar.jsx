import { Tabs, Link } from "@radix-ui/themes/dist/cjs/index.js";

const NavBar = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        color: "white",
        padding: "1rem",
        width: "100%",
        boxSizing: "border-box",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
      }}
    >
      <div
        className="navbar-logo"
        style={{ display: "flex", alignItems: "center" }}
      >
        <img
          src="https://avatars.githubusercontent.com/u/67922757?v=4"
          alt="Logo"
          style={{ height: "40px" }}
        />
      </div>
      <Tabs.Root defaultValue="Sobre">
        <Tabs.List style={{ display: "flex", gap: "1rem" }}>
          <Tabs.Trigger value="Sobre">
            <Link
              href="google.com"
              style={{ color: "white", textDecoration: "none" }}
            >
              Sobre
            </Link>
          </Tabs.Trigger>
          <Tabs.Trigger value="Github">
            <Link
              href="https://github.com/your-project"
              style={{ color: "white", textDecoration: "none" }}
            >
              Github
            </Link>
          </Tabs.Trigger>
          <Tabs.Trigger value="Roadmap">
            <Link
              href="#roadmap"
              style={{ color: "white", textDecoration: "none" }}
            >
              Roadmap
            </Link>
          </Tabs.Trigger>
        </Tabs.List>
      </Tabs.Root>
    </div>
  );
};

export default NavBar;
