import type { MiddlewareFunction } from "react-router";
import { bridgeMiddleware } from "~/bridgeMiddleware";

// Uncomment when this admin page needs multiple sections. Add one child route
// per section in routes.ts, then drive them from the tabs:
// import { GearSix, AnotherIcon } from "@phosphor-icons/react";
// import { Tabs, TabsList, TabsTrigger } from "~/components/ui/tabs";
// import { Outlet, useNavigate, useLocation } from "react-router";
//
// const activeTab = location.pathname.split("/").pop() ?? "settings";
// <Tabs value={activeTab} onValueChange={(val) => navigate(val)}>
//   <TabsList>
//     <TabsTrigger value="settings"><GearSix size={16} /> Settings</TabsTrigger>
//     <TabsTrigger value="..."><AnotherIcon size={16} /> ...</TabsTrigger>
//   </TabsList>
//   <Outlet />
// </Tabs>

export const middleware: MiddlewareFunction[] = [bridgeMiddleware];

export default function Admin() {
  return <div>Admin Page</div>;
}
