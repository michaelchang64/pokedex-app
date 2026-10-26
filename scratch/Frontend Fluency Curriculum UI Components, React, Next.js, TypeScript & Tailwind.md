# Frontend Fluency Curriculum

Oct 25, 2026 · @Michael Chang

## How to use this curriculum

Ten phases take you from an empty folder to a working Pokédex, with UI components as the spine and React, TypeScript, Tailwind, and Next.js learned just in time, when a component needs them. Plan on roughly 8–12 weeks at 5–8 hours a week; go slower if a phase isn't clicking.

**Why components first.** Components are where all four skills meet. A Button teaches you JSX, prop typing, Tailwind state variants, and accessibility in one file. Next.js only matters once you have something to render, so it comes later.

**Every lesson has the same four parts:**

- **Learn:** the concepts to understand before you write code. Read the linked docs, then explain each one back to your agent in your own words.
- **Build:** what you write yourself. The agent scaffolds; you fill in.
- **Checkpoint:** questions you should answer without looking anything up. If you can't, redo the lesson before moving on.
- **Kickoff prompt:** paste this to your coding agent to start the lesson.

**Ground rules:**

1. Type every line yourself. No copy-paste from docs or the agent, at least through Phase 4. Typing builds the muscle memory.
2. Every component lives in Storybook before it lives in a page.
3. Commit at the end of every lesson with a message saying what you learned, not just what changed.
4. Write a `DECISIONS.md` entry whenever you pick between two reasonable options.
5. When you're stuck for more than 20 minutes, ask the agent for the next rung on the help ladder, not the answer.

**One change from the agent files:** your stack module defaults to CSS Modules. Since Tailwind is now a priority, edit `.agent/modules/stack-nextjs-typescript.md` and `.agent/modules/design-system.md` to say tokens live in Tailwind's `@theme` and components are styled with Tailwind utilities. Phase 0 includes this step.

## Phase 0: Setup and orientation (1 week)

Goal: a running Next.js app and Storybook, both styled by Tailwind, and you can explain what every config file does.

### Lesson 0.1: Scaffold the project

**Learn:** what `create-next-app` generates; the App Router `app/` folder; what `package.json` scripts do; what `tsconfig.json` controls and why `strict: true` matters.

**Build:**

- Run `create-next-app`. Either the recommended defaults or "customize settings" works; if you customize, pick TypeScript, ESLint, Tailwind, and App Router, and answer **No** to the `src/` directory. Customizing is worth it once, so you see what each option is.
- Add Prettier plus `prettier-plugin-tailwindcss` (it sorts class names into a consistent order, which makes Tailwind far easier to read). In `.prettierrc`, point `tailwindStylesheet` at `./app/globals.css`.
- `create-next-app` generates its own `AGENTS.md` and `CLAUDE.md` by default. Read them first and move anything useful into your stack module, then put your `AGENTS.md`, the `.agent/` folder, and an empty `DECISIONS.md` in place. Update the modules to say Tailwind, Prisma, and no `src/` directory.
- Create the empty folders at the project root: `design-system/tokens`, `design-system/primitives`, `features/pokemon`, `lib`.
- Write your first `DECISIONS.md` entry: why no `src/` directory.

**Checkpoint:** What does `strict` turn on in TypeScript? What's the difference between `dependencies` and `devDependencies`? Where does Tailwind get loaded into the app?

### Lesson 0.2: Storybook and Vitest

**Learn:** what Storybook is for (building components in isolation); what a story is; how Storybook's `preview` file loads global CSS; what a test runner does.

**Build:**

- Initialize Storybook with its Next.js framework. Check the current Storybook docs for the init command, since it has changed between versions.
- Import your global CSS (the file with `@import "tailwindcss"`) in `.storybook/preview.ts` so Tailwind works in stories.
- Add the a11y addon.
- Install Vitest and Testing Library; write one trivial test that passes.
- Delete the example stories Storybook generated. Write one story yourself for a plain `<h1>` component to prove the pipeline works.

**Checkpoint:** Why does Storybook need its own copy of the global CSS import? What would break if you skipped it?

