const fs = require("fs")
fs.readFile("table.csv", "utf8", (err, data) => {
    if (err) {
        console.error("Error reading the file:", err)
        return
    }
    var row = []
    var rows = []
    var curr = ""
    for (let i = 0; i < data.length; i++) {
        if (data[i] === ",") {
            row.push(curr)
            curr = ""
        } else if (data[i] === "\r" || data[i] === "\n") {
            if (curr === "") continue
            row.push(curr)
            rows.push(row)
            curr = ""
            row = []
        } else {
            curr += data[i]
        }
    }
    row.push(curr)
    rows.push(row)


plain = `
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Beautiful Centered Table</title>
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<style>
		body {
			background: #f6f8fb;
			min-height: 100vh;
			display: flex;
			align-items: center;
			justify-content: center;
			font-family: 'Segoe UI', 'Roboto', Arial, sans-serif;
		}
		.table-container {
			background: #fff;
			padding: 2rem 2.5rem;
			border-radius: 18px;
			box-shadow: 0 8px 32px 0 rgba(60, 60, 120, 0.15);
			display: flex;
			justify-content: center;
			align-items: center;
		}
		table {
			border-collapse: collapse;
			min-width: 400px;
			box-shadow: 0 2px 8px rgba(60, 60, 120, 0.08);
			border-radius: 12px;
			overflow: hidden;
			background: #fdfdff;
		}
		th, td {
			text-align: center;
			padding: 1rem 1.5rem;
		}
		th {
			background: #e3e8f0;
			color: #333;
			font-weight: 600;
			letter-spacing: 0.05em;
		}
		tr {
			transition: background 0.2s;
		}
		tr:nth-child(even) {
			background: #f5f7fa;
		}
		tr:hover {
			background: #e9f0fb;
		}
	</style>
</head>
<body>
	<div class="table-container">
		<table>
			<tbody>
			${rows.map(row => `<tr>\n${row.map(cell => `<td>${cell}</td>\n`).join("")}</tr>\n`).join("")}
			</tbody>
		</table>
	</div>
</body>
</html>
`
fs.writeFile("parsed.html", plain, (err) => {
	if (err) {
	    console.error("Error writing the file:", err)
	    return
	}
    })
})