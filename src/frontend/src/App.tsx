import { createRouter, createRoute, createRootRoute, RouterProvider, Outlet } from '@tanstack/react-router';
import LandingPage from './pages/LandingPage';
import TimerPage from './pages/TimerPage';

const rootRoute = createRootRoute({
  component: () => (
    <div className="min-h-screen">
      <Outlet />
    </div>
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: LandingPage,
});

const timerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/timer',
  component: TimerPage,
});

const routeTree = rootRoute.addChildren([indexRoute, timerRoute]);

const router = createRouter({ routeTree });

function App() {
  return (
    <div className="dark">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
