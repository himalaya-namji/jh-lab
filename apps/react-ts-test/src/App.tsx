import { BrowserRouter as Router, useSearchParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import './App.css'
import MobileIdButton from './components/MobileIdButton'
import HashTest from './components/HashTest'
import HeartButtonContainer from './components/HeartButtonContainer'
import ChatIdSelector from './components/chat-id-selector'
import SimpleIdSelector from './components/simple-id-selector'
import MobileIdSelector from './components/mobile-id-selector'
import MobileIdSelectorDialogTest from './components/mobile-id-selector-dialog/MobileIdSelectorDialogTest'
import type { TestComponents, TabKey } from './types/app'
import LinkRotator from './components/LinkRotator'
import { naverURl } from './components/LinkRotator/linkUrl'
import LinkWindowRotator from './components/LinkRotator/LinkWindowRotator'

// 테스트 컴포넌트 정의
const TEST_COMPONENTS: TestComponents = {
  idcard: {
    name: '대화형신분증선택',
    component: <ChatIdSelector />
  },
  mobileid: {
    name: '모바일신분증',
    component: <MobileIdButton />
  },
  mobileidselector: {
    name: '모바일신분증선택',
    component: <MobileIdSelector />
  },
  hash: {
    name: '해시테스트',
    component: <HashTest />
  },
  idcardv2: {
    name: '일반형신분증선택',
    component: <SimpleIdSelector />
  },
  dialog: {
    name: '대화형모바일신분증',
    component: <MobileIdSelectorDialogTest />
  },
  heart: {
    name: '하트버튼테스트',
    component: <HeartButtonContainer />
  },
  linkRotator: {
    name: 'iframe테스트',
    component: <LinkRotator urls={naverURl} />
  },
  linkWindowRotator:{
    name: '새창테스트',
    component: <LinkWindowRotator urls={naverURl} />
  }
} as const

// 애니메이션 variants
const headerVariants = {
  hidden: { 
    y: -100,
    opacity: 0
  },
  visible: { 
    y: 0,
    opacity: 1
  }
}

const containerVariants = {
  initial: { 
    opacity: 0, 
    y: 30,
    scale: 0.98
  },
  animate: { 
    opacity: 1, 
    y: 0,
    scale: 1
  },
  exit: { 
    opacity: 0, 
    y: -20,
    scale: 0.98
  }
}

// 헤더 컴포넌트
const Header = ({ 
  isVisible, 
  onMouseEnter, 
  onMouseLeave 
}: { 
  isVisible: boolean
  onMouseEnter: () => void
  onMouseLeave: () => void
}) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const currentTab = (searchParams.get('tab') as TabKey) || 'idcard'
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)
  const navRef = useRef<HTMLElement>(null)

  const handleTabClick = (tabKey: TabKey) => {
    console.log('Tab clicked:', tabKey) // 디버깅 로그
    console.log('Current searchParams:', searchParams.toString()) // 현재 쿼리스트링 확인
    setSearchParams({ tab: tabKey })
    console.log('SearchParams updated') // 업데이트 확인
  }

  // 드래그 앤 드롭 핸들러
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!navRef.current) return
    
    setIsDragging(true)
    setStartX(e.pageX - navRef.current.offsetLeft)
    setScrollLeft(navRef.current.scrollLeft)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !navRef.current) return
    
    e.preventDefault()
    const x = e.pageX - navRef.current.offsetLeft
    const walk = (x - startX) * 2 // 스크롤 속도 조절
    navRef.current.scrollLeft = scrollLeft - walk
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleMouseLeave = () => {
    setIsDragging(false)
  }

  // 탭 버튼 클릭 핸들러 (별도로 분리)
  const handleButtonClick = (tabKey: TabKey, e: React.MouseEvent) => {
    console.log('Button clicked:', tabKey, 'isDragging:', isDragging) // 디버깅 로그
    e.preventDefault()
    e.stopPropagation()
    
    // 임시로 드래그 체크 비활성화
    // if (!isDragging) {
      handleTabClick(tabKey)
    // }
  }

  return (
    <motion.header 
      className="app-header"
      variants={headerVariants}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      transition={{ 
        duration: 0.3, 
        ease: [0.4, 0.0, 0.2, 1]
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="header-content">
        <nav 
          ref={navRef}
          className={`tab-navigation ${isDragging ? 'dragging' : ''}`}
          role="tablist" 
          aria-label="테스트 컴포넌트 선택"
          // 임시로 드래그 이벤트 비활성화
          // onMouseDown={handleMouseDown}
          // onMouseMove={handleMouseMove}
          // onMouseUp={handleMouseUp}
          // onMouseLeave={handleMouseLeave}
        >
          {Object.entries(TEST_COMPONENTS).map(([key, { name }], index) => (
            <motion.button
              key={key}
              className={`tab-button ${currentTab === key ? 'active' : ''}`}
              onClick={(e) => handleButtonClick(key as TabKey, e)}
              role="tab"
              aria-selected={currentTab === key}
              aria-controls={`panel-${key}`}
              type="button"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.3, 
                delay: index * 0.05,
                ease: "easeOut"
              }}
              whileHover={{ 
                scale: 1.05,
                transition: { duration: 0.2 }
              }}
              whileTap={{ 
                scale: 0.95,
                transition: { duration: 0.1 }
              }}
            >
              {name}
            </motion.button>
          ))}
        </nav>
      </div>
    </motion.header>
  )
}

