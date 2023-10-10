

let flowersArr = [];
class Flowers {
    constructor(name, image, quantity, price) {
        this.name = name;
        this.image = image;
        this.quantity = quantity;
        this.price = price;
        flowersArr.push(this)
    }
};

const fl1 = new Flowers("Rose", "https://cdn.pixabay.com/photo/2017/03/31/15/32/roses-2191636_1280.jpg", "0", "5");
const fl2 = new Flowers("Lily", "https://cdn.pixabay.com/photo/2016/07/12/18/54/lilies-1512813_1280.jpg", "0", "10");
const fl3 = new Flowers("Orchid", "https://cdn.pixabay.com/photo/2023/02/26/20/44/flower-7816991_1280.jpg", "0", "25");
const fl4 = new Flowers("Dahlia", "https://cdn.pixabay.com/photo/2016/09/04/12/11/dahlia-1643808_1280.jpg", "0", "15");
const fl5 = new Flowers("Calla", "https://cdn.pixabay.com/photo/2020/03/08/17/41/flowers-4913165_1280.jpg", "0", "10");
const fl6 = new Flowers("Iris", "https://cdn.pixabay.com/photo/2020/02/17/20/26/nettled-iris-4857753_1280.jpg", "0", "8");
const fl7 = new Flowers("Sunflower", "https://cdn.pixabay.com/photo/2016/05/28/05/37/sunflower-1421011_1280.jpg", "0", "5");
const fl8 = new Flowers("Lilac", "https://cdn.pixabay.com/photo/2017/05/13/20/29/lilac-2310561_1280.jpg", "0", "8");
const fl9 = new Flowers("Hydrangea", "https://cdn.pixabay.com/photo/2016/07/07/15/58/hydrangea-1502613_1280.jpg", "0", "30");
const fl10 = new Flowers("Anemone", "https://cdn.pixabay.com/photo/2023/03/28/19/01/flower-7883961_1280.jpg", "0", "4");
const fl11 = new Flowers("Aster", "https://cdn.pixabay.com/photo/2018/10/18/12/08/aster-3756219_1280.jpg", "0", "4");
const fl12 = new Flowers("Peony", "https://cdn.pixabay.com/photo/2015/06/27/17/23/flowers-823655_1280.jpg", "0", "20");

function display(flowers) {
    document.getElementById("display").innerHTML = "",
    flowers.forEach((value)=> {
        document.getElementById("display").innerHTML += `

        <div class="card-container my-4">
            <div class="card shadow">
                <div class="product-details"> 
                <div class="product-img">
                    <img src="${value.image}" alt="${value.name}">
                        <div class="product-cart">
                            <button class="addToCart"><i class="bi bi-bag-heart-fill"></i></button>
                        </div>
                    </div> 
                <div class="product-info">
                        <p class="lead">${value.name}</p>
                        <p class="price text-center m-0">
                            <span>${value.price}€</span>
                        </p>
                </div>
                </div>     
            </div>
        </div>
         `
    })
}

display(flowersArr);

let flowersCart = [];

let addBtns = document.querySelectorAll(".addToCart");

addBtns.forEach(function(btn, i){
    btn.addEventListener("click", function(){
        addToCart(i);
    })
});

function addToCart(i){
    if(flowersCart.find((item) => item.name == flowersArr[i].name)){
        flowersArr[i].quantity++;
    } else {
        flowersCart.push(flowersArr[i]);
    }
    createCartInHTML();
    calcTotal();
}

function createCartInHTML(){
    document.getElementById("cart").innerHTML = "";
    flowersCart.forEach(function(value){
        document.getElementById("cart").innerHTML = `
        <div class="card-container my-4">
            <div class="card">
             <div class="product-details"> 
                <div class="product-img">
                    <img src="${value.image}" alt="${value.name}">
                        <div class="product-cart">
                            <button class="plus"><i class="bi bi-plus-square-fill"></i></button>
                            <button class="minus"><i class="bi bi-dash-circle-fill"></i></button>
                            <button class="quantity"><div >${value.quantity}</div></button>
                            <button class="close"><i class="bi bi-x-circle-fill"></i></button>
                        </div>
                </div> 
                <div class="product-info">
                        <p class="lead">${value.name}</p>
                        <p class="price text-center m-0">
                            <span>${value.price}€</span>
                        </p>
                </div >
             </div>   
            </div> 
        `
    })

    let plusBtns = document.querySelectorAll(".plus");
    plusBtns.forEach((btn, i) => {
        btn.addEventListener("click", function(){
            plusQuantity(i);
            calcTotal();
        })
    })

    let minusBtns = document.querySelectorAll(".minus");
    minusBtns.forEach((btn, i) => {
        btn.addEventListener("click", function(){
            minusQuantity(i);
            calcTotal();
            createCartInHTML();
        })
    })

    let closeBtns = document.querySelectorAll(".close");
    closeBtns.forEach((btn, i) => {
        btn.addEventListener("click", function(){
            removeItem(i);
            calcTotal();
            createCartInHTML();
        })
    })

}

function plusQuantity(i) {
    flowersCart[i].quantity++;
    document.querySelectorAll(".quantity")[i].innerText = flowersCart[i].quantity;
}

function minusQuantity(i) {
    if(flowersCart[i].quantity == 1) {
        flowersCart.splice(i, 1);
    } else {
        flowersCart[i].quantity--;
    }
    document.querySelectorAll(".quantity")[i].innerText = flowersCart[i].quantity;
}

function calcTotal(){
    let total = 0;

    flowersCart.forEach(function(flower){
        total = total + (flower.price * flower.quantity);
    })
    document.getElementById("total").innerHTML = total + "€";
}


function removeItem(i){
    flowersCart.splice(i, 1);
}
