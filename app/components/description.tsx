export default function Description({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="p-4 font-mono">
      <p>{children}</p>
    </div>
  );
}