> **Kickoff prompt:** "We're starting Phase 0, Lesson 0.1 of my curriculum. Walk me through scaffolding the project. Explain each `create-next-app` option before I choose it, and explain every generated file I ask about."

## Phase 1: React and TypeScript foundations (1–2 weeks)

Goal: you understand what a component is, how props and children flow, and how to type them, by building tiny static components with no styling decisions yet.

### Lesson 1.1: Components, JSX, and props

**Learn:** a component is a function that returns JSX; JSX compiles to function calls; props are the function's single argument; components re-run (re-render) when their inputs change; why components must be pure.

**Build:** a `Greeting` component that takes a `name` prop. Then a `PokemonName` that takes `name` and `number` and renders `#025 Pikachu` (pad the number yourself).

**Checkpoint:** What does JSX turn into? Why can't a component change its own props?

### Lesson 1.2: Typing props

**Learn:** `type` vs `interface` (pick one convention and note it in `DECISIONS.md`); optional props and defaults; string-literal unions (`"sm" | "md" | "lg"`); `React.ReactNode` for anything renderable; why `any` defeats the point.

**Build:** a `Text` component with `size: "sm" | "md" | "lg"` (default `"md"`) and `children`. Try passing `size="xl"` and read the error message carefully.

**Checkpoint:** What's the difference between `ReactNode` and `ReactElement`? Why is a union better than `size: string`?

### Lesson 1.3: Children, lists, and conditional rendering

**Learn:** `children` as a prop; rendering arrays with `.map()`; why `key` exists and why array index is usually a bad key; `&&`, ternaries, and early returns for conditional UI (and the `0 &&` gotcha).

**Build:** a `TypeList` that takes `types: string[]` and renders each one, plus an empty state when the array is empty. Hardcode some data.

**Checkpoint:** What breaks when keys aren't stable? What renders if you write `{count && <Badge />}` and `count` is `0`?

### Lesson 1.4: Wrapping native elements

**Learn:** `ComponentPropsWithoutRef<"button">` and why wrapping a native element means accepting its props; spreading `...rest`; the `Omit` and `Pick` utility types; typing event handlers (`React.MouseEvent<HTMLButtonElement>`).

**Build:** a bare `Button` (no styling yet) that accepts every native button prop plus your own `variant` prop, and forwards the rest to `<button>`.

**Checkpoint:** If a consumer passes `onClick`, `disabled`, and `aria-label`, do they all reach the DOM? Why does that matter for accessibility?

> **Kickoff prompt:** "Phase 1, Lesson 1.1. Teach me what a component actually is and how rendering works, then give me the Greeting exercise. Don't write the component for me."

## Phase 2: Tailwind fundamentals (1–2 weeks)

Goal: you can lay out and style anything with utilities, read a long class list without flinching, and know what good Tailwind looks like versus a pile of classes.

### Lesson 2.1: The utility mindset and the box model

**Learn:** why utility-first exists (styles live next to markup, no naming, no dead CSS); the spacing scale (`p-4`, `gap-2`, `mt-6`) and why a fixed scale beats arbitrary pixels; margin vs padding vs gap; `size-*`, `w-*`, `h-*`, `max-w-*`.

**Build:** style your Phase 1 `Text` and `TypeList` with only scale values. No `[13px]`-style arbitrary values allowed.

**Checkpoint:** Why prefer `gap` on a parent over margins on children?

### Lesson 2.2: Flexbox and grid

**Learn:** `flex`, `items-*`, `justify-*`, `flex-1`, `shrink-0`, `min-w-0` (the truncation gotcha); `grid`, `grid-cols-*`, auto-fill grids with `grid-cols-[repeat(auto-fill,minmax(10rem,1fr))]` (the one place an arbitrary value earns its keep).

**Build:** a static card layout: image on top, name and number in a row with space between, type badges wrapping below. Then a responsive grid of six hardcoded cards.

**Checkpoint:** Why does a long name overflow a flex child until you add `min-w-0`?

### Lesson 2.3: Responsive design and state variants

**Learn:** mobile-first breakpoints (`md:` means "from md up", not "only md"); `hover:`, `focus-visible:` (and why not plain `focus:`), `active:`, `disabled:`; `aria-*` and `data-*` variants for styling by component state; `group` and `peer`; `motion-safe:` and `motion-reduce:`.

