"use client";

import NotFoundComponent from "@/components/common/ui/NotFoundComponent";

function error() {
  return (
    <div className='h-screen w-screen bg-light dark:bg-dark'>
      <NotFoundComponent message="Seems like we could not load this page" />;
    </div>
  );
}

export default error;
