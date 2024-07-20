// prices.js
const menuData = [
  {
    category: "꼬치구이",
    type: "고기류",
    items: [
      { name: "츠쿠네", price: 5500 },
      { name: "닭 날개", price: 4500 },
      { name: "닭 가슴살", price: 4000 },
      { name: "명란마요 가슴살", price: 5000 },
      { name: "돼지 삼겹", price: 4000 },
      { name: "닭 다리살&파", price: 5000 },
      { name: "닭 다리살", price: 5000 },
      { name: "항정살", price: 4500 },
      { name: "닭 목살", price: 4000 }
    ]
  },
  {
    category: "꼬치구이",
    type: "야채류",
    items: [
      { name: "감자&생크림", price: 4000 },
      { name: "마늘", price: 3000 },
      { name: "표고버섯&완자", price: 5000 },
      { name: "옥수수", price: 5000 },
      { name: "새송이", price: 4000 },
      { name: "은행", price: 4000 }
    ]
  },
  {
    category: "꼬치구이",
    type: "삼겹말이",
    items: [
      { name: "양송이 삼겹", price: 4000 },
      { name: "팽이버섯 삼겹", price: 4000 },
      { name: "메추리알 삼겹", price: 4000 },
      { name: "아스파라 삼겹", price: 4000 },
      { name: "초생강 삼겹", price: 4000 },
      { name: "마늘 삼겹", price: 4000 },
      { name: "토마토 삼겹", price: 4000 }
    ]
  },
  {
    category: "꼬치구이",
    type: "기타",
    items: [
      { name: "막창", price: 4000 },
      { name: "닭 껍질", price: 3500 },
      { name: "염통", price: 3500 },
      { name: "새우", price: 3500 }
    ]
  },
  {
    category: "꼬치구이",
    type: "단품으로만 주문가능",
    items: [
      { name: "소등심", price: 5500 },
      { name: "닭 물령뼈", price: 4500 },
      { name: "양송이", price: 4000 }
    ]
  },
  {
    category: "일품요리",
    items: [
      { name: "연어 사시미 (옵션 1 소)", price: 28000 },
      { name: "연어 사시미 (옵션 2 중)", price: 36000 },
      { name: "연어 사시미 (옵션 3 대)", price: 45000 },
      { name: "오꼬노미야끼", price: 19000 },
      { name: "삼겹 숙주 볶음", price: 18000 },
      { name: "소고기 타다끼", price: 27000 }
    ]
  },
  {
    category: "숯불구이",
    items: [
      { name: "명란", price: 6000 },
      { name: "염통", price: 6000 },
      { name: "소 힘줄", price: 7000 },
      { name: "돼지 삼겹", price: 8000 }
    ]
  },
  {
    category: "주류",
    items: [
      { name: "청하", price: 4000 },
      { name: "백세주", price: 5000 },
      { name: "소주", price: 3000 },
      { name: "맥주", price: 4000 }
    ]
  },
  {
    category: "음료",
    items: [
      { name: "콜라", price: 2000 },
      { name: "사이다", price: 2000 },
      { name: "오렌지 주스", price: 3000 },
      { name: "아이스티", price: 3000 }
    ]
  }
];

// 메뉴 데이터를 HTML로 변환하여 표시하는 함수
function renderMenu() {
  const menuContainer = document.getElementById('menu-container');
  menuContainer.innerHTML = menuData.map(category => `
    <div class="menu-category">
      <h2>${category.category} (${category.type || ''})</h2>
      ${category.items.map(item => `
        <div class="menu-item" onclick="addToCart('${item.name}', ${item.price})">
          ${item.name} - ${item.price}원
        </div>
      `).join('')}
    </div>
  `).join('');
}

// 페이지 로드 시 메뉴를 표시
document.addEventListener('DOMContentLoaded', renderMenu);
