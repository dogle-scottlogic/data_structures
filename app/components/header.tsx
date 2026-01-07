export default function Header({ children }: { children: React.ReactNode }) {
    return (
        <h1 className="header font-heading text-primary text-center">{children}</h1>
    )
}