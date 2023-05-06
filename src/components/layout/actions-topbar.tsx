const ActionsTopbar = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="sticky top-0 flex w-full items-center justify-between border-b border-slate-100 bg-white px-3 py-2 shadow-lg shadow-white">
      {children}
    </div>
  );
};

export { ActionsTopbar };
