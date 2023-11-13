class App{
    constructor(){
        self = this
        this.data = null
        this.new_data = []
        $.ajax({
            url: "http://127.0.0.1:8000/server/data/",
            type: "GET",
            dataType: "json",
            success: function(response){
                if (Array.isArray(response.data) && response.data.length > 0) {
                    self.data = response.data;
                    self.load()
                }
            }
        })
        
        document.querySelectorAll('input[type = checkbox]').forEach(checkbox => {
            checkbox.addEventListener("change", () => {
                if(checkbox.checked){
                    this.filter(checkbox)
                }
                else if(this.allCheckboxOff()){
                    this.start()
                    this.load()
                }
            })
        })
    }

    allCheckboxOff(){
        return[...document.querySelectorAll('input[type = checkbox]')].every(checkbox => !checkbox.checked)
    }

    filter(event){
        if(this.data){
            this.start()
            let new_data 
            this.new_data.push(this.data.filter(item => item.producers__compani === event.dataset.checkbox))
            console.log(new_data)
        } 
    }

    start(){
        document.querySelector('#main').innerHTML = ''
    }

    load(){
        if(this.data){
            this.data.forEach(item => this.loadBlock(item))
        }
    }

    loadBlock(item){
        console.log(item)
        document.querySelector('#main').insertAdjacentHTML('beforeend',`
                <div class="box">
                    <p>${item.name}</p>
                    <img src="${item.image.replace(/server/, '')}"/>
                </div>
                `)
    }
}

document.addEventListener('DOMContentLoaded',() => new App())