// 'use client';

// import DataGrid from "./components/DataGrid";

// export default function Home() {
//   const headers = ['Name', 'Age', 'City', 'Occupation', 'Email', 'Phone', 'Department', 'Status'];
  
//   // Creating more sample data to demonstrate scrolling
//   const sampleData = Array.from({ length: 30 }, (_, i) => [
//     `Employee ${i + 1}`,
//     Math.floor(Math.random() * 30) + 25,
//     ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix'][Math.floor(Math.random() * 5)],
//     ['Engineer', 'Designer', 'Manager', 'Developer', 'Analyst'][Math.floor(Math.random() * 5)],
//     `employee${i + 1}@example.com`,
//     `(555) ${String(Math.floor(Math.random() * 900) + 100)}-${String(Math.floor(Math.random() * 9000) + 1000)}`,
//     ['IT', 'HR', 'Sales', 'Marketing', 'Engineering'][Math.floor(Math.random() * 5)],
//     ['Active', 'On Leave', 'Remote', 'In Training'][Math.floor(Math.random() * 4)]
//   ]);

//   return (
//     <main className="min-h-screen p-8">
//       <h1 className="text-2xl font-bold mb-6">Data Grid</h1>
//       <DataGrid data={sampleData} headers={headers} />
//     </main>
//   );
// }

import DataGrid_demo from "./components/DataGrid_demo";

export default function Page() {
  return (
    <div className="p-4">
      <DataGrid_demo />
    </div>
  );
}