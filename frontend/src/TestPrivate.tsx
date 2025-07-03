// import axios from "axios";
// import { useEffect, useRef } from "react";

// const TestPrivate = ({ token }) => {
//   const isRun = useRef(false);
//   console.log(token);
//   useEffect(() => {
//     if (isRun.current) return;
//     isRun.current = true;
//     const config = {
//       headers: {
//         authorization: `Bearer ${token}`,
//       },
//     };
//     axios
//       .get("http://localhost:3000/api/v1/users/", config)
//       .then((res) => console.log(res))
//       .catch((err) => console.error(err));
//   }, []);

//   return <div>TestPrivate</div>;
// };

// export default TestPrivate;
