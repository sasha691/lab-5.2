document.addEventListener('DOMContentLoaded', () => {
    const blockInfoUser = document.querySelector('#info')
    if (blockInfoUser) {
        $.getJSON("/static/json/user_data.json", function(data) {
            console.log(data)
        })
    }
})