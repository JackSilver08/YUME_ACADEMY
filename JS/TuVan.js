document.getElementById("contactForm").addEventListener("submit", async function(event) {
  event.preventDefault(); // chặn reload

  let form = event.target;
  let status = document.getElementById("formStatus");

  try {
    let response = await fetch("https://formspree.io/f/xjkeknbo", {  // thay ở đây
      method: "POST",
      body: new FormData(form),
      headers: { 'Accept': 'application/json' }
    });

    if (response.ok) {
      status.textContent = "✅ Cảm ơn bạn! Chúng tôi sẽ liên hệ sớm nhất.";
      status.className = "status-msg status-success";
      form.reset();
    } else {
      status.textContent = "❌ Có lỗi xảy ra, vui lòng thử lại.";
      status.className = "status-msg status-error";
    }
  } catch (error) {
    status.textContent = "⚠️ Không thể gửi, kiểm tra kết nối mạng.";
    status.className = "status-msg status-error";
  }
});
