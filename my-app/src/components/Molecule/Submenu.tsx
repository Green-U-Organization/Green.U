// import React, { useState } from 'react';
// import Icon from '../Atom/Icon';
// import { SubmenuProps } from '@/utils/types';

// const Submenu: React.FC<SubmenuProps> = ({ iconList }) => {
//   //Local State
//   const [activeForm, setActiveForm] = useState<string | null>(null);

//   //Handlers
//   const handleIconClick = (icon: {
//     alt: string;
//     handleClick: () => void;
//     form: React.ReactNode;
//   }) => {
//     icon.handleClick();
//     setActiveForm(activeForm === icon.alt ? null : icon.alt);
//   };

//   return (
//     <section
//       className="_SUBMENU_SANDWICH_ absolute -top-0.5 -left-0.5 flex flex-col-reverse items-center justify-center rounded-t-xl border-2 border-b-0 bg-amber-100"
//       style={{
//         height: '50vw',
//         width: '10vw',
//       }}
//     >
//       <div className="relative flex h-[40vw] flex-col items-center justify-between">
//         {iconList.map((icon) => (
//           <div key={icon.src} className="relative">
//             <Icon
//               icon={{
//                 src: icon.src,
//                 alt: icon.alt,
//                 handleClick: () => handleIconClick(icon),
//               }}
//             />
//             {activeForm === icon.alt && (
//               <div
//                 className="absolute"
//                 style={{
//                   bottom: `${index + 1 * -10}vw`,
//                   left: '11vw',
//                 }}
//               >
//                 {icon.form}
//               </div>
//             )}
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// };

// export default Submenu;
