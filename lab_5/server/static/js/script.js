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
                    this.new_data.push(this.data.filter(item => item.producers__compani === checkbox.dataset.checkbox))
                    this.filterBox()
                }
                if(!checkbox.checked){
                    this.new_data.forEach(item => {
                        if(item[0].producers__compani === checkbox.dataset.checkbox){
                            let index = this.new_data.indexOf(item)
                            this.new_data.splice(index, 1)
                        }
                    })
                    this.filterBox()
                }
                if(this.allCheckboxOff()){
                    this.new_data = []
                    this.start()
                    this.load()
                }
            })
        })

        document.querySelector('.search input').addEventListener('change',() => this.search())

        $(function() {
            $("#slider-range").slider({
                range: true,
                min: 0,
                max: 60000,
                values: [0, 60000], 
                slide: function(event, ui) {
                $("#slider-value1").text(ui.values[0])
                $("#slider-value2").text(ui.values[1])
                },
                change: function(event, ui) {
                    self.start()
                    self.data.forEach(item => {
                        if(ui.values[0] <= item.money && ui.values[1] >= item.money) {
                            self.loadBlock(item)
                        }
                    })
                }
            })
    
            $("#slider-value1").text($("#slider-range").slider("values", 0))
            $("#slider-value2").text($("#slider-range").slider("values", 1))
            })
    }

    search(){
        const searchInput = document.querySelector('.search input').value
        if(searchInput === ''){
            this.start()
            this.load()
            return
        }
        this.start()
        this.data.forEach(item => {
            if(item.name.toUpperCase().indexOf(searchInput.toUpperCase())==0){
                this.loadBlock(item)
            }
            else if(document.querySelector('#main').innerHTML == ''){
                document.querySelector('#main').innerHTML = `По запиту ${searchInput} нічого не знайдено`
            }

        })
    }

    allCheckboxOff(){
        return[...document.querySelectorAll('input[type = checkbox]')].every(checkbox => !checkbox.checked)
    }

    filterBox(){
        if(this.data){
            this.start() 
            this.new_data.forEach(item => this.loadBlock(item[0]))
        } 
    }

    start(){
        document.querySelector('#main').innerHTML = ''
    }

    load(){
        if(this.data){
            this.data.forEach(item => this.loadBlock(item))
            document.querySelectorAll('.box').forEach(item => {
                item.addEventListener('mouseover', () => this.mouseOver(item))
                item.addEventListener('mouseout',() => this.mouseOut(item))
            })
        }
    }

    loadBlock(item){
        document.querySelector('#main').insertAdjacentHTML('beforeend',`
                
                <div class="box">
                <a href="http://127.0.0.1:8000/server/${item.id}" class="next" style="display: inline;">
                    <p>${item.name}</p>
                    <img src="${item.image.replace(/server/, '')}"/>
                    <P class="money">${item.money} UAH</p>
                    
                    <button data-buy="${item.id}" class="buy" style="display: none;">Buy</button>
                    </a>
                </div>
                `)
    }

    mouseOut(item){
        const bthBuy = item.querySelector('.buy')
        bthBuy.style.display = "none"
    }

    mouseOver(item){
        const bthBuy = item.querySelector('.buy')
        bthBuy.style.display = "block"
        bthBuy.addEventListener('click',() => this.buyClick(bthBuy.dataset.buy))
    }

    buyClick(event){
        const basked = document.querySelector('.basket')
        const myForm = document.querySelector('#myForm')
        basked.showModal()
        basked.querySelector('.close').addEventListener('click',() => basked.close())
        let item = this.data.find(element => element.id == event)

        console.log(item)
            
        myForm.querySelector('#dialogName').innerHTML = `<p>${item.name}</p>`
        myForm.querySelector('#dialogImage').innerHTML = `<img src="${item.image.replace(/server/, '')}"/>`
        myForm.querySelector('#dialogInformation').innerHTML = `<a href="http://127.0.0.1:8000/server/${item.id}">Next</a>`
        myForm.querySelector('#formId').value = item.id      
        myForm.querySelector('#formName').value = item.name      
        myForm.querySelector('#formProducer').value = item.producers__compani      
        myForm.querySelector('#formMoney').value = item.money      
    }
}

document.addEventListener('DOMContentLoaded',() => new App())