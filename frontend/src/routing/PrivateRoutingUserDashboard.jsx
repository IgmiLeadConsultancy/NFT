import React from "react";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const PrivateRouteUserDashboard = ({
	component: Component,
	auth: { isAuthenticated2, loading },
	...rest
}) => (
	<Route
		{...rest}
		render={(props) =>
			!isAuthenticated2 && !loading ? (
				<Redirect to="/user/login" />
			) : (
				<Component {...props} />
			)
		}
	/>
);

PrivateRouteUserDashboard.propTypes = {
	auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	auth: state.auth,
});

export default connect(mapStateToProps)(PrivateRouteUserDashboard);
