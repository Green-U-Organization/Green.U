import type { Metadata } from "next";
import { Geist, Geist_Mono, Jersey_15 } from "next/font/google";
import "./globals.css";
import ThemeApp from "@/components/ThemeApp";
import Card from "@/components/Card";
import Button from "@/components/Button";
import Card2 from "@/components/Card(old)";
import Checkbox from "@/components/Checkbox";
import Form from "@/components/Form";
import TextInput from "@/components/TextInput";
import Radio from "@/components/Radio";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const jersey15 = Jersey_15({
  variable: "--font-jersey",
  weight: "400",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Green-U",
  description: "Bienvenue sur Green-U, une plateforme moderne et élégante.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} ${jersey15.variable} antialiased`}>
        
      <ThemeApp>{children}</ThemeApp>

      <Radio/>

        {/*
        <Card>TEST COULEURS</Card>
        
        <Button>Bouton de Pierre</Button>    
        
        <Card>
        <u>Carte de Manu</u> <br />
        Sans fioriture, avec héritage
        </Card>

        <Card2>
          <u>Carte de Manu</u> <br />
          Avec ombrage
          </Card2>
          <Form>
            <TextInput></TextInput>
          </Form>
          <Button href="">Salut les poulets</Button>
          <Checkbox></Checkbox>
         */}

        </body>
    </html>
  );
}
