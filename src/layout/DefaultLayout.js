// import React from 'react'
// import { AppContent, AppSidebar, AppFooter, AppHeader } from '../components/index'

// const DefaultLayout = () => {
//   return (
//     <div>
//       <AppSidebar />
//       <div className="wrapper d-flex flex-column min-vh-100">
//         <AppHeader />
//         <div className="body flex-grow-1">
//           <AppContent />
//         </div>
//         <AppFooter />
//       </div>
//     </div>
//   )
// }

// export default DefaultLayout


import React from 'react';
import { useLocation } from 'react-router-dom';
import { AppContent, AppSidebar, AppSidebar1, AppFooter, AppHeader } from '../components/index';

const DefaultLayout = () => {
  const location = useLocation();

  // Determine the role based on the current path
  const isAdmin = location.pathname.includes('/dashboard');

  return (
    <div>
      {isAdmin ? (
        <AppSidebar />
      ) : (
        <AppSidebar1 />
      )}
      <div className="wrapper d-flex flex-column min-vh-100">
        <AppHeader />
        <div className="body flex-grow-1">
          <AppContent />
        </div>
        <AppFooter />
      </div>
    </div>
  );
}

export default DefaultLayout;

