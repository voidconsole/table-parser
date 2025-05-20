# 🧠 JavaScript Parser — CSV to HTML Table

This project is a minimal yet insightful example of how you can parse a CSV file manually using **vanilla JavaScript**, and render it into a **styled HTML table**—no external libraries, no magic, just raw logic.

It’s not just about getting from A to B (CSV to HTML), it’s about understanding the mechanics of how to **walk through a string, tokenize values, structure data, and dynamically generate markup** in JavaScript.

---

## 🗂️ What It Does

* Reads a CSV file (`table.csv`) using Node's `fs` module.
* Parses the content **character by character** into a 2D array.
* Uses custom logic to split cells on commas and rows on newlines (`\n`, `\r`).
* Builds a complete HTML document with a responsive and centered table using template strings.
* Outputs it as `parsed.html`.

---

## 🔍 Core Parsing Logic (Manual, Not Magic)

Instead of `split("\n")` or importing `csv-parser`, this code manually constructs each row and column using a loop:

```js
var row = [], rows = [], curr = "";
for (let i = 0; i < data.length; i++) {
    if (data[i] === ",") {
        row.push(curr);
        curr = "";
    } else if (data[i] === "\r" || data[i] === "\n") {
        if (curr === "") continue;
        row.push(curr);
        rows.push(row);
        curr = "";
        row = [];
    } else {
        curr += data[i];
    }
}
row.push(curr); // Final cell
rows.push(row);
```

This approach is deliberate:

* Teaches how tokenization works at a low level.
* Gives full control over what constitutes a cell or line.
* Avoids reliance on library internals.

---

## 🎨 HTML Generation (Functional and Styled)

Once parsing is done, the data is transformed into a styled HTML table using JavaScript’s `map()` and template literals:

```js
<tbody>
  ${rows.map(row =>
    `<tr>\n${row.map(cell => `<td>${cell}</td>\n`).join("")}</tr>\n`
  ).join("")}
</tbody>
```

The HTML output is wrapped in a modern, CSS-styled layout with a centered table, hover effects, zebra striping, and readable fonts.

---

## 🧪 Why This Exists

This project is best viewed as an educational example for:

* Understanding **manual string parsing**
* Seeing how to build data structures from scratch
* Learning how to **dynamically generate HTML**
* Writing clean, readable JS with no dependencies

---

## 📦 How to Use

1. Create a simple `table.csv` in the same directory.
2. Run the script:

```bash
node parser.js
```

3. Open `parsed.html` in your browser.

---

## 🧠 For the Curious

This is a foundational exercise. You could:

* Add support for quoted fields
* Detect headers automatically
* Turn it into a CLI tool
* Export different formats (Markdown, JSON, etc.)

But that’s up to you. This repo gives you the **bare metal** so you can build what matters.
