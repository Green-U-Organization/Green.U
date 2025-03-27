"use client"
import { useRouter } from "next/navigation"
import { useLanguage } from '../contexts/LanguageProvider'
import Card from "@/components/Card";
import Button from "@/components/Button";

export default function CGUPage() {

    const router = useRouter();
    const {translations} = useLanguage();

    const handleCloseTab = () => {
        // Tente de fermer l'onglet
        window.close();
        // Si "window.close()" échoue (car l'onglet n'a pas été ouvert par JavaScript), on redirige vers une autre page
        router.push("/signin");
      };

    return (

        <Card className="max-w-4xl mx-auto p-6">
            <h1 className="text-3xl font-bold text-shadow mb-4">{translations.cgutitle}</h1>           
            <section className="mb-6">
                <h2 className="text-xl font-semibold text-border">{translations.cgutitle1}</h2>
                <p>{translations.cgudesc1}</p>
            </section>           
            <section className="mb-6">
                <h2 className="text-xl font-semibold text-border">{translations.cgutitle2}</h2>
                <p>{translations.cgudesc2}</p>
            </section>           
            <section className="mb-6">
                <h2 className="text-xl font-semibold text-border">{translations.cgutitle3}</h2>
                <p>{translations.cgudesc3}</p>
            </section>          
            <section className="mb-6">
                <h2 className="text-xl font-semibold text-border">{translations.cgutitle4}</h2>
                <p>{translations.cgudesc4}</p>
            </section>           
            <section className="mb-6">
                <h2 className="text-xl font-semibold text-border">{translations.cgutitle5}</h2>
                <p>{translations.cgudesc5}</p>
            </section>         
            <section className="mb-6">
                <h2 className="text-xl font-semibold text-border">{translations.cgutitle6}</h2>
                <p>{translations.cgudesc6}</p>
            </section>         
            <section className="mb-6">
                <h2 className="text-xl font-semibold text-border">{translations.cgutitle7}</h2>
                <p>{translations.cgudesc7}</p>
            </section>         
            <section className="mb-6">
                <h2 className="text-xl font-semibold text-border">{translations.cgutitle8}</h2>
                <p>{translations.cgudesc8}</p>
            </section>            
            <section className="mb-6">
                <h2 className="text-xl font-semibold text-border">{translations.cgutitle9}</h2>
                <p>{translations.cgudesc9}</p>
            </section>         
            <section>
                <h2 className="text-xl font-semibold text-border">{translations.cgutitle10}</h2>
                <p>{translations.cgudesc10}<a href={translations.cguemailto} className="text-blue-600 underline">{translations.cguemail}</a>.</p>
            </section>
            <div className="flex justify-center">
                <Button type="button" onClick={handleCloseTab}>
                    {translations.close}
                </Button>
            </div>
        </Card>
    );
};

  