function UserSidebar() {
  return (
    <aside
      className={`fixed z-50 flex h-full w-[18rem] transform grid-cols-1 flex-col gap-10 px-[3.2rem] py-[2.4rem] text-3xl shadow-md transition-transform duration-300 ease-in-out`}
      // ref={sidebarRef}
    >
      {" "}
      This is the User Sidebar component
    </aside>
  );
}

export default UserSidebar;
