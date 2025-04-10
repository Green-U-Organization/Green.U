"use client"
import { useEffect, useState  } from "react";
import { useRouter, usePathname } from "next/navigation"
import { useLanguage } from '../contexts/LanguageProvider'
import Card from "@/components/Card";
import Button from "@/components/Button";


export default function CGUPage() {

    const router = useRouter();
    const pathname = usePathname(); //Contient l'url actuelle
    const [locale, setLocale] = useState("en");
    const {translations} = useLanguage();

    //Mise à jour de la langue au montage depuis localStorage
    useEffect(() => {
        const storedLocale = localStorage.getItem("locale");
        if (storedLocale) {
        setLocale(storedLocale);
        }
    }, [pathname]); //Recharge la page quand l'url change

    const handleCloseTab = () => {
        // Tente de fermer l'onglet
        window.close();
        // Si "window.close()" échoue (car l'onglet n'a pas été ouvert par JavaScript), on redirige vers une autre page
        router.push("/signin");
      };

    const cguContent = {
        fr: (
        <>
            <h1 className="text-3xl font-bold text-shadow mb-4">Conditions Générales d&apos;Utilisation (CGU)</h1>           
            <section className="mb-6">
                <h2 className="text-xl font-semibold text-border">1. Présentation de la plateforme</h2>
                <p>Green-U est une plateforme de services destinée aux particuliers et professionnels, permettant la création de comptes utilisateurs et la publication de contenu.</p>
            </section>           
            <section className="mb-6">
                <h2 className="text-xl font-semibold text-border">2. Objet</h2>
                <p>Les présentes Conditions Générales d&apos;Utilisation (CGU) régissent l&apos;accès et l&apos;utilisation de la plateforme Green-U.</p>
            </section>           
            <section className="mb-6">
                <h2 className="text-xl font-semibold text-border">3. Services proposés</h2>
                <p>Green-U permet aux utilisateurs de publier des services, rechercher des prestations, et accéder à des offres proposées par des professionnels et des particuliers.</p>
            </section>          
            <section className="mb-6">
                <h2 className="text-xl font-semibold text-border">4. Création de compte</h2>
                <p>Les utilisateurs doivent créer un compte pour accéder à certaines fonctionnalités de la plateforme. Lors de l&apos;inscription, des données personnelles seront collectées.</p>
            </section>           
            <section className="mb-6">
                <h2 className="text-xl font-semibold text-border">5. Collecte et stockage des données</h2>
                <p>Les données personnelles collectées lors de l&apos;inscription ou de l&apos;utilisation de la plateforme sont stockées dans une base de données pour les besoins du service. Ces données seront traitées conformément à notre politique de confidentialité.</p>
            </section>         
            <section className="mb-6">
                <h2 className="text-xl font-semibold text-border">6. Politique de confidentialité</h2>
                <p>La politique de confidentialité décrit la manière dont les données personnelles sont collectées, utilisées, stockées et protégées. Elle est disponible sur la plateforme Green-U.</p>
            </section>         
            <section className="mb-6">
                <h2 className="text-xl font-semibold text-border">7. Responsabilités</h2>
                <p>L&apos;utilisateur s&apos;engage à respecter les lois en vigueur et à ne pas publier de contenu illégal, diffamatoire ou offensant sur la plateforme.</p>
            </section>         
            <section className="mb-6">
                <h2 className="text-xl font-semibold text-border">8. Propriété intellectuelle</h2>
                <p>Tous les contenus (textes, images, logos, etc.) présents sur la plateforme Green-U sont protégés par le droit d&apos;auteur et autres droits de propriété intellectuelle.</p>
            </section>            
            <section className="mb-6">
                <h2 className="text-xl font-semibold text-border">9. Modification des CGU</h2>
                <p>Green-U se réserve le droit de modifier ces CGU à tout moment. Toute modification sera effective dès sa publication sur la plateforme.</p>
            </section>         
            <section>
                <h2 className="text-xl font-semibold text-border">10. Contact</h2>
                <p>Pour toute question, vous pouvez nous contacter par email à : <a href="mailto:greenu4000@gmail.com" className="text-blue-600 underline">greenu4000@gmail.com</a>.</p>
            </section>
        </>
        ),
        en: (
            <>
            <h1 className="text-3xl font-bold text-shadow mb-4">Terms of Use (ToU)</h1>
            <section className="mb-6">
                <h2 className="text-xl font-semibold text-border">1. Platform Overview</h2>
                <p>Green-U is a service platform for individuals and professionals, allowing user account creation and content publishing.</p>
            </section>
            <section className="mb-6">
                <h2 className="text-xl font-semibold text-border">2. Purpose</h2>
                <p>These Terms of Use (ToU) govern access to and use of the Green-U platform.</p>
            </section>
            <section className="mb-6">
                <h2 className="text-xl font-semibold text-border">3. Services Offered</h2>
                <p>Green-U allows users to publish services, search for jobs, and access offers from professionals and individuals.</p>
            </section>
            <section className="mb-6">
                <h2 className="text-xl font-semibold text-border">4. Account Creation</h2>
                <p>Users must create an account to access certain platform features. Personal data will be collected during registration.</p>
            </section>
            <section className="mb-6">
                <h2 className="text-xl font-semibold text-border">5. Data collection and storage</h2>
                <p>Personal data collected during registration or use of the platform is stored in a database for the purposes of the service. This data will be processed in accordance with our privacy policy.</p>
            </section>
            <section className="mb-6">
                <h2 className="text-xl font-semibold text-border">6. Privacy Policy</h2>
                <p>The privacy policy describes how personal data is collected, used, stored, and protected. It is available on the Green-U platform.</p>
            </section>
            <section className="mb-6">
                <h2 className="text-xl font-semibold text-border">7. Responsibilities</h2>
                <p>The user agrees to comply with applicable laws and not to publish illegal, defamatory or offensive content on the platform.</p>
            </section>
            <section className="mb-6">
                <h2 className="text-xl font-semibold text-border">8. Intellectual property</h2>
                <p>All content (texts, images, logos, etc.) on the Green-U platform is protected by copyright and other intellectual property rights.</p>
            </section>
            <section className="mb-6">
                <h2 className="text-xl font-semibold text-border">9. Modification of the T&Cs</h2>
                <p>Green-U reserves the right to modify these Terms of Use at any time. Any modification will be effective as soon as it is published on the platform.</p>
            </section>
            <section>
                <h2 className="text-xl font-semibold text-border">10. Contact</h2>
                <p>
                    For any inquiries, contact us via email at:{" "}
                    <a href="mailto:greenu4000@gmail.com" className="text-blue-600 underline">
                        greenu4000@gmail.com
                    </a>.
                </p>
            </section>
        </>
        ),
    };

    return (
        <Card className="max-w-4xl mx-auto p-6">
            {cguContent[locale as "en" | "fr"] || cguContent.en}
            <div className="flex justify-center">
                <Button type="button" onClick={handleCloseTab}>
                        {translations.close}
                </Button>
            </div>
        </Card>
    );
};

  