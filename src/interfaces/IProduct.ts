export interface IProduct {
	id?: number | string;
	title: string;
	price: number;
	description?: string;
	thumbnail?: string;
	images?: string[];
	statusText?: string;
	status?: number;

}


export interface IResponse {
	id?: number | string;
	title: string;
	price: number;
	description?: string;
	thumbnail?: string;
	images?: string[];
	message?: string;
}
