# 🎓 Collab Co.

A responsive web application designed to manage student team members — allowing you to add, view, and inspect the details of each team member efficiently. Ideal for academic project tracking or collaborative student environments.

---

## 📌 Project Description

**Collab Co.** is a full-stack web app developed with React, TypeScript, TailwindCSS, and React Query. It allows users to:

- Add new student team members.
- View a list of all added members.
- Click on individual members to view detailed information.
- Navigate seamlessly using client-side routing.

The goal of this application is to provide a simple and user-friendly interface for managing members of a student team in project-based environments.

---

## ⚙️ Tech Stack

| Category       | Technology                         |
|----------------|-------------------------------------|
| Frontend       | React + Vite + TypeScript          |
| Styling        | TailwindCSS                        |
| UI Components  | ShadCN UI                          |
| Routing        | React Router DOM                   |
| Data Handling  | @tanstack/react-query              |
| Notifications  | Sonner + Toaster                   |

---

## 📦 Installation Steps

To run this project locally, follow the instructions below:

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/your-team-name.git
cd your-team-name
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run Development Server

```bash
npm run dev
```

Visit [http://localhost:5173](http://localhost:5173) in your browser.

### 4. Build for Production

```bash
npm run build
```

---

## 🌐 API Endpoints (Client-side Routing)

This application uses client-side routing managed by React Router.

| Method | Route             | Description                         |
|--------|-------------------|-------------------------------------|
| GET    | `/`               | Home page                           |
| GET    | `/add-member`     | Form to add a new member            |
| GET    | `/view-members`   | List of all team members            |
| GET    | `/member/:id`     | Details of a single member          |
| GET    | `*`               | 404 - Page Not Found                |

All data fetching and caching is managed with `@tanstack/react-query`.

---

## ▶️ How to Run the App

After completing the installation steps:

- Start the development server using `npm run dev`.
- Visit [http://localhost:5173](http://localhost:5173) in your browser.
- Use the navigation bar or direct URLs to explore:

  - `/add-member` to add a student.
  - `/view-members` to see the list.
  - Click on a member to view details.



