// show sản phẩm tất cả
// Gửi yêu cầu GET đến địa chỉ API của sản phẩm
// fetch(productsApi)
//   .then(response => response.json()) // Chuyển đổi phản hồi thành đối tượng JSON
//   .then((products) => {
//     console.log(products); // In ra danh sách sản phẩm trong console
//     var container = document.getElementById('card'); // Lấy phần tử HTML có id 'body' và gán vào biến container
//     var htmls = ''; // Khởi tạo chuỗi HTML rỗng
//     products.forEach((element) => {
//       // Duyệt qua từng sản phẩm và tạo chuỗi HTML cho mỗi sản phẩm
//       htmls += `
//               <div  onclick="handleOnclick(${element.id})"  class="col-md-3">
//                   <div class="card mb-3">
//                       <img src="${element.img}"
//                           class="card-img-top" alt="Product Image">
//                       <div class="card-body">
//                           <h5 class="card-title">${element.product_name}</h5>
//                           <div class="d-flex justify-content-between">
//                               <h6 class="card-text">$${element.price}</h6>
//                               <h6 class="card-text"><i class="fa fa-users" aria-hidden="true"></i>${element.viewer}</h6>
//                           </div>
//                       </div>
//                   </div>

//           </div>
//           `;
//     });
//     container.innerHTML = htmls; // Gán chuỗi HTML vào phần tử container để hiển thị danh sách sản phẩm trên trang web
//   });


// Slider 
var swiper = new Swiper("#mySwiper", {
  direction: 'horizontal',
  loop: true,
  spaceBetween: 24,
  slidesPerView: 2,
  slidesPerGroup: 2,
  autoplay: {
    delay: 5000,
  },
});

const productsApi = ' http://localhost:3000/products';

//  Show Featured product 
fetch(productsApi)
  .then(response => response.json())
  .then((products) => {
    console.log(products);
    var container = document.getElementById('card_featured');
    var htmls = '';

    // Sắp xếp danh sách sản phẩm theo số lượng đã bán giảm dần
    products.sort((a, b) => b.sold - a.sold);

    // Lấy 4 sản phẩm đầu tiên
    var topProducts = products.slice(0, 4);

    topProducts.forEach((element) => {
      htmls += `
        <div onclick="handleOnclick(${element.id})" class="col-md-3">
          <div class="card mb-3">
            <img src="${element.img}" class="card-img-top" style="height: 320px; alt="Product Image">
            <div class="card-body">
              <h5 class="card-title">${element.product_name}</h5>
              <div class="d-flex justify-content-between">
                <h6 class="card-text">$${element.price}</h6>
                <h6 class="card-text"><i class="fa fa-users" aria-hidden="true"></i>${element.viewer}</h6>
              </div>
            </div>
          </div>
        </div>
      `;
    });

    container.innerHTML = htmls;
  });

// Show Latest product
fetch(productsApi)
  .then(response => response.json()) // Chuyển đổi phản hồi thành đối tượng JSON
  .then((products) => {
    console.log(products); // In ra danh sách sản phẩm trong console
    var container = document.getElementById('card_latest'); // Lấy phần tử HTML có id 'card' và gán vào biến container
    var htmls = ''; // Khởi tạo chuỗi HTML rỗng

    // Sắp xếp danh sách sản phẩm theo trường "CreateAt" theo thứ tự giảm dần
    products.sort((a, b) => {
      const dateA = new Date(a.CreateAt);
      const dateB = new Date(b.CreateAt);
      return dateB - dateA;
    });

    // Giới hạn số lượng sản phẩm là 4
    var latestProducts = products.slice(0, 4);

    latestProducts.forEach((element) => {
      // Duyệt qua từng sản phẩm và tạo chuỗi HTML cho mỗi sản phẩm
      htmls += `
              <div onclick="handleOnclick(${element.id})" class="col-md-3">
                  <div class="card mb-2">
                      <img src="${element.img}"class="card-img-top" style="height: 320px;"alt="Product Image">
                      <div class="card-body">
                          <h5 class="card-title">${element.product_name}</h5>
                          <div class="d-flex justify-content-between">
                              <h6 class="card-text">$${element.price}</h6>
                              <h6 class="card-text"><i class="fa fa-users" aria-hidden="true"></i>${element.viewer}</h6>
                          </div>
                      </div>
                  </div>
              </div>
          `;
    });
    container.innerHTML = htmls; // Gán chuỗi HTML vào phần tử container để hiển thị danh sách sản phẩm trên trang web
  });
