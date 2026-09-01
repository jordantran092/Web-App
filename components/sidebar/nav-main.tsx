// removed `use client`

import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';

type NavMainProps = {
    items: {
        title: string;
        url: string;
        icon: React.ReactNode;
        isActive?: boolean;
    }[];

    setIsFTSMenuOpen: (value: boolean) => void;
};

export function NavMain({ setIsFTSMenuOpen, items }: NavMainProps) {
    return (
        <SidebarMenu className="mt-6">
            {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                        isActive={item.isActive}
                        // render={<a href={item.url} />}
                        onClick={() => {
                            setIsFTSMenuOpen(true);
                        }}>
                        {item.icon}
                        <span>{item.title}</span>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            ))}
        </SidebarMenu>
    );
}
