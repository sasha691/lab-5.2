class Goods{
    constructor(){
        this.comments = []
        this.index = document.querySelector('input[type="hidden"]').value
        this.init(this)
        this.comment(this)
    }

    init(self){
        $.ajax({
            url: "http://127.0.0.1:8000/server/data/",
            type: "GET",
            dataType: "json",
            success: function(response){
                if (Array.isArray(response.data) && response.data.length > 0) {
                    self.data = response.data
                    self.load()
                }
                
            }
        })
    }

    comment(self){
        $.ajax({
            url: '/static/json/comments.json', 
            type: 'GET',
            dataType: 'json',
            success: function(response) {
                response.forEach(item => {
                    if(item.fields.tovarId == self.index){
                        self.comments.push(item.fields)
                    }
                    
                })
                if(self.comments){
                    console.log(self.comments)
                    self.loadComment()
                }
                        
            }
        })
    }

    loadComment(){
        const block = document.querySelector('#commentBlock')
        this.comments.forEach(item => {
            block.insertAdjacentHTML('beforeend', `
            <span class="comment"><p>${item.user}:<small>${item.comment}</small></p></span>
            `)
        })
    }

    load(){
        let item = this.data.find(element => element.id == this.index)
        this.loadBlock(item)
    }

    loadBlock(item){
        document.querySelector('main').innerHTML = `
                
                <div class="box">
                    <img src="${item.image.replace(/server/, '')}"/>
                    <p class="name">${item.name}</p>
                    <div class="text">
                        <p>${item.text}</p>
                    </div>
                    <P class="money">${item.money} UAH</p>
                </div>
                `
    }
}

document.addEventListener('DOMContentLoaded', () => new Goods())