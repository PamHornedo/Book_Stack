import { useState, FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { MdLogin, MdMenuBook } from 'react-icons/md';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError('');

      await login({ email, password });

      navigate('/');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12">
      <div className="glass w-full max-w-md space-y-6 p-8 sm:p-10">
        {/* Logo */}
        <div className="flex flex-col items-center gap-2">
          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent text-white">
            <MdMenuBook className="text-2xl" />
          </span>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Welcome back
          </h1>
          <p className="text-sm text-slate-500">Sign in to your account</p>
        </div>

        {error && (
          <div className="rounded-xl border border-red-200 bg-red-50/80 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label htmlFor="email" className="text-sm font-medium text-slate-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="glass-input"
              placeholder="you@example.com"
              required
              disabled={loading}
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="password" className="text-sm font-medium text-slate-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="glass-input"
              placeholder="••••••••"
              required
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-accent px-5 py-3 text-sm font-semibold text-white shadow-md shadow-accent/25 transition hover:bg-accent/90 disabled:opacity-50"
          >
            <MdLogin className="text-lg" />
            {loading ? 'Logging in…' : 'Login'}
          </button>
        </form>

        <p className="text-center text-sm text-slate-500">
          Don’t have an account?{' '}
          <Link to="/register" className="font-semibold text-accent no-underline hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
