import Sidebar from '@/components/Sidebar';
import './globals.css';

export const metadata = {
  title: 'ChatGPT Free',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html data-theme="dark" lang="en">
      <div className="flex">
        <Sidebar />
        {/* ClientProvider - Notification */}
        <div className="flex-1">{children}</div>
      </div>
    </html>
  );
}
