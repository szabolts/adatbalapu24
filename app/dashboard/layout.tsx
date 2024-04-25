import SideNav from '@/components/ui/sidenav/sidenav';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col-2  max-w-screen-xl mx-auto" >
         <div className="min-w-[200px]">
        <SideNav />
        </div>
      <div className="flex-grow m-6" >{children}</div>
    </div>
  );
}