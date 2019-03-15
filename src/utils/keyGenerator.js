export default function () {{
	let hashId = "";
	let pattern = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	for (let i = 0; i < 8; i++) {
	  hashId += pattern[(Math.round(Math.random() * (pattern.length-1)))];
	}
	return hashId;
  }
}