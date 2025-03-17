import React from 'react'

type CardProps = {
    children: React.ReactNode;
    position?: string; //Positionnement de la Card (ex: top-10 left-5)
    className?: string; //Pour personnalisé le style du composant
}

const Card: React.FC<CardProps> = ({children, position = "top-0 left-0 ", className= ""}) => {
    return (
        <div className={`relative m-10 ${position}`}>
           <div className={`font-(family-name:--font-jersey) text-2xl py-4 px-8 relative bg-amber-50 ${className}`}>
               {/* Bordures */}
                <div className="absolute top-0 left-0 h-full w-2 bg-amber-500"></div>
                <div className="absolute top-0 right-0 h-full w-2 bg-amber-500"></div>
                <div className="absolute top-0 left-0 h-2 w-full bg-amber-500"></div>
                <div className="absolute bottom-0 left-0 h-2 w-full bg-amber-500"></div>

                {/* Pixels intérieurs */}
                <div className="absolute top-2 left-2 h-1 w-1 bg-amber-500"></div>
                <div className="absolute top-2 right-2 h-1 w-1 bg-amber-500"></div>
                <div className="absolute bottom-2 left-2 h-1 w-1 bg-amber-500"></div>
                <div className="absolute bottom-2 right-2 h-1 w-1 bg-amber-500"></div>

                {/* Contenu */}
                <div className='relative'>{children}</div>
            </div>
        </div>
    )
}

export default Card