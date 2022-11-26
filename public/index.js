const socket = io()
let data = [];

(async function () {
    const res1 = await fetch("/templates/partials/form.hbs");
    const res2 = await fetch("/templates/index.hbs");
    const res3 = await fetch("/templates/partials/messages.hbs");
    const plantilla1 = await res1.text();
    const plantilla2 = await res2.text();
    const plantilla3 = await res3.text();
    const template1 = Handlebars.compile(plantilla1);
    const template2 = Handlebars.compile(plantilla2);
    const template3 = Handlebars.compile(plantilla3);
    Handlebars.partials["form"] = template1;
    Handlebars.partials["messages"] = template3;
    document.getElementById("main__body").innerHTML = template2();
})();

if(document.getElementById("messages")) {
    var messages = document.getElementById("messages");
}

if(document.getElementById("msg-center")) {
    var msgCenter = document.getElementById("msg-center");
}

if(document.getElementById("email")) {
    var email = document.getElementById("email");
}

if (document.getElementById("msg")) {
    var msg = document.getElementById("msg");
}

if (document.getElementById("form")) {
    var form = document.getElementById("form");
}

if (document.getElementById("title")) {
    var title = document.getElementById("title");
}

if (document.getElementById("price")) {
    var price = document.getElementById("price");
}

if (thumbnail = document.getElementById("thumbnail")) {
    var thumbnail = document.getElementById("thumbnail");
}


fetch("/api/mensajes")
    .then(res => data = res.json())
    .then(data => {
        data.forEach(element => {
            var item = document.createElement("li");
            var p = document.createElement("p");
            var span1 = document.createElement("span");
            var span2 = document.createElement("span");
            var span3 = document.createElement("span");
            span1.className = "email";
            span2.className = "date";
            span3.className = "msg";
            span1.textContent = `${element.author.id} `;
            var d = new Date();
            var date = d.toLocaleString();
            span2.textContent = `[${date}]: `;
            span3.textContent = element.text;
            p.appendChild(span1);
            p.appendChild(span2);
            p.appendChild(span3);
            item.appendChild(p);
            messages.appendChild(item);
        });
    })

fetch("/api/productos")
    .then(res => data = res.json())
    .then(data => {
        data.forEach(element => {
            var tbody = document.getElementById("tbody");
            var tr = document.createElement("tr");
            var td1 = document.createElement("td");
            var td2 = document.createElement("td");
            var td3 = document.createElement("td");
            var img = document.createElement("img");
            td1.textContent = element.name;
            td2.textContent = element.price;
            img.alt = element.name;
            img.src = element.image;
            td3.appendChild(img);
            tr.appendChild(td1);
            tr.appendChild(td2);
            tr.appendChild(td3);
            tbody.appendChild(tr);
        });
    })

if(msgCenter && email && msg){
    msgCenter.addEventListener("submit", function(e) {
        e.preventDefault();
        var urlencoded = new URLSearchParams();
        urlencoded.append("email", email.value);
        urlencoded.append("msg", msg.value);
        fetch("/api/mensajes", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: urlencoded,
            redirect: "manual"
        })
            .then(response => response.text())

        var d = new Date();
        var date = d.toLocaleString();
        socket.emit("chat message", [email.value, date, msg.value]);
        email.value = "";
        msg.value = "";
    });
}

if(form && title && price && thumbnail) {
    
    form.addEventListener("submit", function(e) {
        e.preventDefault();
        var urlencoded = new URLSearchParams();
        urlencoded.append("name", title.value);
        urlencoded.append("price", Number(price.value));
        urlencoded.append("image", thumbnail.value);
        fetch("/api/productos", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: urlencoded,
            redirect: "manual"
        })
            .then(response => response.text())

        socket.emit("add item", [title.value, Number(price.value), thumbnail.value]);
        title.value = "";
        price.value = "";
        thumbnail.value = "";
    });
}

socket.on("chat message", function(res) {
    var item = document.createElement("li");
    var p = document.createElement("p");
    var span1 = document.createElement("span");
    var span2 = document.createElement("span");
    var span3 = document.createElement("span");
    span1.className = "email";
    span2.className = "date";
    span3.className = "msg";
    span1.textContent = `${res[0]} `;
    span2.textContent = `[${res[1]}]: `;
    span3.textContent = res[2];
    p.appendChild(span1);
    p.appendChild(span2);
    p.appendChild(span3);
    item.appendChild(p);
    messages.appendChild(item);
});

socket.on("add item", function(res) {
    var tbody = document.getElementById("tbody");
    var tr = document.createElement("tr");
    var td1 = document.createElement("td");
    var td2 = document.createElement("td");
    var td3 = document.createElement("td");
    var img = document.createElement("img");
    td1.textContent = res[0];
    td2.textContent = res[1];
    img.alt = res[0];
    img.src = res[2];
    td3.appendChild(img);
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tbody.appendChild(tr);
});