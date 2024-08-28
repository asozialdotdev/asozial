import SidebarProjectRequestsTable from "./SidebarProjectRequestsTable";
import SidebarTitle from "./SidebarTitle";

function SidebarProjectRequests() {
  return (
    <div className="flex w-full flex-col gap-4 font-semibold">
      <SidebarTitle>Requests</SidebarTitle>
      <SidebarProjectRequestsTable />
    </div>
  );
}

export default SidebarProjectRequests;
