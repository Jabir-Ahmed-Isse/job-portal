// Shared app state and API calls: job list, search filters, the logged-in
// company (JWT stored in localStorage) and the logged-in job seeker (Clerk).
import { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useAuth, useUser } from "@clerk/clerk-react";

export const AppContext = createContext();

export const AppContextProvider = (props) => {
  const backEndUrl = import.meta.env.VITE_BACKEND_URL;
  const { user } = useUser();
  const { getToken } = useAuth();

  const [searchFilter, setSearchFilter] = useState({ title: "", location: "" });
  const [isSearched, setIsSearched] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [showRecriuterLogin, setShowRecriuterLogin] = useState(false);

  const [companyToken, setCompanyToken] = useState(() => {
    try {
      return localStorage.getItem("companyToken");
    } catch {
      return null;
    }
  });
  const [companyData, setCompanyData] = useState(null);
  const [userData, setUserData] = useState(null);
  const [userApplications, setApplications] = useState([]);

  // Load the logged-in job seeker from the API (creates their record on first login)
  const fetchUserData = async () => {
    try {
      const token = await getToken();
      const { data } = await axios.get(`${backEndUrl}/api/users/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (data.success) {
        setUserData(data.user);
      } else {
        toast.error(data.message || "Failed to fetch user data");
      }
    } catch (error) {
      if (error.response?.status === 401) {
        toast.error("Unauthorized. Please login again.");
      } else {
        toast.error(error.response?.data?.message || error.message);
      }
    }
  };

  // Load the jobs the logged-in user has applied to

  const fetchUserApplications = async () =>{
   try {
    const token = await getToken()
    const {data} = await axios.get(backEndUrl+'/api/users/applications',
     {
      headers:{Authorization:`Bearer ${token}`}
     } 
    )
    if(data.success){
      setApplications(data.applications)
    }else{
      toast.error(data.message)
    }
    
   } catch (error) {
    toast.error(error.message)
    
   } 
  }

  // Fetch all available jobs
const fetchJobs = async () => {
  try {
    const { data } = await axios.get(`${backEndUrl}/api/jobs`);
    if (data.success) {
      setJobs(data.jobs);
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    toast.error(error.message);
  }
};


  // Fetch data of the company using the custom token
  const fetchCompanyData = async () => {
    try {
      const { data } = await axios.get(`${backEndUrl}/api/company/company`, {
        headers: {
          Authorization: `Bearer ${companyToken}`,
        },
      });

      if (data.success) {
        setCompanyData(data.company);
        console.log("Fetched company data:", data.company);
      } else {
        toast.error(data.message || "Failed to fetch company data");
      }
    } catch (error) {
      if (error.response?.status === 401) {
        // Saved token is expired or invalid: log the company out quietly
        localStorage.removeItem("companyToken");
        setCompanyToken(null);
        setCompanyData(null);
      } else {
        toast.error(error.message || "Error fetching company data");
      }
    }
  };
 



  // Fetch jobs on mount
  useEffect(() => {
    fetchJobs();
  }, []);

  // Fetch company data whenever a company token is present (restored from localStorage on load)
  useEffect(() => {
    if (companyToken) {
      fetchCompanyData();
    }
  }, [companyToken]);

  // Fetch user data only when Clerk user is present
  useEffect(() => {
    if (user) {
      fetchUserData();
      fetchUserApplications();
    } else {
      setUserData(null);
      setApplications([]);
    }
  }, [user]);

  const value = {
    setSearchFilter,
    searchFilter,
    isSearched,
    setIsSearched,
    jobs,
    setJobs,
    showRecriuterLogin,
    setShowRecriuterLogin,
    companyToken,
    setCompanyToken,
    companyData,
    setCompanyData,
    userData,
    setUserData,
    userApplications,
    setApplications,
    backEndUrl,
    fetchUserData,
    fetchUserApplications,
  };

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  );
};
