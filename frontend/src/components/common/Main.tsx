function Main({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex h-full w-full transform bg-light text-dark transition-transform duration-300 ease-in-out dark:bg-dark dark:text-light">
      {children}
    </main>
  );
}

export default Main;