// 메인 콘텐츠 컴포넌트
const MainContent = () => {
  const [searchParams] = useSearchParams()
  const currentTab = (searchParams.get('tab') as TabKey) || 'idcard'
  
  console.log('MainContent - Current tab:', currentTab) // 디버깅 로그
  console.log('MainContent - All searchParams:', searchParams.toString()) // 모든 쿼리스트링 확인
  
  const ComponentToRender = TEST_COMPONENTS[currentTab]?.component || <ChatIdSelector />

  return (
    <main className="main-content-full">
      <AnimatePresence mode="wait">
        <motion.div 
          key={currentTab}
          className="component-container-full"
          role="tabpanel"
          id={`panel-${currentTab}`}
          aria-labelledby={`tab-${currentTab}`}
          variants={containerVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ 
            duration: 0.5, 
            ease: [0.4, 0.0, 0.2, 1],
            delay: 0.1
          }}
        >
          {ComponentToRender}
        </motion.div>
      </AnimatePresence>
    </main>
  )
}

// 메인 App 컴포넌트
function App() {
  const [isHeaderVisible, setIsHeaderVisible] = useState(false)
  const [touchStartY, setTouchStartY] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const [isHeaderHovered, setIsHeaderHovered] = useState(false)

  useEffect(() => {
    // 모바일 디바이스 감지
    const checkMobile = () => {
      setIsMobile('ontouchstart' in window || navigator.maxTouchPoints > 0)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)

    const handleMouseMove = (e: MouseEvent) => {
      // 데스크톱에서만 마우스 이벤트 처리
      if (!isMobile) {
        // 마우스가 최상단 20px 영역에 있거나 헤더 영역에 있으면 헤더 표시
        if (e.clientY <= 20 || (isHeaderVisible && e.clientY <= 80)) {
          setIsHeaderVisible(true)
        } else if (!isHeaderHovered) {
          // 헤더에 마우스가 없을 때만 숨김
          setIsHeaderVisible(false)
        }
      }
    }

    const handleTouchStart = (e: TouchEvent) => {
      setTouchStartY(e.touches[0].clientY)
      
      // 터치가 최상단 60px 영역에서 시작되면 헤더 표시 (모바일에서는 더 큰 영역)
      if (e.touches[0].clientY <= 60) {
        setIsHeaderVisible(true)
      }
    }

    const handleTouchMove = (e: TouchEvent) => {
      const currentY = e.touches[0].clientY
      const deltaY = touchStartY - currentY
      
      // 위로 스와이프하면 헤더 표시 (더 민감하게)
      if (deltaY > 20 && currentY <= 120) {
        setIsHeaderVisible(true)
      }
      // 아래로 스와이프하면 헤더 숨김
      else if (deltaY < -20) {
        setIsHeaderVisible(false)
      }
      // 터치가 최상단 영역에 있으면 헤더 표시
      else if (currentY <= 60) {
        setIsHeaderVisible(true)
      }
    }

    const handleTouchEnd = () => {
      // 모바일에서는 헤더를 더 오래 유지
      if (isMobile) {
        setTimeout(() => {
          setIsHeaderVisible(false)
        }, 5000) // 5초 후 자동 숨김
      }
    }

    // 데스크톱 이벤트 리스너
    document.addEventListener('mousemove', handleMouseMove)
    
    // 모바일 터치 이벤트 리스너
    document.addEventListener('touchstart', handleTouchStart, { passive: true })
    document.addEventListener('touchmove', handleTouchMove, { passive: true })
    document.addEventListener('touchend', handleTouchEnd)

    // 클린업 함수
    return () => {
      window.removeEventListener('resize', checkMobile)
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('touchstart', handleTouchStart)
      document.removeEventListener('touchmove', handleTouchMove)
      document.removeEventListener('touchend', handleTouchEnd)
    }
  }, [touchStartY, isMobile, isHeaderVisible, isHeaderHovered])

  return (
    <Router>
      <div className="app">
        <Header 
          isVisible={isHeaderVisible} 
          onMouseEnter={() => setIsHeaderHovered(true)}
          onMouseLeave={() => setIsHeaderHovered(false)}
        />
        <MainContent />
      </div>
    </Router>
  )
}

export default App
