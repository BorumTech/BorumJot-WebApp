import mobileNav from './mobileNav.module.css';
import Link from "next/link";

export default function MobileNav() {
    return (
        <nav className={mobileNav.mobileNav}>
            <Link href="?list=labels">Labels</Link>
            <Link href="?list=notes">Notes</Link>
            <Link href="?list=tasks">Tasks</Link>
        </nav>
    );
}