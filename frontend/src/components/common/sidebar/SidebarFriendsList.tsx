import React from "react";

function SidebarFriendsList({ list, title }: { list: any; title: string }) {
  return (
    <div>
      <h2>{title}</h2>
      <ul>{JSON.stringify(list)}</ul>
    </div>
  );
}

export default SidebarFriendsList;
