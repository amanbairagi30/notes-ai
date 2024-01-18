import NavBar from "./NavBar"

export default function layout({
    children,
}: {
    children: React.ReactNode
}) {
    return <>
        <NavBar />
        <main className="p-4 mx-auto max-w-7xl">{children}</main>
    </>
}
