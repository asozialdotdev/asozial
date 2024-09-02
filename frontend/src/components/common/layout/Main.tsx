function Main({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex h-full w-full flex-grow overflow-y-auto overflow-x-hidden border border-dark bg-light text-dark dark:overflow-y-auto dark:overflow-x-hidden dark:border-light dark:bg-dark dark:text-light">
      {children}
    </main>
  );
}

export default Main;
