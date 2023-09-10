import { BsHousesFill,BsBellFill } from 'react-icons/bs'
import {FaUser} from "react-icons/fa"
import { BiLogOut } from 'react-icons/bi'

import SideBarLogo from '@/components/layout/SideBarLogo';
import SidebarItem from '@/components/layout/SidebarItem';
import SidebarWoolsButton from '@/components/layout/SidebarWoolsButton';

const Sidebar = () => {
    const items = [
        {
            label: 'Home',
            href: '/',
            icon: BsHousesFill
        },
        {
            label: 'Notifications',
            href: '/notifications',
            icon: BsBellFill
        },
        {
            label: 'Profile',
            href: '/users/123',
            icon: FaUser
        },
        
    ];
  return (
    <div className='col-span-1 h-full pr-4 md:pr-6'>
        <div className='flex flex-col items-end'>
            <div className=' space-y-2 lg:w-[230px]'>
                <SideBarLogo />
                {items.map((item) => (
                    <SidebarItem key={item.href} href={item.href} label={item.label} icon={item.icon} />
                ))}
                <SidebarItem onClick={() => {}} icon={BiLogOut} label='Logout' />
                <SidebarWoolsButton />
            </div>
        </div>
    </div>
  )
}

export default Sidebar;