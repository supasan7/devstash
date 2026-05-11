export const mockUser = {
  id: "user_1",
  name: "John Doe",
  email: "john@example.com",
  isPro: false,
};

export const mockItemTypes = [
  { id: "type_snippet", name: "Snippets", icon: "code", isSystem: true, count: 24 },
  { id: "type_prompt", name: "Prompts", icon: "sparkles", isSystem: true, count: 18 },
  { id: "type_command", name: "Commands", icon: "terminal", isSystem: true, count: 15 },
  { id: "type_note", name: "Notes", icon: "file-text", isSystem: true, count: 12 },
  { id: "type_file", name: "Files", icon: "folder", isSystem: true, count: 5 },
  { id: "type_image", name: "Images", icon: "image", isSystem: true, count: 3 },
  { id: "type_url", name: "Links", icon: "link", isSystem: true, count: 8 },
];

export const mockCollections = [
  {
    id: "col_1",
    name: "React Patterns",
    description: "Common React patterns and hooks",
    itemCount: 12,
    isFavorite: true,
  },
  {
    id: "col_2",
    name: "Python Snippets",
    description: "Useful Python code snippets",
    itemCount: 8,
    isFavorite: false,
  },
  {
    id: "col_3",
    name: "Context Files",
    description: "AI context files for projects",
    itemCount: 5,
    isFavorite: true,
  },
  {
    id: "col_4",
    name: "Interview Prep",
    description: "Technical interview preparation",
    itemCount: 24,
    isFavorite: true,
  },
  {
    id: "col_5",
    name: "Git Commands",
    description: "Frequently used git commands",
    itemCount: 15,
    isFavorite: true,
  },
  {
    id: "col_6",
    name: "AI Prompts",
    description: "Curated AI prompts for coding",
    itemCount: 18,
    isFavorite: false,
  },
  {
    id: "col_7",
    name: "Python Snippets",
    description: "Useful Python code snippets",
    itemCount: 8,
    isFavorite: false,
  },
  {
    id: "col_8",
    name: "Interview Prep",
    description: "Technical interview preparation",
    itemCount: 24,
    isFavorite: false,
  },
  {
    id: "col_9",
    name: "AI Prompts",
    description: "Curated AI prompts for coding",
    itemCount: 18,
    isFavorite: false,
  },
];

