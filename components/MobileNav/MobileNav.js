import mobileNav from './mobileNav.module.css';
import Link from "next/link";

export default function MobileNav() {
    return (
        <nav className={mobileNav.mobileNav}>
            <Link href="#notes">Notes</Link>
            <Link href="#tasks">Tasks</Link>
            <Link href="#labels">Labels</Link>
        </nav>
    );
}