import { 
  BrickWallShield, CircleDollarSign, Command, FilePlus, Handbag, ShieldUser, UserPen, Users 
} from 'lucide-react';
import React, { useState } from 'react';
import { NavLink, Outlet } from 'react-router';
import useAuth from '../Hooks/useAuth';
import useRole from '../Hooks/useRole';
import ScreenLoading from '../Components/Animation/ScreenLoading/ScreenLoading';

const DashboardLayout2 = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, loading } = useAuth();
  const { role, isLoading:roleLoading } = useRole();
  const activeLink = ({ isActive }) =>
    `flex items-center gap-3 p-3 rounded-xl transition-all duration-300 cursor-pointer ${
      isActive
        ? 'bg-indigo-500/40 text-indigo-700 shadow-sm'
        : 'text-gray-700 hover:text-indigo-600 hover:bg-indigo-500/20'
    }`;
  
  if (roleLoading || loading) {
    return <ScreenLoading />
  }
  
  

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden overflow-x-auto">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex bg-white border-r border-gray-200 flex-col w-64">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h1 className="font-bold text-lg text-gray-700">Dashboard</h1>
        </div>
        <ul className="flex-1 p-2 space-y-2 overflow-y-auto">
          <li>
            <NavLink to="/" className={activeLink}>
              <Handbag size={20} className="text-indigo-500"/>
              <span>Homepage</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/my-bookings" className={activeLink}>
              <Handbag size={20} className="text-indigo-500"/>
              <span>My Bookings</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/my-profile" className={activeLink}>
              <UserPen size={20} className="text-indigo-500"/>
              <span>My Profile</span>
            </NavLink>
          </li>

          {role === 'admin' &&
            <>
            <li>
            <NavLink to="/dashboard/manage-users" className={activeLink}>
              <Users size={20} className="text-indigo-500"/>
              <span>Manage Users</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/add-new-service" className={activeLink}>
              <FilePlus size={20} className="text-indigo-500"/>
              <span>Add Service</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/manage-services" className={activeLink}>
              <BrickWallShield size={20} className="text-indigo-500"/>
              <span>Manage Services</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/manage-bookings" className={activeLink}>
              <Command size={20} className="text-indigo-500"/>
              <span>Manage Bookings</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/manage-decorators" className={activeLink}>
              <ShieldUser size={20} className="text-indigo-500"/>
              <span>Manage Decorators</span>
            </NavLink>
          </li>
          
          </>
          }
          
          <li>
            <NavLink to="/dashboard/earnings-summery" className={activeLink}>
              <CircleDollarSign size={20} className="text-indigo-500"/>
              <span>Earnings Summary</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/my-assigned-projects" className={activeLink}>
              <FilePlus size={20} className="text-indigo-500"/>
              <span>My Assigned Projects</span>
            </NavLink>
          </li>
        </ul>
      </aside>

      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-0 z-[1000] lg:hidden flex transition-transform ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Overlay */}
        <div
          className="absolute inset-0 bg-black/30"
          onClick={() => setSidebarOpen(false)}
        ></div>

        {/* Sidebar */}
        <aside className="relative bg-white w-64 h-full shadow-xl flex flex-col overflow-y-auto">
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h1 className="font-bold text-lg text-gray-700">Dashboard</h1>
            <button
              onClick={() => setSidebarOpen(false)}
              className="p-1 rounded hover:bg-gray-100"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                strokeWidth="2"
                fill="none"
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path d="M6 6l12 12M6 18L18 6"/>
              </svg>
            </button>
          </div>
          <ul className="flex-1 p-2 space-y-2 min-h-[calc(100vh-64px)]">
            <li>
              <NavLink to="/" className={activeLink}>
                <Handbag size={20} className="text-indigo-500"/>
                <span>Homepage</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/my-bookings" className={activeLink}>
                <Handbag size={20} className="text-indigo-500"/>
                <span>My Bookings</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/my-profile" className={activeLink}>
                <UserPen size={20} className="text-indigo-500"/>
                <span>My Profile</span>
              </NavLink>
            </li>

            {role === 'admin' &&
              
              <>
              <li>
              <NavLink to="/dashboard/manage-users" className={activeLink}>
                <Users size={20} className="text-indigo-500"/>
                <span>Manage Users</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/add-new-service" className={activeLink}>
                <FilePlus size={20} className="text-indigo-500"/>
                <span>Add Service</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/manage-services" className={activeLink}>
                <BrickWallShield size={20} className="text-indigo-500"/>
                <span>Manage Services</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/manage-bookings" className={activeLink}>
                <Command size={20} className="text-indigo-500"/>
                <span>Manage Bookings</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/manage-decorators" className={activeLink}>
                <ShieldUser size={20} className="text-indigo-500"/>
                <span>Manage Decorators</span>
              </NavLink>
            </li>
            
            
            
            </>
            
            
            }
            
            <li>
              <NavLink to="/dashboard/earnings-summery" className={activeLink}>
                <CircleDollarSign size={20} className="text-indigo-500"/>
                <span>Earnings Summary</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/my-assigned-projects" className={activeLink}>
                <FilePlus size={20} className="text-indigo-500"/>
                <span>My Assigned Projects</span>
              </NavLink>
            </li>
          </ul>
        </aside>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <nav className="flex items-center justify-between p-4 bg-white shadow sticky top-0 z-50">
          <button
            className="lg:hidden p-2 rounded hover:bg-gray-100"
            onClick={() => setSidebarOpen(true)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth="2" fill="none" stroke="currentColor" className="w-6 h-6 text-gray-700">
              <path d="M4 6h16M4 12h16M4 18h16"/>
            </svg>
          </button>
          <div className="flex items-center gap-3 ml-auto">
            <div className="flex flex-col text-right">
              <span className="font-semibold text-gray-700">{user.displayName}</span>
              <span className="text-sm text-gray-500">Admin</span>
            </div>
            <img
              src={user.photoURL}
              alt="profile"
              className="w-10 h-10 rounded-full border border-gray-200"
              referrerPolicy='no-referrer'
            />
          </div>
        </nav>

        {/* Page Content */}
        <main className="flex-1 md:p-6 overflow-auto">
          <div className="bg-white md:p-6 rounded-2xl shadow h-full overflow-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout2;
