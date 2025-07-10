import Header from "../Header";

// src/components/MaintenancePage.tsx
const MaintenancePage = ({ message }: { message: string }) => {
  return (
    <>
    <Header/>
    <div className="min-h-1000px flex flex-col items-center justify-center text-center p-4">
      <h1 className="text-3xl font-bold mb-4">Maintenance Mode</h1>
      <p className="text-lg text-gray-600">{message}</p>
    </div>
    </>
  );
};

export default MaintenancePage;