**Build:** make the card grid go 1 → 2 → 3 → 4 columns. Give the card a hover lift that's disabled for reduced-motion users and a visible keyboard focus ring.

**Checkpoint:** What's the difference between `focus:` and `focus-visible:`? When would you style with `data-[state=open]:` instead of a conditional class?

### Lesson 2.4: Readable Tailwind

**Learn:** the Prettier plugin's class order; the rule "extract a component, not a class" (repetition is solved by React components, not `@apply`); when `@apply` is acceptable (almost never: third-party markup you don't control); conditional classes with `clsx`.

**Build:** take your messiest component from this phase and refactor it until a stranger could read it. Split it into smaller components where a class list does two jobs.

**Checkpoint:** Your Card and Badge both repeat `rounded-md px-2 py-1 text-sm`. What's the right fix?

> **Kickoff prompt:** "Phase 2, Lesson 2.1. I have zero Tailwind experience. Teach me the spacing scale and box model with small examples, then review my styling of Text and TypeList against good Tailwind practice."

## Phase 3: Design tokens in Tailwind (1 week)

Goal: every color, size, and radius in the app comes from a token you defined, and switching to dark mode changes only token values, never component code.

### Lesson 3.1: How Tailwind's theme works

**Learn:** Tailwind v4 is configured in CSS, not a JS config file; `@theme` variables both create CSS custom properties and generate utilities (`--color-brand` gives you `bg-brand`, `text-brand`, `border-brand`); theme namespaces (`--color-*`, `--spacing`, `--radius-*`, `--font-*`, `--text-*`, `--shadow-*`, `--ease-*`); resetting a namespace to remove Tailwind's defaults. Verify the details against the current Tailwind docs before building.

**Build:** in `design-system/tokens/`, create a `tokens.css` imported by your global CSS. Define a small raw palette (neutrals plus one accent), a radius scale, and font families.

**Checkpoint:** What's the difference between a CSS variable you write in `:root` and one you write in `@theme`?

### Lesson 3.2: Semantic tokens and dark mode

**Learn:** two-layer tokens: raw (`--gray-900`) and semantic (`--color-surface`, `--color-fg`, `--color-fg-muted`, `--color-border`, `--color-accent`); why components use only the semantic layer; the common pattern of defining semantic values in `:root` and `.dark`, then mapping them into Tailwind with `@theme inline`; a custom `dark` variant driven by a class or `data-theme` attribute.

**Build:**

- Define 8–12 semantic color tokens with light and dark values.
- Add the 18 Pokémon type colors as tokens, each with a background and an accessible foreground. Check every pair for 4.5:1 contrast.
- Add a theme toggle decorator in Storybook so every story can flip themes.

**Checkpoint:** A designer wants the app's accent changed from blue to purple. How many files do you touch? (Right answer: one.)

### Lesson 3.3: Document the tokens

**Learn:** tokens are an API; documentation is how others discover them.

**Build:** a Storybook docs page that renders swatches for every color token, a spacing ruler, the type scale, and radius samples. Read values from CSS variables at runtime so the page can't drift from the source.

**Checkpoint:** Write one `DECISIONS.md` entry: how you named semantic tokens and why.

> **Kickoff prompt:** "Phase 3, Lesson 3.1. Explain how Tailwind v4's `@theme` works and how it differs from plain CSS variables. Check the current docs first. Then help me plan my raw and semantic token layers before I write any."

## Phase 4: Primitive component patterns (2–3 weeks)

Goal: you can design and build a reusable, typed, accessible, themeable component from scratch, and you've built the full set of baseline primitives. This is the heart of the curriculum; take your time.

### Lesson 4.1: The variant toolkit

**Learn:** the `cn()` helper (`clsx` for conditionals plus `tailwind-merge` so a consumer's `px-6` correctly overrides your `px-4`); `class-variance-authority` (cva) for declaring variants, sizes, compound variants, and defaults; `VariantProps<typeof buttonVariants>` to derive prop types from the variant definition; your `className` policy (accept it, merge it last, document that it's an escape hatch).

