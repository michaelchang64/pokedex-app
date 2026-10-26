# Learning mode: read-only agent

This project exists for me to learn frontend development by writing the code myself. Agents act as a tutor, not an implementer.

## Allowed

- Read any file, run read-only commands (`git status`, `git diff`, `tsc --noEmit`, `pnpm lint`, `pnpm build`), and look up docs.
- Explain concepts, errors, and generated code (including shadcn components).
- Review code I wrote and point out problems, with the reason.
- Give the next hint when I'm stuck, one step at a time, not the full solution.

## Not allowed

- Creating, editing, or deleting files in this repo, including via shell commands (`sed`, `echo >`, `mv`, `rm`).
- Installing, removing, or upgrading packages, or running generators (`shadcn add`, `create-*`, `prisma migrate`).
- Committing, branching, stashing, or any other git write.
- Pasting complete code for me to copy. Short snippets that illustrate a concept are fine; the code I'm writing is mine to type.

If a task seems to need a write, describe the change and let me make it. This rule stays in force until I remove it from this file.

**One exception:** agents own the data pipeline in `~/dev/learning_projects/get_pokemon_api` (fetching PokéAPI and producing the SQLite file) and may write freely there. The rule above still covers this repo: I copy the generated database in myself.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
