document.querySelector("#add_comment").addEventListener("click", function () {
    let textElement = document.querySelector("#text");
    let text = textElement.value;
    let url = new URL(location.href);
    let photo_id = url.searchParams.get("id");

    console.log("Отправка данных:", { text, photo_id }); // Проверка в консоли

    fetch("add_comment.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: new URLSearchParams({
            text: text,
            photo_id: photo_id
        })
    })
    .then(async function (response) {
        let responseText = await response.text();
        console.log("Ответ от сервера (сырой):", responseText); // Проверка ответа

        let data = JSON.parse(responseText);

        let new_comment_div = document.createElement("div");
        new_comment_div.classList.add("comment");

        new_comment_div.innerHTML = `
            <p class="author">${data.Name}</p>
            <p class="text">${data.Text}</p>
            <p class="date">${data.Post_date}</p>
        `;

        let header = document.querySelector(".comments h2");
        if (header) {
            header.after(new_comment_div);
            textElement.value = "";
            console.log("Комментарий успешно добавлен на страницу");
        } else {
            console.error("Ошибка: Не найден элемент .comments h2");
        }
    })
    .catch(error => {
        console.error("Критическая ошибка:", error);
    });
});