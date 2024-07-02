
import Link from "next/link";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Faq } from "@/components/FAQ";
import {IconBrandWhatsapp} from "@tabler/icons-react";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Faq />
      <Footer />

      {/* A Fixed Whatsapp Button on Bottom Right of the screen */}
      <Link
        href="https://wa.me/6287760062773"
        passHref={true}
        prefetch={false}
      >
        <IconBrandWhatsapp className="fixed bottom-12 right-12 z-50 p-2 bg-green-500 rounded-full cursor-pointer text-white" size={64} />
      </Link>
    </>
  );
}
