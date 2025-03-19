"use client"
import Image from 'next/image'
import { FaHeart, FaMapMarkerAlt, FaInstagram, FaFacebook, FaEnvelope } from 'react-icons/fa'
import Card from "@/components/Card"
import Button from "@/components/Button"
import { useRouter } from "next/navigation"

export default function GardenerProfile() {
    
    const router = useRouter()

    // Simuler les données d'XP, de badges et de likes
    const xp = 300 // XP actuel (NE PAS DEPASSER LE maxXp!!!)
    const maxXp = 500 // XP nécessaire pour le niveau max
    const likes = 120 // Nombre de likes

    // Définition des badges en fonction du niveau d'XP
    const badges = [
        { level: 100, name: "🌱 Novice Gardener" },
        { level: 200, name: "🌿 Skilled Gardener" },
        { level: 300, name: "🌻 Expert Gardener" },
        { level: 500, name: "🌳 Master Gardener" }
    ];

    //Détermination des badges débloqués
    const unlockedBadges = badges.filter(badge => xp >= badge.level)

    // Liste des jardins où il est actif
    const gardens = [
        { name: "Community Garden", role: "Volunteer"},
        { name: "Eco-Permaculture Project", role: "Lead Gardener"},
        { name: "Urban Rooftop Garden", role: "Consultant"}
    ];

    return (
    <div className="flex justify-center items-center">
        <Card className="flex flex-col p-5 pt-5 max-w-150">
            {/* Profil Header */}
            <div className="flex items-center space-x-4">
                <Image
                    src="/image/avatars/PI_05.png"
                    alt="Profile picture"
                    width={96}
                    height={96}
                    className="rounded-full border-4 border-border"
                />
                <div>
                    <h1 className="text-3xl font-bold">Jean Dupont</h1>
                    <p className="flex items-center gap-1 text-shadow "><FaMapMarkerAlt /> 1000-Bruxelles</p>
                </div>
            </div>
        
            {/* Présentation */}
            <p className="mt-5 text-gray-700">Passionate about gardening for 10 years, I love experimenting with permaculture and helping the community create sustainable gardens.</p>
            
            {/* XP et Badges */}
            <div className="mt-5">
                <h2 className="text-2xl font-semibold">🏆 Experience & Badges</h2>

                {/* Barre d'XP */}
                <div className='w-full bg-bgbutton rounded-full h-4 mt-2'>
                    <div className="bg-green-500 h-4 rounded-full" style={{ width: `${(xp / maxXp) * 100}%` }}></div>
                </div>
                <p className="text-gray-700 mt-1">{xp} / {maxXp} XP</p>

                {/* Badges débloqués */}
                <div className='flex flex-wrap gap-2 mt-3'>
                    {unlockedBadges.map((badge, index) => (
                        <span key={index} className='bg-green-900 text-gray-300 px-3 py-1 rounded-full text-2xl'>
                            {badge.name}
                        </span>
                    ))}
                </div>
            </div>

            {/* Likes */}
            <div className="mt-5 flex items-center gap-2">
                <FaHeart className="text-red-500" />
                <p className="text-gray-700 font-semibold">{likes} Likes</p>
            </div>

            {/* Liste des jardins */}
            <div className="mt-5">
                <h2 className="text-2xl font-semibold mb-2">🌿 Gardens Participating</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                     {/* ROUTE A AJOUTER AVEC L'ID DU JARDIN POUR Y ACCEDER */}
                    {gardens.map((garden, index) => (
                        <a key={index} href={`/garden/${index}`} className="block bg-bgbutton shadow-md rounded-lg p-4 border border-gray-200 hover:shadow-lg transition-all">
                            <h3 className="text-lg font-semibold text-green-700">{garden.name}</h3>
                            <p className="text-sm text-gray-500">{garden.role}</p>
                        </a>
                    ))}
                </div>
            </div>

            {/* Compétences */}
            <div className="mt-5">
                <h2 className="text-2xl font-semibold">🌱 Specialties</h2>
                <ul className="list-disc list-inside text-gray-700">
                    <li>Permaculture & organic vegetable gardens</li>
                    <li>Creation and maintenance of gardens</li>
                    <li>Composting and natural recycling</li>
                </ul>
            </div>
        
            {/* Réalisations */}
            <div className="mt-5">
                <h2 className="text-2xl font-semibold">🏡 Achievements</h2>
                <p className="text-gray-700">I recently set up a community vegetable garden and designed an ecological pond attracting local biodiversity.</p>
            </div>
        
            {/* Réseaux Sociaux */}
            <div className="mt-5">
                <h2 className="text-2xl font-semibold">📢 Contact & Networks</h2>
                <div className="flex space-x-4 mt-2 text-border">
                    <a href="#" target='_blank' className="hover:text-shadow"><FaInstagram /></a>
                    <a href="#" target='_blank' className="hover:text-shadow"><FaFacebook /></a>
                    <a href="mailto:jean.dupont@gmail.com" className="hover:text-shadow"><FaEnvelope /></a>
                </div>
            </div>

            <div className="flex justify-center mt-auto p-2">
                {/* A VOIR SI C'EST NECESSAIRE ET OU ALLER */}
                <Button type="submit" handleSubmit ={() => router.push("/login")}>
                    Back
                </Button>
                {/* ID DU USER A TRANSMETTRE POUR L'EDITION DU PROFILE */}
                <Button type="submit" handleSubmit ={() => router.push("/editProfile")}>
                    Edit
                </Button>
            </div>
        </Card>
    </div>
    )
}
