function Main({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex h-full w-full transform overflow-y-auto border bg-light p-4 text-dark transition-transform duration-300 ease-in-out dark:bg-dark dark:text-light">
      {children}
    </main>
  );
}

export default Main;
