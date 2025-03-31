import React from "react";

type CardProps = {
	children: React.ReactNode;
	className?: string;
};

const Card: React.FC<CardProps> = ({ children, className }) => {
	return (
        <div className={`font-(family-name:--font-jersey)  text-2xl relative bg-cardbackground w-4xl m-auto ${className}`}>
        {/* Bordures */}
        <div className="absolute top-0 left-0 h-full w-2 bg-border z-50"></div>
        <div className="absolute top-0 right-0 h-full w-2 bg-border z-50"></div>
        <div className="absolute top-0 left-0 h-2 w-full bg-border z-50"></div>
        <div className="absolute bottom-0 left-0 h-2 w-full bg-border z-50"></div>

			{/* Pixels intérieurs */}
			<div className="absolute top-2 left-2 h-1 w-1 bg-border"></div>
			<div className="absolute top-2 right-2 h-1 w-1 bg-border"></div>
			<div className="absolute bottom-2 left-2 h-1 w-1 bg-border"></div>
			<div className="absolute bottom-2 right-2 h-1 w-1 bg-border"></div>

			{/* Pixels extérieur corner */}
			{/* <div className="absolute top-0 left-1 h-1 w-1 bg-white"></div>
            <div className="absolute top-0 right-1 h-1 w-1 bg-white"></div>
            <div className="absolute bottom-0 left-1 h-1 w-1 bg-white"></div>
            <div className="absolute bottom-0 right-1 h-1 w-1 bg-white"></div> */}

			{/* Pixels extérieur */}
			<div className="absolute top-0 left-0 h-1 w-1 bg-white"></div>
			<div className="absolute top-0 right-0 h-1 w-1 bg-white"></div>
			<div className="absolute bottom-0 left-0 h-1 w-1 bg-white"></div>
			<div className="absolute bottom-0 right-0 h-1 w-1 bg-white"></div>

			{/* Pixels extérieur */}
			<div className="absolute top-1 left-0 h-1 w-1 bg-white"></div>
			<div className="absolute top-1 right-0 h-1 w-1 bg-white"></div>
			<div className="absolute bottom-1 left-0 h-1 w-1 bg-white"></div>
			<div className="absolute bottom-1 right-0 h-1 w-1 bg-white"></div>

			{/* Pixels extérieur */}
			<div className="absolute top-0 left-1 h-1 w-1 bg-white"></div>
			<div className="absolute top-0 right-1 h-1 w-1 bg-white"></div>
			<div className="absolute bottom-0 left-1 h-1 w-1 bg-white"></div>
			<div className="absolute bottom-0 right-1 h-1 w-1 bg-white"></div>

			{/* <div className="absolute top-0 left-0 h-1 w-1 bg-white"></div>
            <div className="absolute top-0 right-0 h-1 w-1 bg-white"></div>
            <div className="absolute bottom-0 left-0 h-1 w-1 bg-white"></div>
            <div className="absolute bottom-0 right-0 h-1 w-1 bg-white"></div> */}

			{/* Contenu */}
			{children}
		</div>
	);
};

export default Card;
