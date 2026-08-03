import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
export default defineConfig({
  integrations: [
    starlight({
      title: "Doctrinal Delivery Platform",
      description: "The attractive, navigable documentation maze.",
      social: [],
      sidebar: [
        {
          label: "Orientation",
          items: [
            { label: "Documentation entry", slug: "index" },
            { label: "Original purpose recovery", slug: "purpose-recovery" },
          ],
        },
        { label: "Architecture", items: [{ autogenerate: { directory: "architecture" } }] },
        { label: "Operations", items: [{ autogenerate: { directory: "operations" } }] },
        { label: "Governance", items: [{ autogenerate: { directory: "governance" } }] },
      ],
      customCss: ["./src/styles/custom.css"],
    }),
  ],
});
