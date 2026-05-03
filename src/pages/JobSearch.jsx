import React, { useState } from "react";
function Jobsearch() {
  const [searchTerm, setSearchTerm] = useState("");

  // Dummy data (need to replace with API later)
  const jobs = [
    { title: "React Developer", company: "TCS" },
    { title: "Java Engineer", company: "IBM" },
    { title: "Frontend Developer", company: "Infosys" },
    { title: "Backend Developer", company: "Wipro" },
  ];

  // Filter logic
  const filteredJobs = jobs.filter(
    (job) =>
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="h-screen">
      <h2 className="text-teal-dark text-3xl font-semibold mb-6">Job Search</h2>

      {/* Search Input */}
      <form className="max-w-md mb-6">
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center pl-3">
            🔍
          </div>

          <input
            type="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full p-4 pl-10 text-sm border rounded-md"
            placeholder="Search job roles and companies"
          />
        </div>
      </form>

      {/* Results */}
      <div className="space-y-3">
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job, index) => (
            <div
              key={index}
              className="p-4 border rounded-md bg-white shadow-sm"
            >
              <h3 className="font-semibold">{job.title}</h3>
              <p className="text-gray">{job.company}</p>
            </div>
          ))
        ) : (
          <p className="text-gray">No results found</p>
        )}
      </div>
    </div>
  );
}

export default Jobsearch;
