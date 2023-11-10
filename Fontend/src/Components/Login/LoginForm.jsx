// import React, { useState } from 'react';
// import "./Login.scss"
// import { LoginAndRegister, Registration } from './LoginAndRegister';
// const LoginForm = () => {
//   const [isSignIn, setIsSignIn] = useState(true);
//   const toggleForum = () => {
//     if (isSignIn) setIsSignIn(false)
//     else setIsSignIn(true)
//   }
//   return (
//     <div className='main'>
//       <div className=" user-forum">
//         <div className={`${isSignIn ? "translate-context-left" : ""} form-context`} >
//           <div>
//             <div>
//               {isSignIn ? <h2>Hello Friend !</h2> : <h2>Welcome Back !</h2>}
//             </div>
//             <div>
//               {isSignIn ? <p>Enter your personal details and start journey with us</p> : <p>To keep connected with us please login with your personal info</p>}
//             </div>
//             <div>
//               {isSignIn ? <button onClick={toggleForum}>Sing In</button> : <button onClick={toggleForum}>Sing Up</button>}
//             </div>
//           </div>
//         </div
//         >
//         <div className={`${isSignIn ? "form-input-left" : ""} form-input`}>
//           {isSignIn ? <Registration  /> : <LoginAndRegister   />}
//         </div>
//       </div>
//     </div>

//   );
// };

// export default LoginForm;