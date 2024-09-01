function Main({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex h-full flex-grow w-full overflow-y-auto dark:overflow-y-auto dark:overflow-x-hidden  overflow-x-hidden border border-dark dark:border-light bg-light text-dark  dark:bg-dark dark:text-light">
      {children}
    </main>
  );
}

export default Main;