**Build:** write `lib/cn.ts` yourself. Write a unit test proving `cn("px-4", "px-6")` returns `"px-6"`.

**Checkpoint:** Without tailwind-merge, what happens when both `px-4` and `px-6` are on an element? Why isn't it "the last one wins"?

### Lesson 4.2: Button, the flagship primitive

**Learn:** API design before code. Write the prop table first: `variant` (solid, outline, ghost), `size` (sm, md, lg), `loading`, `disabled`, leading/trailing icon slots, `type` defaulting to `"button"`. How refs work in current React (ref as a regular prop) and why a design-system component must pass it through. Disabled vs `aria-disabled` and what a loading button should announce.

**Build:**

- Agree on the API with your agent, then implement Button with cva and `cn`.
- Stories: one per variant, one per size, a "matrix" story showing all combinations, loading, disabled, with icons, long label.
- A `play` test: clicking a disabled button doesn't fire `onClick`.

**Checkpoint:** Why default `type` to `"button"`? What's wrong with `isPrimary` and `isOutline` booleans?

### Lesson 4.3: Text and Heading

**Learn:** separate the semantic element from the visual style. An `h2` might need to look small; a `span` might need to look big. Props like `as` (limited to an allowed set of elements) plus `size`, `weight`, and `tone` (default, muted, accent). Typing a constrained `as` prop with a union.

**Build:** `Text` and `Heading` with variants backed by your type-scale tokens. Story showing every size next to its token name.

**Checkpoint:** Why not let `as` accept any element or component?

### Lesson 4.4: Layout primitives (and when not to build them)

**Learn:** the debate: `Stack`/`Box` components vs writing `flex flex-col gap-4` directly. Trade-offs: consistency and constrained spacing vs extra abstraction over a language you already have. Decide, and record it in `DECISIONS.md`.

**Build:** if you choose to build it, a `Stack` with `direction`, `gap` (limited to your spacing tokens), `align`, and `justify`. If not, write a short usage guide for layout utilities instead.

**Checkpoint:** Defend your choice in three sentences.

### Lesson 4.5: Badge, Card, Skeleton, VisuallyHidden

**Learn:** composition over configuration. Card as a set of parts (`Card`, `CardHeader`, `CardBody`, `CardFooter`) instead of `title`/`footer` props. Skeletons that match the shape of real content. Screen-reader-only text and when to use it.

**Build:** all four, each with full state coverage in Storybook. Badge gets `tone` variants; it doesn't know Pokémon types exist.

**Checkpoint:** Why does Badge not have a `pokemonType` prop?

### Lesson 4.6: The public API review

**Learn:** a design system's exports are a contract.

**Build:** export everything through `design-system/index.ts`. Ask your agent for a full design-system review against the design-system module: hardcoded values, inconsistent prop names, missing states, a11y gaps. Fix what it finds.

**Checkpoint:** Are your prop names consistent across components (is it `tone` everywhere, or `tone` in one place and `color` in another)?

> **Kickoff prompt:** "Phase 4, Lesson 4.2. Before any code, help me design the Button API. Challenge my prop choices, then let me implement it with cva and cn. Review it when I'm done."

## Phase 5: State, events, and interactive components (2 weeks)

Goal: you understand how React state actually works and can build interactive components that are fully keyboard and screen-reader accessible.

### Lesson 5.1: State and re-rendering

