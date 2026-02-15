import { createRouter, createRoute, createRootRoute, RouterProvider } from '@tanstack/react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import LandingPage from './pages/LandingPage';
import TimerPage from './pages/TimerPage';
import CommunityPage from './pages/CommunityPage';
import NcertPage from './pages/NcertPage';
import NcertPdfViewerPage from './pages/NcertPdfViewerPage';
import PdfViewerPage from './pages/PdfViewerPage';
import TestSeriesPage from './pages/TestSeriesPage';
import DailyTargetPage from './pages/DailyTargetPage';
import AppLayout from './components/AppLayout';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

const rootRoute = createRootRoute({
  component: AppLayout,
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

const communityRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/community',
  component: CommunityPage,
});

const ncertRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/ncert',
  component: NcertPage,
});

const ncertPdfViewerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/ncert/viewer',
  component: NcertPdfViewerPage,
});

const pdfViewerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/pdf-viewer',
  component: PdfViewerPage,
});

const testSeriesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/test-series',
  component: TestSeriesPage,
});

const dailyTargetRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/daily-target',
  component: DailyTargetPage,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  timerRoute,
  communityRoute,
  ncertRoute,
  ncertPdfViewerRoute,
  pdfViewerRoute,
  testSeriesRoute,
  dailyTargetRoute,
]);

const router = createRouter({ routeTree, defaultNotFoundComponent: () => <LandingPage /> });

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
