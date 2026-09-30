import { useState } from 'react'
import { Routes, Route, Link, NavLink, useNavigate, useParams } from 'react-router'
import './App.css'

import bomber1 from './assets/bomber-1.jpg'
import bomber2 from './assets/bomber-2.jpg'
import bomber3 from './assets/bomber-3.jpg'
import adidas1 from './assets/adidas-1.jpg'
import adidas2 from './assets/adidas-2.jpg'
import jeans1 from './assets/jeans-1.jpg'
import jeans2 from './assets/jeans-2.jpg'
import jeans3 from './assets/jeans-3.jpg'

const products = [
  {
    id: 1,
    name: 'LEATHER BOMBER MASTERMIND JAPAN',
    category: 'КУРТКИ',
    condition: 'NEW',
    price: 24990,
    badge: 'NEW',
    images: [bomber1, bomber2, bomber3],
    description:
      'Кожаный бомбер Mastermind Japan — культовая вещь из японского дропа. Натуральная кожа премиум-качества, фирменная вышивка «Japan mastermind» на спине с черепом и костями. Свободный крой, рибанные манжеты и пояс. Идеально садится как оверсайз.',
    specs: [
      ['БРЕНД', 'MASTERMIND JAPAN'],
      ['СОСТОЯНИЕ', 'НОВОЕ, С БИРКАМИ'],
      ['МАТЕРИАЛ', 'НАТУРАЛЬНАЯ КОЖА'],
      ['РАЗМЕР', 'L / 48-50'],
      ['ЦВЕТ', 'ЧЁРНЫЙ'],
      ['СТРАНА', 'ЯПОНИЯ'],
    ],
  },
  {
    id: 2,
    name: "ADIDAS ORIGINALS RETRO 00's",
    category: 'КУРТКИ',
    condition: 'USED',
    price: 5490,
    badge: 'USED',
    images: [adidas1, adidas2],
    description:
      "Куртка Adidas Originals из нулевых — настоящий винтаж. Классический ретро-крой, узнаваемый логотип на груди. Настоящая вещь из 00-х, сейчас такие уже не выпускают. Состояние идеальное для своего возраста, без дефектов.",
    specs: [
      ['БРЕНД', 'ADIDAS ORIGINALS'],
      ['СОСТОЯНИЕ', 'Б/У, ОТЛИЧНОЕ'],
      ['МАТЕРИАЛ', 'ПОЛИЭСТЕР'],
      ['РАЗМЕР', 'M / 46-48'],
      ['ГОД', '2000-е'],
      ['СТРАНА', 'ГЕРМАНИЯ'],
    ],
  },
  {
    id: 3,
    name: 'BOOTCUT JEANS BALENCIAGA FLARED LGB',
    category: 'ДЖИНСЫ',
    condition: 'USED',
    price: 18990,
    badge: 'USED',
    images: [jeans1, jeans2, jeans3],
    description:
      'Джинсы Balenciaga Bootcut Flared из коллекции LGB. Классический крой клёш с потертостями и характерной фурнитурой. Оригинальный деним с плотной текстурой, идеальная посадка. Оригинал, проверено.',
    specs: [
      ['БРЕНД', 'BALENCIAGA'],
      ['СОСТОЯНИЕ', 'Б/У, ОТЛИЧНОЕ'],
      ['МАТЕРИАЛ', 'ДЕНИМ 100%'],
      ['РАЗМЕР', '32 / W32 L34'],
      ['КРОЙ', 'BOOTCUT / FLARED'],
      ['СТРАНА', 'ИТАЛИЯ'],
    ],
  },
]

const CATEGORIES = ['ВСЕ', 'КУРТКИ', 'ОБУВЬ', 'ДЖИНСЫ', 'КОФТЫ', 'ФУТБОЛКИ']
const CONDITIONS = ['ВСЁ', 'НОВОЕ', 'Б/У']

function Header({ cartCount, onCartClick }) {
  return (
    <header className="header">
      <div className="header-inner">
        <Link to="/" className="logo">
          AW<span className="logo-dot">.</span>SHOP
        </Link>
        <nav className="nav">
          <NavLink to="/" end>ГЛАВНАЯ</NavLink>
          <NavLink to="/catalog">КАТАЛОГ</NavLink>
          <NavLink to="/about">О НАС</NavLink>
          <NavLink to="/contact">КОНТАКТЫ</NavLink>
        </nav>
        <button className="cart-btn" onClick={onCartClick}>
          КОРЗИНА [{cartCount}]
        </button>
      </div>
    </header>
  )
}

