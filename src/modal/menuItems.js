export const MENU_ITEMS = [
	{
		_id: '323',
		label: 'Location',
		to: '/locations',
		superuser: 'manager',
		user: 'superAdmin',
	},
	{
		_id: '333',
		label: 'Create New Location',
		to: '/location-crud',
		superuser: 'manager',
		user: 'manager',
	},
	{
		_id: '3223',
		label: 'User Management',
		to: '/userCrud',
		superuser: 'manager',
		user: 'manager',
	},
	{
		_id: '3213',
		label: 'My Tasks',
		to: '/mytasks',
		user: 'superAdmin',
	},
	{
		_id: '3313',
		user: 'manager',
		superuser: 'manager',
		label: 'Task Assignment',
		to: '/assign-images',
	},
	{
		_id: '3423',
		user: 'manager',
		superuser: 'manager',
		label: 'Reports',
		to: '/reports',
	},
];
