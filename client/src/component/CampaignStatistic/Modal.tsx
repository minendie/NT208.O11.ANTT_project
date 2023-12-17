// import React from 'react';

// interface Participant {
//   name: string;
//   address: string;
//   email: string;
//   phone: string;
// }

// interface ParticipantsModalProps {
//   participants: Participant[];
//   onClose: () => void;
// }

// const ParticipantsModal: React.FC<ParticipantsModalProps> = ({
//   participants,
//   onClose,
// }) => {
//   return (
//     <div className="modal">
//       <div className="modal-content">
//         <h3>Participants</h3>
//         <table>
//           <thead>
//             <tr>
//               <th>Name</th>
//               <th>Address</th>
//               <th>Email</th>
//               <th>Phone</th>
//             </tr>
//           </thead>
//           <tbody>
//             {participants.map((participant, index) => (
//               <tr key={index}>
//                 <td>{participant.name}</td>
//                 <td>{participant.address}</td>
//                 <td>{participant.email}</td>
//                 <td>{participant.phone}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//         <button onClick={onClose}>Close</button>
//       </div>
//     </div>
//   );
// };

// export default ParticipantsModal;

import React, { ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

export default Modal;