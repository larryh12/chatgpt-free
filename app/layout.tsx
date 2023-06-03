import './globals.css';
import Sidebar from '@/components/Sidebar';
import { SessionProvider } from '@/components/SessionProvider';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import Login from '@/components/Login';
import ClientProvider from '@/components/ClientProvider';

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
    <html data-theme="dark" lang="en">
      <body>
        <SessionProvider session={session}>
          {!session ? (
            <Login />
          ) : (
            <div className="flex">
              <Sidebar />
              <ClientProvider />
              <div className="flex-1">{children}</div>
            </div>
          )}
        </SessionProvider>
      </body>
    </html>
  );
}
