export const get_ist_from_ust_time = (epoch) => {
	const ust = new Date(epoch);
	const ist = new Date(ust.getTime()-(ust.getTimezoneOffset()*60000));
	return ist;	
}

export const get_ist_from_ust_time_iso = (ust_iso_format) => {
	const ust_epoch = new Date().getTime();
	const ist = get_ist_from_ust_time(ust_epoch);
	
	let ist_iso_format = new Date(ist);
	return ist_iso_format
}