function ProductCard({ product, onAdd }) {
  const [activeImg, setActiveImg] = useState(0)
  const images = product.images || [product.image]
  const navigate = useNavigate()

  return (
    <div className="product-card">
      <div
        className="product-image"
        onClick={() => navigate(`/product/${product.id}`)}
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect()
          const x = e.clientX - rect.left
          const ratio = x / rect.width
          const idx = Math.min(images.length - 1, Math.floor(ratio * images.length))
          setActiveImg(idx)
        }}
        onMouseLeave={() => setActiveImg(0)}
      >
        {images.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={product.name}
            className={`product-img ${i === activeImg ? 'active' : ''}`}
          />
        ))}

        <span className={`product-badge ${product.condition === 'USED' ? 'badge-used' : 'badge-new'}`}>
          {product.condition === 'USED' ? 'Б/У' : 'НОВОЕ'}
        </span>

        {images.length > 1 && (
          <div className="dots">
            {images.map((_, i) => (
              <span key={i} className={`dot ${i === activeImg ? 'active' : ''}`} />
            ))}
          </div>
        )}
      </div>

      <div className="product-info">
        <div
          className="product-top"
          onClick={() => navigate(`/product/${product.id}`)}
        >
          <h3 className="product-name">{product.name}</h3>
          <span className="product-category">{product.category}</span>
        </div>
        <div className="product-bottom">
          <span className="product-price">{product.price} ₽</span>
          <button
            className="add-btn"
            onClick={(e) => {
              e.stopPropagation()
              onAdd(product)
            }}
          >
            + В КОРЗИНУ
          </button>
        </div>
      </div>
    </div>
  )
}

function HomePage() {
  return (
    <section className="hero">
      <div className="hero-tag">[ EST. 2025 / RUSSIA ]</div>
      <h1 className="hero-title">
        AW<span className="accent">.</span>SHOP
      </h1>
      <p className="hero-subtitle">Новые и б/у вещи для тех, кто ценит стиль</p>
      <Link to="/catalog" className="hero-btn">ПЕРЕЙТИ В КАТАЛОГ →</Link>
    </section>
  )
}

