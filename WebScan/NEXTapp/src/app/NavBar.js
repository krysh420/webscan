"use client"
import Link from 'next/link'
import { usePathname } from 'next/navigation'


export default function NavBar(){
  const pathname = usePathname()
  return (
    <>
    <nav className="navbar navbar-expand-lg navbar-primary navbar-dark bg-primary">
    <div className="container-fluid">
        <Link className="navbar-brand" href="/">WebScan</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
            <a className={`nav-link ${pathname === '/' ? 'active' : ''}`} aria-current="page" href="/">Home</a>
            </li>
            <li className="nav-item">
            <Link className={`nav-link ${pathname === '/about' ? 'active' : ''}`} href="/about">About</Link>
            </li>
        </ul>
        </div>
    </div>
    </nav>
    </>
  )
}
