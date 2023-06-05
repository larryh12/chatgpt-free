import './globals.css';
import Sidebar from '@/components/Sidebar';
import { SessionProvider } from '@/components/SessionProvider';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import Login from '@/components/Login';

export const metadata = {
  title: 'ChatGPT Free',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body>
        <SessionProvider session={session}>
          {!session ? (
            <Login />
          ) : (
            <div className="drawer md:drawer-open">
              <input id="my-drawer" type="checkbox" className="drawer-toggle" />
              <div className="drawer-content flex h-screen flex-col justify-center">
                {children}
              </div>
              <div className="drawer-side h-screen">
                <label htmlFor="my-drawer" className="drawer-overlay"></label>
                <Sidebar />
              </div>
            </div>
          )}
        </SessionProvider>
      </body>
    </html>
  );
}