function CatalogPage({ onAdd }) {
  const [condition, setCondition] = useState('ВСЁ')
  const [category, setCategory] = useState('ВСЕ')
  const [search, setSearch] = useState('')
  const [priceFrom, setPriceFrom] = useState('')
  const [priceTo, setPriceTo] = useState('')
  const [sortDir, setSortDir] = useState(null)

  const handleSort = () => {
    if (sortDir === null) setSortDir('asc')
    else if (sortDir === 'asc') setSortDir('desc')
    else setSortDir(null)
  }

  const resetPrice = () => {
    setPriceFrom('')
    setPriceTo('')
  }

  let filtered = products.filter((p) => {
    const condMatch =
      condition === 'ВСЁ' ||
      (condition === 'НОВОЕ' && p.condition === 'NEW') ||
      (condition === 'Б/У' && p.condition === 'USED')

    const catMatch = category === 'ВСЕ' || p.category === category

    const searchMatch =
      search.trim() === '' ||
      p.name.toLowerCase().includes(search.trim().toLowerCase())

    const from = priceFrom === '' ? -Infinity : Number(priceFrom)
    const to = priceTo === '' ? Infinity : Number(priceTo)
    const priceMatch = p.price >= from && p.price <= to

    return condMatch && catMatch && searchMatch && priceMatch
  })

  if (sortDir === 'asc') filtered = [...filtered].sort((a, b) => a.price - b.price)
  if (sortDir === 'desc') filtered = [...filtered].sort((a, b) => b.price - a.price)

  const countByCondition = (c) =>
    c === 'ВСЁ'
      ? products.length
      : products.filter(p => p.condition === (c === 'НОВОЕ' ? 'NEW' : 'USED')).length

  const countByCategory = (cat) =>
    cat === 'ВСЕ'
      ? products.length
      : products.filter(p => p.category === cat).length

  return (
    <section className="catalog">
      <div className="catalog-header">
        <h2 className="catalog-title">КАТАЛОГ</h2>
      </div>

      <div className="filter-row">
        <span className="filter-label">СОСТОЯНИЕ</span>
        <div className="filters">
          {CONDITIONS.map((c) => (
            <button
              key={c}
              className={`filter-btn ${condition === c ? 'active' : ''}`}
              onClick={() => setCondition(c)}
            >
              {c} [{countByCondition(c)}]
            </button>
          ))}
        </div>
      </div>

      <div className="filter-row">
        <span className="filter-label">КАТЕГОРИЯ</span>
        <div className="filters">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              className={`filter-btn ${category === cat ? 'active' : ''}`}
              onClick={() => setCategory(cat)}
            >
              {cat} [{countByCategory(cat)}]
            </button>
          ))}
        </div>
      </div>

      <div className="filter-row">
        <span className="filter-label">ПОИСК</span>
        <input
          type="text"
          className="search-input"
          placeholder="НАЗВАНИЕ ТОВАРА..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="filter-row">
        <span className="filter-label">ЦЕНА ₽</span>
        <div className="price-range">
          <input
            type="number"
            className="price-input"
            placeholder="ОТ"
            value={priceFrom}
            onChange={(e) => setPriceFrom(e.target.value)}
          />
          <span className="price-dash">—</span>
          <input
            type="number"
            className="price-input"
            placeholder="ДО"
            value={priceTo}
            onChange={(e) => setPriceTo(e.target.value)}
          />
          <button className="reset-btn" onClick={resetPrice}>СБРОС</button>
        </div>
        <button
          className={`sort-btn ${sortDir ? 'active' : ''}`}
          onClick={handleSort}
        >
          {sortDir === null && 'ЦЕНА ↕'}
          {sortDir === 'asc' && 'ЦЕНА ↑'}
          {sortDir === 'desc' && 'ЦЕНА ↓'}
        </button>
      </div>

      <div className="grid">
        {filtered.length === 0 ? (
          <p className="no-products">НИЧЕГО НЕ НАЙДЕНО</p>
        ) : (
          filtered.map((p) => (
            <ProductCard key={p.id} product={p} onAdd={onAdd} />
          ))
        )}
      </div>
    </section>
  )
}

