# Utils Architecture Rules

This folder contains framework-agnostic core logic, platform adapters, and project-specific
composition code. The goal is to keep dependencies directional, responsibilities clear, and future
migrations inexpensive.

Key Rules:

| Type               | Goes in          |
| ------------------ | ---------------- |
| Defines Meaning    | `core/`          |
| Assembles Domains  | `compositional/` |
| Talks to Platforms | `adapter/`       |

Some functions sit between domains (e.g. filesystem vs. routing identity). Name them precisely and
place them where their **output meaning** belongs. Do not force them to feel pure, boundary
discomfort is normal.

## 1. Dependency Direction

`core <- core-domains (i18n, path, etc.) <- adapter <- compositional`

- Dependencies must always flow inwards
- No circular dependencies
- No adapter or compositional dependencies in `core`

## 2. Folder Responsibilities

### 2.1 `utils/core/`

Definitional logic - defines _what_ things are.

Rules:

- No framework API
- No filesystem or runtime assumptions
- Fully testable with plain node

#### `string/`

Pure string manipulation.

- No domain meaning

#### `path/`

Structural path logic.

- Path normalization
- Slug extraction
- No routing or localization intent

#### `i18n/`

Localization rules and models.

##### `locales/`

Defines what locales are.

- Locale lists and mappings
- Locale-to-Path semantics

##### `dict/`

Dictionary shape and validation.

- Dictionary files
- Schema builder
- Generic loader

### 2.2 `utils/adapter/`

Integration logic - connects `core` logic to external systems.

Rules:

- Thin wrappers only
- Replaceable without touching `core`

### 2.3 `utils/compositional/`

Compositional logic - assembles domains into project-specific behavior.

Rules:

- Allowed to depend on `core` and `adapter`
- Allowed to cache, memoize, and coordinate domains
- Not expected to be reusable outside the project
- Configured instances live here

## 3. Naming

The word "path" is overloaded here due to Astro's usage of it for localization. Be explicit about
path meaning and use it purely only for structural logic.

| Type                 | Examples                     |
| -------------------- | ---------------------------- |
| **URL Paths**        | `UrlPath`, `localizeUrlPath` |
| **Filesystem Paths** | `FsPath`, `normalizeFsPath`  |
| **Astro Paths**      | `LocalePath`                 |
