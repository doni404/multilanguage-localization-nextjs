// components/Navbar.tsx
import React from "react";
import Link from "next/link";
import styles from '@/styles/Home.module.css'

const Navbar = () => {
  return (
    <div className={styles.center}>
      <div className="flex-1">
        <a className="btn btn-ghost normal-case text-xl">Menu</a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/contact">Contact</Link>
          </li>
          <li>
            <Link href="/about">About</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};
export default Navbar;
