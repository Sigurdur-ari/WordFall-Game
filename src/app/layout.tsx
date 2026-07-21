import "./globals.css";

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className="min-h-dvh flex items-center justify-center overflow-x-hidden bg-gradient-to-br from-amber-50 to-rose-100 text-gray-800"
      >
        {children}
      </body>
    </html>
  );
}
