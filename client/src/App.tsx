import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import AddBook from './pages/AddBook';
import BookDetail from './pages/BookDetail';
import { MdAdd } from 'react-icons/md';

/** Floating "Add Review" button — visible only when logged in */
const Fab = () => {
  const { user } = useAuth();
  if (!user) return null;
  return (
    <Link
      to="/add-book"
      className="fixed bottom-8 right-8 z-50 flex items-center gap-2 rounded-full bg-accent px-5 py-3
                 text-sm font-semibold text-white shadow-lg shadow-accent/30
                 transition hover:bg-accent/90 hover:shadow-xl"
    >
      <MdAdd className="text-xl" />
      Add Review
    </Link>
  );
};

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="min-h-screen">
          <Navbar />

          <Routes>
            {/* Auth pages — centered, no sidebar */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Content pages — wrapped with sidebar Layout */}
            <Route
              path="/"
              element={
                <Layout>
                  <Home />
                </Layout>
              }
            />
            <Route
              path="/books/:id"
              element={
                <Layout>
                  <BookDetail />
                </Layout>
              }
            />
            <Route
              path="/add-book"
              element={
                <ProtectedRoute>
                  <Layout>
                    <AddBook />
                  </Layout>
                </ProtectedRoute>
              }
            />
          </Routes>

          <Fab />
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
