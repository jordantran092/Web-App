
# Minto – Hierarchical Document Workspace App

## Overview

**Minto** is a full-stack productivity web application designed for organizing, managing, and editing hierarchical documents and notes. It provides users with a centralized workspace for creating, favoriting, and searching through documents with a modern, intuitive interface.

**Live Site:** [minto-jt.vercel.app](https://minto-jt.vercel.app)

---

## Key Features

- **Document Organization** – Create and manage a hierarchical library of documents, incorporating debounced autosave and breadcrumb navigation of parent pages
- **Full-Text Search** – Debounced search across all documents with a command-menu interface (FTS)
- **Authentication** – Secure user authentication powered by Better Auth
- **Rich Text Editing** – Edit documents with BlockNote
- **Responsive Design** – Supports different screen sizes built with Tailwind CSS
- **Favorites System** – Star and pin frequently accessed documents for quick access in the sidebar and library

---

## Tech Stack

### Frontend
- **Next.js** – React-based full-stack framework with App Router
- **TypeScript** – Type-safe development
- **React** – Latest React features and hooks
- **Tailwind CSS 4** – Utility-first styling
- **Mantine UI 8** – Component library with hooks
- **BlockNote 0.52** – Rich text editor with React integration
- **shadcn/ui** – Customizable component library

### Backend & Database
- **Prisma ORM** 
- **PostgreSQL**
- **Better Auth** – Authentication framework (built-in session management)
- **Next.js Server Actions** – Server-side endpoint-like operations

### Deployment
- **Vercel** 


---

## Features in Detail

### Full-Text Search
The FTS Menu component enables:
- Fast keyword-based search across all documents
- Command palette-style interface
- Real-time search results

### Authentication
- Session-based authentication and ownership-based authorization across all page operations

### Pages
- Intuitive title renaming
- Breadcrumb navigation of parent pages
- Favoriting page
- Deleting page
- Debounced autosave, manual keyboard shortcut saving with UI indicator
- Updates to page reflect changes to connected pages (e.g. descendant pages cannot exist without parent)


### Rich Text Editing
- Block-based editing (paragraphs, headings, lists, code blocks, etc.)
- Custom blocks and menus (e.g. blocks for page manipulation)


### Library View
Users can browse all documents in an organized library with:
- **All Pages Tab** – View complete document collection
- **Favorites Tab** – Quick access to starred documents
- **Create New** – One-click document creation



---

## Project Structure

- **app/** – Next.js App Router
  - `page.tsx` – Home page with document library
  - `layout.tsx` – Root layout wrapper
  - `generated/prisma/client` – Prisma generated types

- **components/** – React components
  - `library/` – Library view components
  - `sidebar/` – Sidebar navigation
  - `ui/` – Base UI components

- **actions/** – Server actions (AuthActions, PageActions)
- **services/** – Service layer (PageService, etc.)
- **lib/** – Utilities (auth, utils)
- **prisma/** – Database schema & migrations
- **public/** – Static assets








