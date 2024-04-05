import {useEffect, useRef, useState} from 'react'
import {Button} from './Button'
import {ChevronLeft, ChevronRight} from 'lucide-react'

type CategoryPillProps = {
  categories: string[]
  selectedCategroy: string
  onSelect: (category: string) => void
}
// translate amount
const TRANSLATE_AMOUNT = 200
export function CategoryPills({categories, selectedCategroy, onSelect}: CategoryPillProps) {
  const [translate, setTranslate] = useState(0)
  const [isLeftVisible, setIsLeftVisible] = useState(false)
  const [isRightVisible, setIsRightVisible] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (containerRef.current == null) return

    // got element's propreties, scollWidth is the width of scoll bar and client width is the screen width
    const observer = new ResizeObserver(entries => {
      const container = entries[0]?.target
      if (container == null) return
      setIsLeftVisible(translate > 0)
      setIsRightVisible(translate + container.clientWidth < container.scrollWidth)
    })
    observer.observe(containerRef.current)
    return () => {
      observer.disconnect()
    }
  }, [categories, translate])
  return (
    <div ref={containerRef} className="overflow-x-hidden relative">
      <div className="flex whitespace-nowrap gap-3 transition-transform w-[max-content]" style={{transform: `translateX(-${translate}px)`}}>
        {categories.map(category => (
          <Button key={category} variant={selectedCategroy === category ? 'dark' : 'default'} onClick={() => onSelect(category)} className="py-1 px-3 rounded-lg whitespace-nowrap">
            {category}
          </Button>
        ))}
      </div>
      {isLeftVisible && (
        <div
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-gradient-to-r from-white 
			from-50% to-tansparent w-24 h-full"
        >
          <Button
            variant="ghost"
            size="icon"
            className="h-full aspect-square p-1.5"
            onClick={() => {
              setTranslate(translate => {
                // set new translate is -200 if origin translate is 0
                const newTranslate = translate - TRANSLATE_AMOUNT
                if (newTranslate <= 0) return 0
                return newTranslate
              })
            }}
          >
            <ChevronLeft />
          </Button>
        </div>
      )}
      {isRightVisible && (
        <div
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-gradient-to-l from-white 
				from-50% to-tansparent w-24 h-full flex justify-end"
        >
          <Button
            variant="ghost"
            size="icon"
            className="h-full aspect-square p-1.5"
            onClick={() => {
              setTranslate(translate => {
                console.log(containerRef.current)
                if (containerRef.current == null) {
                  return translate
                }
                const newTranslate = translate + TRANSLATE_AMOUNT
                const edge = containerRef.current.scrollWidth
                const width = containerRef.current.clientWidth
                // if scoll width > translate + div width so tranlate equals div width
                if (newTranslate + width >= edge) {
                  return edge - width
                }
                return newTranslate
              })
            }}
          >
            <ChevronRight />
          </Button>
        </div>
      )}
    </div>
  )
}
