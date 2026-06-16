export const metadata = {
  title: "THE OUTERPOST",
  description: "Acquire what doesn't exist",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
