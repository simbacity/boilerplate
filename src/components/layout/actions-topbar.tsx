const ActionsTopbar = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex w-full items-center justify-between border-b border-slate-100 px-3 py-2">
      {children}
    </div>
  );
};

export { ActionsTopbar };