**Learn:** `useState`; state as a snapshot (why `setCount(count + 1)` twice only adds 1, and the updater-function fix); what triggers a re-render; derived state (compute it, don't store it); lifting state up to the nearest common parent.

**Build:** a `Counter` story that demonstrates the snapshot bug, then fix it. A `FavoriteToggle` button whose pressed state is reflected with `aria-pressed` and styled with an `aria-pressed:` variant.

**Checkpoint:** You have `items` and `filteredItems` in state. What's wrong with that?

### Lesson 5.2: Inputs, controlled vs uncontrolled

**Learn:** controlled inputs (`value` + `onChange`) vs uncontrolled (`defaultValue` + refs); typing change events; supporting both modes in a design-system component; associating labels, hints, and errors with `htmlFor`, `aria-describedby`, and `aria-invalid`; `useId` for generating those ids.

**Build:** an `Input` primitive plus a `Field` wrapper (label, hint, error). Stories for default, with hint, with error, disabled, and a `play` test that types into it.

**Checkpoint:** Why use `useId` instead of `Math.random()` for ids, especially in Next.js?

### Lesson 5.3: Effects, refs, and when not to use them

**Learn:** `useEffect` is for syncing with things outside React (timers, subscriptions, the DOM), not for deriving data or responding to events; cleanup functions; `useRef` for values that don't trigger renders and for DOM access; read the React docs page "You Might Not Need an Effect" twice.

**Build:** a `useDebouncedValue` hook with a unit test using fake timers. You'll use it for search in Phase 8.

**Checkpoint:** Name two things people use effects for that should be event handlers or plain calculations instead.

### Lesson 5.4: Keyboard and focus

**Learn:** the tab order; `tabIndex` 0 vs -1 (and never positive); roving tabindex; focus management when content appears or disappears; the WAI-ARIA Authoring Practices Guide as your reference for widget behavior.

**Build:** a `Switch` primitive (a `button` with `role="switch"` and `aria-checked`) with full keyboard support. Then a `SegmentedControl` (radio group behavior with arrow-key navigation) that you'll later use for list/grid view toggling.

**Checkpoint:** Which keys should move between options in a radio group, and which key moves focus out of the group?

> **Kickoff prompt:** "Phase 5, Lesson 5.1. Teach me the state-as-a-snapshot model with a tiny example I can run in Storybook. Ask me to predict the output before showing it."

## Phase 6: Composition patterns and headless libraries (1–2 weeks)

Goal: you can build components made of cooperating parts, and you know when to hand-roll a widget versus reach for a headless library.

### Lesson 6.1: Context and compound components

**Learn:** `createContext` and `useContext`; a custom hook that throws a helpful error when used outside its provider; the compound-component pattern (`Tabs`, `Tabs.List`, `Tabs.Trigger`, `Tabs.Panel`) that shares state through context; why compound APIs beat a `tabs={[...]}` config array.

**Build:** a `Tabs` component by hand: compound API, controlled and uncontrolled modes, arrow-key navigation, correct `role="tablist"`/`tab`/`tabpanel` wiring. You'll use it for the detail page (Stats / Evolutions / Moves).

**Checkpoint:** What happens if someone renders `Tabs.Trigger` outside `Tabs`, and how does your hook help them?

### Lesson 6.2: Slots and `asChild`

**Learn:** the `asChild` pattern (merge your props and behavior onto the consumer's single child, as Radix's `Slot` does) vs a polymorphic `as` prop; the classic use case: a Button that's really a Next.js `Link`.

**Build:** add `asChild` support to Button. Story: a Button rendered as a link.

**Checkpoint:** What does `asChild` give you that `<Link><Button/></Link>` doesn't? (Hint: nested interactive elements.)

### Lesson 6.3: Headless libraries

**Learn:** headless libraries (Radix Primitives, React Aria, Base UI, Ariakit) supply behavior and accessibility; you supply styling. Their trade-offs. This is how shadcn/ui works: copy-in components built on a headless library and styled with Tailwind.

**Build:** rebuild your Tabs on a headless library and compare the two line by line. Then build a `Select` (or a Combobox for type filtering) on the headless library, since a fully accessible combobox is too much to hand-roll well. Write a `DECISIONS.md` entry on which library you chose.

**Checkpoint:** List three behaviors the library handled that your hand-rolled Tabs got wrong or skipped.

> **Kickoff prompt:** "Phase 6, Lesson 6.1. Explain context and the compound-component pattern, then scaffold empty Tabs parts with TODOs. I'll implement the state and keyboard logic."

## Phase 7: Next.js fundamentals and a minimal data layer (2 weeks)

Goal: you understand the App Router's rendering model, and your app reads Gen 1 data from a local SQLite database that a seed script filled from PokéAPI. The database stays deliberately boring: seed once, read many. No writes from the app, no auth, no migrations beyond the first.

**Data flow:** PokéAPI → seed script (fetch, validate with Zod, map) → SQLite via Prisma → data-access functions → Server Components → your design-system components. PokéAPI is only touched at seed time, never while the app runs.

**Where things live:**

- `prisma/schema.prisma` and `prisma/seed.ts`
- `lib/db.ts`: the Prisma client
- `features/pokemon/api/`: PokéAPI fetchers and Zod schemas (used only by the seed)
- `features/pokemon/data/`: database queries that return domain types (used by the app)

### Lesson 7.1: The App Router mental model

**Learn:** file-based routing (`page.tsx`, `layout.tsx`, route segments, `[name]` dynamic segments); layouts persist across navigation; Server Components by default and what that means (they run on the server, can be `async`, can read the database directly, ship no JS); the `"use client"` boundary and what can cross it (serializable props, not functions or class instances).

**Build:** a root layout with a header and a themed background using your tokens. A placeholder `/pokemon/[name]` page that just prints the param.

**Checkpoint:** Can a Client Component import a Server Component? Can it render one passed as `children`? Why the difference?

### Lesson 7.2: Prisma and SQLite, minimally

**Learn:** what an ORM does; a Prisma schema (models, fields, relations); generating the client; one initial migration; the "one Prisma client per process" pattern for Next.js dev mode. Prisma's setup has changed across recent versions (client generation, config files, SQLite drivers), so follow the current docs, not old tutorials.

**Build:** a minimal schema, designed with your agent before writing it. A reasonable starting shape:

- `Pokemon`: id (national number), name, height, weight, sprite and artwork URLs, the six base stats as columns, and an optional `evolvesFrom` self-relation (which handles branching evolutions like Eevee for free)
- `Type`: name
- a many-to-many between `Pokemon` and `Type`, keeping slot order (primary vs secondary type)

**Checkpoint:** Why does a self-relation on `evolvesFrom` handle branching evolutions without a separate chain table?

### Lesson 7.3: The seed script

**Learn:** validating untrusted external data with Zod at the boundary; mapping a nested API response into your flat schema; making the seed idempotent (upserts, so running it twice is safe); being polite to a public API (sequential or small batches, not 151 parallel requests).

**Build:** `prisma/seed.ts` that fetches Gen 1 Pokémon, species, and evolution chains, validates them, and upserts. Unit-test the mapper functions with a saved fixture response. Wire it to your package's seed command.

**Checkpoint:** The API adds a field you didn't expect. What happens with your Zod schema? What if a field you rely on disappears?

### Lesson 7.4: The data-access layer

**Learn:** components never import Prisma. Data functions (`getPokemonList`, `getPokemonByName`, `getEvolutionLine`) return your domain types, not Prisma rows. The `server-only` package to make accidental client imports fail at build time.

**Build:** those three functions in `features/pokemon/data/`, each mapping Prisma results to domain types. Mark the module `server-only`.

**Checkpoint:** Your Storybook stories render `PokemonCard` without a database. What design choice makes that possible?

### Lesson 7.5: Rendering, routing, and caching

**Learn:** static vs dynamic rendering; `generateStaticParams` to prerender all 151 detail pages at build time; `loading.tsx` with Suspense, `error.tsx`, `not-found.tsx` and `notFound()`; `generateMetadata`; reading `searchParams`; `next/image` with `remotePatterns` for sprite hosts. Check the current Next.js docs on caching, since the defaults have changed between major versions.

**Build:** wire the placeholder detail page to `getPokemonByName`, call `notFound()` for unknown names, and prerender all 151. Add a loading skeleton built from your Skeleton primitive.

**Checkpoint:** After `next build`, which routes are static and which are dynamic, and why?

**A deployment note:** a local SQLite file is fine for learning and for static builds. If you later deploy to a serverless host, prerendering everything at build time keeps it working; runtime database reads may not. Revisit this only when you deploy.

> **Kickoff prompt:** "Phase 7, Lesson 7.2. Check the current Prisma docs for SQLite setup with Next.js, then help me design a minimal schema for Gen 1. Challenge my choices; I'll write the schema myself."

## Phase 8: Feature components and pages (2 weeks)

Goal: the Pokédex works end to end, and every Pokémon-specific component is a thin composition of your primitives.

### Lesson 8.1: Feature components in Storybook

**Learn:** feature components know the domain; primitives don't. A feature component that needs a one-off style is a signal that a primitive or token is missing. Shared mock fixtures (`features/pokemon/fixtures.ts`) so every story uses the same realistic data.

**Build**, each in Storybook first with mock domain objects:

- `TypeBadge`: wraps Badge, maps a type to its type-color tokens
- `StatBar`: a labeled bar for one base stat, accessible as a `meter` or with text alternatives
- `PokemonCard`: Card + artwork + name + number + TypeBadges; the whole card is one link
- `EvolutionLine`: linear, branching (Eevee), and no-evolution cases

**Checkpoint:** Count the raw Tailwind color classes in your feature components. The target is zero.

### Lesson 8.2: The list page

**Learn:** a Server Component page that reads the database and renders a grid; responsive grids from Phase 2; empty and error states; pagination vs infinite scroll trade-offs (for 151 items, rendering all of them may be the right answer, so measure before deciding).

**Build:** `/` rendering all Gen 1 Pokémon in a grid of PokemonCards, with a `loading.tsx` skeleton grid.

**Checkpoint:** How much client JavaScript does this page ship? Check the build output.

### Lesson 8.3: The detail page

**Learn:** composing a page from feature components; your hand-rolled or headless Tabs for sections; metadata per Pokémon; prev/next navigation by national number.

**Build:** `/pokemon/[name]` with artwork, types, height/weight, a StatBar per stat, and the evolution line in tabs. Prev/next links using Button with `asChild`.

**Checkpoint:** Which parts of this page needed `"use client"`, and could you push that boundary lower?

### Lesson 8.4: Search and filter with URL state

**Learn:** search params as state; reading them in a Server Component and updating them from a Client Component with the router; debouncing input with your Phase 5 hook; filtering in the database query vs in memory (for 151 rows, either works, so pick one and explain why).

**Build:** a `SearchBar` (your Input + Field) and a `TypeFilter` (your Select or Combobox). Both update the URL; the page re-renders with filtered results. Back button and shared links must work.

**Checkpoint:** Why is URL state better than `useState` for this? What's one case where it would be worse?

> **Kickoff prompt:** "Phase 8, Lesson 8.1. Review my primitives and tell me which ones PokemonCard should compose. Then let me build TypeBadge first; review it against the design-system module."

## Phase 9: Polish, testing, and quality (1–2 weeks)

Goal: the app is accessible, fast, and themeable, and you have tests that would catch regressions in your design system.

### Lesson 9.1: Dark mode and motion

**Learn:** respecting the system preference, persisting a user override, and avoiding a flash of the wrong theme on first load (a classic Server Components gotcha); motion tokens; `motion-safe:` for anything that moves.

**Build:** a theme toggle (your Switch or SegmentedControl) that flips the token layer. Subtle hover and page-enter motion, all disabled under reduced motion.

**Checkpoint:** If dark mode required editing a single component file, what went wrong in Phase 3?

### Lesson 9.2: Accessibility audit

**Learn:** automated checks catch maybe a third of issues; the rest needs a keyboard and a screen reader (VoiceOver on macOS, NVDA on Windows).

**Build:** run the a11y addon across every story and fix all violations. Then navigate the whole app by keyboard only, and once with a screen reader. Write down every problem before fixing any.

**Checkpoint:** Can a keyboard user search, filter, open a Pokémon, switch tabs, and get back, without a mouse?

### Lesson 9.3: Tests that earn their keep

**Learn:** what to test where: mappers and hooks in Vitest; component behavior in Storybook `play` functions; skip snapshot tests of markup. Running Storybook tests in CI (check Storybook's current testing docs).

**Build:** make sure every interactive primitive has at least one `play` test. Add a test script that runs unit and story tests together.

**Checkpoint:** Change a token value. Which tests should fail? (Ideally none; tokens are values, not behavior.)

### Lesson 9.4: Performance review

**Learn:** reading `next build` output; Lighthouse; image sizing with `next/image` `sizes`; finding accidental client bundles.

**Build:** get the list page to a Lighthouse performance score of 90 or higher on mobile. Write a `DECISIONS.md` entry on the biggest win.

**Checkpoint:** What was the largest piece of client JavaScript, and did it need to be there?

> **Kickoff prompt:** "Phase 9, Lesson 9.2. Give me an accessibility audit checklist for this app. I'll run it myself and bring you findings to prioritize."

## Capstones and progress tracker

Finish with three solo challenges, no agent help beyond review. They prove the skills transfer beyond the Pokédex.

1. **Rebrand in an hour.** Give the app a completely different look (new palette, radius, type) by editing only token files. If you touch a component, note why in `DECISIONS.md`.
2. **New primitive from zero.** Build a `Dialog` or `Tooltip` primitive: write the API proposal first, then implement, story every state, test keyboard behavior, and export it. Use it for a "compare two Pokémon" feature.
3. **Explain it back.** Record yourself (or write it up) walking through the codebase: the token layers, how a request for `/pokemon/pikachu` is served, where the client boundary sits, and why. If any part is shaky, that's your next study topic.

| Phase | Focus | Status | Notes |
| --- | --- | --- | --- |
| 0 | Setup and orientation | Not started |  |
| 1 | React + TypeScript foundations | Not started |  |
| 2 | Tailwind fundamentals | Not started |  |
| 3 | Design tokens | Not started |  |
| 4 | Primitive component patterns | Not started |  |
| 5 | State, events, interactivity | Not started |  |
| 6 | Composition and headless libraries | Not started |  |
| 7 | Next.js and minimal data layer | Not started |  |
| 8 | Feature components and pages | Not started |  |
| 9 | Polish, testing, quality | Not started |  |
| — | Capstones | Not started |  |

## Reference: good Tailwind and key resources

Use this table when reviewing your own components. Each row is a habit to build.

| Instead of | Write | Why |
| --- | --- | --- |
| `bg-[#3b82f6]`, `text-blue-500` in components | `bg-accent`, `text-fg-muted` | Semantic tokens make theming and rebranding a one-file change |
| `mt-[13px]` | `mt-3` | The spacing scale keeps rhythm consistent |
| Margins on every child | `gap-*` on the parent | One place controls spacing; no last-child hacks |
| `focus:ring-2` | `focus-visible:ring-2` | Rings show for keyboard users, not on every mouse click |
| `@apply` to dedupe classes | A React component | Components are the unit of reuse in Tailwind |
| Template-string class concatenation | `cn()` with `clsx` + `tailwind-merge` | Handles conditionals and override conflicts correctly |
| `isActive ? "bg-x" : ""` for widget state | `aria-selected:bg-x`, `data-[state=open]:bg-x` | Styles follow the accessible state, so they can't drift apart |
| `md:hidden` thinking "hide on medium only" | `hidden md:block` (mobile-first) | Breakpoint prefixes mean "this size and up" |
| Hover animations always on | `motion-safe:transition` | Respects reduced-motion preferences |
| Desktop-first layout, then shrink it | Unprefixed classes for mobile, then `sm:`/`md:`/`lg:` | Matches how Tailwind's breakpoints are designed |

**Resources** (official docs first; check versions against what's installed):

- React: [react.dev/learn](https://react.dev/learn), especially [You Might Not Need an Effect](https://react.dev/learn/you-might-not-need-an-effect)
- TypeScript: [the Handbook](https://www.typescriptlang.org/docs/handbook/intro.html) and the [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/)
- Next.js: [nextjs.org/docs](https://nextjs.org/docs) (App Router)
- Tailwind: [tailwindcss.com/docs](https://tailwindcss.com/docs), especially the theme variables and dark mode pages
- Storybook: [storybook.js.org/docs](https://storybook.js.org/docs)
- Variants: [cva](https://cva.style/docs) and [tailwind-merge](https://github.com/dcastil/tailwind-merge)
- Headless components: [Radix Primitives](https://www.radix-ui.com/primitives), [React Aria](https://react-spectrum.adobe.com/react-aria/), and [shadcn/ui](https://ui.shadcn.com) as a reference for Tailwind-styled patterns
- Accessibility: [WAI-ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/)
- Prisma: [prisma.io/docs](https://www.prisma.io/docs)
- Data: [PokéAPI docs](https://pokeapi.co/docs/v2)
