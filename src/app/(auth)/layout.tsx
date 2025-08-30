export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="grid place-content-center place-items-center min-h-screen gap-8">
      {children}
      <p>Powered by GitHub API</p>
    </div>
  );
}
