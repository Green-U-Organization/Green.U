import React from 'react'

type CardProps = {
    children: React.ReactNode;
    position?: string; //Positionnement de la Card (ex: top-10 left-5)
    className?: string; //Pour personnalisé le style du composant
    colStart: number;
    colEnd: number;
    rowStart: number;
    rowEnd: number;
}

const Card: React.FC<CardProps> = ({children, colStart, colEnd, rowStart, rowEnd, className= ""}) => {
    return (
        <div className={`relative m-10 row-start-${rowStart}, row-end-${rowEnd}, col-start-${colStart}, col-end-${colEnd}`}>
           <div className={`font-(family-name:--font-jersey) text-2xl py-4 px-8 relative bg-cardbackground ${className}`}>
               {/* Bordures */}
                <div className="absolute top-0 left-0 h-full w-2 bg-border"></div>
                <div className="absolute top-0 right-0 h-full w-2 bg-border"></div>
                <div className="absolute top-0 left-0 h-2 w-full bg-border"></div>
                <div className="absolute bottom-0 left-0 h-2 w-full bg-border"></div>

                {/* Pixels intérieurs */}
                <div className="absolute top-2 left-2 h-1 w-1 bg-border"></div>
                <div className="absolute top-2 right-2 h-1 w-1 bg-border"></div>
                <div className="absolute bottom-2 left-2 h-1 w-1 bg-border"></div>
                <div className="absolute bottom-2 right-2 h-1 w-1 bg-border"></div>

                {/* Contenu */}
                <div className='relative'>{children}</div>
            </div>
        </div>
    )
}

export default Card