function ProductPage({ onAdd }) {
  const { id } = useParams()
  const navigate = useNavigate()
  const product = products.find((p) => p.id === Number(id))
  const [activeImg, setActiveImg] = useState(0)

  if (!product) {
    return (
      <section className="page" style={{ textAlign: 'center' }}>
        <h1 className="page-title">404</h1>
        <p className="page-text">Товар не найден</p>
        <button className="hero-btn" onClick={() => navigate('/catalog')}>
          В КАТАЛОГ
        </button>
      </section>
    )
  }

  return (
    <section className="product-page">
      <button className="back-btn" onClick={() => navigate(-1)}>← НАЗАД</button>

      <div className="product-page-grid">
        <div className="product-page-gallery">
          <div className="product-page-main">
            <img src={product.images[activeImg]} alt={product.name} />
            <span className={`product-badge ${product.condition === 'USED' ? 'badge-used' : 'badge-new'}`}>
              {product.condition === 'USED' ? 'Б/У' : 'НОВОЕ'}
            </span>
          </div>
          {product.images.length > 1 && (
            <div className="product-page-thumbs">
              {product.images.map((src, i) => (
                <button
                  key={i}
                  className={`thumb ${i === activeImg ? 'active' : ''}`}
                  onClick={() => setActiveImg(i)}
                >
                  <img src={src} alt={`${product.name} ${i + 1}`} />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="product-page-info">
          <div className="product-page-category">{product.category}</div>
          <h1 className="product-page-name">{product.name}</h1>
          <div className="product-page-price">{product.price} ₽</div>

          <p className="product-page-desc">{product.description}</p>

          <button className="product-page-add" onClick={() => onAdd(product)}>
            + ДОБАВИТЬ В КОРЗИНУ
          </button>

          <div className="product-page-specs">
            <h3>ХАРАКТЕРИСТИКИ</h3>
            {product.specs.map(([key, val]) => (
              <div key={key} className="spec-row">
                <span>{key}</span>
                <span>{val}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function AboutPage() {
  return (
    <section className="page">
      <div className="page-tag">[ О НАС ]</div>
      <h1 className="page-title">AW<span className="accent">.</span>SHOP</h1>
      <p className="page-text">
        AW.SHOP — это магазин стильной одежды для тех, кто ценит качество,
        минимализм и индивидуальность. Мы продаём как новые вещи от проверенных
        брендов, так и отобранные вручную б/у — в идеальном состоянии.
      </p>
      <div className="features">
        <div className="feature">
          <h3>НОВОЕ</h3>
          <p>Оригинальные вещи от брендов и молодых дизайнеров</p>
        </div>
        <div className="feature">
          <h3>Б/У</h3>
          <p>Отобранные вручную вещи в идеальном состоянии</p>
        </div>
        <div className="feature">
          <h3>ВОЗВРАТ 14 ДНЕЙ</h3>
          <p>Не подошло — вернём деньги</p>
        </div>
      </div>
    </section>
  )
}

function ContactPage() {
  return (
    <section className="page">
      <div className="page-tag">[ КОНТАКТЫ ]</div>
      <h1 className="page-title">СВЯЗЬ</h1>
      <p className="page-text">Свяжитесь с нами любым удобным способом</p>
      <div className="contacts">
        <div className="contact-item">
          <span>EMAIL</span>
          <a href="mailto:hello@aw.shop">hello@aw.shop</a>
        </div>
        <div className="contact-item">
          <span>ТЕЛЕФОН</span>
          <a href="tel:+79990000000">+7 (999) 000-00-00</a>
        </div>
        <div className="contact-item">
          <span>АДРЕС</span>
          <p>Санкт-Петербург, Пискарёвский проспект, 52</p>
        </div>
        <div className="contact-item">
          <span>ЧАСЫ РАБОТЫ</span>
          <p>Пн–Вс, 10:00–22:00</p>
        </div>
      </div>
    </section>
  )
}

function NotFound() {
  const navigate = useNavigate()
  return (
    <section className="page" style={{ textAlign: 'center' }}>
      <h1 className="page-title">404</h1>
      <p className="page-text">Такой страницы не существует</p>
      <button className="hero-btn" onClick={() => navigate('/')}>НА ГЛАВНУЮ</button>
    </section>
  )
}

function App() {
  const [cart, setCart] = useState([])
  const [cartOpen, setCartOpen] = useState(false)

  const addToCart = (product) => setCart([...cart, product])
  const removeFromCart = (i) => setCart(cart.filter((_, idx) => idx !== i))
  const total = cart.reduce((sum, item) => sum + item.price, 0)

  return (
    <div className="app">
      <Header cartCount={cart.length} onCartClick={() => setCartOpen(!cartOpen)} />

      <main className="main">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/catalog" element={<CatalogPage onAdd={addToCart} />} />
          <Route path="/product/:id" element={<ProductPage onAdd={addToCart} />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      {cartOpen && (
        <div className="cart-panel">
          <div className="cart-panel-header">
            <h2>КОРЗИНА [{cart.length}]</h2>
            <button className="close-btn" onClick={() => setCartOpen(false)}>×</button>
          </div>
          {cart.length === 0 ? (
            <p className="cart-empty">КОРЗИНА ПУСТА</p>
          ) : (
            <>
              <div className="cart-items">
                {cart.map((item, i) => (
                  <div key={i} className="cart-item">
                    <img src={item.images ? item.images[0] : item.image} alt={item.name} />
                    <div className="cart-item-info">
                      <p className="cart-item-name">{item.name}</p>
                      <p className="cart-item-price">
                        {item.condition === 'USED' ? '[Б/У] ' : ''}{item.price} ₽
                      </p>
                    </div>
                    <button className="remove-btn" onClick={() => removeFromCart(i)}>×</button>
                  </div>
                ))}
              </div>
              <div className="cart-total">
                <span>ИТОГО:</span>
                <span>{total} ₽</span>
              </div>
              <button className="checkout-btn">ОФОРМИТЬ ЗАКАЗ</button>
            </>
          )}
        </div>
      )}

      <footer className="footer">
        <div className="footer-inner">
          <span>© 2025 AW.SHOP</span>
          <span>ВСЕ ПРАВА ЗАЩИЩЕНЫ</span>
        </div>
      </footer>
    </div>
  )
}

export default App