import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Sidebar } from './Sidebar';

export function Layout() {
  return (
    <div className="site">
      <Header />
      <div className="site__body">
        <Sidebar />
        <main className="site__main">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
