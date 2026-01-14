window.addEventListener('DOMContentLoaded', function() {
    // 1. 修复锚点跳转（包含案例详情页）
    const navLinks = document.querySelectorAll('a[href^="#"]');
    const navHeight = document.querySelector('.navbar').offsetHeight;
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetEle = document.querySelector(targetId);
            if (targetEle) { // 确保目标元素存在
                const targetTop = targetEle.offsetTop - navHeight;
                window.scrollTo({
                    top: targetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 2. 滚动时导航高亮（包含案例展示）
    window.addEventListener('scroll', function() {
        const scrollPos = window.scrollY + navHeight + 10;
        navLinks.forEach(link => {
            link.classList.remove('active');
            const targetId = link.getAttribute('href');
            const targetEle = document.querySelector(targetId);
            if (targetEle) {
                const eleTop = targetEle.offsetTop;
                const eleBottom = eleTop + targetEle.offsetHeight;
                if (scrollPos >= eleTop && scrollPos < eleBottom) {
                    link.classList.add('active');
                }
            }
        });
    });

    // 3. 案例详情页返回按钮适配
    const backBtn = document.querySelector('.back-btn');
    if (backBtn) {
        backBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const caseEle = document.querySelector('#case');
            if (caseEle) {
                const caseTop = caseEle.offsetTop - navHeight;
                window.scrollTo({
                    top: caseTop,
                    behavior: 'smooth'
                });
            }
        });
    }
});
// ========== 高端门店相册3图轮播核心JS (xiangce1-xiangce10) ==========
const swiperItems = document.querySelectorAll('.swiper-item');
const prevBtn = document.querySelector('.swiper-prev');
const nextBtn = document.querySelector('.swiper-next');
const swiperBox = document.querySelector('.album-swiper-box');
let currentIndex = 0;
const total = swiperItems.length;
let timer = null;

// 初始化轮播状态
function initSwiper() {
    swiperItems.forEach((item, index) => {
        item.classList.remove('active', 'prev', 'next', 'hide');
        if(index === currentIndex) {
            item.classList.add('active');
        } else if(index === (currentIndex - 1 + total) % total) {
            item.classList.add('prev');
        } else if(index === (currentIndex + 1) % total) {
            item.classList.add('next');
        } else {
            item.classList.add('hide');
        }
    });
}

// 下一张
function goNext() {
    currentIndex = (currentIndex + 1) % total;
    initSwiper();
}

// 上一张
function goPrev() {
    currentIndex = (currentIndex - 1 + total) % total;
    initSwiper();
}

// 自动轮播 3秒切换一次
function autoPlay() {
    timer = setInterval(() => {
        goNext();
    }, 1500);
}

// 鼠标移入暂停轮播，移出继续
swiperBox.addEventListener('mouseenter', () => {
    clearInterval(timer);
});
swiperBox.addEventListener('mouseleave', () => {
    autoPlay();
});

// 点击按钮切换
prevBtn.addEventListener('click', goPrev);
nextBtn.addEventListener('click', goNext);

// 初始化+启动轮播
initSwiper();
autoPlay();
const currentScroll = scrollY + navHeight + 0; 
// ✔ 数值50是触发阈值，改这个就行：
// 想滚动到板块顶部就高亮 → 改成 0
// 想滚动到板块中间再高亮 → 改成 100