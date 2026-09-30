// import { createContext, useState, useEffect } from "react";
// import { toast } from "react-toastify";
// import axios from "axios";
// import { useAuth, useUser } from "@clerk/clerk-react";

// export const AppContext = createContext();

// export const AppContextProvider = (props) => {
//   const backEndUrl = import.meta.env.VITE_BACKEND_URL;
//   const {user} = useUser();
//   const {getToken} = useAuth();

//   const [searchFilter, setSearchFilter] = useState({
//     title: '',
//     location: ''
//   });

//   const [isSearched, setIsSearched] = useState(false);
//   const [jobs, setJobs] = useState([]);
//   const [showRecriuterLogin, setShowRecriuterLogin] = useState(false);
//   const [companyToken, setCompanyToken] = useState(null);
//   const [companyData, setCompanyData] = useState(null);
//   const [userData, setUserData] = useState(null);
//   const [userApplications, setApplications] = useState(null);

//   const fetchUserData = async () => {
//     try {
//       const token = await getToken()
// console.log("Clerk JWT Token:", token);
//       const {data} = await axios.get(`${backEndUrl}/api/users/user`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       if (data.success) {
//         setUserData(data.user);
//       } else {
//         toast.error(data.message || "Failed to fetch user data");
//       }
//     } catch (error) {
//       if (error.response?.status === 401) {
//         toast.error("Unauthorized. Please login again.");
//       } else {
//         toast.error(error.response?.data?.message || error.message);
//       }
//     }
//   };

//   const fetchJobs = async () => {
//     try {
//       const { data } = await axios.get(backEndUrl+'/api/jobs');
//       if (data.success) {
//         setJobs(data.jobs);
//         // console.log(data.jobs);
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       toast.error(error.message);
//     }
//   };

//   const fetchCompanyData = async () => {
//     try {
//     const { data } = await axios.get(backEndUrl+'/api/company/company', {
//   headers: { token: companyToken },
// });


//       if (data.success) {
//         console.log('yes');
        
//         setCompanyData(data.company);

//         console.log(data);
//         console.log("Using company token:", companyToken);
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       toast.error(error.message);
//     }
//   };

//   useEffect(() => {
//     fetchJobs();

//     const storedCompanyToken = localStorage.getItem('companyToken');
//     if (storedCompanyToken) {
//       setCompanyToken(storedCompanyToken);
//     }
//   }, [jobs]);

//   useEffect(() => {
//     if (companyToken) {
//       fetchCompanyData();
//     }
//   }, [companyToken]);

//   useEffect(() => {
//     if (user) {
//       fetchUserData();
//     }
//   }, [user]);

//   const value = {
//     setSearchFilter,
//     searchFilter,
//     isSearched,
//     setIsSearched,
//     jobs,
//     setJobs,
//     showRecriuterLogin,
//     setShowRecriuterLogin,
//     companyToken,
//     setCompanyToken,
//     companyData,
//     setCompanyData,
//     backEndUrl,
//   };

//   return (
//     <AppContext.Provider value={value}>
//       {props.children}
//     </AppContext.Provider>
//   );
// };






// import { createContext, useState, useEffect } from "react";
// import { toast } from "react-toastify";
// import axios from "axios";
// import { useAuth, useUser } from "@clerk/clerk-react";

// export const AppContext = createContext();

// export const AppContextProvider = (props) => {
//   const backEndUrl = import.meta.env.VITE_BACKEND_URL;
//   const { user } = useUser();
//   const { getToken } = useAuth();

//   const [searchFilter, setSearchFilter] = useState({
//     title: "",
//     location: "",
//   });

//   const [isSearched, setIsSearched] = useState(false);
//   const [jobs, setJobs] = useState([]);
//   const [showRecriuterLogin, setShowRecriuterLogin] = useState(false);
//   const [companyToken, setCompanyToken] = useState(null);
//   const [companyData, setCompanyData] = useState(null);
//   const [userData, setUserData] = useState(null);
//   const [userApplications, setApplications] = useState(null);

//   // Fetch user data protected by Clerk auth token
//   const fetchUserData = async () => {
//     try {
//       const token = await getToken();
//       console.log("Clerk JWT Token:", token);
//       const { data } = await axios.get(`${backEndUrl}/api/users/user`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       if (data.success) {
//         setUserData(data.user);
//       } else {
//         toast.error(data.message || "Failed to fetch user data");
//       }
//     } catch (error) {
//       if (error.response?.status === 401) {
//         toast.error("Unauthorized. Please login again.");
//       } else {
//         toast.error(error.response?.data?.message || error.message);
//       }
//     }
//   };

//   // Fetch all visible jobs
//   const fetchJobs = async () => {
//     try {
//       const { data } = await axios.get(`${backEndUrl}/api/jobs`);
//       if (data.success) {
//         setJobs(data.jobs);
//       } else {
//         toast.error(data.message || "Failed to fetch jobs");
//       }
//     } catch (error) {
//       toast.error(error.message);
//     }
//   };

//   // Fetch company data with companyToken in Authorization header
//   const fetchCompanyData = async () => {
//     try {
//       const { data } = await axios.get(`${backEndUrl}/api/company/company`, {
//         headers: { Authorization: `Bearer ${companyToken}` },
//       });

//       if (data.success) {
//         setCompanyData(data.company);
//         console.log("Fetched company data:", data);
//       } else {
//         toast.error(data.message || "Failed to fetch company data");
//       }
//     } catch (error) {
//       toast.error(error.message);
//     }
//   };

//   // Fetch jobs once on component mount
//   useEffect(() => {
//     fetchJobs();
//     const storedCompanyToken = localStorage.getItem("companyToken");
//     if (storedCompanyToken) {
//       setCompanyToken(storedCompanyToken);
//     }
//   }, []); // <-- empty dependency to avoid infinite loop

//   // Fetch company data whenever companyToken changes
//   useEffect(() => {
//     if (companyToken) {
//       fetchCompanyData();
//     }
//   }, [companyToken]);

//   // Fetch user data whenever user changes (sign-in or sign-out)
//   useEffect(() => {
//     if (user) {
//       fetchUserData();
//     } else {
//       setUserData(null); // clear user data on sign out
//     }
//   }, [user]);

//   const value = {
//     setSearchFilter,
//     searchFilter,
//     isSearched,
//     setIsSearched,
//     jobs,
//     setJobs,
//     showRecriuterLogin,
//     setShowRecriuterLogin,
//     companyToken,
//     setCompanyToken,
//     companyData,
//     setCompanyData,
//     userData,
//     setUserData,
//     userApplications,
//     setApplications,
//     backEndUrl,
//   };

//   return (
//     <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
//   );
// };















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

  const [companyToken, setCompanyToken] = useState(null);
  const [companyData, setCompanyData] = useState(null);
  const [userData, setUserData] = useState(null);
  const [userApplications, setApplications] = useState([]);

  // Clerk-authenticated user data
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

  //get the applictions that the user applied 

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
      // console.log(data.jobs);
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
      toast.error(error.message || "Error fetching company data");
    }
  };
 



  // Fetch jobs on mount + load company token from localStorage
  useEffect(() => {
    fetchJobs();

    const storedCompanyToken = localStorage.getItem("companyToken");
    const storedRole = localStorage.getItem("role");

    // Set company token only if the role is company
    if (storedCompanyToken && storedRole === "company") {
      setCompanyToken(storedCompanyToken);
    }
  }, []);

  // Fetch company data only if companyToken is present and role is company
  useEffect(() => {
    const role = localStorage.getItem("role");
    if (companyToken && role === "company") {
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
