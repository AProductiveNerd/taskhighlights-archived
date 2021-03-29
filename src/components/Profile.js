export const UserProfile = ({ user }) => {
	return (
		<div className="bg-theme-secondary rounded hover:shadow-xl transition mx-auto container   p-5 w-11/12 sm:max-w-lg">
			<h1 className="text-2xl pb-3">Hi {user.fullName}</h1>
			<p>
				The social features of this app are under development and
				should be available soon
			</p>
		</div>
	);
};
