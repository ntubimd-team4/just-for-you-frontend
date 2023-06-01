interface UserInfo {
	userId: string;
	email: string;
	userName: string;
	departmentName: string;
	systemName: string;
	className: string;
	identity: string;
	available: boolean;
}

interface Response {
	result: boolean;
	errorCode: string;
	message?: string;
	data?: any | any[];
}