export const mockItems = [
  {
    id: "item_1",
    title: "useAuth Hook",
    description: "Custom authentication hook for React applications",
    contentType: "text",
    content: `import { useSession } from 'next-auth/react'

export function useAuth() {
  const { data: session, status } = useSession()
  return {
    user: session?.user,
    isLoading: status === 'loading',
    isAuthenticated: status === 'authenticated',
  }
}`,
    typeId: "type_snippet",
    typeName: "Snippet",
    collectionId: "col_1",
    collectionName: "React Patterns",
    tags: ["react", "auth", "hooks"],
    language: "typescript",
    isFavorite: false,
    isPinned: true,
    createdAt: "2026-01-15T00:00:00Z",
    updatedAt: "2026-01-15T00:00:00Z",
  },
  {
    id: "item_2",
    title: "API Error Handling Pattern",
    description: "Fetch wrapper with exponential backoff retry logic",
    contentType: "text",
    content: `async function fetchWithRetry(url: string, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      const res = await fetch(url)
      if (!res.ok) throw new Error(res.statusText)
      return await res.json()
    } catch (err) {
      if (i === retries - 1) throw err
      await new Promise(r => setTimeout(r, 2 ** i * 1000))
    }
  }
}`,
    typeId: "type_snippet",
    typeName: "Snippet",
    collectionId: "col_1",
    collectionName: "React Patterns",
    tags: ["api", "error-handling", "typescript"],
    language: "typescript",
    isFavorite: false,
    isPinned: true,
    createdAt: "2026-01-12T00:00:00Z",
    updatedAt: "2026-01-12T00:00:00Z",
  },
  {
    id: "item_3",
    title: "Git Stash All Changes",
    description: "Stash all tracked and untracked changes",
    contentType: "text",
    content: "git stash push -u -m 'WIP: description'",
    typeId: "type_command",
    typeName: "Command",
    collectionId: "col_5",
    collectionName: "Git Commands",
    tags: ["git", "stash"],
    language: null,
    isFavorite: true,
    isPinned: false,
    createdAt: "2026-01-10T00:00:00Z",
    updatedAt: "2026-01-10T00:00:00Z",
  },
  {
    id: "item_4",
    title: "Explain This Code",
    description: "Prompt for getting a clear explanation of complex code",
    contentType: "text",
    content: "Explain the following code in simple terms. Break down what each part does, identify any patterns used, and highlight potential issues or improvements:\n\n```\n{{code}}\n```",
    typeId: "type_prompt",
    typeName: "Prompt",
    collectionId: "col_6",
    collectionName: "AI Prompts",
    tags: ["ai", "code-review", "explanation"],
    language: null,
    isFavorite: true,
    isPinned: false,
    createdAt: "2026-01-08T00:00:00Z",
    updatedAt: "2026-01-08T00:00:00Z",
  },
  {
    id: "item_5",
    title: "Python List Comprehension",
    description: "Common list comprehension patterns in Python",
    contentType: "text",
    content: `# Filter and transform
evens_squared = [x**2 for x in range(20) if x % 2 == 0]

# Nested
matrix = [[1,2,3],[4,5,6],[7,8,9]]
flat = [n for row in matrix for n in row]

# Dict comprehension
word_lengths = {word: len(word) for word in ['hello', 'world']}`,
    typeId: "type_snippet",
    typeName: "Snippet",
    collectionId: "col_2",
    collectionName: "Python Snippets",
    tags: ["python", "list", "comprehension"],
    language: "python",
    isFavorite: false,
    isPinned: false,
    createdAt: "2026-01-05T00:00:00Z",
    updatedAt: "2026-01-05T00:00:00Z",
  },
  {
    id: "item_6",
    title: "Next.js App Router Setup Notes",
    description: "Key things to remember when setting up Next.js App Router",
    contentType: "text",
    content: "## App Router Notes\n\n- Server components by default\n- Use `'use client'` only when needed\n- Layouts persist between route changes\n- Loading UI with `loading.tsx`\n- Error boundaries with `error.tsx`\n- Parallel routes with `@slot` convention",
    typeId: "type_note",
    typeName: "Note",
    collectionId: null,
    collectionName: null,
    tags: ["nextjs", "app-router"],
    language: null,
    isFavorite: false,
    isPinned: false,
    createdAt: "2026-01-03T00:00:00Z",
    updatedAt: "2026-01-03T00:00:00Z",
  },
  {
    id: "item_7",
    title: "Prisma Quick Reference",
    description: "Common Prisma ORM query patterns",
    contentType: "text",
    content: `// Find with relations
const user = await prisma.user.findUnique({
  where: { id },
  include: { posts: true },
})

// Upsert
await prisma.user.upsert({
  where: { email },
  update: { name },
  create: { email, name },
})`,
    typeId: "type_snippet",
    typeName: "Snippet",
    collectionId: null,
    collectionName: null,
    tags: ["prisma", "database", "orm"],
    language: "typescript",
    isFavorite: true,
    isPinned: false,
    createdAt: "2025-12-28T00:00:00Z",
    updatedAt: "2025-12-28T00:00:00Z",
  },
  {
    id: "item_8",
    title: "DevStash Project Context",
    description: "AI context file for the DevStash project",
    contentType: "text",
    content: "# DevStash Context\n\nA developer knowledge hub built with Next.js, Prisma, and Tailwind CSS v4. Users can store snippets, prompts, notes, commands, files, images, and links.",
    typeId: "type_file",
    typeName: "File",
    collectionId: "col_3",
    collectionName: "Context Files",
    tags: ["context", "devstash"],
    language: null,
    isFavorite: false,
    isPinned: false,
    createdAt: "2025-12-20T00:00:00Z",
    updatedAt: "2025-12-20T00:00:00Z",
  },
];
