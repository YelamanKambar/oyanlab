import React, { useEffect, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { services } from './data/services'
import { portfolioItems } from './data/portfolio'
import '@fontsource-variable/noto-sans'
import './styles.css'

const COPY = {
  kk: {
    nav: ['Басты', 'Қызметтер', 'Портфолио', 'Қалай жұмыс істейміз', 'Байланыс'],
    eyebrow: 'ЦИФРЛЫҚ БІЛІМ СТУДИЯСЫ',
    heroTitle: 'Сабаққа қызығушылық',
    heroAccent: 'оятып, білімге жол ашамыз.',
    heroText: 'Мұғалімдерге уақыт үнемдейтін көрнекі презентациялар, интерактивті тапсырмалар және толық сабақ жинақтары жасаймыз.',
    primary: 'Жобаға тапсырыс беру',
    secondary: 'Жұмыстарды қарау',
    servicesTitle: 'Жұмысымыздың форматы',
    servicesText: 'Тақырыпты, пәнді және мұғалімнің мақсаттарын ескере отырып, цифрлық оқу материалдарын әзірлейміз.',
    details: 'Толығырақ',
    portfolioTitle: 'Портфолио',
    portfolioText: 'Төмендегі үлгілер OyanLab мүмкіндіктерін көрсетеді.',
    openDemo: 'Үлгіні ашу',
    processTitle: 'Үш қадаммен',
    process: [
      ['01', 'Тапсырма', 'Пәнін, тақырыбын, тілін және қалаған форматын хабарлайсыз.'],
      ['02', 'Жобалау', 'Құрылымды, стилін және мазмұн жоспарын келісеміз.'],
      ['03', 'Нәтиже', 'Мәтін мен форматтау соңғы тексерістен өтіп, дайын материалды береміз.'],
    ],
    contactTitle: 'Сабаққа арналған идея бар ма?',
    contactText: 'Тапсырмаңыз бен қажетті форматы туралы жазып, мерзімін келісейік.',
    instagram: 'Instagram',
    whatsapp: 'WhatsApp',
    orderData: 'Тапсырыс үшін',
    orderHint: 'Пән · Тақырып · Тіл · Қажетті формат',
    footer: 'Цифрлық білімге арналған жаңа формат.',
    close: 'Жабу',
  },
  ru: {
    nav: ['Главная', 'Услуги', 'Портфолио', 'Как мы работаем', 'Контакты'],
    eyebrow: 'ЦИФРОВАЯ ОБРАЗОВАТЕЛЬНАЯ СТУДИЯ',
    heroTitle: 'Делаем уроки',
    heroAccent: 'интереснее и подготовку проще.',
    heroText: 'Создаём для учителей наглядные презентации, интерактивные задания и готовые комплекты учебных материалов.',
    primary: 'Заказать проект',
    secondary: 'Посмотреть работы',
    servicesTitle: 'Формат нашей работы',
    servicesText: 'Разрабатываем цифровые учебные материалы под предмет, тему и цель конкретного урока.',
    details: 'Подробнее',
    portfolioTitle: 'Портфолио',
    portfolioText: 'Примеры демонстрируют возможности OyanLab и не являются описанием выполненных заказов.',
    openDemo: 'Открыть пример',
    processTitle: 'Три шага',
    process: [
      ['01', 'Задача', 'Вы сообщаете предмет, тему, язык и нужный формат.'],
      ['02', 'Проектирование', 'Согласовываем структуру, стиль и план содержания.'],
      ['03', 'Результат', 'Проверяем текст и форматирование, затем передаём готовый материал.'],
    ],
    contactTitle: 'Есть идея для урока?',
    contactText: 'Напишите о задаче — обсудим формат и сроки.',
    instagram: 'Instagram',
    whatsapp: 'WhatsApp',
    orderData: 'Для заказа',
    orderHint: 'Предмет · Тема · Язык · Нужный формат',
    footer: 'Новая форма цифрового образования.',
    close: 'Закрыть',
  },
}

const sectionIds = ['home', 'services', 'portfolio', 'process', 'contact']

function BrandMark({ compact = false }) {
  return (
    <a className={compact ? 'brand compact' : 'brand'} href="#home" aria-label="OyanLab">
      <span className="brand-dot" aria-hidden="true" />
      <span>OyanLab</span>
    </a>
  )
}

function App() {
  const [lang, setLang] = useState('kk')
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeDemo, setActiveDemo] = useState(null)
  const menuButtonRef = useRef(null)
  const demoTriggerRef = useRef(null)
  const modalRef = useRef(null)
  const closeModalRef = useRef(null)
  const t = COPY[lang]
  const dataLang = lang === 'kk' ? 'kz' : 'ru'

  useEffect(() => {
    const origin = window.location.origin
    const canonicalUrl = `${origin}${window.location.pathname}`
    const title = lang === 'kk'
      ? 'OyanLab — цифрлық білім студиясы'
      : 'OyanLab — цифровая образовательная студия'
    const description = lang === 'kk'
      ? 'OyanLab — мұғалімдерге арналған презентациялар, интерактивті тапсырмалар, бейнематериалдар және сабақ жинақтары.'
      : 'OyanLab — презентации, интерактивные задания, видеоматериалы и комплекты учебных материалов для учителей.'

    document.documentElement.lang = lang
    document.title = title

    const metadata = {
      description,
      'og:title': title,
      'og:description': description,
      'og:locale': lang === 'kk' ? 'kk_KZ' : 'ru_RU',
      'og:url': canonicalUrl,
      'og:image': `${origin}/og-cover.png`,
      'twitter:title': title,
      'twitter:description': description,
      'twitter:image': `${origin}/og-cover.png`,
    }

    Object.entries(metadata).forEach(([key, value]) => {
      const selector = key.startsWith('og:')
        ? `meta[property="${key}"]`
        : key.startsWith('twitter:')
          ? `meta[name="${key}"]`
          : `meta[name="${key}"]`
      let element = document.head.querySelector(selector)
      if (!element) {
        element = document.createElement('meta')
        if (key.startsWith('og:')) element.setAttribute('property', key)
        else element.setAttribute('name', key)
        document.head.appendChild(element)
      }
      element.setAttribute('content', value)
    })

    let canonical = document.head.querySelector('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.setAttribute('rel', 'canonical')
      document.head.appendChild(canonical)
    }
    canonical.setAttribute('href', canonicalUrl)
  }, [lang])

  useEffect(() => {
    if (!menuOpen) return

    function handleMenuKeyDown(event) {
      if (event.key === 'Escape') {
        setMenuOpen(false)
        menuButtonRef.current?.focus()
      }
    }

    document.addEventListener('keydown', handleMenuKeyDown)
    return () => document.removeEventListener('keydown', handleMenuKeyDown)
  }, [menuOpen])

  useEffect(() => {
    if (!activeDemo) return

    const previousBodyOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeModalRef.current?.focus()

    function handleModalKeyDown(event) {
      if (event.key === 'Escape') {
        event.preventDefault()
        setActiveDemo(null)
        return
      }

      if (event.key !== 'Tab' || !modalRef.current) return

      const focusable = [...modalRef.current.querySelectorAll(
        'button:not([disabled]), iframe, a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
      )].filter((element) => !element.hidden)

      if (!focusable.length) {
        event.preventDefault()
        return
      }

      const first = focusable[0]
      const last = focusable[focusable.length - 1]

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', handleModalKeyDown)
    return () => {
      document.removeEventListener('keydown', handleModalKeyDown)
      document.body.style.overflow = previousBodyOverflow
    }
  }, [activeDemo])

  function closeModal() {
    setActiveDemo(null)
  }

  useEffect(() => {
    if (activeDemo) return
    if (demoTriggerRef.current) {
      demoTriggerRef.current.focus()
      demoTriggerRef.current = null
    }
  }, [activeDemo])

  function switchLang(nextLang) {
    setLang(nextLang)
  }

  return (
    <>
      <header className="topbar">
        <BrandMark />
        <nav id="main-navigation" className={menuOpen ? 'nav open' : 'nav'} aria-label={lang === 'kk' ? 'Негізгі навигация' : 'Основная навигация'}>
          {t.nav.map((label, index) => (
            <a
              key={sectionIds[index]}
              href={`#${sectionIds[index]}`}
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </a>
          ))}
        </nav>
        <div className="header-actions">
          <div className="language-switch" aria-label={lang === 'kk' ? 'Тілді таңдау' : 'Выбор языка'}>
            <button className={lang === 'kk' ? 'active' : ''} aria-pressed={lang === 'kk'} onClick={() => switchLang('kk')}>ҚАЗ</button>
            <button className={lang === 'ru' ? 'active' : ''} aria-pressed={lang === 'ru'} onClick={() => switchLang('ru')}>РУС</button>
          </div>
          <button
            ref={menuButtonRef}
            className="menu-button"
            type="button"
            aria-expanded={menuOpen}
            aria-controls="main-navigation"
            aria-label={lang === 'kk'
              ? (menuOpen ? 'Мәзірді жабу' : 'Мәзірді ашу')
              : (menuOpen ? 'Закрыть меню' : 'Открыть меню')}
            onClick={() => setMenuOpen((value) => !value)}
          >
            <span /><span />
          </button>
        </div>
      </header>

      <main>
        <section className="hero section" id="home">
          <div className="hero-copy">
            <p className="eyebrow"><span />{t.eyebrow}</p>
            <h1>{t.heroTitle}<br /><em>{t.heroAccent}</em></h1>
            <p className="hero-text">{t.heroText}</p>
            <div className="hero-actions">
              <a className="button primary" href="#contact">{t.primary}<span>↗</span></a>
              <a className="button ghost" href="#portfolio">{t.secondary}</a>
            </div>
          </div>
          <div className="hero-visual" aria-label="OyanLab geometric brand mark">
            <div className="orbit orbit-one" />
            <div className="orbit orbit-two" />
            <div className="awakening-mark"><i /></div>
            <div className="visual-label">DIGITAL<br />EDUCATION</div>
          </div>
        </section>

        <section className="services section" id="services">
          <div className="section-heading">
            <p className="eyebrow"><span />{lang === 'kk' ? 'Қызметтер' : 'Услуги'}</p>
            <h2>{t.servicesTitle}</h2>
            <p>{t.servicesText}</p>
          </div>
          <div className="service-grid">
            {services.map((service) => (
              <article className={`service-card ${service.icon}`} key={service.id}>
                <div className="service-top">
                  <span className="service-number">{service.number}</span>
                  <div className={`service-icon ${service.icon}`} aria-hidden="true">
                    <img
                      src={service.illustration}
                      alt=""
                      width="105"
                      height="105"
                    />
                  </div>
                </div>
                <h3>{service[dataLang].title}</h3>
                <p>{service[dataLang].description}</p>
                <a href="#contact" className="text-link">{t.details}<span>↗</span></a>
              </article>
            ))}
          </div>
        </section>

        <section className="portfolio section" id="portfolio">
          <div className="section-heading portfolio-heading">
            <div>
              <p className="eyebrow"><span />{lang === 'kk' ? 'Жұмыс мысалдары' : 'Примеры работ'}</p>
              <h2>{t.portfolioTitle}</h2>
            </div>
            <p>{t.portfolioText}</p>
          </div>
          <div className="portfolio-grid">
            {portfolioItems.map((item) => (
              <article className={`portfolio-card ${item.accent}`} key={item.id}>
                <div className={`portfolio-preview ${item.type}`}>
                  <span className="demo-tag">{item[dataLang].label}</span>
                  {item.type === 'presentation' && (
                    item.presentationModal ? (
                      <button
                        type="button"
                        className="presentation-preview friends-presentation-preview"
                        aria-label={item[dataLang].title}
                        onClick={(event) => {
                          demoTriggerRef.current = event.currentTarget
                          setActiveDemo(item)
                        }}
                      >
                        <img src={item.preview} alt={item[dataLang].title} width="1280" height="552" />
                      </button>
                    ) : (
                      <div className="presentation-preview" />
                    )
                  )}
                  {item.type === 'interactive' && (
                    <div className="quiz-preview">
                      <span>Астрономия · 1/5</span>
                      <strong>{lang === 'kk' ? 'Күн жүйесінің ең үлкен планетасы?' : 'Самая большая планета Солнечной системы?'}</strong>
                      <div><i />Юпитер / Jupiter</div>
                    </div>
                  )}
                  {item.type === 'kit' && (
                    <button
                      type="button"
                      className="kit-preview kit-preview-button"
                      aria-label={item[dataLang].title}
                      onClick={(event) => {
                        demoTriggerRef.current = event.currentTarget
                        setActiveDemo(item)
                      }}
                    >
                      <div>PDF</div><div>QUIZ</div><div>VIDEO</div>
                    </button>
                  )}
                </div>
                <div className="portfolio-meta">
                  <div>
                    <h3>{item[dataLang].title}</h3>
                    {item[dataLang].description && <p className="portfolio-description">{item[dataLang].description}</p>}
                  </div>
                  <button type="button" onClick={(event) => {
                    demoTriggerRef.current = event.currentTarget
                    setActiveDemo(item)
                  }}>{t.openDemo}<span>↗</span></button>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="process section" id="process">
          <div className="section-heading">
            <p className="eyebrow"><span />{lang === 'kk' ? 'Жұмыс барысы' : 'Процесс'}</p>
            <h2>{t.processTitle}</h2>
          </div>
          <div className="process-grid">
            {t.process.map(([number, title, text]) => (
              <article key={number}>
                <span>{number}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="contact section" id="contact">
          <div className="contact-panel">
            <div>
              <p className="eyebrow"><span />{lang === 'kk' ? 'Байланыс' : 'Контакт'}</p>
              <h2>{t.contactTitle}</h2>
              <p>{t.contactText}</p>
            </div>
            <div className="contact-actions">
              <a className="contact-link" href="https://www.instagram.com/oyanlab.kz" target="_blank" rel="noreferrer">
                <span>01</span><strong>{t.instagram}</strong><i>↗</i>
              </a>
              <a className="contact-link" href="https://wa.me/77009513609" target="_blank" rel="noreferrer">
                <span>02</span><strong>{t.whatsapp}</strong><i>↗</i>
              </a>
              <div className="order-summary">
                <small>{t.orderData}</small>
                <p>{t.orderHint}</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <BrandMark compact />
        <p>{t.footer}</p>
        <a href="#home">↑</a>
      </footer>

      {activeDemo && (
        <div className="modal-backdrop" role="presentation" onMouseDown={() => setActiveDemo(null)}>
          <div
            ref={modalRef}
            className={
              activeDemo.presentationModal
                ? 'demo-modal presentation-modal'
                : activeDemo.lessonKitModal
                  ? 'demo-modal lesson-kit-modal'
                  : 'demo-modal'
            }
            role="dialog"
            aria-modal="true"
            aria-label={activeDemo[dataLang].title}
            onMouseDown={(event) => event.stopPropagation()}
          >
            <button ref={closeModalRef} className="modal-close" type="button" onClick={closeModal}>{t.close} ×</button>
            {activeDemo.presentationModal ? (
              <iframe
                className="presentation-frame"
                src="/portfolio/english_presentation/friends-presentation.html"
                title={activeDemo[dataLang].title}
                allowFullScreen
                onLoad={(event) => {
                  event.currentTarget.contentWindow?.addEventListener('keydown', (iframeEvent) => {
                    if (iframeEvent.key === 'Escape') closeModal()
                  })
                }}
              />
            ) : activeDemo.type === 'interactive' ? (
              <>
                <p className="eyebrow"><span />{activeDemo[dataLang].label}</p>
                <h2>{activeDemo[dataLang].title}</h2>
              <MiniQuiz lang={lang} />
              </>
            ) : activeDemo.lessonKitModal ? (
              <LessonKitModal lang={lang} />
            ) : (
              <>
                <p className="eyebrow"><span />{activeDemo[dataLang].label}</p>
                <h2>{activeDemo[dataLang].title}</h2>
                <div className={`demo-placeholder ${activeDemo.type}`}>
                  <strong>{lang === 'kk' ? 'Демонстрация дайындалуда' : 'Демонстрация в разработке'}</strong>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  )
}

function LessonKitModal({ lang }) {
  const [tab, setTab] = useState('plan')
  const [quizAnswers, setQuizAnswers] = useState({})
  const [quizChecked, setQuizChecked] = useState(false)
  useEffect(() => {
    setTab('plan')
    setQuizAnswers({})
    setQuizChecked(false)
  }, [lang])
  const copy = {
    kk: {
      subject: 'Ағылшын тілі · 5 сынып',
      title: '«Достар туралы сөйлесу» сабағының жиынтығы',
      intro: 'Ағылшын тілінен мұғалімге арналған презентация, жоспар, жұмыс парағы және білім тексеру жиынтығы.',
      tabs: ['Сабақ жоспары', 'Презентация', 'Жұмыс парағы', 'Білім тексеру', 'Үй жұмысы'],
      planTitle: 'Сабақ жоспары',
      theme: 'Тақырыбы',
      themeValue: 'Talking About Friends',
      goalsTitle: 'Оқу мақсаттары',
      goals: [
        'Достарды сипаттайтын 6 жаңа сөзді қолдану.',
        '“He / She is” құрылымымен сөйлем құрастыру.',
        'And жалғауын қолданып сөйлемдерді байланыстыру.',
      ],
      outcomesTitle: 'Күтілетін нәтижелер',
      outcomes: [
        'Досының кем дегенде үш қасиетін айтады.',
        'Тірек сөздер арқылы қысқа сипаттама құрайды.',
        'Жаңа лексиканы толықтырып сөйлейді.',
      ],
      stagesTitle: 'Сабақ кезеңдері',
      stages: [
        ['1', 'Ұйымдастыру және қызығушылықты ояту', '3 мин', 'Суреттерге қарап тақырыпты болжауды сұрайды.', 'Суреттерді қарастырып болжам айтады.'],
        ['2', 'Жаңа лексиканы меңгеру', '7 мин', 'Көрнекі суретпен 6 сөзді таныстырады.', 'Сөздерді қайталап, мағынасын түсінеді.'],
        ['3', 'Сөйлем құрылымын түсіндіру', '5 мин', 'He / She is + adjective құрылымын көрсетеді.', 'Жекеше сөйлемдерді оқып, құрастырады.'],
        ['4', 'Жұптық практика', '5 мин', 'Жұпқа достың суретін сипаттауды тапсырады.', 'And жалғауын қолдана отырып сөйлеседі.'],
        ['5', 'Бекіту және қорытынды', '5 мин', 'Тест және үй тапсырмасын түсіндіреді.', 'Өз нәтижесін көреді және бағалау критерийін талдайды.'],
      ],
      teacher: 'Мұғалімнің әрекеті',
      learners: 'Оқушылардың әрекеті',
      presentationTitle: 'Презентация',
      presentationText: '«Talking About Friends» тақырыбына дайын интерактивті слайдтар.',
      worksheetTitle: 'Жұмыс парағы',
      worksheetIntro: 'Лексиканы бекітуге арналған үш қысқа жаттығу.',
      task1: '1. Сөйлемдерді тиісті сөздермен толықтыр',
      worksheet1: [
        ['Anna is ', 'kind', '. She helps me.'],
        ['Tom is ', 'funny', '. He makes us laugh.'],
        ['Mia is ', 'clever', '. She reads a lot.'],
      ],
      task2: '2. Сөздерді дұрыс сөйлемге айналдыр',
      task2Hint: 'Достың есімі мен оның қасиетін байланыстырыңыз.',
      task3: '3. Сөйлем құрастырыңыз',
      quizTitle: 'Білім тексеру',
      quizIntro: '6 сұраққа жауап беріп, тексеру батырмасын басыңыз.',
      check: 'Жауаптарды тексеру',
      reset: 'Қайталау',
      correct: 'дұрыс',
      score: 'Нәтиже',
      homeworkTitle: 'Үй жұмысы және бағалау',
      homework: 'Үйде достың суретін немесе досыңыз туралы 4 сөйлем жазып, 4 жаңа лексиканы қолданыңыз.',
      rubricTitle: 'Бағалау критерийлері',
      rubric: [
        ['Лексика', '6 ұсынылған сөздің ішінде кемінде 4 сөзді пайдаланады.'],
        ['Грамматика', 'He / She is құрылымы дұрыс қолданылады.'],
        ['Жауаптың толықтығы', 'Түйіндейтін 4 сөйлем жазылады.'],
      ],
      answersTitle: 'Мұғалімге арналған жауаптар',
      answers: ['Anna is kind.', 'Tom is funny.', 'Mia is clever.', 'He / She is tall / shy / friendly.'],
      openPresentation: 'Презентацияны қарау',
    },
    ru: {
      subject: 'Английский язык · 5 класс',
      title: 'Комплект урока «Talking About Friends»',
      intro: 'Готовый набор для учителя: план урока, презентация, рабочий лист и проверка знаний.',
      tabs: ['План урока', 'Презентация', 'Рабочий лист', 'Проверка знаний', 'Домашнее задание'],
      planTitle: 'План урока',
      theme: 'Тема',
      themeValue: 'Talking About Friends',
      goalsTitle: 'Цели обучения',
      goals: [
        'Использовать 6 новых слов для описания друзей.',
        'Составлять предложения по модели “He / She is”.',
        'Связывать мысли с помощью союза And.',
      ],
      outcomesTitle: 'Ожидаемые результаты',
      outcomes: [
        'Называет минимум три качества друга.',
        'Составляет краткое описание по опорным словам.',
        'Использует новую лексику в устной речи.',
      ],
      stagesTitle: 'Этапы урока',
      stages: [
        ['1', 'Организация и мотивация', '3 мин', 'Предлагает предположить тему по картинкам.', 'Рассматривает картинки и высказывает предположения.'],
        ['2', 'Введение новой лексики', '7 мин', 'Представляет 6 слов с наглядными примерами.', 'Повторяет слова и понимает их значение.'],
        ['3', 'Объяснение грамматической модели', '5 мин', 'Показывает модель He / She is + adjective.', 'Читает и составляет предложения в единственном числе.'],
        ['4', 'Парная работа', '5 мин', 'Просит описать друга по опорным словам.', 'Использует And для объединения характеристик.'],
        ['5', 'Закрепление и итог', '5 мин', 'Проводит тест и объясняет домашнее задание.', 'Проверяет результат и знакомится с критериями.'],
      ],
      teacher: 'Действия учителя',
      learners: 'Действия учеников',
      presentationTitle: 'Презентация',
      presentationText: 'Готовые интерактивные слайды по теме «Talking About Friends».',
      worksheetTitle: 'Рабочий лист',
      worksheetIntro: 'Три коротких упражнения для закрепления лексики.',
      task1: '1. Дополните предложения словами',
      worksheet1: [
        ['Anna is ', 'kind', '. She helps me.'],
        ['Tom is ', 'funny', '. He makes us laugh.'],
        ['Mia is ', 'clever', '. She reads a lot.'],
      ],
      task2: '2. Составьте словосочетания в предложениях',
      task2Hint: 'Свяжите имя друга с подходящей характеристикой.',
      task3: '3. Составьте предложение',
      quizTitle: 'Проверка знаний',
      quizIntro: 'Ответьте на 6 вопросов и нажмите «Проверить».',
      check: 'Проверить ответы',
      reset: 'Повторить',
      correct: 'правильно',
      score: 'Результат',
      homeworkTitle: 'Домашнее задание и оценивание',
      homework: 'Нарисуйте друга или напишите о нём 4 предложения, используя минимум 4 изученных слова.',
      rubricTitle: 'Критерии оценивания',
      rubric: [
        ['Лексика', 'Использовано минимум 4 из 6 изученных слов.'],
        ['Грамматика', 'Верно использована модель He / She is.'],
        ['Полнота ответа', 'Написано 4 связных предложения.'],
      ],
      answersTitle: 'Ответы для учителя',
      answers: ['Anna is kind.', 'Tom is funny.', 'Mia is clever.', 'He / She is tall / shy / friendly.'],
      openPresentation: 'Открыть презентацию',
    },
  }
  const c = copy[lang]
  const questions = lang === 'kk'
    ? [
        ['Anna кімге көмектеседі?', ['kind', 'tall', 'shy'], 'kind'],
        ['Кім күлдіреді?', ['funny', 'clever', 'shy'], 'funny'],
        ['Кім көп оқиды?', ['tall', 'clever', 'friendly'], 'clever'],
        ['Қай сөйлем дұрыс құрылған?', ['Anna kind', 'Привет, как дела?', 'She is kind'], 'She is kind'],
        ['She is tall means…', ['She — ұзын', 'She — ақылды', 'She — ұялшақ'], 'She — ұзын'],
        ['Қай сөз and жалғауын қажет етеді?', ['She is kind and funny', 'Kind.', 'Is she kind'], 'She is kind and funny'],
      ]
    : [
        ['Кто помогает другим?', ['kind', 'tall', 'shy'], 'kind'],
        ['Кто смешит друзей?', ['funny', 'clever', 'shy'], 'funny'],
        ['Кто много читает?', ['tall', 'clever', 'friendly'], 'clever'],
        ['Какое предложение составлено верно?', ['Anna kind', 'Привет, как дела?', 'She is kind'], 'She is kind'],
        ['Что означает “She is tall”?', ['Она высокая', 'Она умная', 'Она стесняется'], 'Она высокая'],
        ['В каком предложении верно использован союз and?', ['She is kind and funny', 'Kind.', 'Is she kind'], 'She is kind and funny'],
      ]

  const checkedCount = questions.filter((_, index) => quizAnswers[index] === questions[index][2]).length
  const allAnswered = Object.keys(quizAnswers).length === questions.length

  return (
    <div className="lesson-kit-content">
      <header className="lesson-kit-header">
        <p className="eyebrow"><span />{c.subject}</p>
        <h2>{c.title}</h2>
        <p>{c.intro}</p>
      </header>

      <nav className="lesson-kit-tabs" role="tablist" aria-label={lang === 'kk' ? 'Сабақ жиынтығы бөлімі' : 'Разделы комплекта урока'}>
        {c.tabs.map((label, index) => {
          const names = ['plan', 'presentation', 'worksheet', 'quiz', 'homework']
          return (
            <button
              type="button"
              key={names[index]}
              role="tab"
              id={`lesson-kit-tab-${names[index]}`}
              aria-controls={`lesson-kit-panel-${names[index]}`}
              className={tab === names[index] ? 'active' : ''}
              aria-selected={tab === names[index]}
              onClick={() => setTab(names[index])}
            >
              <span>0{index + 1}</span>{label}
            </button>
          )
        })}
      </nav>

      <div
        className="lesson-kit-scroll"
        id={`lesson-kit-panel-${tab}`}
        role="tabpanel"
        aria-labelledby={`lesson-kit-tab-${tab}`}
      >
        {tab === 'plan' && (
          <section className="lesson-kit-section">
            <h3>{c.planTitle}</h3>
            <div className="lesson-kit-overview">
              <div><small>{c.theme}</small><strong>{c.themeValue}</strong></div>
              <div><small>{lang === 'kk' ? 'Ұзақтығы' : 'Продолжительность'}</small><strong>25 {lang === 'kk' ? 'минут' : 'минут'}</strong></div>
            </div>
            <div className="lesson-kit-columns">
              <div className="lesson-kit-list-card">
                <h4>{c.goalsTitle}</h4>
                <ul>{c.goals.map((goal) => <li key={goal}>{goal}</li>)}</ul>
              </div>
              <div className="lesson-kit-list-card">
                <h4>{c.outcomesTitle}</h4>
                <ul>{c.outcomes.map((outcome) => <li key={outcome}>{outcome}</li>)}</ul>
              </div>
            </div>
            <h4 className="lesson-kit-subtitle">{c.stagesTitle}</h4>
            <div className="lesson-stage-list">
              {c.stages.map(([number, name, time, teacher, learner]) => (
                <article className="lesson-stage" key={number}>
                  <span className="lesson-stage-number">{number}</span>
                  <div className="lesson-stage-main">
                    <div className="lesson-stage-heading"><h5>{name}</h5><strong>{time}</strong></div>
                    <div className="lesson-stage-actions">
                      <p><small>{c.teacher}</small>{teacher}</p>
                      <p><small>{c.learners}</small>{learner}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {tab === 'presentation' && (
          <section className="lesson-kit-section">
            <div className="lesson-material-heading">
              <div><h3>{c.presentationTitle}</h3><p>{c.presentationText}</p></div>
            </div>
            <iframe
              className="lesson-kit-presentation"
              src="/portfolio/english_presentation/friends-presentation.html"
              title={c.presentationTitle}
            />
          </section>
        )}

        {tab === 'worksheet' && (
          <section className="lesson-kit-section">
            <h3>{c.worksheetTitle}</h3>
            <p className="lesson-kit-intro">{c.worksheetIntro}</p>
            <div className="worksheet-card">
              <h4>{c.task1}</h4>
              {c.worksheet1.map(([start, answer, end], index) => (
                <label className="worksheet-sentence" key={answer}>
                  {start}
                  <input
                    className="worksheet-answer"
                    aria-label={`${lang === 'kk' ? 'Жауап' : 'Ответ'} ${index + 1}`}
                    placeholder="..."
                  />
                  {end}
                </label>
              ))}
              <p className="worksheet-note">{lang === 'kk' ? 'Дұрыс сөздер: kind · funny · clever' : 'Слова для ответов: kind · funny · clever'}</p>
            </div>
            <div className="worksheet-grid">
              <div className="worksheet-card">
                <h4>{c.task2}</h4>
                <p>{c.task2Hint}</p>
                <div className="worksheet-options"><span>She</span><strong>is</strong><span>kind</span><strong>and</strong><span>funny</span></div>
              </div>
              <div className="worksheet-card">
                <h4>{c.task3}</h4>
                <div className="worksheet-writing"><span>{lang === 'kk' ? 'Менің досым' : 'Мой друг'}</span><span>is</span><span>{lang === 'kk' ? 'және' : 'and'}</span><i /></div>
              </div>
            </div>
          </section>
        )}

        {tab === 'quiz' && (
          <section className="lesson-kit-section">
            <h3>{c.quizTitle}</h3>
            <p className="lesson-kit-intro">{c.quizIntro}</p>
            <div className="lesson-kit-quiz">
              {questions.map(([question, options, answer], index) => (
                <fieldset className="lesson-quiz-question" key={question}>
                  <legend><span>{index + 1}</span>{question}</legend>
                  <div>
                    {options.map((option) => (
                      <label
                        key={option}
                        className={
                          quizChecked && quizAnswers[index] === option
                            ? option === answer ? 'quiz-option correct' : 'quiz-option wrong'
                            : quizChecked && option === answer
                              ? 'quiz-option correct'
                            : 'quiz-option'
                        }
                      >
                        <input
                          type="radio"
                          name={`lesson-question-${index}`}
                          checked={quizAnswers[index] === option}
                          onChange={() => setQuizAnswers((current) => ({ ...current, [index]: option }))}
                        />
                        <span>{option}</span>
                      </label>
                    ))}
                  </div>
                </fieldset>
              ))}
            </div>
            <div className="lesson-kit-quiz-actions">
              {quizChecked && <strong className="lesson-kit-score" role="status" aria-live="polite">{c.score}: {checkedCount} / {questions.length}</strong>}
              <button type="button" className="lesson-kit-secondary" onClick={() => { setQuizAnswers({}); setQuizChecked(false) }}>{c.reset}</button>
              <button type="button" className="lesson-kit-primary" disabled={!allAnswered} onClick={() => setQuizChecked(true)}>{c.check}</button>
            </div>
          </section>
        )}

        {tab === 'homework' && (
          <section className="lesson-kit-section">
            <h3>{c.homeworkTitle}</h3>
            <div className="homework-card">
              <span>01</span>
              <div><h4>{lang === 'kk' ? 'Практикалық тапсырма' : 'Практическое задание'}</h4><p>{c.homework}</p></div>
            </div>
            <h4 className="lesson-kit-subtitle">{c.rubricTitle}</h4>
            <div className="rubric-list">
              {c.rubric.map(([name, description]) => (
                <div key={name}><strong>{name}</strong><p>{description}</p></div>
              ))}
            </div>
            <details className="teacher-answers">
              <summary>{c.answersTitle}</summary>
              <ul>{c.answers.map((answer) => <li key={answer}>{answer}</li>)}</ul>
            </details>
          </section>
        )}
      </div>
    </div>
  )
}

function MiniQuiz({ lang }) {
  const [answer, setAnswer] = useState(null)
  const options = lang === 'kk'
    ? ['Марс', 'Юпитер', 'Сатурн']
    : ['Марс', 'Юпитер', 'Сатурн']
  return (
    <div className="mini-quiz">
      <p>{lang === 'kk' ? 'Күн жүйесінің ең үлкен планетасы?' : 'Самая большая планета Солнечной системы?'}</p>
      {options.map((option) => (
        <button
          type="button"
          key={option}
          className={answer === option ? (option === 'Юпитер' ? 'correct' : 'wrong') : ''}
          onClick={() => setAnswer(option)}
        >
          {option}
        </button>
      ))}
      {answer && (
        <strong>{answer === 'Юпитер'
          ? (lang === 'kk' ? 'Дұрыс жауап!' : 'Правильный ответ!')
          : (lang === 'kk' ? 'Тағы ойлан' : 'Попробуйте ещё раз')}</strong>
      )}
    </div>
  )
}

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
