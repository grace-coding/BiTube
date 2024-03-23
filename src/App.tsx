import {PageHeader} from './layouts/PageHeader'
import {CategoryPills} from './components/CategoryPills'
import {VideoGridItem} from './components/VideoGridItem'
import {categories} from './data/home'
import {useState} from 'react'
export default function APP() {
  const [selectedCategroy, setSelectedCategroy] = useState(categories[0])
  return (
    <div className="max-h-screen flex flex-col">
      <PageHeader />
      <div className="grid grid-cols-[auto,1fr] flex-grow-1 overflow-auto">
        <div>Sidebar</div>
        <div className="overflow-x-hidden px-8 pb-4">
          <div className="sticky top-0 bg-white z-10 pb-4">
            <CategoryPills selectedCategroy={selectedCategroy} onSelect={setSelectedCategroy} categories={categories} />
          </div>
          <div className="grid grid-4 grid-cols[repeat(auto-fill, minmax(300px, 1fr))]">
            <VideoGridItem />
          </div>
        </div>
      </div>
    </div>
  )
}
