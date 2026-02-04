# DevQ&A Frontend

This is the complete React frontend for the DevQ&A platform. All UI components, pages, routing, and API service layer are implemented.

## Features

✅ Complete UI with all pages and components  
✅ React Router with protected routes  
✅ Authentication context for global state  
✅ Axios service layer for API calls  
✅ Responsive design with CSS  
✅ Error handling and loading states  

## Getting Started

```bash
npm install
npm run dev
```

Frontend will run on http://localhost:5173

## Project Structure

```
client/
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/          # Page components
│   ├── context/        # Auth context
│   ├── services/       # API service layer
│   ├── types/          # TypeScript interfaces
│   ├── App.tsx         # Main app with routing
│   ├── main.tsx        # Entry point
│   └── index.css       # Global styles
├── public/             # Static assets
├── index.html          # HTML template
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## API Integration

The frontend is configured to call the backend API at `http://localhost:4000`.

All API calls are in `src/services/api.ts` - you don't need to modify these!

## Pages

- `/` - Home (question list)
- `/login` - Login page
- `/register` - Registration page
- `/ask` - Create question (protected)
- `/questions/:id` - Question detail with answers

## Notes

- The frontend is complete and ready to use
- Focus on building the backend to match the API calls
- Auth token is stored in localStorage
- Protected routes redirect to login if not authenticated
