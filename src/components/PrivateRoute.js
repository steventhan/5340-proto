import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";

// const PrivateRoute = ({ component: Component, isLoggedIn, ...rest }) => {
//   return (
//     <Route
//       {...rest}
//       render={props =>
//         isLoggedIn === true ? (
//           <Component {...props} />
//         ) : (
//           <Redirect
//             to={{
//               pathname: "/login",
//               state: { from: props.location }
//             }}
//           />
//         )
//       }
//     />
//   );
// };


class PrivateRoute extends Component {
  render() {
    if (this.props.isLoggedIn) {
      return (
        <Route {...this.props}/>
      );
    }
    return (
      <Redirect
        to={{
          pathname: "/login",
          state: { from: this.props.location.pathname }
        }}
      />
    );
  }
}

export default PrivateRoute;
