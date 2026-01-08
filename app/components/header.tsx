export default function Header({ children }: { children: React.ReactNode }) {
  return (
    <h1 className="font-heading text-primary text-center text-xl p-4 m-4">
      {children}
    </h1>
  );
}
