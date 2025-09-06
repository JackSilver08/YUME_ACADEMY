document.addEventListener("DOMContentLoaded", function () {
  const container = document.getElementById("sakura-container");

  function createPetal() {
    const petal = document.createElement("img");
    petal.src = "IMG/Hoa anh đào.png"; // đúng đường dẫn ảnh bạn dùng
    petal.classList.add("sakura");

    // Vị trí ngẫu nhiên bên trái màn hình
    petal.style.left = Math.random() * window.innerWidth + "px";

    // Thời gian rơi và delay khác nhau
    const duration = Math.random() * 5 + 5; // từ 5s đến 10s
    petal.style.animationDuration = duration + "s";

    container.appendChild(petal);

    // Xóa khi rơi xong
    setTimeout(() => {
      container.removeChild(petal);
    }, duration * 1000);
  }

  // Tạo liên tục hoa rơi
  setInterval(createPetal, 1500);
});

// Slider banner

document.addEventListener("DOMContentLoaded", function () {
  const banners = [
    { img: "IMG/1.png", link: "https://www.facebook.com/share/p/1AxwjfadFs/" },
    { img: "IMG/2.png", link: "https://www.facebook.com/share/p/173ZDBBh56/" },
    // Thêm ảnh và link khác nếu muốn
  ];

  let current = 0;
  const slider = document.getElementById("banner-slider");
  const dotsContainer = document.getElementById("banner-dots");
  let intervalId;

function showBanner(index) {
  slider.innerHTML = "";

  const a = document.createElement("a");
  a.href = banners[index].link;
  a.target = "_blank";

  const img = document.createElement("img");
  img.src = banners[index].img;
  img.alt = "Banner " + (index + 1);

  a.appendChild(img);
  slider.appendChild(a);

  // trigger fade in
  setTimeout(() => img.classList.add("active"), 50);

  // update dots
  Array.from(dotsContainer.children).forEach((dot, i) => {
    dot.classList.toggle("active", i === index);
  });
}


  function createDots() {
    dotsContainer.innerHTML = "";
    banners.forEach((_, i) => {
      const dot = document.createElement("button");
      dot.className = "banner-dot" + (i === current ? " active" : "");
      dot.addEventListener("click", () => {
        current = i;
        showBanner(current);
        resetInterval();
      });
      dotsContainer.appendChild(dot);
    });
  }

  function nextBanner() {
    current = (current + 1) % banners.length;
    showBanner(current);
  }

  function resetInterval() {
    clearInterval(intervalId);
    intervalId = setInterval(nextBanner, 5000);
  }

  createDots();
  showBanner(current);
  intervalId = setInterval(nextBanner, 5000);
});
