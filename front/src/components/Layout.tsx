import { NavBar } from './NavBar';

export function Layout({ children }: { children: React.ReactNode }) {
  const navBarHeight = 80;

  return (
    <div className='h-screen bg-gray-100'>
      <NavBar/>
      <div style={{height: `calc(100% - ${navBarHeight}px)`}}>
        {children}
      </div>
    </div>
  );
}
