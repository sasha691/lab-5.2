class basket{
    constructor() {
        self = this
        this.data = []
        this.cookieUsers = document.cookie.match(/user=[\w]*[0-64]/i) || []
        this.cookieUsers = this.cookieUsers[0].replace(/user=/, '')
        this.init(this)
    }

    init(self){
        $.ajax({
            url: '/static/json/tovar_data.json', 
            type: 'GET',
            dataType: 'json',
            success: function(response) {
                response.forEach(item => {
                    if(item.fields.user == self.cookieUsers){
                        self.data.push(item.fields)
                    }
                    self.start()
                    self.load()
                })
            }
        })
    }

    start() {
        document.querySelector('#basketList').innerHTML = ''
    }

    load() {
        console.log(this.data)
        this.data.forEach(element => {
            console.log(element)
            document.querySelector('#basketList').insertAdjacentHTML('beforeend', `
            <tr onclick="location.href='http://127.0.0.1:8000/server/${element.tovarId}'"}">
                <td>${element.name}</td>
                <td>${element.producer}</td>
                <td>${element.money}</td>
                <td>${element.number}</td>
            </tr>`)
        }) 
    }

}

document.addEventListener('DOMContentLoaded', () => new basket())