import SideNavigation from "../_components/SideNavigation";

export default function AccountLayout({ children }) {
  return (
        <div className="grid grid-cols-[16rem_1fr] gap-12 h-full">
          <SideNavigation />
          <div className="py-1">{children}</div>
        </div>
    
  );
}
