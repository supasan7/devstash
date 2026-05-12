import "dotenv/config";
import bcrypt from "bcryptjs";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("DATABASE_URL is not set");
}

const adapter = new PrismaNeon({ connectionString });
const prisma = new PrismaClient({ adapter });

const DEMO_USER_ID = "user_demo";

const SYSTEM_ITEM_TYPES = [
  { id: "snippet", name: "snippet", icon: "Code", color: "#3b82f6" },
  { id: "prompt", name: "prompt", icon: "Sparkles", color: "#8b5cf6" },
  { id: "command", name: "command", icon: "Terminal", color: "#f97316" },
  { id: "note", name: "note", icon: "StickyNote", color: "#fde047" },
  { id: "file", name: "file", icon: "File", color: "#6b7280" },
  { id: "image", name: "image", icon: "Image", color: "#ec4899" },
  { id: "link", name: "link", icon: "Link", color: "#10b981" },
];

type ItemSeed = {
  id: string;
  title: string;
  typeId: string;
  contentType: "text" | "file";
  content?: string;
  url?: string;
  language?: string;
  description?: string;
  isFavorite?: boolean;
  isPinned?: boolean;
};

type CollectionSeed = {
  id: string;
  name: string;
  description: string;
  items: ItemSeed[];
};

const COLLECTIONS: CollectionSeed[] = [
  {
    id: "collection_react_patterns",
    name: "React Patterns",
    description: "Reusable React patterns and hooks",
    items: [
      {
        id: "item_use_debounce",
        title: "useDebounce hook",
        typeId: "snippet",
        contentType: "text",
        language: "typescript",
        description: "Debounce a rapidly changing value",
        content: `import { useEffect, useState } from "react";

export function useDebounce<T>(value: T, delay = 300): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);
  return debounced;
}
`,
      },
      {
        id: "item_tabs_compound",
        title: "Compound Tabs component",
        typeId: "snippet",
        contentType: "text",
        language: "typescript",
        description: "Context-based compound component pattern",
        content: `import { createContext, useContext, useState, type ReactNode } from "react";

type TabsCtx = { active: string; setActive: (id: string) => void };
const Ctx = createContext<TabsCtx | null>(null);

export function Tabs({ defaultValue, children }: { defaultValue: string; children: ReactNode }) {
  const [active, setActive] = useState(defaultValue);
  return <Ctx.Provider value={{ active, setActive }}>{children}</Ctx.Provider>;
}

export function Tab({ id, children }: { id: string; children: ReactNode }) {
  const ctx = useContext(Ctx)!;
  return (
    <button data-active={ctx.active === id} onClick={() => ctx.setActive(id)}>
      {children}
    </button>
  );
}

export function TabPanel({ id, children }: { id: string; children: ReactNode }) {
  const ctx = useContext(Ctx)!;
  return ctx.active === id ? <div>{children}</div> : null;
}
`,
      },
      {
        id: "item_cn_util",
        title: "cn() class merger",
        typeId: "snippet",
        contentType: "text",
        language: "typescript",
        description: "Tailwind-aware className merger",
        content: `import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
`,
      },
    ],
  },
  {
    id: "collection_ai_workflows",
    name: "AI Workflows",
    description: "AI prompts and workflow automations",
    items: [
      {
        id: "item_prompt_review",
        title: "Code review prompt",
        typeId: "prompt",
        contentType: "text",
        description: "Structured PR review with severity-ranked feedback",
        content: `You are a senior engineer reviewing a pull request. Read the diff below and return feedback grouped under these headings:

1. **Correctness** — bugs, race conditions, edge cases
2. **Security** — input validation, auth, secrets, injection
3. **Performance** — N+1s, unnecessary re-renders, allocations
4. **Maintainability** — naming, structure, duplication
5. **Tests** — coverage gaps and missing assertions

For each item, label severity as [blocker], [major], or [nit]. Quote the relevant line. If everything looks good, say so explicitly.

<diff>
{{diff}}
</diff>`,
      },
      {
        id: "item_prompt_docs",
        title: "Documentation generation prompt",
        typeId: "prompt",
        contentType: "text",
        description: "Generate API docs from source",
        content: `Given the source file below, generate developer-facing documentation in Markdown:

- A one-paragraph overview of what the module does
- For each exported symbol: signature, description, parameters, return value, and a usage example
- Note any gotchas, side effects, or required setup
- Keep examples runnable; prefer realistic data over foo/bar

<source>
{{source}}
</source>`,
      },
      {
        id: "item_prompt_refactor",
        title: "Refactoring assistance prompt",
        typeId: "prompt",
        contentType: "text",
        description: "Targeted refactor with rationale",
        content: `Refactor the code below with these constraints:
- Preserve external behavior — no API changes
- Reduce complexity (extract functions, flatten conditionals, remove dead code)
- Replace clever code with boring code
- Add a brief comment ONLY where intent is non-obvious

Return: (1) the refactored code, (2) a short bullet list of the changes you made and why.

<code>
{{code}}
</code>`,
      },
    ],
  },
  {
    id: "collection_devops",
    name: "DevOps",
    description: "Infrastructure and deployment resources",
    items: [
      {
        id: "item_dockerfile_node",
        title: "Multi-stage Node.js Dockerfile",
        typeId: "snippet",
        contentType: "text",
        language: "dockerfile",
        description: "Slim production image with build cache",
        content: `FROM node:22-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --omit=dev

FROM node:22-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=deps /app/node_modules ./node_modules
COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public
COPY package.json ./
EXPOSE 3000
CMD ["npm", "start"]
`,
      },
      {
        id: "item_deploy_script",
        title: "Vercel production deploy",
        typeId: "command",
        contentType: "text",
        description: "Deploy current branch to production with prebuilt output",
        content: `vercel build --prod && vercel deploy --prebuilt --prod`,
      },
      {
        id: "item_link_docker_docs",
        title: "Docker docs",
        typeId: "link",
        contentType: "text",
        url: "https://docs.docker.com/",
        description: "Official Docker documentation",
      },
      {
        id: "item_link_k8s_docs",
        title: "Kubernetes docs",
        typeId: "link",
        contentType: "text",
        url: "https://kubernetes.io/docs/home/",
        description: "Official Kubernetes documentation",
      },
    ],
  },
  {
    id: "collection_terminal_commands",
    name: "Terminal Commands",
    description: "Useful shell commands for everyday development",
    items: [
      {
        id: "item_cmd_git_graph",
        title: "Pretty git log graph",
        typeId: "command",
        contentType: "text",
        description: "Compact branch/commit graph across all refs",
        content: `git log --oneline --graph --decorate --all`,
      },
      {
        id: "item_cmd_docker_prune",
        title: "Reclaim Docker disk space",
        typeId: "command",
        contentType: "text",
        description: "Remove unused containers, networks, images, and volumes",
        content: `docker system prune -af --volumes`,
      },
      {
        id: "item_cmd_port_kill",
        title: "Find and kill process on port 3000",
        typeId: "command",
        contentType: "text",
        description: "Useful when a dev server didn't shut down cleanly",
        content: `lsof -ti :3000 | xargs -r kill -9`,
      },
      {
        id: "item_cmd_npm_outdated",
        title: "List and update outdated npm packages",
        typeId: "command",
        contentType: "text",
        description: "Check what's behind, then bump within semver",
        content: `npm outdated && npm update`,
      },
    ],
  },
  {
    id: "collection_design_resources",
    name: "Design Resources",
    description: "UI/UX resources and references",
    items: [
      {
        id: "item_link_tailwind",
        title: "Tailwind CSS docs",
        typeId: "link",
        contentType: "text",
        url: "https://tailwindcss.com/docs",
        description: "Utility-first CSS framework reference",
      },
      {
        id: "item_link_shadcn",
        title: "shadcn/ui",
        typeId: "link",
        contentType: "text",
        url: "https://ui.shadcn.com/",
        description: "Copy-paste accessible React components",
      },
      {
        id: "item_link_material",
        title: "Material Design 3",
        typeId: "link",
        contentType: "text",
        url: "https://m3.material.io/",
        description: "Google's design system guidelines",
      },
      {
        id: "item_link_lucide",
        title: "Lucide icons",
        typeId: "link",
        contentType: "text",
        url: "https://lucide.dev/icons/",
        description: "Open-source icon set used across the app",
      },
    ],
  },
];

