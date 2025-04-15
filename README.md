Sure! Here's a clean, comprehensive `README.md` for your **Earthquake Visualizer** project:

---

```md
# 🌍 Earthquake Visualizer

A single-page React application that visualizes earthquake data on an interactive plot and in a dynamic table. Built with Vite, TypeScript, Zustand, TanStack Query, Recharts, and Tailwind CSS, this app fetches real-time geospatial data from the USGS Earthquake dataset.

---

## 🚀 Features

- 📊 **Interactive Scatter Plot** (Recharts)  
  Visualize earthquake data with user-selectable axes (magnitude, depth, coordinates, etc.)

- 📋 **Tabular View**  
  A responsive data table showing all earthquake entries with synchronized highlighting.

- 🔄 **Bidirectional Highlighting**  
  Hovering or clicking a table row highlights the corresponding plot point and vice versa.

- 🔎 **Filtering & Search**  
  Filter data by magnitude, depth, or location for focused exploration.

- ⚙️ **State Management**  
  Uses Prop Drilling, React Context, and Zustand to manage selected/highlighted data and interactions.

- 🌐 **Live Data**  
  Data fetched from [USGS Earthquake CSV feed](https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.csv) and parsed via `papaparse`.

---

## 🧱 Tech Stack

| Tool            | Purpose                                |
|-----------------|----------------------------------------|
| React + TypeScript | UI and Type Safety                    |
| Vite            | Fast dev server & bundling             |
| Tailwind CSS    | Utility-first styling                  |
| Zustand         | Global state management                |
| React Context   | Shared state across nested components  |
| TanStack Query  | Asynchronous data fetching + caching   |
| Recharts        | Plotting data                          |
| PapaParse       | CSV data parsing                       |

---

## 🛠️ Getting Started

### 📦 Install dependencies

```bash
npm install
```

### 🧪 Run the app locally

```bash
npm run dev
```

The app should now be running at `http://localhost:5173`

---

## 📁 Folder Structure

```
src/
├─ components/         # Reusable UI components
├─ hooks/              # Custom hooks (e.g., for highlighting)
├─ store/              # Zustand store
├─ utils/              # Data fetching/parsing utilities
├─ App.tsx             # Main layout
├─ main.tsx            # Vite entrypoint
├─ index.css           # Tailwind entrypoint
```

---



## 🧠 Extra Features

- Debounced filtering for better performance
- Lazy loading and memoization to handle large datasets
- Responsive layout with sticky headers for large tables

---

## 🤖 AI Usage Disclosure

Original code optimization, state logic, and README generation, were assisted [ChatGPT](https://openai.com/chatgpt) for brainstorming and code generation.
