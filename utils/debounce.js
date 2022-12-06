export const debounce = (cb,wait)=>{
	let timer
	return (data)=>{
		if(timer) clearTimeout(timer)
		timer = setTimeout(()=>{
			cb(data)
		},wait)
	}
}