async function main() {
  console.log("Seeding...");

  const validTypeIds = SYSTEM_ITEM_TYPES.map((t) => t.id);
  await prisma.itemType.deleteMany({
    where: { isSystem: true, id: { notIn: validTypeIds } },
  });

  for (const t of SYSTEM_ITEM_TYPES) {
    await prisma.itemType.upsert({
      where: { id: t.id },
      update: { name: t.name, icon: t.icon, color: t.color, isSystem: true, userId: null },
      create: { ...t, isSystem: true },
    });
  }
  console.log(`  · ${SYSTEM_ITEM_TYPES.length} system item types`);

  const passwordHash = await bcrypt.hash("12345678", 12);
  await prisma.user.upsert({
    where: { id: DEMO_USER_ID },
    update: {
      email: "demo@devstash.io",
      name: "Demo User",
      password: passwordHash,
      isPro: false,
      emailVerified: new Date(),
    },
    create: {
      id: DEMO_USER_ID,
      email: "demo@devstash.io",
      name: "Demo User",
      password: passwordHash,
      isPro: false,
      emailVerified: new Date(),
    },
  });
  console.log("  · demo user");

  let collectionCount = 0;
  let itemCount = 0;
  for (const c of COLLECTIONS) {
    await prisma.collection.upsert({
      where: { id: c.id },
      update: { name: c.name, description: c.description, userId: DEMO_USER_ID },
      create: {
        id: c.id,
        name: c.name,
        description: c.description,
        userId: DEMO_USER_ID,
      },
    });
    collectionCount++;

    for (const it of c.items) {
      const data = {
        title: it.title,
        contentType: it.contentType,
        content: it.content ?? null,
        url: it.url ?? null,
        language: it.language ?? null,
        description: it.description ?? null,
        isFavorite: it.isFavorite ?? false,
        isPinned: it.isPinned ?? false,
        userId: DEMO_USER_ID,
        typeId: it.typeId,
        collectionId: c.id,
      };
      await prisma.item.upsert({
        where: { id: it.id },
        update: data,
        create: { id: it.id, ...data },
      });
      itemCount++;
    }
  }
  console.log(`  · ${collectionCount} collections, ${itemCount} items`);

  console.log("Done.");
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
