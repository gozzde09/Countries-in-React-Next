"use client";
import Nav from "react-bootstrap/Nav";
import { usePathname } from "next/navigation";

export default function NavBar() {
  const pathname = usePathname();

  const NavLinkStyle = (isActive) => ({
    color: "#204764",
    backgroundColor: isActive ? "rgb(244, 237, 215)" : "transparent",
    cursor: " pointer",
    fontSize: "larger",
  });

  return (
    <>
      <h1 style={{ fontSize: 60 }}>Lära Länder</h1>
      <Nav className='justify-content-center' activeKey={pathname}>
        <Nav.Item>
          <Nav.Link style={NavLinkStyle(pathname === "/")} href='/'>
            Hemsida
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            style={NavLinkStyle(pathname.startsWith("/countries"))}
            // Detaljersida blir också aktiv
            href='/countries'>
            Länder
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </>
  );
}
