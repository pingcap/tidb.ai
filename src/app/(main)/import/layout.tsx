export default function ImportLayout ({ children }: any) {
  return (
    <div className="grid grid-cols-12">
      <div className="col-span-8 p-4 space-y-8">
        {children}
      </div>
      <div className="col-span-4 p-4">
      </div>
    </div>
  );
}