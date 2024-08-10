function Main({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex grow h-full w-full transform border-2 p-4 bg-light text-dark transition-transform duration-300 ease-in-out dark:bg-dark dark:text-light">
      {children}
    </main>
  );
}

export default Main;
