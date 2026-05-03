import { useState, useEffect } from "react";
import { Doughnut, Pie } from "react-chartjs-2";
import { LuUserRound, LuSearch } from "react-icons/lu";
import { FaLongArrowAltRight, FaRegLightbulb } from "react-icons/fa";
import { BsBriefcase } from "react-icons/bs";
import { CiMenuKebab } from "react-icons/ci";
import DashboardCard from "../components/dashboard/DashboardCard";
import "chart.js/auto";

const Dashboard = () => {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [jobs, setJobs] = useState([]);
  const [chartType, setChartType] = useState("pie");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const storedJobs = JSON.parse(localStorage.getItem("jobs")) || [];
    const storedUser = JSON.parse(localStorage.getItem("user")) || {};

    setJobs(storedJobs);
    setUserName(storedUser.name || "");
    setUserEmail(storedUser.email || "");
  }, []);

  const jobStatusCount = jobs.reduce((acc, job) => {
    const status = job.status?.toLowerCase();
    acc[status] = (acc[status] || 0) + 1;
    return acc;
  }, {});

  const data = {
    labels: Object.keys(jobStatusCount),
    datasets: [
      {
        label: "Applications",
        data: Object.values(jobStatusCount),
        backgroundColor: ["#36A2EB", "#FFCE56", "#00842B", "#FF6384"],
        hoverOffset: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 1000,
      easing: "easeInOutQuad",
    },
  };

  const totalApplications = jobs.length;
  const totalRejected = jobs.filter(
    (j) => j.status?.toLowerCase() === "rejected",
  ).length;
  const totalInterviews = jobs.filter(
    (j) => j.status?.toLowerCase() === "interview",
  ).length;
  const totalOffers = jobs.filter(
    (j) => j.status?.toLowerCase() === "offered",
  ).length;

  const resources = [
    {
      title: "Resume and cover letter template",
      viewUrl: "https://www.canva.com/resumes/templates/",
    },
    {
      title: "Interview preparation guide",
      viewUrl:
        "https://www.geeksforgeeks.org/interview-preparation-for-software-developers/",
    },
    {
      title: "Job search strategies",
      viewUrl:
        "https://www.indeed.com/career-advice/finding-a-job/job-search-strategies",
    },
    {
      title: "Networking tips",
      viewUrl:
        "https://www.linkedin.com/business/talent/blog/talent-strategy/networking-tips",
    },
    {
      title: "Career development plan",
      viewUrl: "https://www.coursera.org/articles/career-development-plan",
    },
    {
      title: "Salary negotiation tactics",
      viewUrl:
        "https://www.indeed.com/career-advice/pay-salary/how-to-negotiate-salary",
    },
  ];

  const getGreeting = () => {
    const currentHour = new Date().getHours();
    if (currentHour < 12) return "Good Morning";
    if (currentHour < 17) return "Good Afternoon";
    return "Good Evening";
  };

  return (
    <div>
      {/* HEADER */}
      <div className="mb-5 flex flex-wrap justify-between items-center">
        <h1 className="font-bold text-[#2A2A2A] text-xl lg:text-2xl">
          {getGreeting()} {userName || "User"},
        </h1>
        <div className="gap-2 items-center border-l-2 border-[#5D6661] pl-4 hidden lg:flex">
          <div>
            <p className="text-[12px]">{userName}</p>
            <p className="text-[12px]">{userEmail}</p>
          </div>
        </div>
      </div>

      {/* GETTING STARTED */}
      <h2 className="text-xl text-gray-dark">Getting Started</h2>

      <div className="mt-6 grid grid-cols-2 lg:grid-cols-4 gap-3 mb-12">
        <DashboardCard
          to="/dashboard/profile"
          icon={LuUserRound}
          title="Complete your profile"
          description="Add more details"
        />
        <DashboardCard
          to="/dashboard/job"
          icon={LuSearch}
          title="Search for Jobs"
          description="Find jobs that match your skills"
        />
        <DashboardCard
          to="/dashboard/applications"
          icon={BsBriefcase}
          title="Update application status"
          description="Keep your job applications up to date"
        />
        <DashboardCard
          to="/dashboard"
          icon={FaRegLightbulb}
          title="Prepare for Interview"
          description="Browse resources"
        />
      </div>

      {/* MAIN */}
      <div className="grid lg:grid-cols-3 gap-4">
        {/* CHART */}
        <div className="lg:col-span-2 p-4 relative">
          <div className="flex justify-between items-center">
            <h3 className="text-lg">Applications Tracking</h3>

            <span
              onClick={() => setMenuOpen(!menuOpen)}
              className="hover:bg-[#E8E8E8] p-1.5 rounded-md relative"
            >
              <CiMenuKebab className="rotate-90" />

              {menuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-sm p-2">
                  <ul>
                    <li
                      className="p-2 hover:bg-[#E0E1E0] cursor-pointer"
                      onClick={() => setChartType("doughnut")}
                    >
                      Doughnut Chart
                    </li>
                    <li
                      className="p-2 hover:bg-[#E0E1E0] cursor-pointer"
                      onClick={() => setChartType("pie")}
                    >
                      Pie Chart
                    </li>
                  </ul>
                </div>
              )}
            </span>
          </div>

          <div className="mt-6 flex justify-center">
            {jobs.length === 0 ? (
              <p className="text-gray">No applications yet</p>
            ) : (
              <div className="w-[260px] h-[260px]">
                {chartType === "doughnut" ? (
                  <Doughnut data={data} options={options} />
                ) : (
                  <Pie data={data} options={options} />
                )}
              </div>
            )}
          </div>

          <div className="mt-4 grid grid-cols-2 gap-2">
            <p>Total Applications: {totalApplications}</p>
            <p>Total Rejected: {totalRejected}</p>
            <p>Total Interviews: {totalInterviews}</p>
            <p>Total Offers: {totalOffers}</p>
          </div>
        </div>

        {/* RESOURCES */}
        <div>
          <h3 className="mb-2">Resources</h3>
          <div className="grid md:grid-cols-2 gap-3 lg:grid-cols-1">
            {resources.map((resource, index) => (
              <div
                key={index}
                className="flex items-center justify-between py-2 border-l-4 pl-3 pr-2 rounded shadow-sm"
              >
                <p>{resource.title}</p>
                <a href={resource.viewUrl} target="_blank">
                  <FaLongArrowAltRight />
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
