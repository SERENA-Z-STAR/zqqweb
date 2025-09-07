// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', function() {
    // 导航栏滚动效果
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // 移动端菜单切换
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    mobileMenuBtn.addEventListener('click', function() {
        mobileMenu.classList.toggle('hidden');
    });
    
    // 移动端二级菜单交互
    // 版块二级菜单
    const mobileForumsBtn = document.getElementById('mobile-forums-btn');
    const mobileForumsSubmenu = document.getElementById('mobile-forums-submenu');
    
    if (mobileForumsBtn && mobileForumsSubmenu) {
        // 默认显示子菜单（如果是在版块页面）
        if (window.location.pathname.includes('forums.html')) {
            mobileForumsSubmenu.classList.remove('hidden');
            const icon = mobileForumsBtn.querySelector('i');
            icon.classList.add('rotate-180');
        }
        
        mobileForumsBtn.addEventListener('click', function(e) {
            // 如果子菜单是隐藏的，阻止跳转，只展开子菜单
            if (mobileForumsSubmenu.classList.contains('hidden')) {
                e.preventDefault();
                const icon = this.querySelector('i');
                mobileForumsSubmenu.classList.remove('hidden');
                icon.classList.add('rotate-180');
            }
            // 如果子菜单已经展开，允许正常跳转
        });
    }
    
    // 热门二级菜单
    const mobileTrendingBtn = document.getElementById('mobile-trending-btn');
    const mobileTrendingSubmenu = document.getElementById('mobile-trending-submenu');
    
    if (mobileTrendingBtn && mobileTrendingSubmenu) {
        // 默认显示子菜单（如果是在热门页面）
        if (window.location.pathname.includes('trending.html')) {
            mobileTrendingSubmenu.classList.remove('hidden');
            const icon = mobileTrendingBtn.querySelector('i');
            icon.classList.add('rotate-180');
        }
        
        mobileTrendingBtn.addEventListener('click', function(e) {
            // 如果子菜单是隐藏的，阻止跳转，只展开子菜单
            if (mobileTrendingSubmenu.classList.contains('hidden')) {
                e.preventDefault();
                const icon = this.querySelector('i');
                mobileTrendingSubmenu.classList.remove('hidden');
                icon.classList.add('rotate-180');
            }
            // 如果子菜单已经展开，允许正常跳转
        });
    }
    
    // 视频二级菜单
    const mobileVideosBtn = document.getElementById('mobile-videos-btn');
    const mobileVideosSubmenu = document.getElementById('mobile-videos-submenu');
    
    if (mobileVideosBtn && mobileVideosSubmenu) {
        // 默认显示子菜单（如果是在视频页面）
        if (window.location.pathname.includes('videos.html')) {
            mobileVideosSubmenu.classList.remove('hidden');
            const icon = mobileVideosBtn.querySelector('i');
            icon.classList.add('rotate-180');
        }
        
        mobileVideosBtn.addEventListener('click', function(e) {
            // 如果子菜单是隐藏的，阻止跳转，只展开子菜单
            if (mobileVideosSubmenu.classList.contains('hidden')) {
                e.preventDefault();
                const icon = this.querySelector('i');
                mobileVideosSubmenu.classList.remove('hidden');
                icon.classList.add('rotate-180');
            }
            // 如果子菜单已经展开，允许正常跳转
        });
    }
    
    // 轮播图功能
    let currentSlide = 0;
    const slides = document.querySelectorAll('.carousel-item');
    const dots = document.querySelectorAll('.carousel-indicators button');
    
    function showSlide(index) {
        slides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        slides[index].classList.add('active');
        currentSlide = index;
    }
    
    // 如果有轮播图，设置自动播放
    if (slides.length > 0) {
        setInterval(() => {
            let nextSlide = (currentSlide + 1) % slides.length;
            showSlide(nextSlide);
        }, 5000);
    }
    

    
    // 图片预览功能
    const postImages = document.querySelectorAll('article .grid img');
    let imagePreview = null;
    
    postImages.forEach(img => {
        img.addEventListener('click', function() {
            // 创建图片预览容器
            if (!imagePreview) {
                imagePreview = document.createElement('div');
                imagePreview.className = 'image-preview';
                imagePreview.innerHTML = `
                    <span class="close-preview">&times;</span>
                    <img src="" alt="预览图片">
                `;
                document.body.appendChild(imagePreview);
                
                // 关闭预览
                const closeBtn = imagePreview.querySelector('.close-preview');
                closeBtn.addEventListener('click', function() {
                    imagePreview.classList.remove('active');
                });
                
                // 点击空白处关闭预览
                imagePreview.addEventListener('click', function(e) {
                    if (e.target === imagePreview) {
                        imagePreview.classList.remove('active');
                    }
                });
            }
            
            // 设置图片源并显示预览
            const previewImg = imagePreview.querySelector('img');
            previewImg.src = this.src;
            imagePreview.classList.add('active');
        });
    });
    
    // 点赞功能
    const likeButtons = document.querySelectorAll('.fa-heart-o');
    
    likeButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const isLiked = this.classList.contains('liked');
            const likeCount = this.nextSibling;
            let count = parseInt(likeCount.textContent.trim());
            
            if (isLiked) {
                this.classList.remove('liked');
                this.classList.remove('heart-animation');
                this.classList.remove('fa-heart');
                this.classList.add('fa-heart-o');
                likeCount.textContent = ' ' + (count - 1);
            } else {
                this.classList.add('liked');
                this.classList.add('heart-animation');
                this.classList.remove('fa-heart-o');
                this.classList.add('fa-heart');
                likeCount.textContent = ' ' + (count + 1);
                
                // 动画结束后移除动画类
                setTimeout(() => {
                    this.classList.remove('heart-animation');
                }, 600);
            }
        });
    });
    
    // 导航链接高亮
    const navLinks = document.querySelectorAll('nav a');
    
    function highlightNavLink() {
        const scrollPosition = window.scrollY;
        
        document.querySelectorAll('section').forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionBottom = sectionTop + section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                navLinks.forEach(link => {
                    link.classList.remove('nav-active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('nav-active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', highlightNavLink);
    
    // 浮动发布按钮
    const floatPostBtn = document.getElementById('float-post-btn');
    const postButton = document.querySelector('nav button.bg-primary');
    
    if (floatPostBtn && postButton) {
        floatPostBtn.addEventListener('click', function() {
            postButton.click();
        });
    }
    
    // 平滑滚动
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // 关闭移动端菜单
                if (!mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden');
                }
            }
        });
    });
    
    // 模拟发布帖子功能
    const postButtons = document.querySelectorAll('button.bg-primary');
    
    postButtons.forEach(button => {
        button.addEventListener('click', function() {
            alert('发布帖子功能开发中，敬请期待！');
        });
    });
    
    // 版块进入按钮功能
    const forumButtons = document.querySelectorAll('.card-shadow button');
    
    forumButtons.forEach(button => {
        button.addEventListener('click', function() {
            const forumCard = this.closest('.card-shadow');
            const forumTitle = forumCard.querySelector('h3').textContent;
            alert(`正在进入${forumTitle}版块...`);
        });
    });
    
    // 板块右上角查看按钮功能
    const viewButtons = document.querySelectorAll('.card-shadow .absolute.top-3.right-3 a');
    
    viewButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const forumCard = this.closest('.card-shadow');
            const forumTitle = forumCard.querySelector('h3').textContent;
            alert(`正在查看${forumTitle}的全部内容...`);
        });
    });
    
    // 查看全部版块链接功能
    const viewAllLink = document.querySelector('a[href="#all-forums"]');
    
    if (viewAllLink) {
        viewAllLink.addEventListener('click', function(e) {
            e.preventDefault();
            alert('正在查看所有版块...');
        });
    }
    
    // 视频播放按钮功能
    const videoPlayButtons = document.querySelectorAll('.fa-play').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            const videoCard = this.closest('.card-shadow');
            const videoTitle = videoCard.querySelector('h3').textContent;
            alert(`正在播放视频：${videoTitle}`);
        });
    });
    
    // 热门视频数据和换一批功能
    const videoBatches = [
        [
            { id: 1, title: "2023校花评选候选人精彩瞬间", source: "校园电视台", duration: "02:45", imageId: 65 },
            { id: 2, title: "校草评选候选人篮球比赛精彩集锦", source: "篮球协会", duration: "03:12", imageId: 91 },
            { id: 3, title: "校园文化艺术节精彩回顾", source: "学生会", duration: "05:38", imageId: 119 },
            { id: 4, title: "期末复习攻略分享会全程", source: "学习部", duration: "04:22", imageId: 26 }
        ],
        [
            { id: 5, title: "校园歌手大赛决赛精彩片段", source: "艺术团", duration: "06:15", imageId: 28 },
            { id: 6, title: "校园运动会开幕式全程", source: "体育部", duration: "08:30", imageId: 33 },
            { id: 7, title: "校园科技节创新项目展示", source: "科技协会", duration: "07:25", imageId: 42 },
            { id: 8, title: "校园志愿者服务活动记录", source: "志愿者协会", duration: "05:10", imageId: 54 }
        ],
        [
            { id: 9, title: "校园新生军训回顾", source: "学生处", duration: "09:45", imageId: 67 },
            { id: 10, title: "校园辩论赛决赛实况", source: "辩论社", duration: "12:20", imageId: 79 },
            { id: 11, title: "校园美食节精彩瞬间", source: "美食协会", duration: "04:55", imageId: 88 },
            { id: 12, title: "校园动漫节cosplay展示", source: "动漫社", duration: "06:40", imageId: 99 }
        ]
    ];
    
    // 初始化视频批次索引
    let currentBatchIndex = 0;
    
    // 换一批视频功能
    const refreshVideosBtn = document.getElementById('refresh-videos-btn');
    const videoGrid = document.getElementById('video-grid');
    
    if (refreshVideosBtn && videoGrid) {
        refreshVideosBtn.addEventListener('click', function() {
            // 选择下一批视频数据，循环使用
            currentBatchIndex = (currentBatchIndex + 1) % videoBatches.length;
            const newVideos = videoBatches[currentBatchIndex];
            
            // 清空当前视频网格
            videoGrid.innerHTML = '';
            
            // 添加新视频
            newVideos.forEach(video => {
                const videoItem = document.createElement('div');
                videoItem.className = 'video-item bg-white rounded-xl overflow-hidden card-shadow hover-scale fade-in';
                
                videoItem.innerHTML = `
                    <div class="relative">
                        <img
                            src="https://picsum.photos/id/${video.imageId}/600/400"
                            alt="${video.title}"
                            class="w-full h-32 object-cover" />
                        <div class="absolute inset-0 flex items-center justify-center">
                            <button
                                class="w-10 h-10 rounded-full bg-white/30 backdrop-blur-sm hover:bg-white/50 flex items-center justify-center transition-all">
                                <i class="fa fa-play text-white text-sm"></i>
                            </button>
                        </div>
                        <div
                            class="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-0.5 rounded">
                            ${video.duration}
                        </div>
                    </div>
                    <div class="p-2">
                        <h3 class="font-bold text-sm mb-1 line-clamp-2 hover:text-primary transition-colors">
                            <a href="#">${video.title}</a>
                        </h3>
                        <div class="flex items-center text-gray-500 text-xs">
                            <span>${video.source}</span>
                        </div>
                    </div>
                `;
                
                videoGrid.appendChild(videoItem);
            });
            
            // 重新绑定新添加视频的播放按钮事件
            bindVideoPlayButtons();
        });
        
        // 绑定视频播放按钮事件的函数
        function bindVideoPlayButtons() {
            document.querySelectorAll('.video-item .fa-play').forEach(button => {
                button.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    const videoCard = this.closest('.video-item');
                    const videoTitle = videoCard.querySelector('h3').textContent;
                    alert(`正在播放视频：${videoTitle}`);
                });
            });
        }
    }
    
    // 添加淡入动画效果
    function animateOnScroll() {
        const elements = document.querySelectorAll('.card-shadow, article');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('fade-in');
            }
        });
    }
    
    window.addEventListener('scroll', animateOnScroll);
    // 初始触发一次动画
    animateOnScroll();
});