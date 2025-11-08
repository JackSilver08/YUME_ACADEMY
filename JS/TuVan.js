document.addEventListener('DOMContentLoaded', function() {
            const form = document.getElementById('contactForm');
            const statusMsg = document.getElementById('formStatus');
            
            // Xử lý sự kiện khi chọn "Đã học và từng thi JLPT"
            const jlptRadios = document.querySelectorAll('input[name="entry.998877665"]');
            const jlptLevelInput = document.getElementById('jlptLevel');
            
            jlptRadios.forEach(radio => {
                radio.addEventListener('change', function() {
                    if (this.value === 'Đã học và từng thi JLPT') {
                        jlptLevelInput.style.display = 'block';
                        jlptLevelInput.required = true;
                    } else {
                        jlptLevelInput.style.display = 'none';
                        jlptLevelInput.required = false;
                    }
                });
            });
            
            // Xử lý gửi form
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Kiểm tra các trường bắt buộc
                const requiredFields = form.querySelectorAll('[required]');
                let isValid = true;
                
                requiredFields.forEach(field => {
                    if (!field.value) {
                        isValid = false;
                        field.style.borderColor = '#b21f1f';
                    } else {
                        field.style.borderColor = '#ddd';
                    }
                });
                
                if (!isValid) {
                    statusMsg.textContent = 'Vui lòng điền đầy đủ các trường bắt buộc (*)';
                    statusMsg.className = 'status-msg error';
                    statusMsg.style.display = 'block';
                    return;
                }
                
                // Gửi form đến Google Forms
                const formData = new FormData(form);
                
                fetch(form.action, {
                    method: 'POST',
                    body: formData,
                    mode: 'no-cors'
                }).then(() => {
                    statusMsg.textContent = 'Đăng ký thành công! Chúng tôi sẽ liên hệ với bạn trong vòng 24 giờ.';
                    statusMsg.className = 'status-msg success';
                    statusMsg.style.display = 'block';
                    form.reset();
                    
                    // Ẩn thông báo sau 5 giây
                    setTimeout(() => {
                        statusMsg.style.display = 'none';
                    }, 5000);
                }).catch(error => {
                    statusMsg.textContent = 'Có lỗi xảy ra. Vui lòng thử lại!';
                    statusMsg.className = 'status-msg error';
                    statusMsg.style.display = 'block';
                    console.error('Error:', error);
                });
            });
           
        });