import "./globals.css";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 to-rose-100 text-gray-800"
      >
        {children}
      </body>
    </html>
  );
}
