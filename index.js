const accessKey = "VM9EiCZsA1ctCahzuZVscijwgWK-jaMN4BpufSJfRZM";

const formElement = document.querySelector("form");
const searchInputElement = document.getElementById("search-input");
const searchResultsElements = document.querySelector(".search-results");
const showMoreButton = document.getElementById("show-more-button");

let inputData = "";//let kullandık ki kullanıcı her seferinde farklı input gireceği için bu değer sabit kalmayacak
let page = 1; //mevcut sayfanın index numarası. (sonuç çıkınca ilk sayfa)

async function searchImages()
{
    inputData = searchInputElement.value;//input içindeki veriyi aldık
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;//url'yi api yardımıyla aldık
    console.log(url);
    const response = await fetch(url);//await kullanarak sonucun gelmesini bekletiyoruz. Url sonucu dönen veriyi fetch ile aldık (url formatında)
    const data = await response.json();//url biçimindeki veriyi json'a çevirerek ulaşılabilir yaptık
    
    // console.log(data);

    if(page === 1)//kullanıcının sayfaya ilk girişi mi(ilk sayfa mı)
    {
        searchResultsElements.innerHTML = "";//sayfayı temizledik (boş sayfa ile açılsın)
    }

    const results = data.results; //json içindeki dosyayı kendi değişkenimize atadık
    results.map((result)=>{//results verisi çok elemanlı bir diziden oluştuğu için bunu ayırmamız gerekiyor
        const imageWrapper = document.createElement("div")//sayfa açıldığında sildiğimiz divleri yeniden bastıralım
        imageWrapper.classList.add("search-result");//en başta default olarak oluşturduğumuz div class'ını ekledik
        const image = document.createElement("img");//divin içine img ekledik
        image.src = result.urls.small;//img içerisine gelecek image'yi json'dan çektik, result.urls.small uzantısı json'dan geliyor
        image.alt = result.alt_description;
        const imageLink = document.createElement("a")//resmin altına bir link ekledik
        imageLink.href = result.links.hmtl;
        imageLink.target = "_blank";
        imageLink.textContent = result.alt_description;

        imageWrapper.appendChild(image);//image ve imageLink'i div içerisine koyduk
        imageWrapper.appendChild(imageLink);
        searchResultsElements.appendChild(imageWrapper);//bu divi de en temel div içerisine yerleştirdik
    });;

    page++;

    

    if(page > 1)//kullanıcı artık sayfayı kullandı ve butonu yükleyebiliriz
    {
        showMoreButton.style.display = "block";//butonun erişilebilirliğine ulaş ve görünür kıl
    }

   


}

formElement.addEventListener("submit", (event)=> {
    event.preventDefault();//Varsayılan olarak sayfa yenilemesini önler
    page = 1;
    searchImages();
})