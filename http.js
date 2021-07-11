let products = []

function getProducts() {
    var xhr = new XMLHttpRequest();
        xhr.open('GET', './data.json');
        xhr.onreadystatechange = async function () {
            if (xhr.readyState === 4 && (xhr.status === 200 || xhr.status === 201)) {
                var res = JSON.parse(xhr.response)
                products = res
                setProducts(res)

                // add filters
                $('.dummy').hide()
                var categories = [...new Set(res.map(a => a.material))]
                categories.unshift('All')
                $('.list-wrapper').empty()

                categories.forEach((c, i) => {
                    let filter = document.createElement('li')
                    filter.innerHTML = c
                    filter.id = c
                    if (!i) filter.className = 'selected' 
                    $('.list-wrapper').append(filter)
                   
                })
                $('.list-wrapper li')
                    .off('click')
                    .on('click', function(e) {
                        $('.list-wrapper li').removeClass()
                        let el = $(e.target)[0]
                        el.className = 'selected'
                        if (el.innerHTML === 'All') {
                            setProducts(products)
                        } else {
                            setProducts(products.filter(a => a.material === el.innerHTML))
                        }
                })
            }
        };
        xhr.send();
  }

function setProducts(res) {
    console.log(res.length);
    $('#products').empty()
    $('.dummy-card').hide()
    res.forEach(product => {
        let productCard = document.createElement('div')
        productCard.innerHTML = `
            <img src="${product.thumbnail_url}">
            <span class="product-name">${product.name}</span>
            <span class="product-cost">USD ${product.price}</span>`
            productCard.className = 'product'
        $('#products').append(productCard)
        $(productCard)
            .off('click')
            .on('click', () => {
                console.log('culprit');
                setLocationPath('products.html')
        })
    });
}

function setLocationPath(path) {
	const paths = window.location.pathname.split('/')
	if (paths[paths.length-1] !== path) {
		paths[paths.length-1] = path
		window.location.search = ""
		window.location.pathname = paths.join('/')
	}
}