"use client"

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Home() {

  const [prout, setProut] = useState(true)
  return (
    <>
    <Link href='/test'>test</Link>
    </>
  );
}
